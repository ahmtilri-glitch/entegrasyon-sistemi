import { loadConfig } from '../config/index.js';
import { logger } from '../core/logger.js';
import { SyncStateRepository } from '../db/repositories/syncStateRepository.js';
import { OrderService } from '../services/orderService.js';

/**
 * Webhook kullanilamadigi durumlar icin yedek polling worker'i.
 * Her calismada son basarili guncelleme zamanindan itibaren paketleri ceker.
 */
export class OrderPollingWorker {
  private readonly orders: OrderService;
  private readonly syncState: SyncStateRepository;
  private running = false;
  private timer: NodeJS.Timeout | null = null;

  constructor(
    orders: OrderService = new OrderService(),
    syncState: SyncStateRepository = new SyncStateRepository(),
  ) {
    this.orders = orders;
    this.syncState = syncState;
  }

  async runOnce(): Promise<void> {
    const config = loadConfig();
    const now = Date.now();
    const targets: Array<{ domain: 'MEAL' | 'GROCERY'; storeId: string }> = [
      ...config.polling.mealStoreIds.map((storeId) => ({ domain: 'MEAL' as const, storeId })),
      ...config.polling.groceryStoreIds.map((storeId) => ({ domain: 'GROCERY' as const, storeId })),
    ];

    if (targets.length === 0) {
      logger.warn('Polling icin magaza tanimli degil (POLL_MEAL_STORE_IDS / POLL_GROCERY_STORE_IDS)');
      return;
    }

    for (const target of targets) {
      const syncKey = `orders:${target.domain}:${target.storeId}`;
      const state = await this.syncState.get(syncKey);
      const startDate = state?.lastCursorValue ?? now - config.polling.lookbackMs;
      try {
        const result = await this.orders.syncPackages({
          domain: target.domain,
          storeId: target.storeId,
          startDate,
          endDate: now,
        });
        await this.syncState.save(syncKey, now);
        logger.info('Polling tamamlandi', { ...target, ...result });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        await this.syncState.save(syncKey, startDate, message);
        logger.error('Polling hatasi', { ...target, error: message });
      }
    }
  }

  start(): void {
    const config = loadConfig();
    if (!config.polling.enabled) {
      logger.warn('Polling devre disi (TGO_POLLING_ENABLED=false)');
      return;
    }
    this.running = true;
    const tick = async (): Promise<void> => {
      if (!this.running) return;
      await this.runOnce();
      if (this.running) {
        this.timer = setTimeout(() => void tick(), config.polling.intervalMs);
        this.timer.unref();
      }
    };
    void tick();
  }

  stop(): void {
    this.running = false;
    if (this.timer) clearTimeout(this.timer);
  }
}

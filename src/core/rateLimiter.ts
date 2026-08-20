/**
 * TGO kurali: ayni endpoint icin 10 saniyede en fazla 50 istek.
 * Endpoint bazli kayan pencere (sliding window) uygulanir.
 */
export class SlidingWindowRateLimiter {
  private readonly limit: number;
  private readonly windowMs: number;
  private readonly buckets = new Map<string, number[]>();

  constructor(limit = 50, windowMs = 10_000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  async acquire(key: string, now: () => number = Date.now): Promise<void> {
    for (;;) {
      const current = now();
      const timestamps = (this.buckets.get(key) ?? []).filter(
        (ts) => current - ts < this.windowMs,
      );

      if (timestamps.length < this.limit) {
        timestamps.push(current);
        this.buckets.set(key, timestamps);
        return;
      }

      this.buckets.set(key, timestamps);
      const oldest = timestamps[0] ?? current;
      const waitMs = Math.max(1, this.windowMs - (current - oldest));
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }
}

# Entegrasyon Sistemi — Trendyol Go (Yemek & Market) Backend

Trendyol Go (TGO) Yemek ve Market API'leri icin uretime hazir backend entegrasyonu:
siparis yonetimi (webhook + polling), urun/menu katalog yonetimi, magaza operasyonlari,
iade/itiraz akislari, MySQL kalicilik katmani ve tum API trafiginin loglanmasi.

Referans dokumantasyon: https://developers.tgoapps.com/docs/intro

- Production: `https://api.tgoapis.com`
- Stage: `https://stageapi.tgoapis.com`

## Teknoloji

- Node.js 20+ / TypeScript (ESM, `strict` mod)
- Express 4 (REST panel API + webhook alicisi)
- MySQL 8 (InnoDB, utf8mb4, foreign key'ler)
- Vitest (birim + mock HTTP testleri), ESLint

## Klasor yapisi

```
migrations/           MySQL DDL (001_init.sql)
scripts/              Ornek entegrasyon betikleri
src/config/           Ortam degiskenleri, base URL, dogrulamalar
src/core/             Auth, HTTP client (retry/rate limit), logger, hata siniflari
src/db/               Pool, migration runner, repository katmani
src/modules/meal/     Yemek: siparis, menu, restoran, iade, degerlendirme
src/modules/grocery/  Market: siparis, urun, magaza, iade, stage test siparisi
src/services/         Normalizasyon, siparis/katalog/magaza/webhook servisleri
src/api/              Express app, middleware, route'lar
src/workers/          Polling worker entrypoint
tests/                Birim ve entegrasyon testleri
```

## Kimlik dogrulama

TGO HTTP Basic Auth kullanir: API key kullanici adi, API secret paroladir.
Her istekte gonderilen basliklar:

| Header | Deger |
| --- | --- |
| `Authorization` | `Basic base64(apiKey:apiSecret)` |
| `User-Agent` | `{supplierId} - {IntegratorName}` |
| `x-agentname` | Entegrator adi (alfanumerik, max 30 karakter) |
| `x-executor-user` | Islemi yapan kullanicinin e-postasi |

Stage ortami icin IP yetkilendirmesi gerekebilir; TGO ekibine cikis IP'nizi bildirin.

## Kurulum

```bash
npm install
cp .env.example .env   # degerleri doldurun
```

`.env` alanlari `.env.example` icinde aciklanmistir (TGO kimlik bilgileri, MySQL,
HTTP sunucu, webhook Basic Auth, panel API anahtari, polling ayarlari).
`.env` dosyasi git'e **commit edilmez**.

### Veritabani

```bash
mysql -e "CREATE DATABASE tgo_panel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
npm run migrate
```

Migration'lar idempotenttir; uygulanan dosyalar `schema_migrations` tablosunda tutulur.

Tablolar: `orders`, `order_items`, `products`, `categories`, `stores`, `api_logs`,
`webhooks`, `batch_requests`, `claims`, `sync_state`. Siparis ham JSON govdesi
`raw_payload` alaninda saklanir; `tgo_order_id`, `status`, `created_at` gibi sik
sorgulanan alanlarda index vardir.

### Calistirma

```bash
npm run dev          # gelistirme sunucusu (tsx watch)
npm run build        # dist/ ciktisi
npm start            # node dist/api/server.js
npm run worker       # polling worker (tsx)
npm run start:worker # node dist/workers/main.js
```

## REST panel API

Tum `/api/*` uclari `X-Api-Key: <PANEL_API_KEY>` bekler. `/health` aciktir.

### Siparisler

| Metot | Yol | Aciklama |
| --- | --- | --- |
| GET | `/api/orders` | Filtreli liste (`domain`, `status`, `storeId`, `from`, `to`, `limit`, `offset`) |
| GET | `/api/orders/:domain/:tgoOrderId` | Siparis + kalemleri |
| POST | `/api/orders/:domain/:tgoOrderId/refresh` | TGO'dan tekrar ceker |
| POST | `/api/orders/:domain/:tgoOrderId/accept` | Onaylar (yemek: `preparationTime`) |
| POST | `/api/orders/:domain/:tgoOrderId/prepared` | Hazir/faturalandi (market: `invoiceAmount`, `bagCount`) |
| POST | `/api/orders/:domain/:tgoOrderId/shipped` | Yola cikti (kendi kuryesi) |
| POST | `/api/orders/:domain/:tgoOrderId/delivered` | Teslim edildi (kendi kuryesi) |
| POST | `/api/orders/:domain/:tgoOrderId/cancel` | Iptal/tedarik edilemedi (`reasonId`, `itemIdList`) |
| POST | `/api/orders/sync` | Tarih araligi ile toplu senkronizasyon |

### Urunler / menu

| Metot | Yol |
| --- | --- |
| GET | `/api/products` |
| POST | `/api/products/sync` |
| POST | `/api/products/meal/prices` |
| PUT | `/api/products/meal/:storeId/:productId/status` |
| PUT | `/api/products/meal/:storeId/sections/:sectionId/status` |
| POST | `/api/products/grocery/price-inventory` |
| POST | `/api/products/grocery/sale-on` \| `/sale-off` |
| GET | `/api/products/batch-requests/:domain/:batchRequestId` |

### Magazalar

| Metot | Yol |
| --- | --- |
| GET | `/api/stores` |
| POST | `/api/stores/sync` |
| PUT | `/api/stores/:domain/:storeId/status` |
| POST | `/api/stores/:domain/:storeId/temporary-close` |
| PUT | `/api/stores/:domain/:storeId/working-hours` |
| PUT | `/api/stores/:domain/:storeId/eta` |
| GET | `/api/stores/:domain/:storeId/delivery-areas` |
| PUT | `/api/stores/grocery/:storeId/slots` |

### Loglar

`GET /api/logs/api` ve `GET /api/logs/webhooks` — giden istekler ve gelen
bildirimler zaman damgasi, HTTP durum kodu ve sure bilgisiyle listelenir.
Hassas basliklar (Authorization, secret, password) maskelenir.

Ornek:

```bash
curl -H "X-Api-Key: $PANEL_API_KEY" "http://localhost:3000/api/orders?domain=MEAL&status=Created"
curl -X POST -H "X-Api-Key: $PANEL_API_KEY" -H 'Content-Type: application/json' \
  -d '{"preparationTime":30}' \
  "http://localhost:3000/api/orders/MEAL/4dc2e957.../accept"
```

## Webhook

TGO'ya bildirilecek HTTPS uclari (Basic Auth zorunlu):

```
POST https://alan-adiniz/webhooks/tgo/meal
POST https://alan-adiniz/webhooks/tgo/grocery
POST https://alan-adiniz/webhooks/tgo/meal/:sellerId/:storeId/:orderId/:status
POST https://alan-adiniz/webhooks/tgo/grocery/:sellerId/:storeId/:orderId/:status
```

- Kimlik bilgileri `WEBHOOK_BASIC_USER` / `WEBHOOK_BASIC_PASSWORD` ile dogrulanir;
  bunlar bos birakilirsa tum istekler 401 doner.
- Idempotency anahtari `domain + id + packageStatus + lastModifiedDate` olarak uretilir;
  tekrarlanan bildirimler `duplicate_count` artirilarak yok sayilir, siparis tekrar islenmez.
- Basarili islemde 200, gecersiz govdede 400, hatali kimlikte 401 doner. TGO 2xx disindaki
  yanitlarda bildirimi tekrar dener (10 deneme 1sn arayla, ardindan ~1 dk sonra 10 deneme daha).
- Islenemeyen bildirimler `webhooks.status = 'FAILED'` ve `process_error` ile saklanir.

## Polling

Webhook kullanilamadiginda ya da yedek mekanizma olarak `npm run worker` calistirilir.
Her tur icin son basarili `lastModifiedDate` degeri `sync_state` tablosunda saklanir ve
bir sonraki turda cursor olarak kullanilir.

```
POLL_ENABLED=true
POLL_INTERVAL_MS=30000
POLL_LOOKBACK_MS=3600000
POLL_MEAL_STORE_IDS=153,154
POLL_GROCERY_STORE_IDS=991
```

## HTTP client davranisi

- Retry: 408, 409, 425, 429 ve 5xx; ustel backoff + jitter, `Retry-After` basligina uyum.
- Rate limit: ayni endpoint icin 10 saniyede 50 istek (kayan pencere, `TGO_RATE_LIMIT_PER_10S`).
- Timeout: `TGO_TIMEOUT_MS` (varsayilan 30 sn), `AbortController` ile.
- Hatalar `TgoApiError` (statusCode, operation, url, govde) veya `TgoNetworkError` olarak
  siniflanir; `isAuthError`, `isConflict`, `isRateLimited`, `isRetryable` yardimcilari vardir.
- Tum istekler `api_logs` tablosuna yazilir (method, url, status, sure, hata).

## TGO is kurallari (kod icinde dogrulanir)

- Yemek fiyat/urun toplu islemleri: maksimum 1000 kalem (`updatePricesChunked` otomatik boler).
- Market urun filtreleme: sayfa boyutu max 100; paket sorgulama max 200; magaza listesi max 50.
- Yemek paket sorgulamada sayfa boyutu 1–50, statuler virgulle birlestirilir.
- Ortalama teslimat suresi: min 15–85, max 20–90, 5'in kati ve max > min.
- Market poset sayisi en fazla 10.
- Tedarik problemi (621) icin `causedCancelPackageItemIds` veya `description` zorunlu.
- Musteri arama koprusunde telefon 10 hane, ulke kodsuz.
- Barkod: max 40 karakter, `? / & % + ^ ' * _` ve bosluk icermez.
- Toplu islem sonuclari TGO tarafinda ~4 saat saklanir; `batch_requests` tablosunda izlenir.

## Testler ve kalite

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Testler auth basliklari, sorgu/patika kodlama, retry ve hata haritalama, rate limiter,
yemek/market siparis normalizasyonu, modul dogrulamalari, webhook idempotency ve
webhook endpoint'inin kimlik dogrulamasini kapsar. Ag cagrilari mock'lanir; test
calistirmak icin TGO kimlik bilgisi gerekmez.

## Stage ortaminda dogrulama

1. `.env` icinde `TGO_ENVIRONMENT=STAGE` ayarlayin ve stage kimlik bilgilerini girin.
2. Cikis IP'nizin TGO tarafinda yetkilendirildigini dogrulayin.
3. `npx tsx scripts/stage-test-order.ts <storeId> <barkod>` ile test siparisi olusturun.
4. Webhook ucunuza gelen bildirimi `GET /api/logs/webhooks` ile dogrulayin.

## Ornek betikler

```bash
npx tsx scripts/fetch-meal-orders.ts 153 2
npx tsx scripts/update-grocery-stock.ts 991 8690000000001 24.90 50
npx tsx scripts/store-status.ts MEAL 153 CLOSE_FOR 45
npx tsx scripts/stage-test-order.ts 991 8690000000001
```

## Uretime alma notlari

- Webhook ucu HTTPS olmalidir; TLS sonlandirmasini reverse proxy (nginx) uzerinde yapin.
- `PANEL_API_KEY` ve webhook Basic Auth bilgilerini secret yoneticisinde tutun, `.env`'i
  repoya eklemeyin.
- Sunucu ve worker'i ayri process olarak calistirin (systemd/pm2/Docker); `SIGTERM` ile
  graceful shutdown desteklenir.
- `api_logs` ve `webhooks` tablolari icin retention/temizlik isi planlayin.
- Uretime gecmeden once `TGO_ENVIRONMENT=PROD` ve prod kimlik bilgilerini ayarlayin.

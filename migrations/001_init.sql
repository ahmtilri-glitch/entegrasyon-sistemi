-- Trendyol Go (Yemek & Market) Yonetim Paneli - baslangic semasi
-- MySQL 8.0+ / InnoDB / utf8mb4
-- Tum ifadeler tekrar calistirilabilir (idempotent) olacak sekilde yazilmistir.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------------
-- stores: TGO tarafindaki magaza/restoran (supplier + store) kayitlari
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS stores (
  id                   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  domain               ENUM('MEAL','GROCERY') NOT NULL,
  supplier_id          BIGINT NOT NULL,
  tgo_store_id         VARCHAR(64) NOT NULL,
  name                 VARCHAR(255) NULL,
  working_status       ENUM('OPEN','CLOSED','UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
  delivery_type        VARCHAR(32) NULL,
  latitude             DECIMAL(10,7) NULL,
  longitude            DECIMAL(10,7) NULL,
  min_delivery_minutes SMALLINT UNSIGNED NULL,
  max_delivery_minutes SMALLINT UNSIGNED NULL,
  working_hours        JSON NULL,
  raw_payload          JSON NULL,
  last_synced_at       DATETIME(3) NULL,
  created_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uk_stores_domain_supplier_store (domain, supplier_id, tgo_store_id),
  KEY idx_stores_supplier (supplier_id),
  KEY idx_stores_status (working_status),
  KEY idx_stores_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- categories: Yemek "section" ve Market kategori agaci
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  domain            ENUM('MEAL','GROCERY') NOT NULL,
  supplier_id       BIGINT NULL,
  store_id          BIGINT UNSIGNED NULL,
  tgo_category_id   VARCHAR(64) NOT NULL,
  parent_tgo_id     VARCHAR(64) NULL,
  name              VARCHAR(255) NOT NULL,
  status            ENUM('ACTIVE','PASSIVE') NOT NULL DEFAULT 'ACTIVE',
  is_leaf           TINYINT(1) NOT NULL DEFAULT 0,
  hierarchy_path    VARCHAR(512) NULL,
  position          INT NULL,
  seller_attributes JSON NULL,
  raw_payload       JSON NULL,
  created_at        DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at        DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uk_categories_domain_store_cat (domain, store_id, tgo_category_id),
  KEY idx_categories_tgo_id (tgo_category_id),
  KEY idx_categories_parent (parent_tgo_id),
  KEY idx_categories_status (status),
  KEY idx_categories_created_at (created_at),
  CONSTRAINT fk_categories_store FOREIGN KEY (store_id) REFERENCES stores (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- products: Yemek menu urunleri + Market katalog urunleri
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  domain           ENUM('MEAL','GROCERY') NOT NULL,
  supplier_id      BIGINT NOT NULL,
  store_id         BIGINT UNSIGNED NULL,
  category_id      BIGINT UNSIGNED NULL,
  tgo_product_id   VARCHAR(64) NULL,
  barcode          VARCHAR(64) NULL,
  stock_code       VARCHAR(100) NULL,
  name             VARCHAR(255) NOT NULL,
  description      TEXT NULL,
  brand_id         BIGINT NULL,
  brand_name       VARCHAR(255) NULL,
  vat_rate         DECIMAL(5,2) NULL,
  selling_price    DECIMAL(12,2) NULL,
  original_price   DECIMAL(12,2) NULL,
  quantity         INT NULL,
  status           ENUM('ACTIVE','PASSIVE') NOT NULL DEFAULT 'ACTIVE',
  on_sale          TINYINT(1) NOT NULL DEFAULT 1,
  sale_off_reason  VARCHAR(32) NULL,
  images           JSON NULL,
  attributes       JSON NULL,
  raw_payload      JSON NULL,
  last_synced_at   DATETIME(3) NULL,
  created_at       DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at       DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uk_products_domain_store_key (domain, store_id, tgo_product_id, barcode),
  KEY idx_products_barcode (barcode),
  KEY idx_products_tgo_product_id (tgo_product_id),
  KEY idx_products_status (status),
  KEY idx_products_supplier (supplier_id),
  KEY idx_products_created_at (created_at),
  CONSTRAINT fk_products_store FOREIGN KEY (store_id) REFERENCES stores (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- orders: Yemek + Market sipariş paketleri
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  domain                    ENUM('MEAL','GROCERY') NOT NULL,
  tgo_order_id              VARCHAR(64) NOT NULL COMMENT 'shipment package id (paket id)',
  tgo_order_number          VARCHAR(64) NULL,
  tgo_order_internal_id     VARCHAR(64) NULL COMMENT 'orderId alani',
  supplier_id               BIGINT NOT NULL,
  store_id                  BIGINT UNSIGNED NULL,
  tgo_store_id              VARCHAR(64) NULL,
  status                    VARCHAR(32) NOT NULL,
  previous_status           VARCHAR(32) NULL,
  delivery_model            VARCHAR(32) NULL,
  delivery_type             VARCHAR(32) NULL,
  schedule_type             VARCHAR(32) NULL,
  time_slot_id              VARCHAR(64) NULL,
  zone_id                   VARCHAR(64) NULL,
  is_store_pickup           TINYINT(1) NOT NULL DEFAULT 0,
  customer_id               VARCHAR(64) NULL,
  customer_first_name       VARCHAR(128) NULL,
  customer_last_name        VARCHAR(128) NULL,
  customer_email            VARCHAR(255) NULL,
  customer_phone            VARCHAR(64) NULL,
  customer_note             TEXT NULL,
  shipment_address          JSON NULL,
  invoice_address           JSON NULL,
  currency_code             VARCHAR(8) NOT NULL DEFAULT 'TRY',
  gross_amount              DECIMAL(12,2) NULL,
  total_discount            DECIMAL(12,2) NULL,
  total_price               DECIMAL(12,2) NULL,
  total_cargo               DECIMAL(12,2) NULL,
  seller_invoice_amount     DECIMAL(12,2) NULL,
  invoice_tax_amount        DECIMAL(12,2) NULL,
  payment_type              VARCHAR(64) NULL,
  coupons                   JSON NULL,
  promotions                JSON NULL,
  cancel_info               JSON NULL,
  eta_text                  VARCHAR(64) NULL,
  estimated_delivery_start  DATETIME(3) NULL,
  estimated_delivery_end    DATETIME(3) NULL,
  order_date                DATETIME(3) NULL,
  last_modified_date        DATETIME(3) NULL,
  seller_accepted           TINYINT(1) NOT NULL DEFAULT 0,
  seller_accepted_at        DATETIME(3) NULL,
  is_courier_nearby         TINYINT(1) NOT NULL DEFAULT 0,
  receipt_link              VARCHAR(512) NULL,
  invoice_link              VARCHAR(512) NULL,
  source                    ENUM('POLLING','WEBHOOK','MANUAL') NOT NULL DEFAULT 'POLLING',
  raw_payload               JSON NULL,
  created_at                DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at                DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uk_orders_domain_tgo_order_id (domain, tgo_order_id),
  KEY idx_orders_tgo_order_id (tgo_order_id),
  KEY idx_orders_order_number (tgo_order_number),
  KEY idx_orders_status (status),
  KEY idx_orders_created_at (created_at),
  KEY idx_orders_order_date (order_date),
  KEY idx_orders_store_status (store_id, status),
  KEY idx_orders_supplier_status_created (supplier_id, status, created_at),
  CONSTRAINT fk_orders_store FOREIGN KEY (store_id) REFERENCES stores (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- order_items: sipariş kalemleri (Yemek: modifier/opsiyon, Market: item bazli)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id                    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id              BIGINT UNSIGNED NOT NULL,
  product_id            BIGINT UNSIGNED NULL,
  tgo_line_id           VARCHAR(64) NULL,
  tgo_item_id           VARCHAR(64) NULL,
  package_item_id       VARCHAR(64) NULL,
  tgo_product_id        VARCHAR(64) NULL,
  barcode               VARCHAR(64) NULL,
  name                  VARCHAR(255) NULL,
  product_sale_name     VARCHAR(255) NULL,
  brand_name            VARCHAR(255) NULL,
  quantity              INT NOT NULL DEFAULT 1,
  unit_price            DECIMAL(12,2) NULL,
  amount                DECIMAL(12,2) NULL,
  discount              DECIMAL(12,2) NULL,
  vat_base_amount       DECIMAL(12,2) NULL,
  sale_unit_value       VARCHAR(32) NULL,
  sale_unit_type        VARCHAR(32) NULL,
  is_cancelled          TINYINT(1) NOT NULL DEFAULT 0,
  is_collected          TINYINT(1) NOT NULL DEFAULT 0,
  is_alternative        TINYINT(1) NOT NULL DEFAULT 0,
  modifiers             JSON NULL COMMENT 'Yemek: modifierProducts / ingredientOptions',
  removed_ingredients   JSON NULL,
  extra_ingredients     JSON NULL,
  coupons               JSON NULL,
  promotions            JSON NULL,
  note                  TEXT NULL,
  raw_payload           JSON NULL,
  created_at            DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at            DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uk_order_items_order_item (order_id, tgo_item_id, package_item_id),
  KEY idx_order_items_order (order_id),
  KEY idx_order_items_barcode (barcode),
  KEY idx_order_items_package_item (package_item_id),
  KEY idx_order_items_created_at (created_at),
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- api_logs: giden tum TGO istekleri
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS api_logs (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  domain            ENUM('MEAL','GROCERY','COMMON') NOT NULL DEFAULT 'COMMON',
  operation         VARCHAR(128) NOT NULL,
  method            VARCHAR(10) NOT NULL,
  url               VARCHAR(1024) NOT NULL,
  request_headers   JSON NULL COMMENT 'Authorization gibi hassas basliklar maskelenir',
  request_body      JSON NULL,
  status_code       SMALLINT UNSIGNED NULL,
  response_body     MEDIUMTEXT NULL,
  error_message     TEXT NULL,
  attempt           TINYINT UNSIGNED NOT NULL DEFAULT 1,
  duration_ms       INT UNSIGNED NULL,
  success           TINYINT(1) NOT NULL DEFAULT 0,
  correlation_id    VARCHAR(64) NULL,
  created_at        DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  KEY idx_api_logs_operation (operation),
  KEY idx_api_logs_status (status_code),
  KEY idx_api_logs_created_at (created_at),
  KEY idx_api_logs_correlation (correlation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- webhooks: TGO'dan gelen webhook bildirimleri (idempotency: tgo_order_id + status)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS webhooks (
  id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  domain           ENUM('MEAL','GROCERY') NOT NULL,
  event_type       VARCHAR(64) NOT NULL COMMENT 'packageStatus: Created/Cancelled/Delivered/UnSupplied',
  tgo_order_id     VARCHAR(64) NULL,
  tgo_order_number VARCHAR(64) NULL,
  supplier_id      BIGINT NULL,
  tgo_store_id     VARCHAR(64) NULL,
  idempotency_key  VARCHAR(160) NOT NULL,
  headers          JSON NULL,
  payload          JSON NOT NULL,
  remote_ip        VARCHAR(64) NULL,
  status           ENUM('RECEIVED','PROCESSED','DUPLICATE','FAILED') NOT NULL DEFAULT 'RECEIVED',
  duplicate_count  INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Ayni idempotency anahtariyla gelen tekrar sayisi',
  process_error    TEXT NULL,
  processed_at     DATETIME(3) NULL,
  created_at       DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at       DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uk_webhooks_idempotency (idempotency_key),
  KEY idx_webhooks_tgo_order_id (tgo_order_id),
  KEY idx_webhooks_status (status),
  KEY idx_webhooks_event_type (event_type),
  KEY idx_webhooks_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- batch_requests: TGO toplu islem (batchRequestId) takibi
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS batch_requests (
  id                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  domain             ENUM('MEAL','GROCERY') NOT NULL,
  batch_request_id   VARCHAR(128) NOT NULL,
  batch_request_type VARCHAR(64) NULL,
  supplier_id        BIGINT NOT NULL,
  store_id           BIGINT UNSIGNED NULL,
  operation          VARCHAR(128) NOT NULL,
  status             VARCHAR(32) NOT NULL DEFAULT 'PENDING',
  item_count         INT NULL,
  failed_item_count  INT NULL,
  request_payload    JSON NULL,
  result_payload     JSON NULL,
  last_checked_at    DATETIME(3) NULL,
  created_at         DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at         DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uk_batch_requests_id (domain, batch_request_id),
  KEY idx_batch_requests_status (status),
  KEY idx_batch_requests_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- claims: iade kayitlari
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS claims (
  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  domain         ENUM('MEAL','GROCERY') NOT NULL,
  tgo_claim_id   VARCHAR(64) NOT NULL,
  supplier_id    BIGINT NOT NULL,
  order_id       BIGINT UNSIGNED NULL,
  tgo_order_id   VARCHAR(64) NULL,
  status         VARCHAR(32) NOT NULL DEFAULT 'CREATED',
  reason_id      INT NULL,
  description    TEXT NULL,
  claim_items    JSON NULL,
  raw_payload    JSON NULL,
  created_at     DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at     DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uk_claims_domain_claim (domain, tgo_claim_id),
  KEY idx_claims_status (status),
  KEY idx_claims_created_at (created_at),
  CONSTRAINT fk_claims_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- sync_state: polling worker'in son calisma noktalari
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sync_state (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  sync_key          VARCHAR(160) NOT NULL,
  last_run_at       DATETIME(3) NULL,
  last_cursor_value BIGINT NULL,
  last_error        TEXT NULL,
  created_at        DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at        DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uk_sync_state_key (sync_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

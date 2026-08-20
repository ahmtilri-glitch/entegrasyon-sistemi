/** Testler icin sabit ortam degiskenleri; gercek kimlik bilgisi kullanilmaz. */
process.env.TGO_ENVIRONMENT = 'STAGE';
process.env.TGO_SUPPLIER_ID = '107385';
process.env.TGO_API_KEY = 'test-api-key';
process.env.TGO_API_SECRET = 'test-api-secret';
process.env.TGO_INTEGRATOR_NAME = 'TestEntegrator';
process.env.TGO_EXECUTOR_USER = 'entegrasyon@example.com';
process.env.DB_USER = 'test';
process.env.DB_NAME = 'tgo_panel_test';
process.env.WEBHOOK_BASIC_USER = 'webhook-user';
process.env.WEBHOOK_BASIC_PASSWORD = 'webhook-pass';
process.env.PANEL_API_KEY = 'panel-key';
process.env.POLL_ENABLED = 'false';

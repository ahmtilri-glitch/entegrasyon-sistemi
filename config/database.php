<?php
/**
 * Veritabanı Yapılandırması
 * 
 * MySQL/MariaDB bağlantı ayarları burada tanımlanır.
 * Kurulum sırasında bu dosyadaki değerleri kendi sunucunuza göre güncelleyin.
 */

if (!defined('EP_ROOT')) {
    die('Doğrudan erişim yasak.');
}

// Veritabanı bağlantı bilgileri
define('DB_HOST',     'localhost');
define('DB_NAME',     'entegrasyon_pro');
define('DB_USER',     'root');
define('DB_PASS',     '');
define('DB_CHARSET',  'utf8mb4');
define('DB_PREFIX',   'ep_');

// PDO bağlantısı
function ep_db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        } catch (PDOException $e) {
            // Geliştirme ortamında hata göster, üretimde logla
            if (EP_DEBUG) {
                die('Veritabanı bağlantı hatası: ' . $e->getMessage());
            }
            error_log('EP DB Error: ' . $e->getMessage());
            die('Veritabanı bağlantı hatası. Lütfen yöneticiyle iletişime geçin.');
        }
    }
    return $pdo;
}

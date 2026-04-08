<?php
/**
 * Uygulama Genel Yapılandırması
 * 
 * Tüm sabitler ve genel ayarlar burada tanımlanır.
 */

if (!defined('EP_ROOT')) {
    die('Doğrudan erişim yasak.');
}

// Uygulama bilgileri
define('EP_APP_NAME',    'Entegrasyon Pro');
define('EP_APP_VERSION', '4.0.0');
define('EP_APP_URL',     'https://entegrasyonpro.com');
define('EP_DEBUG',       true);

// Zaman dilimi
date_default_timezone_set('Europe/Istanbul');

// Oturum başlat
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Veritabanı yapılandırmasını yükle
require_once EP_ROOT . '/config/database.php';

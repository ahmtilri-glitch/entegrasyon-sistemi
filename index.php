<?php
/**
 * Entegrasyon Pro — Ana Giriş Noktası (Router)
 * 
 * Tüm sayfa istekleri bu dosya üzerinden yönlendirilir.
 * Her modül kendi PHP dosyasında tutulur.
 */

define('EP_ROOT', __DIR__);
require_once EP_ROOT . '/config/app.php';

// Sayfa yönlendirme
$page = isset($_GET['page']) ? basename($_GET['page']) : 'dashboard';

// İzin verilen sayfalar — her biri ayrı bir PHP dosyası
$allowed_pages = [
    'dashboard'              => 'pages/dashboard.php',
    'urunler'                => 'pages/urunler.php',
    'kategoriler'            => 'pages/kategoriler.php',
    'markalar'               => 'pages/markalar.php',
    'nitelikler'             => 'pages/nitelikler.php',
    'ozellikler'             => 'pages/ozellikler.php',
    'urun-ayarlari'          => 'pages/urun-ayarlari.php',
    'xml-feed'               => 'pages/xml-feed.php',
    'pazaryerleri'           => 'pages/pazaryerleri.php',
    'siparisler'             => 'pages/siparisler.php',
    'eslestirme'             => 'pages/eslestirme.php',
    'toplu-islemler'         => 'pages/toplu-islemler.php',
    'kargo'                  => 'pages/kargo.php',
    'fatura'                 => 'pages/fatura.php',
    'erp'                    => 'pages/erp.php',
    'seo'                    => 'pages/seo.php',
    'musteriler'             => 'pages/musteriler.php',
    'muhasebe'               => 'pages/muhasebe.php',
    'raporlar'               => 'pages/raporlar.php',
    'sms'                    => 'pages/sms.php',
    'sanal-pos'              => 'pages/sanal-pos.php',
    'destek'                 => 'pages/destek.php',
    'loglar'                 => 'pages/loglar.php',
    'ayarlar'                => 'pages/ayarlar.php',
];

// Sayfa var mı kontrol et
if (!array_key_exists($page, $allowed_pages)) {
    $page = 'dashboard';
}

$current_page = $page;
$page_file = EP_ROOT . '/' . $allowed_pages[$page];

// Sayfa başlıkları
$page_titles = [
    'dashboard'     => 'Dashboard',
    'urunler'       => 'Ürünler',
    'kategoriler'   => 'Kategoriler',
    'markalar'      => 'Markalar',
    'nitelikler'    => 'Nitelikler',
    'ozellikler'    => 'Özellikler',
    'urun-ayarlari' => 'Ürün Ayarları',
    'xml-feed'      => 'XML Feed Yönetimi',
    'pazaryerleri'  => 'Pazaryeri Entegrasyonları',
    'siparisler'    => 'Siparişler',
    'eslestirme'    => 'Eşleştirme',
    'toplu-islemler'=> 'Toplu İşlemler',
    'kargo'         => 'Kargo Entegrasyonları',
    'fatura'        => 'Fatura & e-Fatura',
    'erp'           => 'ERP Entegrasyonları',
    'seo'           => 'SEO Yönetimi',
    'musteriler'    => 'Müşteriler',
    'muhasebe'      => 'Ön Muhasebe',
    'raporlar'      => 'Raporlar',
    'sms'           => 'SMS Entegrasyonları',
    'sanal-pos'     => 'Sanal POS',
    'destek'        => 'Destek',
    'loglar'        => 'Loglar',
    'ayarlar'       => 'Ayarlar',
];

$page_title = $page_titles[$page] ?? 'Entegrasyon Pro';

// Layout yükle
require_once EP_ROOT . '/includes/header.php';
require_once EP_ROOT . '/includes/sidebar.php';

// İçerik alanı
echo '<main class="ep-main-content">';

if (file_exists($page_file)) {
    require_once $page_file;
} else {
    echo '<div class="ep-card"><div class="ep-card-body"><p>Bu modül henüz geliştirme aşamasındadır.</p></div></div>';
}

echo '</main>';

require_once EP_ROOT . '/includes/footer.php';

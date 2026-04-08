<?php
/**
 * Sidebar — Sol menü navigasyonu
 * 
 * Her menü öğesi ilgili sayfaya yönlendirir.
 * Aktif sayfa otomatik olarak vurgulanır.
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');

$menu_items = [
    ['group' => 'ANA MENÜ'],
    ['page' => 'dashboard',     'icon' => 'bi-speedometer2',     'label' => 'Dashboard'],
    
    ['group' => 'KATALOG'],
    ['page' => 'urunler',       'icon' => 'bi-box-seam',         'label' => 'Ürünler'],
    ['page' => 'kategoriler',   'icon' => 'bi-folder2-open',     'label' => 'Kategoriler'],
    ['page' => 'markalar',      'icon' => 'bi-tags',             'label' => 'Markalar'],
    ['page' => 'nitelikler',    'icon' => 'bi-sliders',          'label' => 'Nitelikler'],
    ['page' => 'ozellikler',    'icon' => 'bi-list-check',       'label' => 'Özellikler'],
    ['page' => 'urun-ayarlari', 'icon' => 'bi-gear',             'label' => 'Ürün Ayarları'],
    
    ['group' => 'XML & VERİ'],
    ['page' => 'xml-feed',      'icon' => 'bi-filetype-xml',     'label' => 'XML Feed'],
    
    ['group' => 'SATIŞ'],
    ['page' => 'pazaryerleri',  'icon' => 'bi-shop',             'label' => 'Pazaryerleri'],
    ['page' => 'siparisler',    'icon' => 'bi-cart-check',       'label' => 'Siparişler'],
    ['page' => 'eslestirme',    'icon' => 'bi-link-45deg',       'label' => 'Eşleştirme'],
    ['page' => 'toplu-islemler','icon' => 'bi-collection',       'label' => 'Toplu İşlemler'],
    
    ['group' => 'OPERASYON'],
    ['page' => 'kargo',         'icon' => 'bi-truck',            'label' => 'Kargo'],
    ['page' => 'fatura',        'icon' => 'bi-receipt',          'label' => 'Fatura & e-Fatura'],
    ['page' => 'erp',           'icon' => 'bi-diagram-3',        'label' => 'ERP'],
    ['page' => 'sanal-pos',     'icon' => 'bi-credit-card',      'label' => 'Sanal POS'],
    ['page' => 'sms',           'icon' => 'bi-chat-dots',        'label' => 'SMS'],
    
    ['group' => 'PAZARLAMA'],
    ['page' => 'seo',           'icon' => 'bi-search-heart',     'label' => 'SEO'],
    
    ['group' => 'SATIŞ YÖNETİMİ'],
    ['page' => 'entegrasyon-satis', 'icon' => 'bi-box-seam',    'label' => 'Entegrasyon Satış'],
    ['page' => 'musteri-paneli',    'icon' => 'bi-person-workspace', 'label' => 'Müşteri Paneli'],
    
    ['group' => 'YÖNETİM'],
    ['page' => 'musteriler',    'icon' => 'bi-people',           'label' => 'Müşteriler'],
    ['page' => 'muhasebe',      'icon' => 'bi-calculator',       'label' => 'Ön Muhasebe'],
    ['page' => 'raporlar',      'icon' => 'bi-bar-chart-line',   'label' => 'Raporlar'],
    ['page' => 'destek',        'icon' => 'bi-headset',          'label' => 'Destek'],
    ['page' => 'loglar',        'icon' => 'bi-journal-text',     'label' => 'Loglar'],
    ['page' => 'ayarlar',       'icon' => 'bi-gear-wide-connected','label' => 'Ayarlar'],
];
?>

<aside class="ep-sidebar" id="epSidebar">
    <nav class="ep-sidebar-nav">
        <?php foreach ($menu_items as $item): ?>
            <?php if (isset($item['group'])): ?>
                <div class="ep-sidebar-group"><?= $item['group'] ?></div>
            <?php else: ?>
                <a href="index.php?page=<?= $item['page'] ?>" 
                   class="ep-sidebar-link <?= ($current_page === $item['page']) ? 'active' : '' ?>">
                    <i class="bi <?= $item['icon'] ?>"></i>
                    <span><?= $item['label'] ?></span>
                </a>
            <?php endif; ?>
        <?php endforeach; ?>
    </nav>
</aside>

<?php
/**
 * Sanal POS — Ödeme sistemleri entegrasyonu
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');

$pos_systems = [
    ['name' => 'iyzico',       'logo' => 'assets/images/pos/iyzico.svg'],
    ['name' => 'PayTR',        'logo' => 'assets/images/pos/paytr.svg'],
    ['name' => 'Param',        'logo' => 'assets/images/pos/param.svg'],
    ['name' => 'Sipay',        'logo' => 'assets/images/pos/sipay.svg'],
    ['name' => 'Moka',         'logo' => 'assets/images/pos/moka.svg'],
    ['name' => 'Shopier',      'logo' => 'assets/images/pos/shopier.svg'],
    ['name' => 'Paratika',     'logo' => 'assets/images/pos/paratika.svg'],
    ['name' => 'PayU',         'logo' => 'assets/images/pos/payu.svg'],
    ['name' => 'Garanti BBVA', 'logo' => 'assets/images/pos/garanti.svg'],
    ['name' => 'Yapı Kredi',   'logo' => 'assets/images/pos/yapikredi.svg'],
    ['name' => 'İş Bankası',   'logo' => 'assets/images/pos/isbankasi.svg'],
    ['name' => 'Akbank',       'logo' => 'assets/images/pos/akbank.svg'],
    ['name' => 'QNB Finansbank','logo'=> 'assets/images/pos/qnb.svg'],
    ['name' => 'Halkbank',     'logo' => 'assets/images/pos/halkbank.svg'],
];
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-credit-card"></i> Sanal POS & Ödeme</h1>
    <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-plus-lg"></i> Yeni POS Ekle</button>
</div>

<div class="ep-stat-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Aktif POS</h4><div class="ep-stat-value">3</div></div>
        <div class="ep-stat-icon green"><i class="bi bi-credit-card"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Bugün İşlem</h4><div class="ep-stat-value">47</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-receipt"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Bugün Ciro</h4><div class="ep-stat-value" style="color:var(--ep-success);">₺34.2K</div></div>
        <div class="ep-stat-icon orange"><i class="bi bi-currency-exchange"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Başarı Oranı</h4><div class="ep-stat-value" style="color:var(--ep-success);">%97.8</div></div>
        <div class="ep-stat-icon teal"><i class="bi bi-check-circle"></i></div>
    </div>
</div>

<div class="ep-provider-grid">
    <?php foreach ($pos_systems as $ps): ?>
    <div class="ep-provider-card">
        <div class="ep-provider-card-top">
            <img src="<?= $ps['logo'] ?>" alt="<?= $ps['name'] ?>" class="ep-provider-logo">
            <div class="ep-provider-card-info">
                <h4><?= $ps['name'] ?></h4>
                <span><span class="ep-badge ep-badge-secondary" style="font-size:10px;">Pasif</span></span>
            </div>
        </div>
        <div class="ep-provider-actions">
            <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-gear"></i> Ayarlar</button>
        </div>
    </div>
    <?php endforeach; ?>
</div>

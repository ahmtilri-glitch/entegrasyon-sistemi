<?php
/**
 * Sanal POS — Ödeme sistemleri entegrasyonu
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');

$pos_systems = [
    ['name' => 'iyzico',       'color' => '#2563eb'],
    ['name' => 'PayTR',        'color' => '#16a34a'],
    ['name' => 'Param',        'color' => '#ea580c'],
    ['name' => 'Sipay',        'color' => '#7c3aed'],
    ['name' => 'Moka',         'color' => '#0d9488'],
    ['name' => 'Shopier',      'color' => '#dc2626'],
    ['name' => 'Paratika',     'color' => '#eab308'],
    ['name' => 'PayU',         'color' => '#16a34a'],
    ['name' => 'Garanti BBVA', 'color' => '#059669'],
    ['name' => 'Yapı Kredi',   'color' => '#2563eb'],
    ['name' => 'İş Bankası',   'color' => '#7c3aed'],
    ['name' => 'Akbank',       'color' => '#dc2626'],
    ['name' => 'QNB Finansbank','color'=> '#7c3aed'],
    ['name' => 'Halkbank',     'color' => '#0d9488'],
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
            <div class="ep-provider-icon" style="background:<?= $ps['color'] ?>;">
                <i class="bi bi-credit-card" style="font-size:18px;"></i>
            </div>
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

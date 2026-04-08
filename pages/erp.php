<?php
/**
 * ERP — ERP sistem entegrasyonları
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');

$erp_systems = [
    ['name' => 'SAP Business One', 'logo' => 'assets/images/erp/sap.svg'],
    ['name' => 'Logo Tiger',       'logo' => 'assets/images/erp/logo-tiger.svg'],
    ['name' => 'Mikro Yazılım',    'logo' => 'assets/images/erp/mikro.svg'],
    ['name' => 'Netsis',           'logo' => 'assets/images/erp/netsis.svg'],
    ['name' => 'Nebim V3',         'logo' => 'assets/images/erp/nebim.svg'],
    ['name' => 'Dia Yazılım',      'logo' => 'assets/images/erp/dia.svg'],
    ['name' => 'Akinon',           'logo' => 'assets/images/erp/akinon.svg'],
    ['name' => 'Paraşüt',          'logo' => 'assets/images/erp/parasut.svg'],
    ['name' => 'Bizim Hesap',      'logo' => 'assets/images/erp/bizim-hesap.svg'],
    ['name' => 'Luca',             'logo' => 'assets/images/erp/luca.svg'],
    ['name' => 'Uyumsoft ERP',     'logo' => 'assets/images/erp/uyumsoft.svg'],
];
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-diagram-3"></i> ERP Entegrasyonları</h1>
</div>

<div class="ep-ai-suggestion-card info" style="margin-bottom: 24px;">
    <div class="ep-ai-suggestion-icon"><i class="bi bi-stars"></i></div>
    <div class="ep-ai-suggestion-content">
        <strong>AI Veri Senkronizasyonu</strong>
        <p>ERP sisteminiz ile otomatik veri senkronizasyonu yapın. Stok, fiyat ve sipariş verileri anlık güncellenir.</p>
    </div>
</div>

<div class="ep-provider-grid">
    <?php foreach ($erp_systems as $erp): ?>
    <div class="ep-provider-card">
        <div class="ep-provider-card-top">
            <img src="<?= $erp['logo'] ?>" alt="<?= $erp['name'] ?>" class="ep-provider-logo">
            <div class="ep-provider-card-info">
                <h4><?= $erp['name'] ?></h4>
                <span><span class="ep-badge ep-badge-secondary" style="font-size:10px;">Pasif</span></span>
            </div>
        </div>
        <div class="ep-provider-actions">
            <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-gear"></i> Ayarlar</button>
        </div>
    </div>
    <?php endforeach; ?>
</div>

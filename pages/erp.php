<?php
/**
 * ERP — ERP sistem entegrasyonları
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');

$erp_systems = [
    ['name' => 'SAP Business One', 'color' => '#0d9488'],
    ['name' => 'Logo Tiger',       'color' => '#dc2626'],
    ['name' => 'Mikro Yazılım',    'color' => '#2563eb'],
    ['name' => 'Netsis',           'color' => '#7c3aed'],
    ['name' => 'Nebim V3',         'color' => '#ea580c'],
    ['name' => 'Dia Yazılım',      'color' => '#16a34a'],
    ['name' => 'Akinon',           'color' => '#f97316'],
    ['name' => 'Paraşüt',          'color' => '#0d9488'],
    ['name' => 'Bizim Hesap',      'color' => '#eab308'],
    ['name' => 'Luca',             'color' => '#dc2626'],
    ['name' => 'Uyumsoft ERP',     'color' => '#7c3aed'],
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
            <div class="ep-provider-icon" style="background: <?= $erp['color'] ?>;">
                <i class="bi bi-diagram-3" style="font-size:18px;"></i>
            </div>
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

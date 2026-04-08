<?php
/**
 * Kargo — Kargo entegrasyonları ve gönderi yönetimi
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');

$kargo_firms = [
    ['name' => 'Yurtiçi Kargo',    'logo' => 'assets/images/kargo/yurtici.svg',          'status' => 'active',  'shipments' => 156],
    ['name' => 'Aras Kargo',       'logo' => 'assets/images/kargo/aras.svg',             'status' => 'setup',   'shipments' => 0],
    ['name' => 'MNG Kargo',        'logo' => 'assets/images/kargo/mng.svg',              'status' => 'active',  'shipments' => 89],
    ['name' => 'Sürat Kargo',      'logo' => 'assets/images/kargo/surat.svg',            'status' => 'passive', 'shipments' => 0],
    ['name' => 'HepsiJet',        'logo' => 'assets/images/kargo/hepsijet.svg',          'status' => 'active',  'shipments' => 67],
    ['name' => 'Trendyol Express', 'logo' => 'assets/images/kargo/trendyol-express.svg', 'status' => 'active',  'shipments' => 30],
    ['name' => 'Sendeo',          'logo' => 'assets/images/kargo/sendeo.svg',            'status' => 'passive', 'shipments' => 0],
    ['name' => 'PTT Kargo',       'logo' => 'assets/images/kargo/ptt.svg',               'status' => 'passive', 'shipments' => 0],
];
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-truck"></i> Kargo Yönetimi</h1>
    <div class="d-flex gap-2">
        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-arrow-repeat"></i> Takip Güncelle</button>
        <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-plus-lg"></i> Toplu Kargo Oluştur</button>
    </div>
</div>

<div class="ep-ai-suggestion-card info" style="margin-bottom: 24px;">
    <div class="ep-ai-suggestion-icon"><i class="bi bi-stars"></i></div>
    <div class="ep-ai-suggestion-content">
        <strong>AI Kargo Optimizasyonu</strong>
        <p>En uygun kargo firmasını otomatik seçin. Boyut, ağırlık ve bölgeye göre en ucuz seçenek önerilir.</p>
    </div>
    <button class="ep-btn ep-btn-sm ep-btn-info"><i class="bi bi-stars"></i> Optimize Et</button>
</div>

<div class="ep-stat-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Aktif Firma</h4><div class="ep-stat-value">4</div></div>
        <div class="ep-stat-icon green"><i class="bi bi-truck"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Kargoda</h4><div class="ep-stat-value">342</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-box-seam"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Bugün Gönderilen</h4><div class="ep-stat-value">28</div></div>
        <div class="ep-stat-icon orange"><i class="bi bi-send"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Teslim Edildi</h4><div class="ep-stat-value">1,892</div></div>
        <div class="ep-stat-icon teal"><i class="bi bi-check-circle"></i></div>
    </div>
</div>

<div class="ep-provider-grid">
    <?php foreach ($kargo_firms as $kf): ?>
    <div class="ep-provider-card">
        <div class="ep-provider-card-top">
            <img src="<?= $kf['logo'] ?>" alt="<?= $kf['name'] ?>" class="ep-provider-logo">
            <div class="ep-provider-card-info">
                <h4><?= $kf['name'] ?></h4>
                <span>
                    <?php if ($kf['status'] === 'active'): ?>
                        <span class="ep-badge ep-badge-success" style="font-size:10px;">Aktif</span> — <?= $kf['shipments'] ?> gönderi
                    <?php elseif ($kf['status'] === 'setup'): ?>
                        <span class="ep-badge ep-badge-warning" style="font-size:10px;">Ayar Eksik</span>
                    <?php else: ?>
                        <span class="ep-badge ep-badge-secondary" style="font-size:10px;">Pasif</span>
                    <?php endif; ?>
                </span>
            </div>
        </div>
        <div class="ep-provider-actions">
            <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-gear"></i> Ayarlar</button>
            <?php if ($kf['status'] === 'active'): ?>
            <button class="ep-btn ep-btn-sm ep-btn-secondary"><i class="bi bi-clipboard-check"></i> Test</button>
            <?php endif; ?>
        </div>
    </div>
    <?php endforeach; ?>
</div>

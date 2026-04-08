<?php
/**
 * Pazaryerleri — Entegrasyon yönetimi (33 pazaryeri)
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');

$marketplaces = [
    ['name' => 'Trendyol',     'logo' => 'assets/images/marketplaces/trendyol.svg',     'status' => 'active',  'products' => '12,450', 'orders' => '437'],
    ['name' => 'Hepsiburada',  'logo' => 'assets/images/marketplaces/hepsiburada.svg',  'status' => 'active',  'products' => '8,720',  'orders' => '312'],
    ['name' => 'N11',          'logo' => 'assets/images/marketplaces/n11.svg',           'status' => 'error',   'products' => '5,340',  'orders' => '187'],
    ['name' => 'Amazon TR',    'logo' => 'assets/images/marketplaces/amazon.svg',        'status' => 'error',   'products' => '3,100',  'orders' => '98'],
    ['name' => 'Çiçeksepeti',  'logo' => 'assets/images/marketplaces/ciceksepeti.svg',   'status' => 'active',  'products' => '3,210',  'orders' => '98'],
    ['name' => 'İdefix',       'logo' => 'assets/images/marketplaces/idefix.svg',        'status' => 'passive', 'products' => '0',      'orders' => '0'],
    ['name' => 'Koçtaş',       'logo' => 'assets/images/marketplaces/koctas.svg',        'status' => 'active',  'products' => '1,200',  'orders' => '45'],
    ['name' => 'Teknosa',      'logo' => 'assets/images/marketplaces/teknosa.svg',       'status' => 'passive', 'products' => '0',      'orders' => '0'],
    ['name' => 'MediaMarkt',   'logo' => 'assets/images/marketplaces/mediamarkt.svg',    'status' => 'active',  'products' => '2,100',  'orders' => '67'],
    ['name' => 'Pazarama',     'logo' => 'assets/images/marketplaces/pazarama.svg',      'status' => 'active',  'products' => '4,500',  'orders' => '120'],
    ['name' => 'PTT AVM',      'logo' => 'assets/images/marketplaces/pttavm.svg',        'status' => 'passive', 'products' => '0',      'orders' => '0'],
    ['name' => 'Temu',         'logo' => 'assets/images/marketplaces/temu.svg',          'status' => 'passive', 'products' => '0',      'orders' => '0'],
];
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-shop"></i> Pazaryerleri</h1>
    <div class="d-flex gap-2">
        <span class="ep-badge ep-badge-info" style="font-size:13px;padding:8px 16px;"><?= count($marketplaces) ?> / 33 Platform</span>
        <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-plus-lg"></i> Yeni Entegrasyon</button>
    </div>
</div>

<!-- AI Öneri -->
<div class="ep-ai-suggestion-card info" style="margin-bottom: 24px;">
    <div class="ep-ai-suggestion-icon"><i class="bi bi-stars"></i></div>
    <div class="ep-ai-suggestion-content">
        <strong>AI Pazaryeri Analizi</strong>
        <p>Ürünlerinize en uygun pazaryerlerini AI analiz eder. Hangi platformda daha çok satarsınız?</p>
    </div>
    <button class="ep-btn ep-btn-sm ep-btn-info"><i class="bi bi-stars"></i> Analiz Başlat</button>
</div>

<div class="ep-stat-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Aktif Platform</h4><div class="ep-stat-value" style="color:var(--ep-success);">7</div></div>
        <div class="ep-stat-icon green"><i class="bi bi-check-circle"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Hatalı</h4><div class="ep-stat-value" style="color:var(--ep-danger);">2</div></div>
        <div class="ep-stat-icon red"><i class="bi bi-exclamation-circle"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Toplam Sipariş</h4><div class="ep-stat-value">1,364</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-cart-check"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Listelenen Ürün</h4><div class="ep-stat-value">40,620</div></div>
        <div class="ep-stat-icon orange"><i class="bi bi-box-seam"></i></div>
    </div>
</div>

<div class="ep-provider-grid">
    <?php foreach ($marketplaces as $mp): ?>
    <div class="ep-provider-card">
        <div class="ep-provider-card-top">
            <img src="<?= $mp['logo'] ?>" alt="<?= $mp['name'] ?>" class="ep-provider-logo">
            <div class="ep-provider-card-info">
                <h4><?= $mp['name'] ?></h4>
                <span>
                    <?php if ($mp['status'] === 'active'): ?>
                        <span class="ep-badge ep-badge-success" style="font-size:10px;">Aktif</span>
                    <?php elseif ($mp['status'] === 'error'): ?>
                        <span class="ep-badge ep-badge-danger" style="font-size:10px;">Hata</span>
                    <?php else: ?>
                        <span class="ep-badge ep-badge-secondary" style="font-size:10px;">Pasif</span>
                    <?php endif; ?>
                </span>
            </div>
        </div>
        <div style="display:flex;gap:16px;font-size:12px;color:var(--ep-text-light);">
            <span><i class="bi bi-box-seam"></i> <?= $mp['products'] ?> ürün</span>
            <span><i class="bi bi-cart-check"></i> <?= $mp['orders'] ?> sipariş</span>
        </div>
        <div class="ep-provider-actions">
            <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-gear"></i> Ayarlar</button>
            <?php if ($mp['status'] !== 'passive'): ?>
            <button class="ep-btn ep-btn-sm ep-btn-secondary"><i class="bi bi-arrow-repeat"></i> Senkron</button>
            <?php endif; ?>
        </div>
    </div>
    <?php endforeach; ?>
</div>

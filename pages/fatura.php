<?php
/**
 * Fatura — e-Fatura entegrasyonları ve fatura yönetimi
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');

$fatura_providers = [
    ['name' => 'Hepsiburada e-Faturam', 'url' => 'hepsiburadaefaturam.com', 'logo' => 'assets/images/fatura/hepsiburada-efatura.svg', 'status' => 'active'],
    ['name' => 'EDM e-Fatura',          'url' => 'edm.com.tr',             'logo' => 'assets/images/fatura/edm.svg',                 'status' => 'passive'],
    ['name' => 'Foriba (Sovos)',        'url' => 'foriba.com',             'logo' => 'assets/images/fatura/foriba.svg',              'status' => 'passive'],
    ['name' => 'İnnova e-Fatura',       'url' => 'innova.com.tr',          'logo' => 'assets/images/fatura/innova.svg',              'status' => 'passive'],
    ['name' => 'Netsmart e-Fatura',     'url' => 'netsmart.com.tr',        'logo' => 'assets/images/fatura/netsmart.svg',            'status' => 'passive'],
    ['name' => 'Bimser e-Fatura',       'url' => 'bimser.net',             'logo' => 'assets/images/fatura/bimser.svg',              'status' => 'passive'],
    ['name' => 'Uyumsoft e-Fatura',     'url' => 'uyumsoft.com.tr',        'logo' => 'assets/images/fatura/uyumsoft.svg',            'status' => 'passive'],
    ['name' => 'Logo e-Fatura',         'url' => 'logo.com.tr',            'logo' => 'assets/images/fatura/logo.svg',                'status' => 'passive'],
    ['name' => 'Paraşüt e-Fatura',      'url' => 'parasut.com',            'logo' => 'assets/images/fatura/parasut.svg',             'status' => 'passive'],
    ['name' => 'GİB e-Arşiv Portal',    'url' => 'earsivportal.efatura.gov.tr', 'logo' => 'assets/images/fatura/gib.svg',             'status' => 'passive'],
    ['name' => 'Trendyol e-Fatura',     'url' => 'partner.trendyol.com',   'logo' => 'assets/images/fatura/trendyol-efatura.svg',    'status' => 'passive'],
];
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-receipt"></i> Fatura & e-Fatura</h1>
    <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-check-lg"></i> Firma Bilgilerini Kaydet</button>
</div>

<!-- Firma Bilgileri -->
<div class="ep-card" style="margin-bottom: 24px;">
    <div class="ep-card-header"><h3><i class="bi bi-building"></i> Firma Bilgileri (Faturada Gösterilir)</h3></div>
    <div class="ep-card-body">
        <div class="row g-3">
            <div class="col-md-4">
                <label class="form-label fw-bold">VKN (10 Hane)</label>
                <input type="text" class="form-control" placeholder="Vergi Kimlik No">
            </div>
            <div class="col-md-4">
                <label class="form-label fw-bold">Firma Unvanı</label>
                <input type="text" class="form-control" placeholder="Firma adı">
            </div>
            <div class="col-md-4">
                <label class="form-label fw-bold">Vergi Dairesi</label>
                <input type="text" class="form-control" placeholder="Vergi dairesi">
            </div>
            <div class="col-md-4">
                <label class="form-label fw-bold">Adres</label>
                <input type="text" class="form-control" placeholder="Firma adresi">
            </div>
            <div class="col-md-4">
                <label class="form-label fw-bold">Şehir</label>
                <input type="text" class="form-control" placeholder="Şehir">
            </div>
            <div class="col-md-4">
                <label class="form-label fw-bold">Telefon</label>
                <input type="text" class="form-control" placeholder="Telefon">
            </div>
            <div class="col-md-4">
                <label class="form-label fw-bold">Fatura Prefix (3 Harf)</label>
                <input type="text" class="form-control" placeholder="örn: EPR" maxlength="3">
            </div>
            <div class="col-md-4">
                <label class="form-label fw-bold">Varsayılan KDV %</label>
                <input type="number" class="form-control" value="20">
            </div>
            <div class="col-md-4">
                <label class="form-label fw-bold">Web Adresi</label>
                <input type="text" class="form-control" placeholder="https://...">
            </div>
        </div>
        <div class="d-flex gap-2 mt-3">
            <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-check-lg"></i> Firma Bilgilerini Kaydet</button>
            <div class="d-flex align-items-center gap-2">
                <input type="text" class="form-control form-control-sm" placeholder="Alıcı VKN girin (10 hane)" style="width:200px;">
                <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-search"></i> e-Fatura Mükellefi mi?</button>
            </div>
        </div>
    </div>
</div>

<!-- e-Fatura Sağlayıcıları -->
<h5 style="font-weight: 700; margin-bottom: 16px;"><i class="bi bi-receipt"></i> e-Fatura Sağlayıcıları</h5>
<div class="ep-provider-grid">
    <?php foreach ($fatura_providers as $fp): ?>
    <div class="ep-provider-card">
        <div class="ep-provider-card-top">
            <img src="<?= $fp['logo'] ?>" alt="<?= $fp['name'] ?>" class="ep-provider-logo">
            <div class="ep-provider-card-info">
                <h4><?= $fp['name'] ?></h4>
                <span><?= $fp['url'] ?> — 
                    <?php if ($fp['status'] === 'active'): ?>
                        <span class="ep-badge ep-badge-success" style="font-size:10px;">Aktif</span>
                    <?php else: ?>
                        <span class="ep-badge ep-badge-secondary" style="font-size:10px;">Pasif</span>
                    <?php endif; ?>
                </span>
            </div>
        </div>
        <div class="ep-provider-actions">
            <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-gear"></i> Ayarlar</button>
            <?php if ($fp['status'] === 'active'): ?>
            <button class="ep-btn ep-btn-sm ep-btn-secondary"><i class="bi bi-clipboard-check"></i> Test</button>
            <button class="ep-btn ep-btn-sm" style="background:#fff7ed;color:#ea580c;"><i class="bi bi-star"></i> Varsayılan</button>
            <?php endif; ?>
        </div>
    </div>
    <?php endforeach; ?>
</div>

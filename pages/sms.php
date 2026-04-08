<?php
/**
 * SMS — SMS entegrasyonları ve bildirim yönetimi
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');

$sms_providers = [
    ['name' => 'Netgsm',     'color' => '#2563eb'],
    ['name' => 'İletimerkezi','color' => '#ea580c'],
    ['name' => 'Mutlucell',  'color' => '#16a34a'],
    ['name' => 'JetSMS',     'color' => '#7c3aed'],
    ['name' => 'Turatel',    'color' => '#dc2626'],
];
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-chat-left-text"></i> SMS Yönetimi</h1>
    <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-send"></i> Toplu SMS Gönder</button>
</div>

<div class="ep-stat-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Bakiye</h4><div class="ep-stat-value">2,450</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-wallet2"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Gönderilen</h4><div class="ep-stat-value">12,890</div></div>
        <div class="ep-stat-icon green"><i class="bi bi-check-circle"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Başarısız</h4><div class="ep-stat-value" style="color:var(--ep-danger);">23</div></div>
        <div class="ep-stat-icon red"><i class="bi bi-x-circle"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Bu Ay</h4><div class="ep-stat-value">1,240</div></div>
        <div class="ep-stat-icon orange"><i class="bi bi-chat-left-text"></i></div>
    </div>
</div>

<div class="row g-4">
    <div class="col-md-6">
        <div class="ep-card">
            <div class="ep-card-header"><h3><i class="bi bi-gear"></i> SMS Sağlayıcı</h3></div>
            <div class="ep-card-body">
                <div class="ep-provider-grid" style="grid-template-columns:1fr;">
                    <?php foreach ($sms_providers as $sp): ?>
                    <div class="ep-provider-card" style="flex-direction:row;align-items:center;">
                        <div class="ep-provider-icon" style="background:<?= $sp['color'] ?>;width:36px;height:36px;">
                            <i class="bi bi-chat-left-text" style="font-size:14px;"></i>
                        </div>
                        <span style="flex:1;font-weight:600;"><?= $sp['name'] ?></span>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-gear"></i></button>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="ep-card">
            <div class="ep-card-header"><h3><i class="bi bi-bell"></i> Otomatik SMS Kuralları</h3></div>
            <div class="ep-card-body">
                <div class="mb-3 d-flex justify-content-between align-items-center p-3" style="background:#f8fafc;border-radius:8px;">
                    <div>
                        <strong>Sipariş Onayı</strong>
                        <div style="font-size:12px;color:var(--ep-text-light);">Yeni sipariş alındığında müşteriye</div>
                    </div>
                    <div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked></div>
                </div>
                <div class="mb-3 d-flex justify-content-between align-items-center p-3" style="background:#f8fafc;border-radius:8px;">
                    <div>
                        <strong>Kargo Bildirimi</strong>
                        <div style="font-size:12px;color:var(--ep-text-light);">Kargo gönderildiğinde takip numarası ile</div>
                    </div>
                    <div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked></div>
                </div>
                <div class="mb-3 d-flex justify-content-between align-items-center p-3" style="background:#f8fafc;border-radius:8px;">
                    <div>
                        <strong>Teslim Bildirimi</strong>
                        <div style="font-size:12px;color:var(--ep-text-light);">Kargo teslim edildiğinde müşteriye</div>
                    </div>
                    <div class="form-check form-switch"><input class="form-check-input" type="checkbox"></div>
                </div>
                <div class="d-flex justify-content-between align-items-center p-3" style="background:#f8fafc;border-radius:8px;">
                    <div>
                        <strong>Abonelik Hatırlatma</strong>
                        <div style="font-size:12px;color:var(--ep-text-light);">Abonelik bitmeden 7 gün önce</div>
                    </div>
                    <div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked></div>
                </div>
            </div>
        </div>
    </div>
</div>

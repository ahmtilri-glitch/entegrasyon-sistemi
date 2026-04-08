<?php
/**
 * Destek — Destek talepleri ve yardım merkezi
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-headset"></i> Destek Merkezi</h1>
    <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-plus-lg"></i> Yeni Talep</button>
</div>

<!-- AI Destek Asistanı -->
<div class="ep-ai-banner" style="margin-bottom: 24px;">
    <div class="ep-ai-banner-glow"></div>
    <div class="ep-ai-banner-content">
        <div class="ep-ai-banner-left">
            <div class="ep-ai-avatar"><i class="bi bi-headset"></i></div>
            <div>
                <h3>AI Destek Asistanı</h3>
                <p>Sorularınızı yapay zeka asistanımıza sorun. Anında cevap alın, gerekirse destek ekibine yönlendirilir.</p>
            </div>
        </div>
        <div class="ep-ai-banner-actions">
            <button class="ep-ai-suggest-btn"><i class="bi bi-book"></i> Bilgi Bankası</button>
            <button class="ep-ai-suggest-btn"><i class="bi bi-camera-video"></i> Video Eğitimler</button>
        </div>
    </div>
</div>

<div class="ep-stat-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Açık Talepler</h4><div class="ep-stat-value" style="color:var(--ep-warning);">12</div></div>
        <div class="ep-stat-icon yellow"><i class="bi bi-envelope-open"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Çözümlenen</h4><div class="ep-stat-value" style="color:var(--ep-success);">458</div></div>
        <div class="ep-stat-icon green"><i class="bi bi-check-circle"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Ort. Yanıt Süresi</h4><div class="ep-stat-value">2.4 sa</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-clock"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Memnuniyet</h4><div class="ep-stat-value" style="color:var(--ep-success);">%94</div></div>
        <div class="ep-stat-icon orange"><i class="bi bi-emoji-smile"></i></div>
    </div>
</div>

<div class="row g-4">
    <div class="col-md-4">
        <div class="ep-card" style="cursor:pointer;">
            <div class="ep-card-body text-center" style="padding:28px;">
                <i class="bi bi-book" style="font-size:36px;color:var(--ep-info);"></i>
                <h4 style="margin:12px 0 6px;font-weight:600;">Bilgi Bankası</h4>
                <p style="font-size:12px;color:var(--ep-text-light);">120+ makale ve rehber</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="ep-card" style="cursor:pointer;">
            <div class="ep-card-body text-center" style="padding:28px;">
                <i class="bi bi-camera-video" style="font-size:36px;color:var(--ep-accent);"></i>
                <h4 style="margin:12px 0 6px;font-weight:600;">Video Eğitimler</h4>
                <p style="font-size:12px;color:var(--ep-text-light);">45+ eğitim videosu</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="ep-card" style="cursor:pointer;">
            <div class="ep-card-body text-center" style="padding:28px;">
                <i class="bi bi-question-circle" style="font-size:36px;color:var(--ep-success);"></i>
                <h4 style="margin:12px 0 6px;font-weight:600;">SSS</h4>
                <p style="font-size:12px;color:var(--ep-text-light);">Sık sorulan sorular</p>
            </div>
        </div>
    </div>
</div>

<div class="ep-card">
    <div class="ep-card-header"><h3><i class="bi bi-list-ul"></i> Son Destek Talepleri</h3></div>
    <div class="ep-card-body" style="padding:0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>KONU</th>
                    <th>MÜŞTERİ</th>
                    <th>ÖNCELİK</th>
                    <th>DURUM</th>
                    <th>TARİH</th>
                    <th>İŞLEM</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1042</td>
                    <td><strong>Trendyol sipariş çekme hatası</strong></td>
                    <td>ABC Elektronik</td>
                    <td><span class="ep-badge ep-badge-danger">Acil</span></td>
                    <td><span class="ep-badge ep-badge-warning">Bekliyor</span></td>
                    <td style="font-size:12px;">08.04.2026 12:30</td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-eye"></i></button></td>
                </tr>
                <tr>
                    <td>1041</td>
                    <td><strong>XML feed import sorunu</strong></td>
                    <td>Tedarik Türkiye</td>
                    <td><span class="ep-badge ep-badge-warning">Orta</span></td>
                    <td><span class="ep-badge ep-badge-info">İşleniyor</span></td>
                    <td style="font-size:12px;">07.04.2026 18:20</td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-eye"></i></button></td>
                </tr>
                <tr>
                    <td>1040</td>
                    <td><strong>Fatura entegrasyonu ayarları</strong></td>
                    <td>XYZ Market</td>
                    <td><span class="ep-badge ep-badge-info">Düşük</span></td>
                    <td><span class="ep-badge ep-badge-success">Çözüldü</span></td>
                    <td style="font-size:12px;">06.04.2026 09:15</td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-eye"></i></button></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

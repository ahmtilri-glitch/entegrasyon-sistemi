<?php
/**
 * Raporlar — Detaylı raporlama ve analiz
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-bar-chart-line"></i> Raporlar</h1>
    <div class="d-flex gap-2">
        <select class="form-select form-select-sm" style="width:auto;">
            <option>Bu Ay</option>
            <option>Son 3 Ay</option>
            <option>Bu Yıl</option>
            <option>Tüm Zamanlar</option>
        </select>
        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-download"></i> PDF İndir</button>
    </div>
</div>

<div class="ep-ai-suggestion-card info" style="margin-bottom: 24px;">
    <div class="ep-ai-suggestion-icon"><i class="bi bi-stars"></i></div>
    <div class="ep-ai-suggestion-content">
        <strong>AI Rapor Asistanı</strong>
        <p>İstediğiniz raporu doğal dilde tanımlayın. "Son 3 ayın en çok satan 10 ürünü nedir?" gibi sorular sorun.</p>
    </div>
    <button class="ep-btn ep-btn-sm ep-btn-info"><i class="bi bi-stars"></i> AI Rapor Oluştur</button>
</div>

<div class="row g-4">
    <div class="col-md-4">
        <div class="ep-card" style="cursor:pointer;">
            <div class="ep-card-body text-center" style="padding:28px;">
                <i class="bi bi-graph-up" style="font-size:36px;color:var(--ep-success);"></i>
                <h4 style="margin:12px 0 6px;font-weight:600;">Satış Raporu</h4>
                <p style="font-size:12px;color:var(--ep-text-light);">Pazaryeri bazında satış analizleri</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="ep-card" style="cursor:pointer;">
            <div class="ep-card-body text-center" style="padding:28px;">
                <i class="bi bi-box-seam" style="font-size:36px;color:var(--ep-info);"></i>
                <h4 style="margin:12px 0 6px;font-weight:600;">Stok Raporu</h4>
                <p style="font-size:12px;color:var(--ep-text-light);">Stok durumu ve hareketleri</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="ep-card" style="cursor:pointer;">
            <div class="ep-card-body text-center" style="padding:28px;">
                <i class="bi bi-currency-exchange" style="font-size:36px;color:var(--ep-accent);"></i>
                <h4 style="margin:12px 0 6px;font-weight:600;">Kâr/Zarar Raporu</h4>
                <p style="font-size:12px;color:var(--ep-text-light);">Gelir-gider ve kârlılık analizi</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="ep-card" style="cursor:pointer;">
            <div class="ep-card-body text-center" style="padding:28px;">
                <i class="bi bi-truck" style="font-size:36px;color:var(--ep-warning);"></i>
                <h4 style="margin:12px 0 6px;font-weight:600;">Kargo Raporu</h4>
                <p style="font-size:12px;color:var(--ep-text-light);">Kargo performansı ve maliyetler</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="ep-card" style="cursor:pointer;">
            <div class="ep-card-body text-center" style="padding:28px;">
                <i class="bi bi-people" style="font-size:36px;color:#7c3aed;"></i>
                <h4 style="margin:12px 0 6px;font-weight:600;">Müşteri Raporu</h4>
                <p style="font-size:12px;color:var(--ep-text-light);">Müşteri segmentasyonu ve analiz</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="ep-card" style="cursor:pointer;">
            <div class="ep-card-body text-center" style="padding:28px;">
                <i class="bi bi-search-heart" style="font-size:36px;color:#0d9488;"></i>
                <h4 style="margin:12px 0 6px;font-weight:600;">SEO Raporu</h4>
                <p style="font-size:12px;color:var(--ep-text-light);">Arama motoru sıralama ve trafik</p>
            </div>
        </div>
    </div>
</div>

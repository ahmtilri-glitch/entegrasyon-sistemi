<?php
/**
 * Ürün Ayarları — Genel ürün yapılandırması
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-gear"></i> Ürün Ayarları</h1>
    <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-check-lg"></i> Kaydet</button>
</div>

<div class="row g-4">
    <div class="col-md-6">
        <div class="ep-card">
            <div class="ep-card-header"><h3><i class="bi bi-images"></i> Görsel Ayarları</h3></div>
            <div class="ep-card-body">
                <div class="mb-3">
                    <label class="form-label fw-bold">Görsel Kalitesi</label>
                    <select class="form-select"><option>Yüksek (%90)</option><option>Orta (%75)</option><option>Düşük (%60)</option></select>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Maks. Görsel Boyutu (px)</label>
                    <input type="number" class="form-control" value="1200">
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Filigran Ekle</label>
                    <div class="form-check form-switch"><input class="form-check-input" type="checkbox"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="ep-card">
            <div class="ep-card-header"><h3><i class="bi bi-currency-exchange"></i> Fiyat Ayarları</h3></div>
            <div class="ep-card-body">
                <div class="mb-3">
                    <label class="form-label fw-bold">Varsayılan KDV Oranı (%)</label>
                    <input type="number" class="form-control" value="20">
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Para Birimi</label>
                    <select class="form-select"><option>TRY (₺)</option><option>USD ($)</option><option>EUR</option></select>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Fiyat Yuvarlama</label>
                    <select class="form-select"><option>,90 ile bitir</option><option>,99 ile bitir</option><option>Yuvarlama</option></select>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="ep-card">
    <div class="ep-card-header"><h3><i class="bi bi-stars"></i> AI Ürün Zenginleştirme</h3></div>
    <div class="ep-card-body">
        <div class="ep-ai-suggestion-card info" style="margin-bottom: 16px;">
            <div class="ep-ai-suggestion-icon"><i class="bi bi-stars"></i></div>
            <div class="ep-ai-suggestion-content">
                <strong>Yapay Zeka ile Ürün Açıklaması</strong>
                <p>Ürün başlıklarını ve açıklamalarını AI ile otomatik oluşturun. Gemini ve Claude desteklenir.</p>
            </div>
        </div>
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label fw-bold">AI Modeli</label>
                <select class="form-select"><option>Google Gemini Pro</option><option>Claude 3.5 Sonnet</option></select>
            </div>
            <div class="col-md-6">
                <label class="form-label fw-bold">Dil</label>
                <select class="form-select"><option>Türkçe</option><option>İngilizce</option></select>
            </div>
        </div>
    </div>
</div>

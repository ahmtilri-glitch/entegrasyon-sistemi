<?php
/**
 * Ayarlar — Genel sistem ayarları
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-gear"></i> Sistem Ayarları</h1>
    <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-check-lg"></i> Tüm Ayarları Kaydet</button>
</div>

<div class="row g-4">
    <!-- Genel Ayarlar -->
    <div class="col-md-6">
        <div class="ep-card">
            <div class="ep-card-header"><h3><i class="bi bi-building"></i> Firma Bilgileri</h3></div>
            <div class="ep-card-body">
                <div class="mb-3">
                    <label class="form-label fw-bold">Firma Adı</label>
                    <input type="text" class="form-control" value="Tedarik Türkiye">
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">VKN / TCKN</label>
                    <input type="text" class="form-control" placeholder="Vergi Kimlik No">
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">E-posta</label>
                    <input type="email" class="form-control" value="info@tedarikturkiye.com">
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Telefon</label>
                    <input type="text" class="form-control" placeholder="05XX XXX XX XX">
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Web Sitesi</label>
                    <input type="text" class="form-control" placeholder="https://...">
                </div>
            </div>
        </div>
    </div>

    <!-- API Ayarları -->
    <div class="col-md-6">
        <div class="ep-card">
            <div class="ep-card-header"><h3><i class="bi bi-key"></i> API Anahtarları</h3></div>
            <div class="ep-card-body">
                <div class="mb-3">
                    <label class="form-label fw-bold">Site API Anahtarı</label>
                    <div class="input-group">
                        <input type="password" class="form-control" value="sk-xxxxxxxxxxxxxxxxxxxx">
                        <button class="ep-btn ep-btn-outline"><i class="bi bi-eye"></i></button>
                        <button class="ep-btn ep-btn-outline"><i class="bi bi-arrow-repeat"></i></button>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Webhook URL</label>
                    <input type="text" class="form-control" placeholder="https://yourdomain.com/webhook">
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">API İstek Limiti (dakika)</label>
                    <input type="number" class="form-control" value="60">
                </div>
            </div>
        </div>
    </div>

    <!-- AI Ayarları -->
    <div class="col-md-6">
        <div class="ep-card">
            <div class="ep-card-header"><h3><i class="bi bi-stars"></i> Yapay Zeka Ayarları</h3></div>
            <div class="ep-card-body">
                <div class="mb-3">
                    <label class="form-label fw-bold">AI Modeli</label>
                    <select class="form-select">
                        <option>Google Gemini Pro</option>
                        <option>Claude 3.5 Sonnet</option>
                        <option>GPT-4o</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Gemini API Key</label>
                    <input type="password" class="form-control" placeholder="AIzaSy...">
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Claude API Key</label>
                    <input type="password" class="form-control" placeholder="sk-ant-...">
                </div>
                <div class="mb-3 d-flex justify-content-between align-items-center">
                    <div>
                        <strong>AI Asistanı Aktif</strong>
                        <div style="font-size:12px;color:var(--ep-text-light);">Dashboard ve sayfalarda AI önerilerini göster</div>
                    </div>
                    <div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked></div>
                </div>
                <div class="mb-3 d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Otomatik SEO Oluşturma</strong>
                        <div style="font-size:12px;color:var(--ep-text-light);">Yeni ürünler için otomatik meta oluştur</div>
                    </div>
                    <div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bildirim Ayarları -->
    <div class="col-md-6">
        <div class="ep-card">
            <div class="ep-card-header"><h3><i class="bi bi-bell"></i> Bildirim Ayarları</h3></div>
            <div class="ep-card-body">
                <div class="mb-3 d-flex justify-content-between align-items-center">
                    <div>
                        <strong>E-posta Bildirimleri</strong>
                        <div style="font-size:12px;color:var(--ep-text-light);">Yeni sipariş, hata ve önemli uyarılar</div>
                    </div>
                    <div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked></div>
                </div>
                <div class="mb-3 d-flex justify-content-between align-items-center">
                    <div>
                        <strong>SMS Bildirimleri</strong>
                        <div style="font-size:12px;color:var(--ep-text-light);">Kritik hata ve stok uyarıları</div>
                    </div>
                    <div class="form-check form-switch"><input class="form-check-input" type="checkbox"></div>
                </div>
                <div class="mb-3 d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Tarayıcı Bildirimleri</strong>
                        <div style="font-size:12px;color:var(--ep-text-light);">Anlık push bildirimler</div>
                    </div>
                    <div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked></div>
                </div>
                <div class="mb-3 d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Günlük Özet Raporu</strong>
                        <div style="font-size:12px;color:var(--ep-text-light);">Her gün 08:00'da e-posta ile</div>
                    </div>
                    <div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Lisans -->
    <div class="col-12">
        <div class="ep-card">
            <div class="ep-card-header"><h3><i class="bi bi-shield-check"></i> Lisans Bilgisi</h3></div>
            <div class="ep-card-body">
                <div class="row g-3">
                    <div class="col-md-3">
                        <label class="form-label fw-bold">Lisans Tipi</label>
                        <div><span class="ep-badge ep-badge-orange" style="font-size:14px;padding:8px 16px;">Enterprise</span></div>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label fw-bold">Bitiş Tarihi</label>
                        <div style="font-size:16px;font-weight:600;">15.12.2026</div>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label fw-bold">Maks. Ürün</label>
                        <div style="font-size:16px;font-weight:600;">100,000</div>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label fw-bold">Maks. Pazaryeri</label>
                        <div style="font-size:16px;font-weight:600;">33</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

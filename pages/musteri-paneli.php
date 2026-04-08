<?php
/**
 * Müşteri Paneli — Müşterinin kendi gördüğü panel görünümü
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-person-workspace"></i> Müşteri Paneli</h1>
    <div class="d-flex gap-2">
        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-eye"></i> Müşteri Görünümü</button>
    </div>
</div>

<div class="ep-ai-suggestion-card info" style="margin-bottom: 24px;">
    <div class="ep-ai-suggestion-icon"><i class="bi bi-stars"></i></div>
    <div class="ep-ai-suggestion-content">
        <strong>Müşteri Paneli Önizleme</strong>
        <p>Bu sayfa, müşterilerinizin entegrasyon paneline giriş yaptığında göreceği ekranı temsil eder. Müşteri deneyimini buradan düzenleyebilirsiniz.</p>
    </div>
</div>

<!-- Müşteri Bilgi Kartı -->
<div class="ep-card" style="margin-bottom: 24px;">
    <div class="ep-card-body">
        <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
            <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#ea580c,#f97316);display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;font-weight:700;">TT</div>
            <div style="flex:1;">
                <h3 style="margin:0 0 4px; font-size:18px; font-weight:700;">Tedarik Türkiye</h3>
                <p style="margin:0; color:var(--ep-text-light); font-size:13px;">info@tedarikturkiye.com — Ahmet İleri</p>
            </div>
            <div style="text-align:right;">
                <span class="ep-badge ep-badge-orange" style="font-size:12px; padding:6px 12px;">Enterprise Paket</span>
                <p style="margin:4px 0 0; font-size:11px; color:var(--ep-text-light);">Bitiş: 15.12.2026</p>
            </div>
        </div>
    </div>
</div>

<!-- Müşteri İstatistikleri -->
<div class="ep-stat-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Toplam Ürün</h4><div class="ep-stat-value">70,842</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-box-seam"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Aktif Pazaryeri</h4><div class="ep-stat-value" style="color:var(--ep-success);">7</div></div>
        <div class="ep-stat-icon green"><i class="bi bi-shop"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Bu Ay Sipariş</h4><div class="ep-stat-value" style="color:var(--ep-accent);">1,364</div></div>
        <div class="ep-stat-icon orange"><i class="bi bi-cart-check"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Bu Ay Ciro</h4><div class="ep-stat-value" style="color:var(--ep-info);">₺487K</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-graph-up-arrow"></i></div>
    </div>
</div>

<!-- Pazaryeri Durumları -->
<div class="ep-card" style="margin-bottom: 24px;">
    <div class="ep-card-header">
        <h3><i class="bi bi-shop"></i> Pazaryeri Entegrasyonları</h3>
    </div>
    <div class="ep-card-body" style="padding:0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th>PAZARYERI</th>
                    <th>DURUM</th>
                    <th>ÜRÜN</th>
                    <th>SİPARİŞ</th>
                    <th>SON SENKRON</th>
                    <th>İŞLEM</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img src="assets/images/marketplaces/trendyol.svg" alt="Trendyol" style="height:20px;vertical-align:middle;margin-right:8px;">Trendyol</td>
                    <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Aktif</span></td>
                    <td>12,450</td>
                    <td>437</td>
                    <td>2 dakika önce</td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-gear"></i></button></td>
                </tr>
                <tr>
                    <td><img src="assets/images/marketplaces/hepsiburada.svg" alt="Hepsiburada" style="height:20px;vertical-align:middle;margin-right:8px;">Hepsiburada</td>
                    <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Aktif</span></td>
                    <td>8,720</td>
                    <td>312</td>
                    <td>5 dakika önce</td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-gear"></i></button></td>
                </tr>
                <tr>
                    <td><img src="assets/images/marketplaces/n11.svg" alt="N11" style="height:20px;vertical-align:middle;margin-right:8px;">N11</td>
                    <td><span class="ep-badge ep-badge-danger"><span class="ep-dot ep-dot-danger"></span>Hata</span></td>
                    <td>5,340</td>
                    <td>187</td>
                    <td>1 saat önce</td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-gear"></i></button></td>
                </tr>
                <tr>
                    <td><img src="assets/images/marketplaces/amazon.svg" alt="Amazon TR" style="height:20px;vertical-align:middle;margin-right:8px;">Amazon TR</td>
                    <td><span class="ep-badge ep-badge-danger"><span class="ep-dot ep-dot-danger"></span>Hata</span></td>
                    <td>3,100</td>
                    <td>98</td>
                    <td>3 saat önce</td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-gear"></i></button></td>
                </tr>
                <tr>
                    <td><img src="assets/images/marketplaces/ciceksepeti.svg" alt="Çiçeksepeti" style="height:20px;vertical-align:middle;margin-right:8px;">Çiçeksepeti</td>
                    <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Aktif</span></td>
                    <td>3,210</td>
                    <td>98</td>
                    <td>10 dakika önce</td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-gear"></i></button></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<!-- Abonelik Bilgileri -->
<div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
    <div class="ep-card">
        <div class="ep-card-header">
            <h3><i class="bi bi-credit-card"></i> Abonelik Bilgileri</h3>
        </div>
        <div class="ep-card-body">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #f1f5f9;">
                    <span style="color:var(--ep-text-light); font-size:13px;">Paket</span>
                    <strong>Enterprise</strong>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #f1f5f9;">
                    <span style="color:var(--ep-text-light); font-size:13px;">Aylık Tutar</span>
                    <strong style="color:var(--ep-accent);">₺7.990</strong>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #f1f5f9;">
                    <span style="color:var(--ep-text-light); font-size:13px;">Başlangıç</span>
                    <strong>15.12.2025</strong>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #f1f5f9;">
                    <span style="color:var(--ep-text-light); font-size:13px;">Bitiş</span>
                    <strong>15.12.2026</strong>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0;">
                    <span style="color:var(--ep-text-light); font-size:13px;">Kalan Gün</span>
                    <strong style="color:var(--ep-success);">251 gün</strong>
                </div>
            </div>
            <div style="margin-top:16px; display:flex; gap:8px;">
                <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-arrow-up-circle"></i> Paket Yükselt</button>
                <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-arrow-repeat"></i> Yenile</button>
            </div>
        </div>
    </div>

    <div class="ep-card">
        <div class="ep-card-header">
            <h3><i class="bi bi-clock-history"></i> Son İşlemler</h3>
        </div>
        <div class="ep-card-body" style="padding:0;">
            <div class="ep-activity-list">
                <div class="ep-activity-item">
                    <div class="ep-activity-dot" style="background:var(--ep-success);"></div>
                    <div>
                        <div class="ep-activity-text">Trendyol senkronizasyonu tamamlandı</div>
                        <div class="ep-activity-time">2 dakika önce</div>
                    </div>
                </div>
                <div class="ep-activity-item">
                    <div class="ep-activity-dot" style="background:var(--ep-info);"></div>
                    <div>
                        <div class="ep-activity-text">437 yeni sipariş çekildi</div>
                        <div class="ep-activity-time">15 dakika önce</div>
                    </div>
                </div>
                <div class="ep-activity-item">
                    <div class="ep-activity-dot" style="background:var(--ep-danger);"></div>
                    <div>
                        <div class="ep-activity-text">N11 API bağlantı hatası</div>
                        <div class="ep-activity-time">1 saat önce</div>
                    </div>
                </div>
                <div class="ep-activity-item">
                    <div class="ep-activity-dot" style="background:var(--ep-success);"></div>
                    <div>
                        <div class="ep-activity-text">156 kargo takip bilgisi güncellendi</div>
                        <div class="ep-activity-time">2 saat önce</div>
                    </div>
                </div>
                <div class="ep-activity-item">
                    <div class="ep-activity-dot" style="background:var(--ep-warning);"></div>
                    <div>
                        <div class="ep-activity-text">Fatura oluşturma kuyruğunda 12 bekleyen</div>
                        <div class="ep-activity-time">3 saat önce</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

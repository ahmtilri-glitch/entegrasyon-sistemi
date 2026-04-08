<?php
/**
 * Dashboard — Ana Sayfa
 * 
 * Genel bakış: ciro, sipariş, ürün, müşteri istatistikleri,
 * grafikler, son siparişler, entegrasyon durumu ve hızlı işlemler.
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<!-- AI Asistan Banner -->
<div class="ep-ai-banner">
    <div class="ep-ai-banner-glow"></div>
    <div class="ep-ai-banner-content">
        <div class="ep-ai-banner-left">
            <div class="ep-ai-avatar">
                <i class="bi bi-stars"></i>
            </div>
            <div>
                <h3>Merhaba! Ben EP Asistan</h3>
                <p>Yapay zeka destekli asistanınız size yardımcı olmaya hazır. Bugün sizin için neler yapabilirim?</p>
            </div>
        </div>
        <div class="ep-ai-banner-actions">
            <button class="ep-ai-suggest-btn" onclick="document.getElementById('aiChat').focus()">
                <i class="bi bi-chat-dots"></i> Soru Sor
            </button>
            <button class="ep-ai-suggest-btn" onclick="window.location='index.php?page=eslestirme'">
                <i class="bi bi-link-45deg"></i> AI Eşleştir
            </button>
            <button class="ep-ai-suggest-btn" onclick="window.location='index.php?page=seo'">
                <i class="bi bi-search-heart"></i> SEO Analiz
            </button>
        </div>
    </div>
</div>

<!-- AI Akıllı Öneriler -->
<div class="ep-ai-suggestions">
    <div class="ep-ai-suggestion-card warning">
        <div class="ep-ai-suggestion-icon">
            <i class="bi bi-exclamation-triangle"></i>
        </div>
        <div class="ep-ai-suggestion-content">
            <strong>326 kategori eşleşmedi</strong>
            <p>Trendyol'da 326 kategori henüz eşleştirilmemiş. AI ile otomatik eşleştirme yapabilirsiniz.</p>
        </div>
        <a href="index.php?page=eslestirme" class="ep-btn ep-btn-sm ep-btn-warning">
            <i class="bi bi-stars"></i> AI ile Eşleştir
        </a>
    </div>
    <div class="ep-ai-suggestion-card success">
        <div class="ep-ai-suggestion-icon">
            <i class="bi bi-graph-up-arrow"></i>
        </div>
        <div class="ep-ai-suggestion-content">
            <strong>Satış trendi yükselişte</strong>
            <p>Bu hafta siparişleriniz %8.3 arttı. En çok satan 5 ürününüzün stokunu kontrol edin.</p>
        </div>
        <a href="index.php?page=raporlar" class="ep-btn ep-btn-sm ep-btn-success">
            <i class="bi bi-bar-chart-line"></i> Rapor Gör
        </a>
    </div>
    <div class="ep-ai-suggestion-card danger">
        <div class="ep-ai-suggestion-icon">
            <i class="bi bi-wifi-off"></i>
        </div>
        <div class="ep-ai-suggestion-content">
            <strong>Amazon TR bağlantı hatası</strong>
            <p>API token süresi dolmuş. Yeniden bağlanmak için ayarlara gidin.</p>
        </div>
        <a href="index.php?page=pazaryerleri" class="ep-btn ep-btn-sm ep-btn-danger">
            <i class="bi bi-gear"></i> Ayarla
        </a>
    </div>
    <div class="ep-ai-suggestion-card info">
        <div class="ep-ai-suggestion-icon">
            <i class="bi bi-lightbulb"></i>
        </div>
        <div class="ep-ai-suggestion-content">
            <strong>SEO iyileştirme önerisi</strong>
            <p>1,240 yeni ürünün meta açıklaması eksik. AI ile otomatik oluşturabilirsiniz.</p>
        </div>
        <a href="index.php?page=seo" class="ep-btn ep-btn-sm ep-btn-info">
            <i class="bi bi-stars"></i> AI Oluştur
        </a>
    </div>
</div>

<!-- Sayfa Başlığı -->
<div class="ep-section-header">
    <h1 class="ep-section-title">
        <i class="bi bi-speedometer2"></i> Dashboard
    </h1>
    <div class="d-flex gap-2">
        <select class="form-select form-select-sm" style="width:auto; font-size:13px;">
            <option>Bugün</option>
            <option selected>Bu Hafta</option>
            <option>Bu Ay</option>
            <option>Son 3 Ay</option>
            <option>Bu Yıl</option>
        </select>
        <button class="ep-btn ep-btn-outline ep-btn-sm">
            <i class="bi bi-arrow-clockwise"></i> Yenile
        </button>
    </div>
</div>

<!-- İstatistik Kartları -->
<div class="ep-stat-grid">
    <!-- Toplam Ciro -->
    <div class="ep-stat-card">
        <div class="ep-stat-info">
            <h4>Toplam Ciro</h4>
            <div class="ep-stat-value">₺2.85M</div>
            <div class="ep-stat-change up">
                <i class="bi bi-arrow-up-short"></i> %12.5 artış
            </div>
        </div>
        <div class="ep-stat-icon orange">
            <i class="bi bi-currency-exchange"></i>
        </div>
    </div>

    <!-- Siparişler -->
    <div class="ep-stat-card">
        <div class="ep-stat-info">
            <h4>Siparişler</h4>
            <div class="ep-stat-value">1,248</div>
            <div class="ep-stat-change up">
                <i class="bi bi-arrow-up-short"></i> %8.3 artış
            </div>
        </div>
        <div class="ep-stat-icon blue">
            <i class="bi bi-cart-check"></i>
        </div>
    </div>

    <!-- Toplam Ürün -->
    <div class="ep-stat-card">
        <div class="ep-stat-info">
            <h4>Toplam Ürün</h4>
            <div class="ep-stat-value">70,842</div>
            <div class="ep-stat-change up">
                <i class="bi bi-arrow-up-short"></i> 1,240 yeni
            </div>
        </div>
        <div class="ep-stat-icon green">
            <i class="bi bi-box-seam"></i>
        </div>
    </div>

    <!-- Aktif Pazaryeri -->
    <div class="ep-stat-card">
        <div class="ep-stat-info">
            <h4>Aktif Pazaryeri</h4>
            <div class="ep-stat-value">11</div>
            <div class="ep-stat-change" style="color: var(--ep-text-light);">
                33 destekleniyor
            </div>
        </div>
        <div class="ep-stat-icon purple">
            <i class="bi bi-shop"></i>
        </div>
    </div>

    <!-- Bekleyen Sipariş -->
    <div class="ep-stat-card">
        <div class="ep-stat-info">
            <h4>Bekleyen Sipariş</h4>
            <div class="ep-stat-value">87</div>
            <div class="ep-stat-change down">
                <i class="bi bi-arrow-down-short"></i> 23 yeni
            </div>
        </div>
        <div class="ep-stat-icon red">
            <i class="bi bi-clock-history"></i>
        </div>
    </div>

    <!-- Kargodaki -->
    <div class="ep-stat-card">
        <div class="ep-stat-info">
            <h4>Kargoda</h4>
            <div class="ep-stat-value">342</div>
            <div class="ep-stat-change" style="color: var(--ep-text-light);">
                6 firma aktif
            </div>
        </div>
        <div class="ep-stat-icon teal">
            <i class="bi bi-truck"></i>
        </div>
    </div>

    <!-- Müşteriler -->
    <div class="ep-stat-card">
        <div class="ep-stat-info">
            <h4>Müşteriler</h4>
            <div class="ep-stat-value">486</div>
            <div class="ep-stat-change up">
                <i class="bi bi-arrow-up-short"></i> %4.2 artış
            </div>
        </div>
        <div class="ep-stat-icon pink">
            <i class="bi bi-people"></i>
        </div>
    </div>

    <!-- XML Feed -->
    <div class="ep-stat-card">
        <div class="ep-stat-info">
            <h4>XML Feed</h4>
            <div class="ep-stat-value">6</div>
            <div class="ep-stat-change" style="color: var(--ep-text-light);">
                4 tamamlandı, 1 çalışıyor
            </div>
        </div>
        <div class="ep-stat-icon yellow">
            <i class="bi bi-filetype-xml"></i>
        </div>
    </div>
</div>

<!-- Hızlı İşlemler -->
<div class="ep-card" style="margin-bottom: 24px;">
    <div class="ep-card-body" style="padding: 16px 24px;">
        <div class="d-flex align-items-center gap-3 mb-3">
            <i class="bi bi-lightning-charge-fill" style="color: var(--ep-accent); font-size: 18px;"></i>
            <strong style="font-size: 14px;">Hızlı İşlemler</strong>
        </div>
        <div class="ep-quick-actions" style="margin-bottom: 0;">
            <a href="index.php?page=xml-feed" class="ep-quick-btn">
                <i class="bi bi-filetype-xml"></i>
                XML Aktar
            </a>
            <a href="index.php?page=siparisler" class="ep-quick-btn">
                <i class="bi bi-arrow-repeat"></i>
                Sipariş Çek
            </a>
            <a href="index.php?page=toplu-islemler" class="ep-quick-btn">
                <i class="bi bi-collection"></i>
                Toplu Gönder
            </a>
            <a href="index.php?page=eslestirme" class="ep-quick-btn">
                <i class="bi bi-link-45deg"></i>
                Eşleştir
            </a>
            <a href="index.php?page=kargo" class="ep-quick-btn">
                <i class="bi bi-truck"></i>
                Kargo Oluştur
            </a>
            <a href="index.php?page=fatura" class="ep-quick-btn">
                <i class="bi bi-receipt"></i>
                Fatura Kes
            </a>
        </div>
    </div>
</div>

<!-- Ana Grid: Grafik + Pazaryeri Dağılımı -->
<div class="ep-dashboard-grid">
    <!-- Ciro Grafiği -->
    <div class="ep-card">
        <div class="ep-card-header">
            <div>
                <h3><i class="bi bi-graph-up-arrow"></i> Ciro Grafiği</h3>
                <div class="ep-header-subtitle">Aylık ciro trendi</div>
            </div>
            <div class="ep-header-actions">
                <button class="ep-btn ep-btn-sm" style="background: rgba(255,255,255,0.15); color: #fff;">
                    <i class="bi bi-download"></i> Dışa Aktar
                </button>
            </div>
        </div>
        <div class="ep-card-body">
            <div class="ep-chart-container">
                <canvas id="revenueChart"></canvas>
            </div>
        </div>
    </div>

    <!-- Pazaryeri Dağılımı -->
    <div class="ep-card">
        <div class="ep-card-header">
            <div>
                <h3><i class="bi bi-pie-chart"></i> Pazaryeri Dağılımı</h3>
                <div class="ep-header-subtitle">Satış oranları</div>
            </div>
        </div>
        <div class="ep-card-body">
            <div class="ep-chart-container">
                <canvas id="marketplaceChart"></canvas>
            </div>
        </div>
    </div>
</div>

<!-- İkinci Grid: Sipariş Grafiği + Son Siparişler -->
<div class="ep-dashboard-grid">
    <!-- Haftalık Sipariş Grafiği -->
    <div class="ep-card">
        <div class="ep-card-header">
            <div>
                <h3><i class="bi bi-bar-chart"></i> Haftalık Siparişler</h3>
                <div class="ep-header-subtitle">Son 7 günlük sipariş sayısı</div>
            </div>
        </div>
        <div class="ep-card-body">
            <div class="ep-chart-container">
                <canvas id="orderChart"></canvas>
            </div>
        </div>
    </div>

    <!-- Son Siparişler -->
    <div class="ep-card">
        <div class="ep-card-header">
            <div>
                <h3><i class="bi bi-bag-check"></i> Son Siparişler</h3>
                <div class="ep-header-subtitle">Son gelen siparişler</div>
            </div>
            <a href="index.php?page=siparisler" class="ep-btn ep-btn-sm" style="background: rgba(255,255,255,0.15); color: #fff;">
                Tümünü Gör <i class="bi bi-arrow-right"></i>
            </a>
        </div>
        <div class="ep-card-body" style="padding: 0;">
            <table class="ep-table">
                <thead>
                    <tr>
                        <th>SİPARİŞ</th>
                        <th>PAZARYERI</th>
                        <th>TUTAR</th>
                        <th>DURUM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div style="font-weight: 600;">#TY-8842156</div>
                            <div style="font-size: 11px; color: var(--ep-text-light);">Ahmet Y.</div>
                        </td>
                        <td><span class="ep-badge ep-badge-orange">Trendyol</span></td>
                        <td style="font-weight: 600;">₺1.249,90</td>
                        <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Onaylandı</span></td>
                    </tr>
                    <tr>
                        <td>
                            <div style="font-weight: 600;">#HB-3319547</div>
                            <div style="font-size: 11px; color: var(--ep-text-light);">Fatma K.</div>
                        </td>
                        <td><span class="ep-badge ep-badge-info">Hepsiburada</span></td>
                        <td style="font-weight: 600;">₺849,00</td>
                        <td><span class="ep-badge ep-badge-warning"><span class="ep-dot ep-dot-warning"></span>Hazırlanıyor</span></td>
                    </tr>
                    <tr>
                        <td>
                            <div style="font-weight: 600;">#N11-667234</div>
                            <div style="font-size: 11px; color: var(--ep-text-light);">Mehmet S.</div>
                        </td>
                        <td><span class="ep-badge" style="background: #f3e8ff; color: #7c3aed;">N11</span></td>
                        <td style="font-weight: 600;">₺2.450,00</td>
                        <td><span class="ep-badge ep-badge-info"><span class="ep-dot ep-dot-info"></span>Kargoda</span></td>
                    </tr>
                    <tr>
                        <td>
                            <div style="font-weight: 600;">#TY-8842089</div>
                            <div style="font-size: 11px; color: var(--ep-text-light);">Ayşe D.</div>
                        </td>
                        <td><span class="ep-badge ep-badge-orange">Trendyol</span></td>
                        <td style="font-weight: 600;">₺375,50</td>
                        <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Teslim Edildi</span></td>
                    </tr>
                    <tr>
                        <td>
                            <div style="font-weight: 600;">#CS-1124890</div>
                            <div style="font-size: 11px; color: var(--ep-text-light);">Ali R.</div>
                        </td>
                        <td><span class="ep-badge" style="background: #fdf2f8; color: #db2777;">Çiçeksepeti</span></td>
                        <td style="font-weight: 600;">₺1.820,00</td>
                        <td><span class="ep-badge ep-badge-danger"><span class="ep-dot ep-dot-danger"></span>İptal</span></td>
                    </tr>
                    <tr>
                        <td>
                            <div style="font-weight: 600;">#HB-3319480</div>
                            <div style="font-size: 11px; color: var(--ep-text-light);">Zeynep T.</div>
                        </td>
                        <td><span class="ep-badge ep-badge-info">Hepsiburada</span></td>
                        <td style="font-weight: 600;">₺567,90</td>
                        <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Onaylandı</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Üçüncü Grid: Entegrasyon Durumu + Son Aktiviteler -->
<div class="ep-dashboard-grid-equal">
    <!-- Entegrasyon Sağlık Durumu -->
    <div class="ep-card">
        <div class="ep-card-header">
            <div>
                <h3><i class="bi bi-heart-pulse"></i> Entegrasyon Durumu</h3>
                <div class="ep-header-subtitle">Bağlı sistemlerin sağlık kontrolü</div>
            </div>
        </div>
        <div class="ep-card-body">
            <div class="ep-health-grid">
                <div class="ep-health-card">
                    <div class="ep-health-dot ok"></div>
                    <div class="ep-health-info">
                        <div class="ep-health-name">Trendyol</div>
                        <div class="ep-health-status">Son sync: 5 dk önce</div>
                    </div>
                </div>
                <div class="ep-health-card">
                    <div class="ep-health-dot ok"></div>
                    <div class="ep-health-info">
                        <div class="ep-health-name">Hepsiburada</div>
                        <div class="ep-health-status">Son sync: 3 dk önce</div>
                    </div>
                </div>
                <div class="ep-health-card">
                    <div class="ep-health-dot ok"></div>
                    <div class="ep-health-info">
                        <div class="ep-health-name">N11</div>
                        <div class="ep-health-status">Son sync: 8 dk önce</div>
                    </div>
                </div>
                <div class="ep-health-card">
                    <div class="ep-health-dot error"></div>
                    <div class="ep-health-info">
                        <div class="ep-health-name">Amazon TR</div>
                        <div class="ep-health-status">API hatası — yeniden dene</div>
                    </div>
                </div>
                <div class="ep-health-card">
                    <div class="ep-health-dot ok"></div>
                    <div class="ep-health-info">
                        <div class="ep-health-name">Yurtiçi Kargo</div>
                        <div class="ep-health-status">Bağlı — aktif</div>
                    </div>
                </div>
                <div class="ep-health-card">
                    <div class="ep-health-dot wait"></div>
                    <div class="ep-health-info">
                        <div class="ep-health-name">Aras Kargo</div>
                        <div class="ep-health-status">Ayar eksik</div>
                    </div>
                </div>
                <div class="ep-health-card">
                    <div class="ep-health-dot ok"></div>
                    <div class="ep-health-info">
                        <div class="ep-health-name">GİB e-Fatura</div>
                        <div class="ep-health-status">Bağlı — aktif</div>
                    </div>
                </div>
                <div class="ep-health-card">
                    <div class="ep-health-dot ok"></div>
                    <div class="ep-health-info">
                        <div class="ep-health-name">PayTR POS</div>
                        <div class="ep-health-status">Bağlı — aktif</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Son Aktiviteler -->
    <div class="ep-card">
        <div class="ep-card-header">
            <div>
                <h3><i class="bi bi-activity"></i> Son Aktiviteler</h3>
                <div class="ep-header-subtitle">Sistem olayları</div>
            </div>
        </div>
        <div class="ep-card-body">
            <div class="ep-activity-item">
                <div class="ep-activity-icon" style="background: #dcfce7; color: #16a34a;">
                    <i class="bi bi-check-circle"></i>
                </div>
                <div class="ep-activity-content">
                    <div class="ep-activity-text">Trendyol sipariş senkronizasyonu tamamlandı</div>
                    <div class="ep-activity-time">2 dakika önce — 23 yeni sipariş</div>
                </div>
            </div>
            <div class="ep-activity-item">
                <div class="ep-activity-icon" style="background: #dbeafe; color: #2563eb;">
                    <i class="bi bi-arrow-repeat"></i>
                </div>
                <div class="ep-activity-content">
                    <div class="ep-activity-text">XML Feed "Bant Marketim" aktarımı tamamlandı</div>
                    <div class="ep-activity-time">15 dakika önce — 531 ürün, 1 yeni</div>
                </div>
            </div>
            <div class="ep-activity-item">
                <div class="ep-activity-icon" style="background: #fff7ed; color: #ea580c;">
                    <i class="bi bi-truck"></i>
                </div>
                <div class="ep-activity-content">
                    <div class="ep-activity-text">12 kargo takip numarası güncellendi</div>
                    <div class="ep-activity-time">28 dakika önce — Yurtiçi Kargo</div>
                </div>
            </div>
            <div class="ep-activity-item">
                <div class="ep-activity-icon" style="background: #fef2f2; color: #dc2626;">
                    <i class="bi bi-exclamation-triangle"></i>
                </div>
                <div class="ep-activity-content">
                    <div class="ep-activity-text">Amazon TR API bağlantı hatası</div>
                    <div class="ep-activity-time">45 dakika önce — Token süresi dolmuş</div>
                </div>
            </div>
            <div class="ep-activity-item">
                <div class="ep-activity-icon" style="background: #f3e8ff; color: #7c3aed;">
                    <i class="bi bi-receipt"></i>
                </div>
                <div class="ep-activity-content">
                    <div class="ep-activity-text">3 e-fatura başarıyla gönderildi</div>
                    <div class="ep-activity-time">1 saat önce — Hepsiburada e-Fatura</div>
                </div>
            </div>
            <div class="ep-activity-item">
                <div class="ep-activity-icon" style="background: #dcfce7; color: #16a34a;">
                    <i class="bi bi-collection"></i>
                </div>
                <div class="ep-activity-content">
                    <div class="ep-activity-text">Toplu ürün gönderimi: 450 ürün N11'e yüklendi</div>
                    <div class="ep-activity-time">2 saat önce — Başarılı</div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Dördüncü Satır: XML Feed Durumu + Stok Uyarıları -->
<div class="ep-dashboard-grid-equal">
    <!-- XML Feed Durumu -->
    <div class="ep-card">
        <div class="ep-card-header">
            <div>
                <h3><i class="bi bi-filetype-xml"></i> XML Feed Durumu</h3>
                <div class="ep-header-subtitle">Aktif tedarikçi feed'leri</div>
            </div>
            <a href="index.php?page=xml-feed" class="ep-btn ep-btn-sm" style="background: rgba(255,255,255,0.15); color: #fff;">
                Tümünü Yönet <i class="bi bi-arrow-right"></i>
            </a>
        </div>
        <div class="ep-card-body" style="padding: 0;">
            <table class="ep-table">
                <thead>
                    <tr>
                        <th>TEDARİKÇİ</th>
                        <th>ÜRÜN</th>
                        <th>DURUM</th>
                        <th>SON AKTARIM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight: 600;">Bant Marketim</td>
                        <td><span class="ep-badge ep-badge-info">531</span></td>
                        <td><span class="ep-badge ep-badge-success">Tamamlandı</span></td>
                        <td style="color: var(--ep-text-light); font-size: 12px;">05.04.2026 08:20</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600;">Selda Elektirik</td>
                        <td><span class="ep-badge ep-badge-info">215</span></td>
                        <td><span class="ep-badge ep-badge-success">Tamamlandı</span></td>
                        <td style="color: var(--ep-text-light); font-size: 12px;">05.04.2026 11:20</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600;">Toptan Gidiyor</td>
                        <td><span class="ep-badge ep-badge-info">21,934</span></td>
                        <td><span class="ep-badge ep-badge-warning">Hazır</span></td>
                        <td style="color: var(--ep-text-light); font-size: 12px;">08.04.2026 17:55</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600;">İtedarik_3</td>
                        <td><span class="ep-badge ep-badge-info">7,737</span></td>
                        <td><span class="ep-badge ep-badge-orange">Çalışıyor %50</span></td>
                        <td style="color: var(--ep-text-light); font-size: 12px;">07.04.2026 14:16</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Stok Uyarıları -->
    <div class="ep-card">
        <div class="ep-card-header">
            <div>
                <h3><i class="bi bi-exclamation-diamond"></i> Stok Uyarıları</h3>
                <div class="ep-header-subtitle">Dikkat gerektiren ürünler</div>
            </div>
        </div>
        <div class="ep-card-body" style="padding: 0;">
            <table class="ep-table">
                <thead>
                    <tr>
                        <th>ÜRÜN</th>
                        <th>STOK</th>
                        <th>DURUM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div style="font-weight: 600;">Samsung Galaxy S24 Kılıf</div>
                            <div style="font-size: 11px; color: var(--ep-text-light);">SKU: bnt_4521</div>
                        </td>
                        <td><span class="ep-badge ep-badge-danger">0</span></td>
                        <td><span class="ep-badge ep-badge-danger">Tükendi</span></td>
                    </tr>
                    <tr>
                        <td>
                            <div style="font-weight: 600;">iPhone 15 Pro Ekran Koruyucu</div>
                            <div style="font-size: 11px; color: var(--ep-text-light);">SKU: bnt_1289</div>
                        </td>
                        <td><span class="ep-badge ep-badge-warning">3</span></td>
                        <td><span class="ep-badge ep-badge-warning">Kritik</span></td>
                    </tr>
                    <tr>
                        <td>
                            <div style="font-weight: 600;">USB-C Hızlı Şarj Kablosu</div>
                            <div style="font-size: 11px; color: var(--ep-text-light);">SKU: tpg_8821</div>
                        </td>
                        <td><span class="ep-badge ep-badge-warning">5</span></td>
                        <td><span class="ep-badge ep-badge-warning">Kritik</span></td>
                    </tr>
                    <tr>
                        <td>
                            <div style="font-weight: 600;">Bluetooth Kulaklık TWS</div>
                            <div style="font-size: 11px; color: var(--ep-text-light);">SKU: sld_0342</div>
                        </td>
                        <td><span class="ep-badge ep-badge-danger">0</span></td>
                        <td><span class="ep-badge ep-badge-danger">Tükendi</span></td>
                    </tr>
                    <tr>
                        <td>
                            <div style="font-weight: 600;">Laptop Standı Alüminyum</div>
                            <div style="font-size: 11px; color: var(--ep-text-light);">SKU: tpg_1155</div>
                        </td>
                        <td><span class="ep-badge ep-badge-warning">2</span></td>
                        <td><span class="ep-badge ep-badge-warning">Kritik</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Beşinci Satır: Pazaryeri Performansı -->
<div class="ep-card">
    <div class="ep-card-header">
        <div>
            <h3><i class="bi bi-graph-up"></i> Pazaryeri Performansı</h3>
            <div class="ep-header-subtitle">Pazaryerlerine göre satış ve sipariş detayları</div>
        </div>
    </div>
    <div class="ep-card-body" style="padding: 0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th>PAZARYERİ</th>
                    <th>SİPARİŞ</th>
                    <th>CİRO</th>
                    <th>KOMİSYON</th>
                    <th>NET KÂR</th>
                    <th>ÜRÜN</th>
                    <th>PERFORMANS</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <div style="width:28px;height:28px;border-radius:6px;background:#fff7ed;display:flex;align-items:center;justify-content:center;">
                                <i class="bi bi-shop" style="color: var(--ep-accent);"></i>
                            </div>
                            <strong>Trendyol</strong>
                        </div>
                    </td>
                    <td><strong>437</strong></td>
                    <td>₺998.450</td>
                    <td style="color: var(--ep-danger);">₺149.768</td>
                    <td style="color: var(--ep-success); font-weight: 600;">₺848.682</td>
                    <td>12,450</td>
                    <td>
                        <div class="ep-progress" style="width: 120px;">
                            <div class="ep-progress-bar orange" style="width: 85%;"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <div style="width:28px;height:28px;border-radius:6px;background:#dbeafe;display:flex;align-items:center;justify-content:center;">
                                <i class="bi bi-shop" style="color: var(--ep-info);"></i>
                            </div>
                            <strong>Hepsiburada</strong>
                        </div>
                    </td>
                    <td><strong>312</strong></td>
                    <td>₺712.800</td>
                    <td style="color: var(--ep-danger);">₺106.920</td>
                    <td style="color: var(--ep-success); font-weight: 600;">₺605.880</td>
                    <td>8,720</td>
                    <td>
                        <div class="ep-progress" style="width: 120px;">
                            <div class="ep-progress-bar blue" style="width: 72%;"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <div style="width:28px;height:28px;border-radius:6px;background:#f3e8ff;display:flex;align-items:center;justify-content:center;">
                                <i class="bi bi-shop" style="color: #7c3aed;"></i>
                            </div>
                            <strong>N11</strong>
                        </div>
                    </td>
                    <td><strong>187</strong></td>
                    <td>₺428.100</td>
                    <td style="color: var(--ep-danger);">₺64.215</td>
                    <td style="color: var(--ep-success); font-weight: 600;">₺363.885</td>
                    <td>5,340</td>
                    <td>
                        <div class="ep-progress" style="width: 120px;">
                            <div class="ep-progress-bar green" style="width: 55%;"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <div style="width:28px;height:28px;border-radius:6px;background:#fdf2f8;display:flex;align-items:center;justify-content:center;">
                                <i class="bi bi-shop" style="color: #db2777;"></i>
                            </div>
                            <strong>Çiçeksepeti</strong>
                        </div>
                    </td>
                    <td><strong>98</strong></td>
                    <td>₺224.700</td>
                    <td style="color: var(--ep-danger);">₺33.705</td>
                    <td style="color: var(--ep-success); font-weight: 600;">₺190.995</td>
                    <td>3,210</td>
                    <td>
                        <div class="ep-progress" style="width: 120px;">
                            <div class="ep-progress-bar red" style="width: 35%;"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<?php
/**
 * Eşleştirme — Kategori ve marka eşleştirme (AI destekli)
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-link-45deg"></i> Eşleştirme Merkezi</h1>
    <div class="d-flex gap-2">
        <button class="ep-btn ep-btn-sm" style="background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;">
            <i class="bi bi-stars"></i> Yapay Zeka Destekli Eşleştirme
        </button>
    </div>
</div>

<!-- AI Banner -->
<div class="ep-ai-banner" style="margin-bottom: 24px;">
    <div class="ep-ai-banner-glow"></div>
    <div class="ep-ai-banner-content">
        <div class="ep-ai-banner-left">
            <div class="ep-ai-avatar"><i class="bi bi-stars"></i></div>
            <div>
                <h3>AI Eşleştirme Asistanı</h3>
                <p>Kategorileri ve markaları yapay zeka ile otomatik eşleştirin. %100 doğruluk oranı ile zaman kazanın.</p>
            </div>
        </div>
        <div class="ep-ai-banner-actions">
            <button class="ep-ai-suggest-btn"><i class="bi bi-folder2-open"></i> Kategori Eşleştir</button>
            <button class="ep-ai-suggest-btn"><i class="bi bi-tags"></i> Marka Eşleştir</button>
        </div>
    </div>
</div>

<!-- Eşleştirme Türü Seçimi -->
<div class="row g-4 mb-4">
    <div class="col-md-6">
        <div class="ep-card" style="cursor:pointer;border:2px solid var(--ep-accent);">
            <div class="ep-card-body text-center" style="padding:32px;">
                <i class="bi bi-folder2-open" style="font-size:40px;color:var(--ep-accent);"></i>
                <h4 style="margin:16px 0 8px;font-weight:700;">Kategori Eşleştirme</h4>
                <p style="color:var(--ep-text-light);font-size:13px;">Yerel kategorilerinizi pazaryeri kategorileriyle eşleştirin</p>
                <div class="d-flex justify-content-center gap-3 mt-3">
                    <span class="ep-badge ep-badge-success">6 eşleşmiş</span>
                    <span class="ep-badge ep-badge-warning">326 eşleşmemiş</span>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="ep-card" style="cursor:pointer;">
            <div class="ep-card-body text-center" style="padding:32px;">
                <i class="bi bi-tags" style="font-size:40px;color:var(--ep-info);"></i>
                <h4 style="margin:16px 0 8px;font-weight:700;">Marka Eşleştirme</h4>
                <p style="color:var(--ep-text-light);font-size:13px;">Yerel markalarınızı pazaryeri markalarıyla eşleştirin</p>
                <div class="d-flex justify-content-center gap-3 mt-3">
                    <span class="ep-badge ep-badge-success">1 eşleşmiş</span>
                    <span class="ep-badge ep-badge-warning">0 eşleşmemiş</span>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Pazaryeri Seçimi -->
<div class="ep-marketplace-tabs">
    <button class="ep-marketplace-tab active"><span class="mp-icon mp-trendyol">TY</span> Trendyol</button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-hepsiburada">HB</span> Hepsiburada</button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-n11">N11</span> N11</button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-amazon">AMZ</span> Amazon TR</button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-ciceksepeti">ÇS</span> Çiçeksepeti</button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-koctas">KOÇ</span> Koçtaş</button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-teknosa">TNS</span> Teknosa</button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-mediamarkt">MM</span> MediaMarkt</button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-pazarama">PZR</span> Pazarama</button>
</div>

<!-- Eşleştirme Tablosu -->
<div class="ep-card">
    <div class="ep-card-header">
        <h3><i class="bi bi-table"></i> Kategori Durumu — Trendyol</h3>
        <div class="ep-header-actions">
            <span class="ep-badge" style="background:rgba(255,255,255,0.2);color:#fff;">332 ürünlü kategori</span>
            <span class="ep-badge" style="background:rgba(255,255,255,0.2);color:#fff;">6 eşleşmiş</span>
        </div>
    </div>
    <div class="ep-card-body" style="padding: 0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th>YEREL KATEGORİ</th>
                    <th>ÜRÜN</th>
                    <th>DURUM</th>
                    <th>PAZARYERİ KATEGORİSİ</th>
                    <th>İŞLEM</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Telefon & Aksesuarları > Kılıf</strong></td>
                    <td>4,208</td>
                    <td><span class="ep-badge ep-badge-success">Eşleşti</span></td>
                    <td style="font-size:12px;">Elektronik > Cep Telefonu Aksesuarları > Kılıf</td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-pencil"></i></button></td>
                </tr>
                <tr>
                    <td><strong>Banyo Yapı & Hırdavat > Vida</strong></td>
                    <td>2,248</td>
                    <td><span class="ep-badge ep-badge-success">Eşleşti</span></td>
                    <td style="font-size:12px;">Yapı Market > Hırdavat > Vida & Çivi</td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-pencil"></i></button></td>
                </tr>
                <tr style="background:#fff7ed;">
                    <td><strong>Çocuk Oyuncakları > Parti Kostümü</strong></td>
                    <td>553</td>
                    <td><span class="ep-badge ep-badge-warning">Eşleşmedi</span></td>
                    <td>
                        <div class="ep-ai-suggestion-card info" style="margin:0;padding:8px 12px;border:none;box-shadow:none;">
                            <i class="bi bi-stars" style="color:var(--ep-info);"></i>
                            <small><strong>AI Önerisi:</strong> Hobi & Eğlence > Parti Malzemeleri (%100)</small>
                        </div>
                    </td>
                    <td>
                        <button class="ep-btn ep-btn-sm ep-btn-success"><i class="bi bi-check-lg"></i> Onayla</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

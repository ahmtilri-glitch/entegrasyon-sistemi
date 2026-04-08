<?php
/**
 * Siparişler — Tüm pazaryerlerinden gelen siparişler
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-cart-check"></i> Siparişler</h1>
    <div class="d-flex gap-2">
        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-arrow-repeat"></i> Siparişleri Çek</button>
        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-download"></i> Dışa Aktar</button>
    </div>
</div>

<!-- AI Öneri -->
<div class="ep-ai-suggestion-card info" style="margin-bottom: 24px;">
    <div class="ep-ai-suggestion-icon"><i class="bi bi-stars"></i></div>
    <div class="ep-ai-suggestion-content">
        <strong>AI Sipariş Analizi</strong>
        <p>Sipariş trendlerini analiz edin, iade oranlarını düşürün, müşteri memnuniyetini artırın.</p>
    </div>
    <button class="ep-btn ep-btn-sm ep-btn-info"><i class="bi bi-stars"></i> Analiz Et</button>
</div>

<div class="ep-stat-grid" style="grid-template-columns: repeat(5, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Toplam</h4><div class="ep-stat-value">1,248</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-cart-check"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Yeni</h4><div class="ep-stat-value" style="color:var(--ep-accent);">87</div></div>
        <div class="ep-stat-icon orange"><i class="bi bi-bell"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Hazırlanıyor</h4><div class="ep-stat-value" style="color:var(--ep-warning);">42</div></div>
        <div class="ep-stat-icon yellow"><i class="bi bi-hourglass-split"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Kargoda</h4><div class="ep-stat-value" style="color:var(--ep-info);">342</div></div>
        <div class="ep-stat-icon teal"><i class="bi bi-truck"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Teslim Edildi</h4><div class="ep-stat-value" style="color:var(--ep-success);">777</div></div>
        <div class="ep-stat-icon green"><i class="bi bi-check-circle"></i></div>
    </div>
</div>

<!-- Pazaryeri Filtreleri -->
<div class="ep-marketplace-tabs">
    <button class="ep-marketplace-tab active">
        <span>Tümü</span> <span class="ep-badge ep-badge-info" style="font-size:10px;">1,248</span>
    </button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-trendyol">TY</span> Trendyol <span class="ep-badge" style="font-size:10px;background:#fff7ed;color:#ea580c;">437</span></button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-hepsiburada">HB</span> Hepsiburada <span class="ep-badge" style="font-size:10px;background:#dbeafe;color:#2563eb;">312</span></button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-n11">N11</span> N11 <span class="ep-badge" style="font-size:10px;background:#f3e8ff;color:#7c3aed;">187</span></button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-ciceksepeti">ÇS</span> Çiçeksepeti</button>
    <button class="ep-marketplace-tab"><span class="mp-icon mp-amazon">AMZ</span> Amazon TR</button>
</div>

<div class="ep-card">
    <div class="ep-card-header">
        <h3><i class="bi bi-list-ul"></i> Sipariş Listesi</h3>
    </div>
    <div class="ep-card-body" style="padding: 0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th><input type="checkbox"></th>
                    <th>SİPARİŞ NO</th>
                    <th>MÜŞTERİ</th>
                    <th>PAZARYERI</th>
                    <th>ÜRÜN</th>
                    <th>TUTAR</th>
                    <th>TARİH</th>
                    <th>DURUM</th>
                    <th>İŞLEM</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox"></td>
                    <td><strong>#TY-8842156</strong></td>
                    <td>Ahmet Yılmaz</td>
                    <td><span class="ep-badge ep-badge-orange">Trendyol</span></td>
                    <td>2 ürün</td>
                    <td style="font-weight:600;">₺1.249,90</td>
                    <td style="font-size:12px;">08.04.2026 14:32</td>
                    <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Onaylandı</span></td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-eye"></i></button></td>
                </tr>
                <tr>
                    <td><input type="checkbox"></td>
                    <td><strong>#HB-3319547</strong></td>
                    <td>Fatma Kaya</td>
                    <td><span class="ep-badge ep-badge-info">Hepsiburada</span></td>
                    <td>1 ürün</td>
                    <td style="font-weight:600;">₺849,00</td>
                    <td style="font-size:12px;">08.04.2026 13:15</td>
                    <td><span class="ep-badge ep-badge-warning"><span class="ep-dot ep-dot-warning"></span>Hazırlanıyor</span></td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-eye"></i></button></td>
                </tr>
                <tr>
                    <td><input type="checkbox"></td>
                    <td><strong>#N11-667234</strong></td>
                    <td>Mehmet Sarı</td>
                    <td><span class="ep-badge" style="background:#f3e8ff;color:#7c3aed;">N11</span></td>
                    <td>3 ürün</td>
                    <td style="font-weight:600;">₺2.450,00</td>
                    <td style="font-size:12px;">08.04.2026 11:45</td>
                    <td><span class="ep-badge ep-badge-info"><span class="ep-dot ep-dot-info"></span>Kargoda</span></td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-eye"></i></button></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

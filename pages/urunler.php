<?php
/**
 * Ürünler — Ürün listesi ve yönetimi
 * 
 * XML feed'lerden gelen ürünlerin listelenmesi, aranması,
 * filtrelenmesi ve düzenlenmesi.
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title">
        <i class="bi bi-box-seam"></i> Ürünler
    </h1>
    <div class="d-flex gap-2">
        <button class="ep-btn ep-btn-outline ep-btn-sm">
            <i class="bi bi-funnel"></i> Filtrele
        </button>
        <button class="ep-btn ep-btn-outline ep-btn-sm">
            <i class="bi bi-download"></i> Dışa Aktar
        </button>
        <button class="ep-btn ep-btn-primary ep-btn-sm">
            <i class="bi bi-plus-lg"></i> Yeni Ürün
        </button>
    </div>
</div>

<!-- Ürün İstatistikleri -->
<div class="ep-stat-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info">
            <h4>Toplam Ürün</h4>
            <div class="ep-stat-value">70,842</div>
        </div>
        <div class="ep-stat-icon blue"><i class="bi bi-box-seam"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info">
            <h4>Aktif</h4>
            <div class="ep-stat-value" style="color: var(--ep-success);">65,210</div>
        </div>
        <div class="ep-stat-icon green"><i class="bi bi-check-circle"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info">
            <h4>Pasif</h4>
            <div class="ep-stat-value" style="color: var(--ep-text-light);">4,892</div>
        </div>
        <div class="ep-stat-icon" style="background:#f1f5f9;color:#64748b;"><i class="bi bi-pause-circle"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info">
            <h4>Stoksuz</h4>
            <div class="ep-stat-value" style="color: var(--ep-danger);">740</div>
        </div>
        <div class="ep-stat-icon red"><i class="bi bi-exclamation-circle"></i></div>
    </div>
</div>

<!-- Arama ve Filtreler -->
<div class="ep-card">
    <div class="ep-card-body" style="padding: 16px 24px;">
        <div class="row g-3 align-items-end">
            <div class="col-md-4">
                <input type="text" class="form-control" placeholder="Ürün adı, SKU veya barkod ara...">
            </div>
            <div class="col-md-2">
                <select class="form-select">
                    <option>Tüm Kategoriler</option>
                    <option>Kılıf</option>
                    <option>Ekran Koruyucu</option>
                    <option>Kablo & Şarj</option>
                </select>
            </div>
            <div class="col-md-2">
                <select class="form-select">
                    <option>Tüm Markalar</option>
                    <option>Evimdeyokyok</option>
                </select>
            </div>
            <div class="col-md-2">
                <select class="form-select">
                    <option>Tüm Durumlar</option>
                    <option>Aktif</option>
                    <option>Pasif</option>
                    <option>Stoksuz</option>
                </select>
            </div>
            <div class="col-md-2">
                <button class="ep-btn ep-btn-secondary w-100"><i class="bi bi-search"></i> Ara</button>
            </div>
        </div>
    </div>
</div>

<!-- Ürün Tablosu -->
<div class="ep-card">
    <div class="ep-card-header">
        <h3><i class="bi bi-table"></i> Ürün Listesi</h3>
        <div class="ep-header-actions">
            <span class="ep-badge ep-badge-info">70,842 ürün</span>
            <button class="ep-btn ep-btn-sm" style="background: rgba(255,255,255,0.15); color: #fff;">
                <i class="bi bi-check2-square"></i> Toplu Seçim
            </button>
        </div>
    </div>
    <div class="ep-card-body" style="padding: 0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th style="width: 30px;"><input type="checkbox"></th>
                    <th>GÖRSEL</th>
                    <th>ÜRÜN ADI</th>
                    <th>SKU</th>
                    <th>FİYAT</th>
                    <th>STOK</th>
                    <th>KATEGORİ</th>
                    <th>DURUM</th>
                    <th>İŞLEM</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox"></td>
                    <td><div style="width:40px;height:40px;background:#f1f5f9;border-radius:6px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-image" style="color:#94a3b8;"></i></div></td>
                    <td><strong>Samsung Galaxy S24 Ultra Kılıf</strong></td>
                    <td style="color: var(--ep-text-light);">bnt_4521</td>
                    <td>₺189,90</td>
                    <td><span class="ep-badge ep-badge-success">124</span></td>
                    <td style="font-size: 12px;">Telefon > Kılıf</td>
                    <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Aktif</span></td>
                    <td>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-pencil"></i></button>
                        <button class="ep-btn ep-btn-sm" style="background:#fef2f2;color:#dc2626;"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox"></td>
                    <td><div style="width:40px;height:40px;background:#f1f5f9;border-radius:6px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-image" style="color:#94a3b8;"></i></div></td>
                    <td><strong>iPhone 15 Pro Max Ekran Koruyucu</strong></td>
                    <td style="color: var(--ep-text-light);">bnt_1289</td>
                    <td>₺79,90</td>
                    <td><span class="ep-badge ep-badge-warning">3</span></td>
                    <td style="font-size: 12px;">Telefon > Ekran Koruyucu</td>
                    <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Aktif</span></td>
                    <td>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-pencil"></i></button>
                        <button class="ep-btn ep-btn-sm" style="background:#fef2f2;color:#dc2626;"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

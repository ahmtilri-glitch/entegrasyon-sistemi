<?php
/**
 * Müşteriler — Müşteri ve abonelik yönetimi (SaaS CRM)
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-people"></i> Müşteriler</h1>
    <div class="d-flex gap-2">
        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-download"></i> Dışa Aktar</button>
        <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-plus-lg"></i> Yeni Müşteri</button>
    </div>
</div>

<div class="ep-stat-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Toplam Müşteri</h4><div class="ep-stat-value">486</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-people"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Aktif Abonelik</h4><div class="ep-stat-value" style="color:var(--ep-success);">412</div></div>
        <div class="ep-stat-icon green"><i class="bi bi-check-circle"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Süresi Dolan</h4><div class="ep-stat-value" style="color:var(--ep-warning);">28</div></div>
        <div class="ep-stat-icon yellow"><i class="bi bi-clock-history"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Aylık Gelir</h4><div class="ep-stat-value" style="color:var(--ep-accent);">₺124K</div></div>
        <div class="ep-stat-icon orange"><i class="bi bi-currency-exchange"></i></div>
    </div>
</div>

<div class="ep-card">
    <div class="ep-card-body" style="padding: 16px 24px;">
        <div class="row g-3 align-items-end">
            <div class="col-md-4">
                <input type="text" class="form-control" placeholder="Müşteri adı, firma veya email ara...">
            </div>
            <div class="col-md-2">
                <select class="form-select">
                    <option>Tüm Paketler</option>
                    <option>Starter</option>
                    <option>Professional</option>
                    <option>Enterprise</option>
                </select>
            </div>
            <div class="col-md-2">
                <select class="form-select">
                    <option>Tüm Durumlar</option>
                    <option>Aktif</option>
                    <option>Pasif</option>
                    <option>Süresi Dolmuş</option>
                </select>
            </div>
            <div class="col-md-2">
                <button class="ep-btn ep-btn-secondary w-100"><i class="bi bi-search"></i> Ara</button>
            </div>
        </div>
    </div>
</div>

<div class="ep-card">
    <div class="ep-card-header">
        <h3><i class="bi bi-table"></i> Müşteri Listesi</h3>
    </div>
    <div class="ep-card-body" style="padding: 0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>FİRMA / MÜŞTERİ</th>
                    <th>EMAIL</th>
                    <th>PAKET</th>
                    <th>BİTİŞ TARİHİ</th>
                    <th>ÜRÜN</th>
                    <th>DURUM</th>
                    <th>İŞLEM</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><strong>Tedarik Türkiye</strong><br><small class="text-muted">Ahmet İleri</small></td>
                    <td>info@tedarikturkiye.com</td>
                    <td><span class="ep-badge ep-badge-orange">Enterprise</span></td>
                    <td>15.12.2026</td>
                    <td>70,842</td>
                    <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Aktif</span></td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-eye"></i></button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><strong>ABC Elektronik</strong><br><small class="text-muted">Mehmet Yılmaz</small></td>
                    <td>info@abcelektronik.com</td>
                    <td><span class="ep-badge ep-badge-info">Professional</span></td>
                    <td>22.08.2026</td>
                    <td>12,450</td>
                    <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Aktif</span></td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-eye"></i></button></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

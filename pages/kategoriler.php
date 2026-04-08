<?php
/**
 * Kategoriler — Ürün kategorileri yönetimi
 * 
 * XML kaynaklarından gelen kategorilerin listelenmesi,
 * düzenlenmesi ve pazaryeri eşleştirmesi.
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title">
        <i class="bi bi-folder2-open"></i> Kategoriler
    </h1>
    <div class="d-flex gap-2">
        <span class="ep-badge ep-badge-info" style="font-size:13px;padding:8px 16px;">4521 Toplam</span>
        <span class="ep-badge ep-badge-success" style="font-size:13px;padding:8px 16px;">569 Aktif</span>
        <button class="ep-btn ep-btn-secondary ep-btn-sm"><i class="bi bi-cloud-download"></i> Hazır Kataloğu Yükle</button>
        <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-plus-lg"></i> Yeni Kategori</button>
    </div>
</div>

<div class="ep-card">
    <div class="ep-card-body" style="padding: 16px 24px;">
        <div class="row g-3 align-items-end">
            <div class="col-md-4">
                <input type="text" class="form-control" placeholder="Kategori ara...">
            </div>
            <div class="col-md-2">
                <button class="ep-btn ep-btn-secondary"><i class="bi bi-search"></i> Ara</button>
            </div>
            <div class="col-md-6 text-end">
                <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-check2-square"></i> Toplu Seçim</button>
            </div>
        </div>
    </div>
</div>

<div class="ep-card">
    <div class="ep-card-header">
        <h3><i class="bi bi-folder2-open"></i> Kategori Listesi</h3>
    </div>
    <div class="ep-card-body" style="padding: 0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th style="width:30px;"><input type="checkbox"></th>
                    <th>#</th>
                    <th>GÖRSEL</th>
                    <th>KATEGORİ ADI</th>
                    <th>ÜST KATEGORİ</th>
                    <th>ÜRÜN</th>
                    <th>DURUM</th>
                    <th>İŞLEM</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox"></td>
                    <td>1761</td>
                    <td><div style="width:36px;height:36px;background:#fff7ed;border-radius:6px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-folder" style="color:#ea580c;"></i></div></td>
                    <td><strong>Kılıf</strong><br><small class="text-muted">Telefon & Aksesuarları > Cep Telefonu Aksesuarları > Kılıf</small></td>
                    <td>Telefon & Aksesuarları > Cep Telefonu Aksesuarları</td>
                    <td><span class="ep-badge ep-badge-info">4208 ürün</span></td>
                    <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Aktif</span></td>
                    <td>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-pencil"></i> Düzenle</button>
                        <button class="ep-btn ep-btn-sm" style="background:#fef2f2;color:#dc2626;"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox"></td>
                    <td>7858</td>
                    <td><div style="width:36px;height:36px;background:#fff7ed;border-radius:6px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-folder" style="color:#ea580c;"></i></div></td>
                    <td><strong>Vida & Çivi & Dübel</strong><br><small class="text-muted">Banyo Yapı & Hırdavat > Hırdavat > Vida & Çivi & Dübel</small></td>
                    <td>Banyo Yapı & Hırdavat > Hırdavat</td>
                    <td><span class="ep-badge ep-badge-info">2248 ürün</span></td>
                    <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Aktif</span></td>
                    <td>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-pencil"></i> Düzenle</button>
                        <button class="ep-btn ep-btn-sm" style="background:#fef2f2;color:#dc2626;"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

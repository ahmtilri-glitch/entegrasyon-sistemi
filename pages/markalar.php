<?php
/**
 * Markalar — Ürün markaları yönetimi
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-tags"></i> Markalar</h1>
    <div class="d-flex gap-2">
        <span class="ep-badge ep-badge-info" style="font-size:13px;padding:8px 16px;">1 Toplam</span>
        <span class="ep-badge ep-badge-success" style="font-size:13px;padding:8px 16px;">1 Aktif</span>
        <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-plus-lg"></i> Yeni Marka</button>
    </div>
</div>

<div class="ep-card">
    <div class="ep-card-body" style="padding: 16px 24px;">
        <div class="row g-3">
            <div class="col-md-4">
                <input type="text" class="form-control" placeholder="Marka ara...">
            </div>
            <div class="col-md-2">
                <button class="ep-btn ep-btn-secondary"><i class="bi bi-search"></i> Ara</button>
            </div>
        </div>
    </div>
</div>

<div class="ep-card">
    <div class="ep-card-header">
        <h3><i class="bi bi-tags"></i> Marka Listesi</h3>
    </div>
    <div class="ep-card-body" style="padding: 0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>LOGO</th>
                    <th>MARKA ADI</th>
                    <th>ÜRÜN</th>
                    <th>DURUM</th>
                    <th>İŞLEM</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><div style="width:40px;height:40px;background:#f1f5f9;border-radius:6px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-image" style="color:#94a3b8;"></i></div></td>
                    <td><strong>Evimdeyokyok</strong></td>
                    <td><span class="ep-badge ep-badge-info">14228 ürün</span></td>
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

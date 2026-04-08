<?php
/**
 * Loglar — Sistem logları ve aktivite geçmişi
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-terminal"></i> Sistem Logları</h1>
    <div class="d-flex gap-2">
        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-trash"></i> Logları Temizle</button>
        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-download"></i> Dışa Aktar</button>
    </div>
</div>

<div class="ep-card" style="margin-bottom: 24px;">
    <div class="ep-card-body" style="padding: 16px 24px;">
        <div class="row g-3 align-items-end">
            <div class="col-md-3">
                <label class="form-label fw-bold">Log Türü</label>
                <select class="form-select">
                    <option>Tümü</option>
                    <option>API İstekleri</option>
                    <option>Sipariş İşlemleri</option>
                    <option>Stok Güncellemeleri</option>
                    <option>Hatalar</option>
                    <option>Kullanıcı İşlemleri</option>
                </select>
            </div>
            <div class="col-md-3">
                <label class="form-label fw-bold">Seviye</label>
                <select class="form-select">
                    <option>Tümü</option>
                    <option>Info</option>
                    <option>Warning</option>
                    <option>Error</option>
                    <option>Critical</option>
                </select>
            </div>
            <div class="col-md-3">
                <label class="form-label fw-bold">Tarih Aralığı</label>
                <select class="form-select">
                    <option>Son 1 Saat</option>
                    <option selected>Son 24 Saat</option>
                    <option>Son 7 Gün</option>
                    <option>Son 30 Gün</option>
                </select>
            </div>
            <div class="col-md-3">
                <button class="ep-btn ep-btn-secondary w-100"><i class="bi bi-funnel"></i> Filtrele</button>
            </div>
        </div>
    </div>
</div>

<div class="ep-card">
    <div class="ep-card-header">
        <h3><i class="bi bi-list-ul"></i> Log Kayıtları</h3>
        <span class="ep-badge ep-badge-info" style="font-size:11px;">Son 24 saat — 1,247 kayıt</span>
    </div>
    <div class="ep-card-body" style="padding:0;">
        <table class="ep-table" style="font-size:12px;">
            <thead>
                <tr>
                    <th>ZAMAN</th>
                    <th>SEVİYE</th>
                    <th>KAYNAK</th>
                    <th>MESAJ</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="white-space:nowrap;">14:32:15</td>
                    <td><span class="ep-badge ep-badge-success" style="font-size:10px;">INFO</span></td>
                    <td>Trendyol API</td>
                    <td>Sipariş #TY-8842156 başarıyla çekildi</td>
                </tr>
                <tr>
                    <td style="white-space:nowrap;">14:30:02</td>
                    <td><span class="ep-badge ep-badge-success" style="font-size:10px;">INFO</span></td>
                    <td>Stok Senkron</td>
                    <td>245 ürün stok güncellendi (Hepsiburada)</td>
                </tr>
                <tr style="background:#fef2f2;">
                    <td style="white-space:nowrap;">14:28:45</td>
                    <td><span class="ep-badge ep-badge-danger" style="font-size:10px;">ERROR</span></td>
                    <td>Amazon TR API</td>
                    <td>401 Unauthorized — Token süresi dolmuş. Yeniden bağlanın.</td>
                </tr>
                <tr>
                    <td style="white-space:nowrap;">14:25:11</td>
                    <td><span class="ep-badge ep-badge-warning" style="font-size:10px;">WARN</span></td>
                    <td>XML Feed</td>
                    <td>Feed #3 (Toptan Gidiyor) — 12 ürün SKU eksik</td>
                </tr>
                <tr>
                    <td style="white-space:nowrap;">14:22:33</td>
                    <td><span class="ep-badge ep-badge-success" style="font-size:10px;">INFO</span></td>
                    <td>Kargo</td>
                    <td>Yurtiçi Kargo — 15 gönderi oluşturuldu</td>
                </tr>
                <tr>
                    <td style="white-space:nowrap;">14:18:07</td>
                    <td><span class="ep-badge ep-badge-success" style="font-size:10px;">INFO</span></td>
                    <td>Fatura</td>
                    <td>e-Fatura #EPR-2026-004521 başarıyla kesildi</td>
                </tr>
                <tr style="background:#fef2f2;">
                    <td style="white-space:nowrap;">14:15:22</td>
                    <td><span class="ep-badge ep-badge-danger" style="font-size:10px;">ERROR</span></td>
                    <td>N11 API</td>
                    <td>500 Internal Server Error — Kategori listesi alınamadı</td>
                </tr>
                <tr>
                    <td style="white-space:nowrap;">14:10:55</td>
                    <td><span class="ep-badge ep-badge-success" style="font-size:10px;">INFO</span></td>
                    <td>Kullanıcı</td>
                    <td>admin@tedarikturkiye.com oturum açtı</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

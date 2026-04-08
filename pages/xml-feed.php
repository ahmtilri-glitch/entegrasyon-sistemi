<?php
/**
 * XML Feed — Tedarikçi XML beslemeleri yönetimi
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-filetype-xml"></i> XML Feed Yönetimi</h1>
    <div class="d-flex gap-2">
        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-arrow-repeat"></i> Tümünü Güncelle</button>
        <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-plus-lg"></i> Yeni Feed Ekle</button>
    </div>
</div>

<!-- AI Öneri -->
<div class="ep-ai-suggestion-card info" style="margin-bottom: 24px;">
    <div class="ep-ai-suggestion-icon"><i class="bi bi-stars"></i></div>
    <div class="ep-ai-suggestion-content">
        <strong>AI Akıllı XML Eşleştirme</strong>
        <p>XML alanlarını otomatik olarak eşleştirin. AI, tedarikçi formatını tanıyıp doğru alanları önerir.</p>
    </div>
    <button class="ep-btn ep-btn-sm ep-btn-info"><i class="bi bi-stars"></i> AI ile Eşleştir</button>
</div>

<div class="ep-stat-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Toplam Feed</h4><div class="ep-stat-value">6</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-filetype-xml"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Aktif</h4><div class="ep-stat-value" style="color:var(--ep-success);">4</div></div>
        <div class="ep-stat-icon green"><i class="bi bi-check-circle"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Toplam Ürün</h4><div class="ep-stat-value">70,842</div></div>
        <div class="ep-stat-icon orange"><i class="bi bi-box-seam"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Son Güncelleme</h4><div class="ep-stat-value" style="font-size:16px;">15 dk önce</div></div>
        <div class="ep-stat-icon teal"><i class="bi bi-clock"></i></div>
    </div>
</div>

<div class="ep-card">
    <div class="ep-card-header">
        <h3><i class="bi bi-list-ul"></i> Feed Listesi</h3>
    </div>
    <div class="ep-card-body" style="padding: 0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>TEDARİKÇİ</th>
                    <th>URL / DOSYA</th>
                    <th>ÜRÜN</th>
                    <th>YENİ</th>
                    <th>SON AKTARIM</th>
                    <th>DURUM</th>
                    <th>İŞLEM</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><strong>Bant Marketim</strong></td>
                    <td style="font-size:11px;color:var(--ep-text-light);max-width:200px;overflow:hidden;text-overflow:ellipsis;">https://bantmarketim.com/feed.xml</td>
                    <td><span class="ep-badge ep-badge-info">531</span></td>
                    <td><span class="ep-badge ep-badge-success">1</span></td>
                    <td style="font-size:12px;">05.04.2026 08:20</td>
                    <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Tamamlandı</span></td>
                    <td>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-arrow-repeat"></i></button>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-pencil"></i></button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><strong>Selda Elektirik</strong></td>
                    <td style="font-size:11px;color:var(--ep-text-light);">https://seldaelektrik.com/xml</td>
                    <td><span class="ep-badge ep-badge-info">215</span></td>
                    <td><span class="ep-badge ep-badge-secondary">0</span></td>
                    <td style="font-size:12px;">05.04.2026 11:20</td>
                    <td><span class="ep-badge ep-badge-success"><span class="ep-dot ep-dot-success"></span>Tamamlandı</span></td>
                    <td>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-arrow-repeat"></i></button>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-pencil"></i></button>
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td><strong>Toptan Gidiyor</strong></td>
                    <td style="font-size:11px;color:var(--ep-text-light);">https://toptangidiyor.com/feed</td>
                    <td><span class="ep-badge ep-badge-info">21,934</span></td>
                    <td><span class="ep-badge ep-badge-success">45</span></td>
                    <td style="font-size:12px;">08.04.2026 17:55</td>
                    <td><span class="ep-badge ep-badge-warning"><span class="ep-dot ep-dot-warning"></span>Hazır</span></td>
                    <td>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-arrow-repeat"></i></button>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-pencil"></i></button>
                    </td>
                </tr>
                <tr>
                    <td>4</td>
                    <td><strong>İtedarik_3</strong></td>
                    <td style="font-size:11px;color:var(--ep-text-light);">https://itedarik.com/api/feed</td>
                    <td><span class="ep-badge ep-badge-info">7,737</span></td>
                    <td><span class="ep-badge ep-badge-success">12</span></td>
                    <td style="font-size:12px;">07.04.2026 14:16</td>
                    <td><span class="ep-badge ep-badge-orange">Çalışıyor %50</span></td>
                    <td>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-arrow-repeat"></i></button>
                        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-pencil"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

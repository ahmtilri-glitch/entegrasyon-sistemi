<?php
/**
 * Nitelikler — Ürün varyant nitelikleri (Renk, Beden, Materyal vb.)
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-sliders"></i> Nitelikler</h1>
</div>

<div class="row g-4">
    <!-- Sol: Nitelik Listesi -->
    <div class="col-md-6">
        <div class="ep-card">
            <div class="ep-card-header">
                <h3>Nitelik Listesi</h3>
                <span class="ep-badge" style="background:rgba(255,255,255,0.2);color:#fff;">1 Adet</span>
            </div>
            <div class="ep-card-body" style="padding:0;">
                <table class="ep-table">
                    <thead>
                        <tr>
                            <th>NİTELİK ADI</th>
                            <th>TİP</th>
                            <th>DEĞERLER</th>
                            <th>İŞLEM</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Beden</strong></td>
                            <td><span class="ep-badge ep-badge-info">Metin</span></td>
                            <td><span class="ep-badge ep-badge-secondary">9 değer</span></td>
                            <td>
                                <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-pencil"></i></button>
                                <button class="ep-btn ep-btn-sm" style="background:#fef2f2;color:#dc2626;"><i class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Yeni Nitelik Formu -->
        <div class="ep-card">
            <div class="ep-card-body">
                <h5 style="margin-bottom:16px;font-weight:600;">+ Yeni Nitelik</h5>
                <div class="mb-3">
                    <label class="form-label fw-bold">Nitelik Adı *</label>
                    <input type="text" class="form-control" placeholder="örn: Renk">
                </div>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Tip</label>
                        <select class="form-select"><option>Metin</option><option>Sayı</option><option>Renk</option></select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Sıra</label>
                        <input type="number" class="form-control" value="0">
                    </div>
                </div>
                <button class="ep-btn ep-btn-primary w-100 mt-3"><i class="bi bi-plus-lg"></i> Ekle</button>
            </div>
        </div>
    </div>
    
    <!-- Sağ: Değer Listesi -->
    <div class="col-md-6">
        <div class="ep-card">
            <div class="ep-card-header">
                <h3><i class="bi bi-list-ul"></i> Değer Listesi</h3>
            </div>
            <div class="ep-card-body text-center" style="padding: 60px 24px; color: var(--ep-text-light);">
                <i class="bi bi-arrow-left" style="font-size: 24px;"></i>
                <p class="mt-2">Soldaki listeden bir niteliğe tıklayarak değerlerini görüntüleyin ve ekleyin.</p>
                <p style="font-size:12px;">Örn: "Renk" niteliğine Kırmızı, Mavi, Yeşil değerleri ekleyin.</p>
            </div>
        </div>
    </div>
</div>

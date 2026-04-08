<?php
/**
 * Ön Muhasebe — Gelir-gider, tahsilat, kâr/zarar
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-calculator"></i> Ön Muhasebe</h1>
    <div class="d-flex gap-2">
        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-download"></i> Rapor İndir</button>
        <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-plus-lg"></i> Yeni Kayıt</button>
    </div>
</div>

<div class="ep-stat-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Toplam Gelir</h4><div class="ep-stat-value" style="color:var(--ep-success);">₺2.85M</div></div>
        <div class="ep-stat-icon green"><i class="bi bi-arrow-up-circle"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Toplam Gider</h4><div class="ep-stat-value" style="color:var(--ep-danger);">₺1.92M</div></div>
        <div class="ep-stat-icon red"><i class="bi bi-arrow-down-circle"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Net Kâr</h4><div class="ep-stat-value" style="color:var(--ep-success);">₺930K</div></div>
        <div class="ep-stat-icon orange"><i class="bi bi-cash-stack"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Bekleyen Tahsilat</h4><div class="ep-stat-value" style="color:var(--ep-warning);">₺245K</div></div>
        <div class="ep-stat-icon yellow"><i class="bi bi-hourglass-split"></i></div>
    </div>
</div>

<div class="ep-ai-suggestion-card info" style="margin-bottom: 24px;">
    <div class="ep-ai-suggestion-icon"><i class="bi bi-stars"></i></div>
    <div class="ep-ai-suggestion-content">
        <strong>AI Finansal Analiz</strong>
        <p>Gelir-gider trendlerinizi analiz edin, nakit akışı tahminleri oluşturun ve tasarruf fırsatlarını keşfedin.</p>
    </div>
    <button class="ep-btn ep-btn-sm ep-btn-info"><i class="bi bi-stars"></i> Analiz Et</button>
</div>

<div class="ep-card">
    <div class="ep-card-header">
        <h3><i class="bi bi-table"></i> Son İşlemler</h3>
    </div>
    <div class="ep-card-body" style="padding: 0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th>TARİH</th>
                    <th>AÇIKLAMA</th>
                    <th>KATEGORİ</th>
                    <th>TİP</th>
                    <th>TUTAR</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>08.04.2026</td>
                    <td><strong>Trendyol Komisyon Ödemesi</strong></td>
                    <td><span class="ep-badge ep-badge-secondary">Komisyon</span></td>
                    <td><span class="ep-badge ep-badge-danger">Gider</span></td>
                    <td style="color:var(--ep-danger);font-weight:600;">-₺14,250</td>
                </tr>
                <tr>
                    <td>07.04.2026</td>
                    <td><strong>Hepsiburada Satış Geliri</strong></td>
                    <td><span class="ep-badge ep-badge-secondary">Satış</span></td>
                    <td><span class="ep-badge ep-badge-success">Gelir</span></td>
                    <td style="color:var(--ep-success);font-weight:600;">+₺48,900</td>
                </tr>
                <tr>
                    <td>06.04.2026</td>
                    <td><strong>Kargo Gideri — Yurtiçi</strong></td>
                    <td><span class="ep-badge ep-badge-secondary">Kargo</span></td>
                    <td><span class="ep-badge ep-badge-danger">Gider</span></td>
                    <td style="color:var(--ep-danger);font-weight:600;">-₺3,450</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

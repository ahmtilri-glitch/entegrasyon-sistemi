<?php
/**
 * SEO — AI destekli SEO yönetimi
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-search-heart"></i> SEO Yönetimi</h1>
    <button class="ep-btn ep-btn-primary ep-btn-sm"><i class="bi bi-stars"></i> AI ile Toplu SEO Oluştur</button>
</div>

<!-- AI SEO Banner -->
<div class="ep-ai-banner" style="margin-bottom: 24px;">
    <div class="ep-ai-banner-glow"></div>
    <div class="ep-ai-banner-content">
        <div class="ep-ai-banner-left">
            <div class="ep-ai-avatar"><i class="bi bi-search-heart"></i></div>
            <div>
                <h3>AI SEO Asistanı</h3>
                <p>Yapay zeka ile ürün başlıklarını, meta açıklamalarını ve anahtar kelimeleri otomatik oluşturun. Google sıralamalarınızı yükseltin.</p>
            </div>
        </div>
        <div class="ep-ai-banner-actions">
            <button class="ep-ai-suggest-btn"><i class="bi bi-pencil-square"></i> Başlık Oluştur</button>
            <button class="ep-ai-suggest-btn"><i class="bi bi-body-text"></i> Meta Açıklama</button>
            <button class="ep-ai-suggest-btn"><i class="bi bi-diagram-2"></i> Sitemap</button>
        </div>
    </div>
</div>

<div class="ep-stat-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>SEO Puanı</h4><div class="ep-stat-value" style="color:var(--ep-success);">78/100</div></div>
        <div class="ep-stat-icon green"><i class="bi bi-speedometer2"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Eksik Meta</h4><div class="ep-stat-value" style="color:var(--ep-danger);">1,240</div></div>
        <div class="ep-stat-icon red"><i class="bi bi-exclamation-circle"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>İndekslenen</h4><div class="ep-stat-value">65,210</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-google"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Sitemap</h4><div class="ep-stat-value" style="color:var(--ep-success);">Aktif</div></div>
        <div class="ep-stat-icon teal"><i class="bi bi-diagram-2"></i></div>
    </div>
</div>

<div class="ep-ai-suggestions" style="margin-bottom: 24px;">
    <div class="ep-ai-suggestion-card warning">
        <div class="ep-ai-suggestion-icon"><i class="bi bi-exclamation-triangle"></i></div>
        <div class="ep-ai-suggestion-content">
            <strong>1,240 ürünün meta açıklaması eksik</strong>
            <p>AI ile otomatik oluşturun. Tahmini süre: ~5 dakika.</p>
        </div>
        <button class="ep-btn ep-btn-sm ep-btn-warning"><i class="bi bi-stars"></i> Oluştur</button>
    </div>
    <div class="ep-ai-suggestion-card success">
        <div class="ep-ai-suggestion-icon"><i class="bi bi-check-circle"></i></div>
        <div class="ep-ai-suggestion-content">
            <strong>Sitemap güncel</strong>
            <p>70,842 URL içeriyor. Son güncelleme: 2 saat önce.</p>
        </div>
    </div>
</div>

<div class="ep-card">
    <div class="ep-card-header">
        <h3><i class="bi bi-table"></i> SEO Durumu — Ürünler</h3>
    </div>
    <div class="ep-card-body" style="padding: 0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th>ÜRÜN</th>
                    <th>BAŞLIK</th>
                    <th>META AÇIKLAMA</th>
                    <th>PUAN</th>
                    <th>İŞLEM</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Samsung Galaxy S24 Kılıf</strong></td>
                    <td><span class="ep-badge ep-badge-success">Var</span></td>
                    <td><span class="ep-badge ep-badge-success">Var</span></td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <div class="ep-progress" style="width:60px;"><div class="ep-progress-bar green" style="width:92%;"></div></div>
                            <span style="font-size:12px;font-weight:600;color:var(--ep-success);">92</span>
                        </div>
                    </td>
                    <td><button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-pencil"></i></button></td>
                </tr>
                <tr>
                    <td><strong>USB-C Hızlı Şarj Kablosu</strong></td>
                    <td><span class="ep-badge ep-badge-success">Var</span></td>
                    <td><span class="ep-badge ep-badge-danger">Eksik</span></td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <div class="ep-progress" style="width:60px;"><div class="ep-progress-bar orange" style="width:45%;"></div></div>
                            <span style="font-size:12px;font-weight:600;color:var(--ep-accent);">45</span>
                        </div>
                    </td>
                    <td>
                        <button class="ep-btn ep-btn-sm ep-btn-info"><i class="bi bi-stars"></i> AI Oluştur</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

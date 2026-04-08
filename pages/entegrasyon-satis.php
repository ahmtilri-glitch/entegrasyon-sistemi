<?php
/**
 * Entegrasyon Satış — Paket ve fiyatlandırma yönetimi
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');

$paketler = [
    [
        'name' => 'Starter',
        'price' => '₺1.490',
        'period' => '/ay',
        'color' => '#2563eb',
        'badge' => '',
        'features' => [
            '3 Pazaryeri Entegrasyonu',
            '5.000 Ürün Limiti',
            '1 Kullanıcı',
            'Temel Sipariş Yönetimi',
            '1 Kargo Entegrasyonu',
            'E-posta Destek',
            'Temel Raporlar',
        ],
        'disabled' => [
            'AI Destekli Eşleştirme',
            'ERP Entegrasyonu',
            'Sanal POS',
            'API Erişimi',
        ],
        'customers' => 142,
    ],
    [
        'name' => 'Professional',
        'price' => '₺3.490',
        'period' => '/ay',
        'color' => '#ea580c',
        'badge' => 'En Popüler',
        'features' => [
            '8 Pazaryeri Entegrasyonu',
            '25.000 Ürün Limiti',
            '3 Kullanıcı',
            'Gelişmiş Sipariş Yönetimi',
            '4 Kargo Entegrasyonu',
            'Öncelikli Destek',
            'Gelişmiş Raporlar',
            'AI Destekli Eşleştirme',
            'E-Fatura Entegrasyonu',
            'SEO Araçları',
        ],
        'disabled' => [
            'ERP Entegrasyonu',
            'Özel API Erişimi',
        ],
        'customers' => 218,
    ],
    [
        'name' => 'Enterprise',
        'price' => '₺7.990',
        'period' => '/ay',
        'color' => '#7c3aed',
        'badge' => 'Tam Özellik',
        'features' => [
            '12+ Pazaryeri Entegrasyonu',
            'Sınırsız Ürün',
            'Sınırsız Kullanıcı',
            'Tam Sipariş Yönetimi',
            'Tüm Kargo Firmaları',
            '7/24 Öncelikli Destek',
            'Özel Raporlar & Dashboard',
            'AI Destekli Eşleştirme',
            'E-Fatura + GİB Entegrasyonu',
            'Gelişmiş SEO Paketi',
            'ERP Entegrasyonu (SAP, Logo, Mikro)',
            'Sanal POS Entegrasyonu',
            'Özel API Erişimi',
            'Müşteri Yönetimi (CRM)',
        ],
        'disabled' => [],
        'customers' => 126,
    ],
];
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-box-seam"></i> Entegrasyon Paketleri</h1>
    <div class="d-flex gap-2">
        <button class="ep-btn ep-btn-outline ep-btn-sm"><i class="bi bi-bar-chart"></i> Satış Raporu</button>
        <button class="ep-btn ep-btn-primary ep-btn-sm" onclick="document.getElementById('paketEkleModal').style.display='flex'"><i class="bi bi-plus-lg"></i> Yeni Paket Ekle</button>
    </div>
</div>

<!-- Satış İstatistikleri -->
<div class="ep-stat-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Toplam Müşteri</h4><div class="ep-stat-value">486</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-people"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Aylık Gelir</h4><div class="ep-stat-value" style="color:var(--ep-success);">₺1.24M</div></div>
        <div class="ep-stat-icon green"><i class="bi bi-currency-exchange"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Yeni Kayıt (Bu Ay)</h4><div class="ep-stat-value" style="color:var(--ep-accent);">34</div></div>
        <div class="ep-stat-icon orange"><i class="bi bi-person-plus"></i></div>
    </div>
    <div class="ep-stat-card">
        <div class="ep-stat-info"><h4>Yenileme Oranı</h4><div class="ep-stat-value" style="color:var(--ep-info);">%92</div></div>
        <div class="ep-stat-icon blue"><i class="bi bi-arrow-repeat"></i></div>
    </div>
</div>

<div class="ep-ai-suggestion-card info" style="margin-bottom: 24px;">
    <div class="ep-ai-suggestion-icon"><i class="bi bi-stars"></i></div>
    <div class="ep-ai-suggestion-content">
        <strong>AI Fiyatlandırma Önerisi</strong>
        <p>Rakip analizi sonuçlarına göre Professional paket fiyatı piyasa ortalamasının %12 altında. Fiyat optimizasyonu yapabilirsiniz.</p>
    </div>
</div>

<!-- Paket Kartları -->
<div class="ep-pricing-grid">
    <?php foreach ($paketler as $i => $paket): ?>
    <div class="ep-pricing-card <?= $paket['badge'] === 'En Popüler' ? 'ep-pricing-popular' : '' ?>">
        <?php if ($paket['badge']): ?>
        <div class="ep-pricing-badge" style="background:<?= $paket['color'] ?>;"><?= $paket['badge'] ?></div>
        <?php endif; ?>
        
        <div class="ep-pricing-header" style="border-bottom-color:<?= $paket['color'] ?>;">
            <h3 style="color:<?= $paket['color'] ?>;"><?= $paket['name'] ?></h3>
            <div class="ep-pricing-price">
                <span class="ep-pricing-amount"><?= $paket['price'] ?></span>
                <span class="ep-pricing-period"><?= $paket['period'] ?></span>
            </div>
            <div class="ep-pricing-customers">
                <i class="bi bi-people"></i> <?= $paket['customers'] ?> aktif müşteri
            </div>
        </div>
        
        <div class="ep-pricing-body">
            <ul class="ep-pricing-features">
                <?php foreach ($paket['features'] as $feature): ?>
                <li class="ep-feature-included">
                    <i class="bi bi-check-circle-fill" style="color:<?= $paket['color'] ?>;"></i>
                    <?= $feature ?>
                </li>
                <?php endforeach; ?>
                <?php foreach ($paket['disabled'] as $feature): ?>
                <li class="ep-feature-disabled">
                    <i class="bi bi-x-circle" style="color:#cbd5e1;"></i>
                    <?= $feature ?>
                </li>
                <?php endforeach; ?>
            </ul>
        </div>
        
        <div class="ep-pricing-footer">
            <button class="ep-btn ep-btn-outline ep-btn-sm" style="border-color:<?= $paket['color'] ?>;color:<?= $paket['color'] ?>;">
                <i class="bi bi-pencil"></i> Düzenle
            </button>
            <button class="ep-btn ep-btn-sm" style="background:<?= $paket['color'] ?>;color:#fff;">
                <i class="bi bi-eye"></i> Önizle
            </button>
        </div>
    </div>
    <?php endforeach; ?>
</div>

<!-- Paket Karşılaştırma Tablosu -->
<div class="ep-card" style="margin-top: 24px;">
    <div class="ep-card-header">
        <h3><i class="bi bi-table"></i> Paket Karşılaştırma</h3>
    </div>
    <div class="ep-card-body" style="padding: 0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th>ÖZELLİK</th>
                    <th style="text-align:center;">STARTER</th>
                    <th style="text-align:center;">PROFESSIONAL</th>
                    <th style="text-align:center;">ENTERPRISE</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Pazaryeri Entegrasyonu</td>
                    <td style="text-align:center;">3</td>
                    <td style="text-align:center;">8</td>
                    <td style="text-align:center;">12+</td>
                </tr>
                <tr>
                    <td>Ürün Limiti</td>
                    <td style="text-align:center;">5.000</td>
                    <td style="text-align:center;">25.000</td>
                    <td style="text-align:center;">Sınırsız</td>
                </tr>
                <tr>
                    <td>Kullanıcı</td>
                    <td style="text-align:center;">1</td>
                    <td style="text-align:center;">3</td>
                    <td style="text-align:center;">Sınırsız</td>
                </tr>
                <tr>
                    <td>AI Eşleştirme</td>
                    <td style="text-align:center;"><i class="bi bi-x-lg" style="color:#dc2626;"></i></td>
                    <td style="text-align:center;"><i class="bi bi-check-lg" style="color:#16a34a;"></i></td>
                    <td style="text-align:center;"><i class="bi bi-check-lg" style="color:#16a34a;"></i></td>
                </tr>
                <tr>
                    <td>Kargo Entegrasyonu</td>
                    <td style="text-align:center;">1</td>
                    <td style="text-align:center;">4</td>
                    <td style="text-align:center;">Tümü</td>
                </tr>
                <tr>
                    <td>E-Fatura</td>
                    <td style="text-align:center;"><i class="bi bi-x-lg" style="color:#dc2626;"></i></td>
                    <td style="text-align:center;"><i class="bi bi-check-lg" style="color:#16a34a;"></i></td>
                    <td style="text-align:center;"><i class="bi bi-check-lg" style="color:#16a34a;"></i></td>
                </tr>
                <tr>
                    <td>ERP Entegrasyonu</td>
                    <td style="text-align:center;"><i class="bi bi-x-lg" style="color:#dc2626;"></i></td>
                    <td style="text-align:center;"><i class="bi bi-x-lg" style="color:#dc2626;"></i></td>
                    <td style="text-align:center;"><i class="bi bi-check-lg" style="color:#16a34a;"></i></td>
                </tr>
                <tr>
                    <td>Sanal POS</td>
                    <td style="text-align:center;"><i class="bi bi-x-lg" style="color:#dc2626;"></i></td>
                    <td style="text-align:center;"><i class="bi bi-x-lg" style="color:#dc2626;"></i></td>
                    <td style="text-align:center;"><i class="bi bi-check-lg" style="color:#16a34a;"></i></td>
                </tr>
                <tr>
                    <td>API Erişimi</td>
                    <td style="text-align:center;"><i class="bi bi-x-lg" style="color:#dc2626;"></i></td>
                    <td style="text-align:center;"><i class="bi bi-x-lg" style="color:#dc2626;"></i></td>
                    <td style="text-align:center;"><i class="bi bi-check-lg" style="color:#16a34a;"></i></td>
                </tr>
                <tr>
                    <td>Destek</td>
                    <td style="text-align:center;">E-posta</td>
                    <td style="text-align:center;">Öncelikli</td>
                    <td style="text-align:center;">7/24 VIP</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<!-- Paket Ekleme Modal -->
<div id="paketEkleModal" class="ep-modal-overlay" style="display:none;">
    <div class="ep-modal">
        <div class="ep-modal-header">
            <h3><i class="bi bi-plus-circle"></i> Yeni Paket Ekle</h3>
            <button class="ep-modal-close" onclick="document.getElementById('paketEkleModal').style.display='none'">&times;</button>
        </div>
        <div class="ep-modal-body">
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">Paket Adı</label>
                    <input type="text" class="form-control" placeholder="Örn: Premium">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Fiyat (₺)</label>
                    <input type="number" class="form-control" placeholder="4990">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Periyot</label>
                    <select class="form-select">
                        <option>/ay</option>
                        <option>/yıl</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Pazaryeri Limiti</label>
                    <input type="number" class="form-control" placeholder="5">
                </div>
                <div class="col-md-4">
                    <label class="form-label">Ürün Limiti</label>
                    <input type="number" class="form-control" placeholder="10000">
                </div>
                <div class="col-md-4">
                    <label class="form-label">Kullanıcı Limiti</label>
                    <input type="number" class="form-control" placeholder="2">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Tema Rengi</label>
                    <input type="color" class="form-control form-control-color" value="#ea580c">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Rozet</label>
                    <input type="text" class="form-control" placeholder="Örn: Yeni, Popüler">
                </div>
                <div class="col-12">
                    <label class="form-label">Özellikler (her satıra bir özellik)</label>
                    <textarea class="form-control" rows="5" placeholder="AI Destekli Eşleştirme&#10;5 Kargo Entegrasyonu&#10;E-Fatura Entegrasyonu"></textarea>
                </div>
            </div>
        </div>
        <div class="ep-modal-footer">
            <button class="ep-btn ep-btn-secondary" onclick="document.getElementById('paketEkleModal').style.display='none'">İptal</button>
            <button class="ep-btn ep-btn-primary"><i class="bi bi-check-lg"></i> Paketi Kaydet</button>
        </div>
    </div>
</div>

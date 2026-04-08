<?php
/**
 * Toplu İşlemler — Toplu ürün gönderimi
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>

<div class="ep-section-header">
    <h1 class="ep-section-title"><i class="bi bi-collection"></i> Toplu Ürün Gönder</h1>
    <span style="font-size:13px;color:var(--ep-text-light);">Kategori eşleştirmesi yapılmayan ürünler kesinlikle gönderilemez</span>
</div>

<!-- AI Banner -->
<div class="ep-ai-suggestion-card info" style="margin-bottom: 24px;">
    <div class="ep-ai-suggestion-icon"><i class="bi bi-stars"></i></div>
    <div class="ep-ai-suggestion-content">
        <strong>Yapay Zeka Destekli Ürün Eşleştirme</strong>
        <p>Sitenizdeki ürünlerle paneldeki ürünleri yapay zeka destekli kurallarla eşleştirerek işlemleri hızlandırın.</p>
    </div>
    <button class="ep-btn ep-btn-sm ep-btn-info"><i class="bi bi-stars"></i> AI Eşleştir</button>
</div>

<!-- Pazaryeri Seçimi -->
<div class="ep-marketplace-tabs">
    <button class="ep-marketplace-tab active"><img src="assets/images/marketplaces/trendyol.svg" alt="Trendyol" class="ep-tab-logo"> Trendyol</button>
    <button class="ep-marketplace-tab"><img src="assets/images/marketplaces/hepsiburada.svg" alt="Hepsiburada" class="ep-tab-logo"> Hepsiburada</button>
    <button class="ep-marketplace-tab"><img src="assets/images/marketplaces/n11.svg" alt="N11" class="ep-tab-logo"> N11</button>
    <button class="ep-marketplace-tab"><img src="assets/images/marketplaces/ciceksepeti.svg" alt="Çiçeksepeti" class="ep-tab-logo"> Çiçeksepeti</button>
    <button class="ep-marketplace-tab"><img src="assets/images/marketplaces/koctas.svg" alt="Koçtaş" class="ep-tab-logo"> Koçtaş</button>
    <button class="ep-marketplace-tab"><img src="assets/images/marketplaces/teknosa.svg" alt="Teknosa" class="ep-tab-logo"> Teknosa</button>
    <button class="ep-marketplace-tab"><img src="assets/images/marketplaces/mediamarkt.svg" alt="MediaMarkt" class="ep-tab-logo"> MediaMarkt</button>
    <button class="ep-marketplace-tab"><img src="assets/images/marketplaces/pazarama.svg" alt="Pazarama" class="ep-tab-logo"> Pazarama</button>
</div>

<div class="ep-card">
    <div class="ep-card-header">
        <h3>Ürün Eşleştirme Merkezi — Trendyol</h3>
    </div>
    <div class="ep-card-body" style="padding: 0;">
        <table class="ep-table">
            <thead>
                <tr>
                    <th>SIRA</th>
                    <th>PAZARYERİ</th>
                    <th>DURUM</th>
                    <th>TOPLAM ÜRÜN</th>
                    <th>EŞLEŞEN</th>
                    <th>SON TARİH</th>
                    <th>STOK KODU ÖN EKİ</th>
                    <th>BAŞLAT</th>
                    <th>İŞLEM %</th>
                    <th>DURDUR</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><strong>Trendyol</strong></td>
                    <td><span class="ep-badge ep-badge-success">Aktif</span></td>
                    <td>10,111</td>
                    <td>2,759</td>
                    <td>02.04.2026</td>
                    <td><input type="text" class="form-control form-control-sm" style="width:100px;"></td>
                    <td><button class="ep-btn ep-btn-sm ep-btn-info"><i class="bi bi-play-fill"></i> başlat</button></td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <div class="ep-progress" style="width:80px;"><div class="ep-progress-bar blue" style="width:21%;"></div></div>
                            <span style="font-size:12px;">21%</span>
                        </div>
                    </td>
                    <td><button class="ep-btn ep-btn-sm ep-btn-danger"><i class="bi bi-stop-fill"></i> durdur</button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><strong>Hepsiburada</strong></td>
                    <td><span class="ep-badge ep-badge-success">Aktif</span></td>
                    <td>10,111</td>
                    <td>1,414</td>
                    <td>08.04.2026</td>
                    <td><input type="text" class="form-control form-control-sm" style="width:100px;"></td>
                    <td><button class="ep-btn ep-btn-sm ep-btn-info"><i class="bi bi-play-fill"></i> başlat</button></td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <div class="ep-progress" style="width:80px;"><div class="ep-progress-bar blue" style="width:18%;"></div></div>
                            <span style="font-size:12px;">18%</span>
                        </div>
                    </td>
                    <td><button class="ep-btn ep-btn-sm ep-btn-danger"><i class="bi bi-stop-fill"></i> durdur</button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td><strong>N11</strong></td>
                    <td><span class="ep-badge ep-badge-danger">Hata</span></td>
                    <td>14,228</td>
                    <td>0</td>
                    <td>08.04.2026</td>
                    <td><input type="text" class="form-control form-control-sm" style="width:100px;"></td>
                    <td><button class="ep-btn ep-btn-sm ep-btn-info"><i class="bi bi-play-fill"></i> başlat</button></td>
                    <td><span style="font-size:12px;">0%</span></td>
                    <td><button class="ep-btn ep-btn-sm ep-btn-danger"><i class="bi bi-stop-fill"></i> durdur</button></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td><strong>Çiçeksepeti</strong></td>
                    <td><span class="ep-badge ep-badge-success">Tamamlandı</span></td>
                    <td>14,228</td>
                    <td>29</td>
                    <td>08.04.2026</td>
                    <td><input type="text" class="form-control form-control-sm" style="width:100px;"></td>
                    <td><button class="ep-btn ep-btn-sm ep-btn-info"><i class="bi bi-play-fill"></i> başlat</button></td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <div class="ep-progress" style="width:80px;"><div class="ep-progress-bar green" style="width:100%;"></div></div>
                            <span style="font-size:12px;">100%</span>
                        </div>
                    </td>
                    <td><button class="ep-btn ep-btn-sm ep-btn-danger"><i class="bi bi-stop-fill"></i> durdur</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

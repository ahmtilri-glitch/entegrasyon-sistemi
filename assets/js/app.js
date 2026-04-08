/**
 * Entegrasyon Pro — Ana JavaScript Dosyası
 */

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initCharts();
});

/* ── Sidebar Toggle ───────────────────────────────────────────── */
function initSidebar() {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('epSidebar');
    
    if (toggle) {
        toggle.addEventListener('click', function() {
            // Mobilde aç/kapat
            if (window.innerWidth <= 992) {
                sidebar.classList.toggle('open');
            } else {
                // Masaüstünde daralt/genişlet
                document.body.classList.toggle('sidebar-collapsed');
            }
        });
    }
    
    // Sayfa boyutu değiştiğinde sidebarı düzelt
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            sidebar.classList.remove('open');
        }
    });
}

/* ── Tam Ekran ────────────────────────────────────────────────── */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/* ── Chart.js Grafikleri ──────────────────────────────────────── */
function initCharts() {
    initRevenueChart();
    initOrderChart();
    initMarketplaceChart();
}

function initRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
            datasets: [{
                label: 'Ciro (₺)',
                data: [125000, 148000, 162000, 178000, 195000, 210000, 230000, 245000, 268000, 290000, 315000, 340000],
                borderColor: '#ea580c',
                backgroundColor: 'rgba(234, 88, 12, 0.08)',
                fill: true,
                tension: 0.4,
                borderWidth: 2.5,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBackgroundColor: '#ea580c',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleFont: { size: 12, weight: '600' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return '₺' + context.parsed.y.toLocaleString('tr-TR');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        font: { size: 11 },
                        color: '#94a3b8',
                        callback: function(value) {
                            return '₺' + (value / 1000) + 'K';
                        }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11 }, color: '#94a3b8' }
                }
            }
        }
    });
}

function initOrderChart() {
    const ctx = document.getElementById('orderChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
            datasets: [{
                label: 'Siparişler',
                data: [45, 62, 58, 71, 89, 95, 42],
                backgroundColor: [
                    '#2563eb', '#2563eb', '#2563eb', '#2563eb', 
                    '#ea580c', '#ea580c', '#94a3b8'
                ],
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f1f5f9' },
                    ticks: { font: { size: 11 }, color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11 }, color: '#94a3b8' }
                }
            }
        }
    });
}

function initMarketplaceChart() {
    const ctx = document.getElementById('marketplaceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Trendyol', 'Hepsiburada', 'N11', 'Amazon TR', 'Çiçeksepeti', 'Diğer'],
            datasets: [{
                data: [35, 25, 15, 10, 8, 7],
                backgroundColor: [
                    '#ea580c', '#2563eb', '#7c3aed', '#0d9488', '#db2777', '#94a3b8'
                ],
                borderWidth: 2,
                borderColor: '#fff',
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { size: 11, weight: '500' },
                        padding: 12,
                        usePointStyle: true,
                        pointStyleWidth: 8
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': %' + context.parsed;
                        }
                    }
                }
            }
        }
    });
}

<?php
/**
 * Header — Üst menü ve HTML head
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($page_title) ?> — <?= EP_APP_NAME ?></title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"></script>
    <!-- Uygulama CSS -->
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <!-- Üst Navbar -->
    <nav class="ep-topbar">
        <div class="ep-topbar-left">
            <button class="ep-sidebar-toggle" id="sidebarToggle">
                <i class="bi bi-list"></i>
            </button>
            <a href="index.php" class="ep-logo">
                <i class="bi bi-box-seam-fill"></i>
                <span><?= EP_APP_NAME ?></span>
            </a>
        </div>
        <div class="ep-topbar-center">
            <div class="ep-search-box">
                <i class="bi bi-search"></i>
                <input type="text" placeholder="Ara... (ürün, sipariş, müşteri)" id="globalSearch">
            </div>
        </div>
        <div class="ep-topbar-right">
            <button class="ep-topbar-btn ep-notification-btn" title="Bildirimler">
                <i class="bi bi-bell"></i>
                <span class="ep-badge-dot"></span>
            </button>
            <button class="ep-topbar-btn" title="Tam Ekran" onclick="toggleFullscreen()">
                <i class="bi bi-arrows-fullscreen"></i>
            </button>
            <div class="ep-user-menu">
                <div class="ep-user-avatar">A</div>
                <div class="ep-user-info">
                    <span class="ep-user-name">Admin</span>
                    <span class="ep-user-role">Yönetici</span>
                </div>
            </div>
        </div>
    </nav>

<?php
/**
 * Footer — Alt kısım ve JavaScript yüklemeleri
 */
if (!defined('EP_ROOT')) die('Doğrudan erişim yasak.');
?>
    <!-- AI Chatbot -->
    <div class="ep-ai-chatbot">
        <div class="ep-ai-chatbot-panel" id="aiChatPanel">
            <div class="ep-ai-chatbot-header">
                <div class="ep-ai-avatar"><i class="bi bi-stars"></i></div>
                <div>
                    <h4>EP Asistan</h4>
                    <span>Yapay zeka destekli yardımcınız</span>
                </div>
            </div>
            <div class="ep-ai-chatbot-body">
                <div class="ep-ai-chat-msg bot">
                    <div class="ep-ai-chat-bubble">
                        Merhaba! Ben EP Asistan. Size nasıl yardımcı olabilirim? Örneğin:<br><br>
                        • "Bugünkü siparişleri göster"<br>
                        • "Stok azalan ürünleri listele"<br>
                        • "SEO eksik ürünleri bul"<br>
                        • "Trendyol kategori eşleştir"
                    </div>
                </div>
            </div>
            <div class="ep-ai-chatbot-footer">
                <input type="text" id="aiChat" placeholder="Bir soru sorun...">
                <button onclick="document.getElementById('aiChat').value=''"><i class="bi bi-send"></i></button>
            </div>
        </div>
        <button class="ep-ai-chatbot-toggle" onclick="document.getElementById('aiChatPanel').classList.toggle('open')">
            <i class="bi bi-stars"></i>
        </button>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Uygulama JS -->
    <script src="assets/js/app.js"></script>
</body>
</html>

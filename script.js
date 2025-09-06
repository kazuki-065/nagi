// ハンバーガーメニューの機能
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // ナビゲーションリンクをクリックした時にメニューを閉じる
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// フォーム送信処理
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // フォームデータを取得
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // 簡単なバリデーション
    if (!data.name || !data.email || !data.course) {
        alert('必須項目を入力してください。');
        return;
    }
    
    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('正しいメールアドレスを入力してください。');
        return;
    }
    
    // 送信成功のメッセージ（実際の送信処理は別途実装が必要）
    alert('予約申し込みを受け付けました。\n確認のメールをお送りしますので、しばらくお待ちください。');
    
    // フォームをリセット
    this.reset();
});

// スクロール時のヘッダー背景変更
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(139, 69, 19, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)';
        header.style.backdropFilter = 'none';
    }
});

// アニメーション効果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .benefit-item, .pricing-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 料金カードのホバー効果
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// 現在時刻に基づく営業状況表示
function updateBusinessStatus() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = 日曜日, 1 = 月曜日
    
    const statusElement = document.querySelector('.business-status');
    if (statusElement) {
        if (day === 1) { // 月曜日（定休日）
            statusElement.textContent = '本日は定休日です';
            statusElement.style.color = '#ff6b6b';
        } else if (hour >= 10 && hour < 21) {
            statusElement.textContent = '営業中';
            statusElement.style.color = '#51cf66';
        } else {
            statusElement.textContent = '営業時間外';
            statusElement.style.color = '#ff6b6b';
        }
    }
}

// ページ読み込み時に営業状況を更新
document.addEventListener('DOMContentLoaded', updateBusinessStatus);

// 1分ごとに営業状況を更新
setInterval(updateBusinessStatus, 60000);

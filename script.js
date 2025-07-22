// 모모댕댕 - 미니멀 인터랙션
// "단순함이 최고의 세련됨" - Steve Jobs

document.addEventListener('DOMContentLoaded', function() {
    
    // 부드러운 스크롤 네비게이션
    const navLinks = document.querySelectorAll('.main-nav a, .cta-button');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // 상담하기 버튼 클릭 처리
    const consultBtns = document.querySelectorAll('.consult-btn, .consultation-btn');
    
    consultBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            if (this.tagName === 'BUTTON') {
                // 전화 걸기
                window.location.href = 'tel:010-5949-5250';
            }
        });
    });
    
    // 헤더 스크롤 효과
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollTop = scrollTop;
    }, false);
    
});

// 간단한 진입 애니메이션 (옵션)
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

// 페이지 로드 시 애니메이션 대상 요소들 설정
window.addEventListener('load', function() {
    const animateElements = document.querySelectorAll('.section-title, .feature, .program-card, .review-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 브랜드 스토리 더보기/닫기 기능
function toggleStory() {
    const storyFull = document.querySelector('.story-full');
    const toggleBtn = document.querySelector('.story-toggle-btn');
    const toggleText = toggleBtn.querySelector('.toggle-text');
    const toggleIcon = toggleBtn.querySelector('.toggle-icon');
    
    if (storyFull.style.display === 'none' || storyFull.style.display === '') {
        // 더보기 열기
        storyFull.style.display = 'block';
        toggleText.textContent = '닫기';
        toggleIcon.textContent = '▲';
        toggleBtn.classList.add('expanded');
        
        // 부드러운 애니메이션
        storyFull.style.opacity = '0';
        storyFull.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            storyFull.style.transition = 'all 0.4s ease';
            storyFull.style.opacity = '1';
            storyFull.style.transform = 'translateY(0)';
        }, 10);
        
    } else {
        // 더보기 닫기
        storyFull.style.transition = 'all 0.3s ease';
        storyFull.style.opacity = '0';
        storyFull.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            storyFull.style.display = 'none';
            toggleText.textContent = '더보기';
            toggleIcon.textContent = '▼';
            toggleBtn.classList.remove('expanded');
        }, 300);
    }
}
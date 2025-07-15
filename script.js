// 캐러셀 기능을 담당하는 자바스크립트

// 현재 활성화된 슬라이드 번호 (0부터 시작)
let currentSlide = 0;

// 모든 슬라이드 요소들을 가져오기
const slides = document.querySelectorAll('.slide');

// 화살표 버튼들 가져오기
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// 자동 슬라이딩을 위한 타이머
let autoSlideTimer;

// 슬라이드 변경 함수
function changeSlide(newIndex) {
    // 현재 슬라이드 숨기기
    slides[currentSlide].classList.remove('active');
    
    // 새로운 슬라이드 번호 설정
    currentSlide = newIndex;
    
    // 슬라이드가 마지막을 넘어가면 처음으로 돌아가기
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    
    // 슬라이드가 처음보다 작아지면 마지막으로 돌아가기
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // 새로운 슬라이드 보이기
    slides[currentSlide].classList.add('active');
}

// 다음 슬라이드로 이동
function nextSlide() {
    changeSlide(currentSlide + 1);
}

// 이전 슬라이드로 이동
function prevSlide() {
    changeSlide(currentSlide - 1);
}

// 자동 슬라이딩 시작
function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 5000); // 5초마다 다음 슬라이드로
}

// 자동 슬라이딩 멈추기
function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

// 스토리 더보기/닫기 기능
function setupStoryToggle() {
    const toggleBtn = document.querySelector('.story-toggle-btn');
    const storyPreview = document.querySelector('.story-preview');
    const storyFull = document.querySelector('.story-full');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            // 현재 상태 확인
            const isFullVisible = storyFull.style.display !== 'none';
            
            if (isFullVisible) {
                // 전체 스토리가 보이는 상태면 숨기기
                storyFull.style.display = 'none';
                storyPreview.style.display = 'block';
                toggleBtn.textContent = '더보기';
            } else {
                // 미리보기가 보이는 상태면 전체 보이기
                storyPreview.style.display = 'none';
                storyFull.style.display = 'block';
                toggleBtn.textContent = '닫기';
            }
        });
    }
}

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', function() {
    // 자동 슬라이딩 시작
    startAutoSlide();
    
    // 이전 버튼 클릭 시
    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopAutoSlide(); // 수동 조작 시 자동 슬라이딩 멈추기
        startAutoSlide(); // 5초 후 다시 자동 슬라이딩 시작
    });
    
    // 다음 버튼 클릭 시
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopAutoSlide(); // 수동 조작 시 자동 슬라이딩 멈추기
        startAutoSlide(); // 5초 후 다시 자동 슬라이딩 시작
    });
    
    // 마우스가 캐러셀 위에 있을 때 자동 슬라이딩 멈추기
    const carousel = document.querySelector('.hero-carousel');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // 키보드 화살표 키로도 조작 가능하게
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });
    
    // 스토리 토글 기능 설정
    setupStoryToggle();
}); 

// 브랜드 히스토리 더보기/닫기 기능
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.story-toggle-btn');
    const moreContent = document.querySelector('.story-more-content');
    
    if (toggleBtn && moreContent) {
        toggleBtn.addEventListener('click', function() {
            if (moreContent.style.display === 'none' || moreContent.style.display === '') {
                moreContent.style.display = 'block';
                toggleBtn.textContent = '닫기';
            } else {
                moreContent.style.display = 'none';
                toggleBtn.textContent = '더보기';
            }
        });
    }
});

// 보호자 후기 더보기/닫기 기능
document.addEventListener('DOMContentLoaded', function() {
    // 모든 후기 더보기 버튼을 찾아서 이벤트 리스너 추가
    const reviewToggleBtns = document.querySelectorAll('.review-toggle-btn');
    
    reviewToggleBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // 버튼의 부모 요소에서 더보기 내용 찾기
            const reviewContent = btn.closest('.review-content');
            const moreContent = reviewContent.querySelector('.review-more-content');
            
            if (moreContent) {
                // 현재 상태 확인하고 토글
                if (moreContent.style.display === 'none' || moreContent.style.display === '') {
                    moreContent.style.display = 'block'; // 더보기 내용 보이기
                    btn.textContent = '닫기'; // 버튼 텍스트 변경
                } else {
                    moreContent.style.display = 'none'; // 더보기 내용 숨기기
                    btn.textContent = '더보기'; // 버튼 텍스트 변경
                }
            }
        });
    });
}); 
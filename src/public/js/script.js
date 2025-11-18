document.addEventListener('DOMContentLoaded', () => {

    // --- XỬ LÝ SLIDER ---
    const slider = document.querySelector('.main-slider');
    if (slider) {
        const slides = slider.querySelectorAll('.slider-item');
        const dotsContainer = slider.querySelector('.slider-dots');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        let currentSlide = 0;
        let slideInterval;

        // Tạo dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.slide = index;
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function goToSlide(slideIndex) {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                dots[index].classList.remove('active');
            });

            slides[slideIndex].classList.add('active');
            dots[slideIndex].classList.add('active');
            currentSlide = slideIndex;
        }

        function nextSlide() {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            goToSlide(newIndex);
        }

        function prevSlide() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            }
            goToSlide(newIndex);
        }

        // Tự động chuyển slide
        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 5000); // 5 giây
        }

        function stopSlideShow() {
            clearInterval(slideInterval);
        }

        // Bắt sự kiện
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                goToSlide(parseInt(e.target.dataset.slide));
                stopSlideShow();
                startSlideShow();
            });
        });

        // Bắt đầu
        startSlideShow();
    }
    
    // --- XỬ LÝ DROPDOWN (Click) ---
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        if (dropbtn) {
            dropbtn.addEventListener('click', function(event) {
                if (!dropdown.classList.contains('dropdown-hover')) {
                    event.preventDefault();
                    const content = this.nextElementSibling;
                    content.classList.toggle('show');
                }
            });
        }
    });

    // Đóng dropdown khi click ra ngoài
    window.addEventListener('click', function(event) {
        if (event.target && !event.target.matches('.dropbtn')) {
            const dropdownContents = document.querySelectorAll('.dropdown-content');
            dropdownContents.forEach(content => {
                if (content.classList.contains('show')) {
                    content.classList.remove('show');
                }
            });
        }
    });

    // ================ JAVASCRIPT CHO POPUP AUTH ================
    const authModalOverlay = document.getElementById('auth-modal-overlay');
    const authModalTrigger = document.getElementById('auth-modal-trigger');
    const authModalClose = document.getElementById('auth-modal-close');
    const authTabs = document.querySelectorAll('.auth-tab-link');
    const authContents = document.querySelectorAll('.auth-tab-content');

    // Mở Modal
    if (authModalTrigger) {
        authModalTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            authModalOverlay.classList.add('show');
        });
    }

    // Đóng Modal (bằng nút X)
    if (authModalClose) {
        authModalClose.addEventListener('click', () => {
            authModalOverlay.classList.remove('show');
        });
    }

    // Đóng Modal (bằng cách click ra ngoài)
    if (authModalOverlay) {
        authModalOverlay.addEventListener('click', (e) => {
            if (e.target === authModalOverlay) {
                authModalOverlay.classList.remove('show');
            }
        });
    }

    // Chuyển Tab (Đăng nhập / Đăng ký)
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Xóa active cũ
            authTabs.forEach(item => item.classList.remove('active'));
            authContents.forEach(item => item.classList.remove('active'));

            // Thêm active mới
            tab.classList.add('active');
            const targetContent = document.getElementById(tab.dataset.tab);
            targetContent.classList.add('active');
            
            // Xóa thông báo lỗi
            const errorEl = document.getElementById('auth-error-message');
            if(errorEl) errorEl.textContent = '';
        });
    });

});
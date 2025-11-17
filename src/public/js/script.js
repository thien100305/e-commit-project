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
    // (Lưu ý: CSS xử lý dropdown hover, JS này là dự phòng
    //  hoặc nếu bạn muốn đổi sang click)
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        if (dropbtn) {
            dropbtn.addEventListener('click', function(event) {
                // Chỉ áp dụng cho dropdown không phải hover
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
        if (!event.target.matches('.dropbtn')) {
            const dropdownContents = document.querySelectorAll('.dropdown-content');
            dropdownContents.forEach(content => {
                if (content.classList.contains('show')) {
                    content.classList.remove('show');
                }
            });
        }
    });

});
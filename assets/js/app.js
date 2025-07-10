
$(function() {

    var header = $("#header"),
        introH = $(".slider-container").innerHeight(),
        scrollOffset = $(window).scrollTop();


    /* Fixed Header */
    checkScroll(scrollOffset);

    $(window).on("scroll", function() {
        scrollOffset = $(this).scrollTop();

        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {
        if(scrollOffset >= introH ) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }



    /* Smooth scroll */
    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        var $this = $(this),
            blockId = $this.data('scroll'),
            blockOffset = $(blockId).offset().top;

        $("#nav a").removeClass("active");
        $this.addClass("active");

        $("html, body").animate({
            scrollTop:  blockOffset
        }, 500);
    });



    /* Menu nav toggle */
    $("#nav_toggle").on("click", function(event) {
        event.preventDefault();

        $(this).toggleClass("active");
        $("#nav").toggleClass("active");
    });



    /* Collapse */
    $("[data-collapse]").on("click", function(event) {
        event.preventDefault();

        var $this = $(this),
            blockId = $this.data('collapse');

        $this.toggleClass("active");
    });


    /* Slider */
    $("[data-slider]").slick({
        infinite: true,
        fade: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });

});
 


document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('close-btn');
    let isProgrammaticScroll = false;
    // Проверяем, показывали ли уже форму
    // if(!sessionStorage.getItem('modalShown')) {
    //     window.addEventListener('scroll', checkScroll);
    // }
    //window.addEventListener('scroll', checkScroll); // чтобы появляласб каждый раз

    if (!sessionStorage.getItem('modalShown')) {
        window.addEventListener('scroll', checkScroll);
    }
    
    function checkScroll() {
        if (isProgrammaticScroll) return; // Пропускаем, если скролл программный
        
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight >= scrollHeight * 0.7) {
            showModal();
            window.removeEventListener('scroll', checkScroll);
        }
    }

    const consultationBtn = document.querySelector('.btn_consultation');
    if(consultationBtn) {
        consultationBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем стандартное действие ссылки
            showModal();
        });
    }

    const btn_main = document.querySelectorAll('.btn_main');
    
    // Добавляем обработчик для каждой кнопки
    btn_main.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем переход по ссылке
            showModal(); // Показываем форму
        });
    });

    const btn_mai = document.querySelectorAll('.btn');
    
    // Добавляем обработчик для каждой кнопки
    btn_mai.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем переход по ссылке
            showModal(); // Показываем форму
            sessionStorage.setItem('modalShown', 'true');
        });
    });

   
    
    function checkScroll() {
        // Вычисляем позицию прокрутки
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        // Когда прокрутили до середины
        if(scrollTop + clientHeight >= scrollHeight * 0.7) {
            showModal();
            // Удаляем обработчик скролла
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    function showModal() {
        document.body.classList.add('block-scroll');
        overlay.style.display = 'block';
        modal.style.display = 'block';
        // Запоминаем что показали
        sessionStorage.setItem('modalShown', 'true');
    }
    
    function hideModal() {
        document.body.classList.remove('block-scroll');
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }
    
    // Закрытие по крестику
    closeBtn.addEventListener('click', hideModal);
    
    // Запрещаем закрытие по клику вне формы
    overlay.addEventListener('click', function(e) {
        if(e.target === overlay) {
            hideModal();
        }
    });
    
    // Блокируем закрытие при клике в форму
    modal.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const navItems = document.querySelectorAll('.nav-item');
    let currentSlide = 0;
    let slideInterval;

    function defultPos(index){
        if(index == 0){
            slides[1].style.visibility = "hidden";
            slides[2].style.visibility = "hidden";
            for (let i = 1; i < slides.length; i++){
                slides[i].style.transform = 'translateX(100%)';
                slides[i].style.visibility = "visible";
            }
            slides[0].style.visibility = "hidden";
            slides[0].style.transform = "translateX(0%)"
            slides[0].style.visibility = "visible";
            console.log("index 0") // 1 - 2
        }
        else if(index == 1){
            slides[2].style.visibility = "hidden";
            slides[0].style.transform = "translateX(-100%)"
            slides[1].style.transform = "translateX(0%)"
            slides[2].style.transform = "translateX(100%)"
            slides[2].style.visibility = "visible";

            console.log("index 1") // 2 - 3
        }else if(index == 2){
            slides[1].style.transform = "translateX(-100%)"
            slides[2].style.transform = "translateX(0%)"
            console.log("index 2") // 3 - 1
        }
    }

    function truepos(n){
        if(n == 0){
            slides[1].style.visibility = "hidden";
            slides[2].style.visibility = "hidden";
            slides[1].style.transform = "translateX(100%)"
            slides[2].style.transform = "translateX(100%)"
            slides[1].style.visibility = "visible";
            slides[2].style.visibility = "visible";
        }else if(n == 1){
            slides[0].style.visibility = "hidden";
            slides[2].style.visibility = "hidden";
            slides[0].style.transform = "translateX(-100%)"
            slides[2].style.transform = "translateX(100%)"
            slides[0].style.visibility = "visible";
            slides[2].style.visibility = "visible";
        }else{
            slides[0].style.visibility = "hidden";
            slides[1].style.visibility = "hidden";
            slides[0].style.transform = "translateX(-100%)"
            slides[1].style.transform = "translateX(-100%)"
            slides[0].style.visibility = "visible";
            slides[1].style.visibility = "visible";
        }
    }
    
    // Инициализация - скрываем все слайды кроме первого
    slides.forEach((slide, index) => {
        if(index !== 0) {
            slide.style.transform = 'translateX(100%)';
        }
    });
    
    // Функция для переключения слайдов
    function nextSlide() {
        console.log(currentSlide)
        const nextSlideIndex = (currentSlide + 1) % slides.length;
        
        // Подготавливаем новый слайд справа
        slides[nextSlideIndex].classList.remove('exit');
        slides[nextSlideIndex].style.transform = 'translateX(100%)';
        
        // Анимируем текущий слайд влево
        slides[currentSlide].classList.add('exit');
        
        // Анимируем новый слайд в центр
        
        // setTimeout(() => {
        //     slides[nextSlideIndex].style.transform = 'translateX(0%)';
        //     slides[currentSlide].style.transform = 'translateX(-100%)';
            
        //     // Обновляем классы активных элементов
        // slides[currentSlide].classList.remove('active');
        // slides[nextSlideIndex].classList.add('active');
            
        //     navItems[currentSlide].classList.remove('active');
        //     navItems[nextSlideIndex].classList.add('active');
        navItems[currentSlide].classList.remove('active');
        navItems[nextSlideIndex].classList.add('active');
            
        currentSlide = nextSlideIndex;
        // }, 50);
        
        if (currentSlide === 0) {defultPos(0); }
        if (currentSlide === 1) {defultPos(1); }
        if (currentSlide === 2) {defultPos(2); }
        
    }
    
    // Функция для перехода к конкретному слайду
    function goToSlide(n) {
        if(n === currentSlide) return;
        if (n != 1 && currentSlide != 1){
            slides[1].style.visibility = "hidden";
            slides[1].style.zIndex = '0';
        }
        
        // Определяем направление анимации
        const direction = n > currentSlide ? 1 : -1;
        
         // Анимируем текущий слайд
         slides[currentSlide].style.transform = direction === 1 ? 'translateX(-100%)' : 'translateX(100%)';
        
        // Подготавливаем новый слайд
        slides[n].style.transform = direction === 1 ? 'translateX(100%)' : 'translateX(-100%)';
        
       
        // Анимируем новый слайд
        setTimeout(() => {
            slides[n].style.transform = 'translateX(0)';

            
            // Обновляем классы активных элементов
            slides[currentSlide].classList.remove('active');
            slides[n].classList.add('active');
            
            navItems[currentSlide].classList.remove('active');
            navItems[n].classList.add('active');
            
            currentSlide = n;
            truepos(n);
            
        }, 0);
        slides[1].style.visibility = "visible"
    }
    
    // Запускаем автоматическое переключение
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Останавливаем автоматическое переключение
    function pauseSlideShow() {
        clearInterval(slideInterval);
    }
    
    // Обработчики для навигации
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            pauseSlideShow();
            goToSlide(index);
            startSlideShow();
        });
    });
    
    startSlideShow();
            
            // Пауза при наведении на слайд
            // document.querySelector('.slider-container').addEventListener('mouseenter', pauseSlideShow);
            // document.querySelector('.slider-container').addEventListener('mouseleave', startSlideShow);
});


document.addEventListener('DOMContentLoaded', function() {
    const transportBtns = document.querySelectorAll('.transport-btn');
    const footerSection = document.getElementById('footer');
    let isProgrammaticScroll = false; // Флаг для определения типа скролла
    
    // Функция плавной прокрутки
    function smoothScrollTo(target, duration = 1500) {
        isProgrammaticScroll = true; // Включаем флаг
        const startPos = window.pageYOffset;
        const targetPos = target.getBoundingClientRect().top + startPos;
        let startTime = null;
        
        function animateScroll(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            const ease = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            window.scrollTo(0, startPos + (targetPos - startPos) * ease);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                // После завершения анимации выключаем флаг
                setTimeout(() => {
                    isProgrammaticScroll = false;
                }, 100); // Небольшая задержка для надёжности
            }
        }
        
        requestAnimationFrame(animateScroll);
    }
    
    transportBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.setItem('modalShown', 'true');
            smoothScrollTo(footerSection, 2000);
        });
    });
});

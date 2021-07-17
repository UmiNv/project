window.addEventListener('DOMContentLoaded', ()=> {
    
    // sliders for rooms
    const sliders = document.querySelectorAll('.offer__slider');
           
    let slideIndex=1;

    sliders.forEach((item, i) => { //массив слайдеров
        
        sliders[i].querySelector('.current').id = `current${i}`;
        sliders[i].querySelector('.offer__slider-prev').id = `prev${i}`;
        sliders[i].querySelector('.offer__slider-next').id = `next${i}`;


        let numberSlider = document.querySelectorAll('.number')[i], //номер слайдера
         slider = sliders[i].querySelectorAll('.offer__slide'), //фотки внутри слайдера         
                  
         prev = document.querySelector(`#prev${i}`),         
         next = document.querySelector(`#next${i}`),
         total = sliders[i].querySelector('.total'),
         current = document.querySelector(`#current${i}`);
         
         
         numberSlider.innerHTML += `
            <div>${i}</div>`;
        console.log(slider);
        console.log(slideIndex);

        showSlides(slideIndex);
        
        if (slider.length < 10) {
            total.innerHTML += `
            <div>0${slider.length}</div>`;
        } else {
            total.innerHTML += `
            <div>${slider.length}</div>`;
        }

        function showSlides(n) {
            if (n>slider.length) {
                slideIndex=1;
            }
            if (n<1) {
                slideIndex=slider.length;
            }
            slider.forEach(item => item.style.display = 'none');
            slider[slideIndex-1].style.display = 'block';
            if (slider.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
        }

        function plusSlides(n) {
            showSlides(slideIndex+=n);
            console.log(sliders[i]);
        }
           
        
        prev.addEventListener('click', () => {
        plusSlides(-1);
        });
        
        
        next.addEventListener('click', () => {
            plusSlides(1);
        });

    });

    //slider for rev
    
    const slides_reviews = document.querySelectorAll('.offer__slide-reviews'),
          slider_reviews = document.querySelector('.offer__slider-reviews'), // для навигации
          slidesWrapper = document.querySelector('.offer__slider-wrapper'), //2 обертка слайдера
          slidesField = document.querySelector('.offer__slider-inner'), //2 поле слайдера
          width = window.getComputedStyle(slidesWrapper).width, //2 получаем ширину обертки слайдера
          prev2 = document.querySelector('.review_btnLeft'),//1кнопа previous
          next2 = document.querySelector('.review_btnRight');//1кнопа next
         /*  current2 = document.querySelector('#current-reviews'),
          total2 = document.querySelector('#total-reviews'); */
    

    let slideIndex2 = 1,
        offset = 0;

    /* if (slides_reviews.length<10) {
        total2.textContent = `0${slides_reviews.length}`;
        current2.textContent = `0${slideIndex2}`;
    } else {
        total2.textContent = slides_reviews.length;
        current2.textContent = slideIndex2;
    } */
    
    slidesField.style.width = 100 * slides_reviews.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all'; //плавность
    
    slides_reviews.forEach(slide => {
        slide.style.width = width;
    });

    slidesWrapper.style.overflow = 'hidden'; //скрываем все элементы вне враппера
    slider_reviews.style.position = 'relative';
    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('reviews_dots');
    slider_reviews.append(indicators);

    for (let i=0; i<slides_reviews.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('review_dot');

        if (i == 0) {
            dot.style.cssText = `
            width: 20px;
            height: 20px;
            border: 3px solid #818181;
            background-color: #ffff00;
            margin: -5px 10px 0;
            `;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next2.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length-2) * (slides_reviews.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length-2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`; 
        if (slideIndex2 == slides_reviews.length) {
            slideIndex2 = 1;
        } else {
            slideIndex2++;
        }

        /* if (slides_reviews.length<10) {            
            current2.textContent = `0${slideIndex2}`;
        } else {            
            current2.textContent = slideIndex2;
        } */
        
        dots.forEach(dot => dot.style.cssText = `
            margin: 0 15px;
            width: 8px;
            border: unset;
            height: 8px;
            background-color: #ffffff;
        `);
        dots[slideIndex2 - 1].style.cssText = `
            width: 20px;
            height: 20px;
            border: 3px solid #818181;
            background-color: #ffff00;
            margin: -5px 10px 0;
        `;
    });

    prev2.addEventListener('click', () => {
        if (offset == 0) {            
            offset = +width.slice(0, width.length-2) * (slides_reviews.length - 1);
        } else {
            offset -= +width.slice(0, width.length-2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex2 == 1) {
            slideIndex2 = slides_reviews.length;
        } else {
            slideIndex2--;
        }

        /* if (slides_reviews.length<10) {            
            current2.textContent = `0${slideIndex2}`;
        } else {            
            current2.textContent = slideIndex2;
        } */

        dots.forEach(dot => dot.style.cssText = `
            margin: 0 15px;
            width: 8px;
            border: unset;
            height: 8px;
            background-color: #ffffff;
        `);
        dots[slideIndex2 - 1].style.cssText = `
            width: 20px;
            height: 20px;
            border: 3px solid #818181;
            background-color: #ffff00;
            margin: -5px 10px 0;
        `;

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex2 = slideTo;
            offset = +width.slice(0, width.length-2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides_reviews.length<10) {            
                current2.textContent = `0${slideIndex2}`;
            } else {            
                current2.textContent = slideIndex2;
            }

            dots.forEach(dot => dot.style.cssText = `
            margin: 0 15px;
            width: 8px;
            border: unset;
            height: 8px;
            background-color: #ffffff;
        `);
        dots[slideIndex2 - 1].style.cssText = `
            width: 20px;
            height: 20px;
            border: 3px solid #818181;
            background-color: #ffff00;
            margin: -5px 10px 0;
        `;
        });
    });

});
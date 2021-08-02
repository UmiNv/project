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
         
         
         /* numberSlider.innerHTML += `
            <div>${i}</div>`; */
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
          /* current2 = document.querySelector('#current-reviews'),
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
    });

    //modal
    const modalTriggerB = document.querySelectorAll('[data-modal="booking"]'),//все кнопки вызова брони
          modalBooking = document.querySelector('#booking'),//форма брони
          modalThBooking = document.querySelector('#thanksBooking'),//окно благодарности за бронь
          //modalCloseBtn = document.querySelector('[data-close="booking"]'),//кнопка закрытия формы брони
          modalTriggerR = document.querySelectorAll('[data-modal="review"]'),
          modalReview = document.querySelector('#review'),//форма отправки отзыва
          modalThReview = document.querySelector('#thanksReview');//окно благодарности за отзыв
          //modalCloseBtnR = document.querySelector('[data-close="review"]');//кнопка закрытия формы отзыва

          console.log(modalBooking);

    function openModal(id) {
        const modal = document.querySelector(`${id}`);
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }    

    modalTriggerB.forEach (btn => {
        btn.addEventListener('click', () => {
            openModal('#booking');
        });
    });   

    modalTriggerR.forEach (btn => {
        btn.addEventListener('click', () => {
            openModal('#review');
        });
    });
    
    function closeModal(id) {
        const modal = document.querySelector(`${id}`);
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    modalBooking.addEventListener('click', (e) => {
        if (e.target === modalBooking || e.target.getAttribute('data-close') == '') {
            closeModal('#booking');
        }
    });

    modalReview.addEventListener('click', (e) => {
        if (e.target === modalReview || e.target.getAttribute('data-close') == '') {
            closeModal('#review');
        }
    });
       
    //server 
    const forms = document.querySelectorAll('form');
    const overlayBooking = document.querySelector('#booking'),
          overlay = document.querySelectorAll('.overlay'),
          overlayReview = document.querySelector('#review');

    const  message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        messageB: 'Спасибо за бронирование.<br>Ждём вас в гости!',
        messageR: 'Спасибо за отзыв :-)',
    };

    forms.forEach (item => {
        bindPostData(item);
    });

    const postData = (url, data) => {
        const res = fetch(url, {
            metod: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return res.json();
    };
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();//отключаем реакцию браузера на нажатие кнопки, по умолчанию
            
            //создаем блок для сообщений о загрузке
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            /* const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage); */

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json'); //заголовок для отправки данных в формате json
            const formData = new FormData(form);

            //переводим formData В json
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);
            const objLenght = Object.keys(object).length;
            request.send(json); //запрос в формате json

            request.addEventListener('load', () => {
                if (request.status === 200) { //позитивный сценарий
                    console.log(request.response);
                    console.log(Object.keys(object).length);

                    if (objLenght == 5) {
                        let thMessage = message.messageB; 
                        showThanksModal(thMessage, '#b', '#booking');
                    } else {
                        let thMessage = message.messageR;
                        showThanksModal(thMessage, '#r', '#review');
                    }
                    /* showThanksModal(thMessage); */
                    //statusMessage.textContent = message.success;
                    form.reset();//очищаем поля формы
                    statusMessage.remove();
                } else { //негативный сценарий
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }

    function showThanksModal(message, idM, idModal) {
        /* const prevModalDialog = document.querySelector('.modal__dialog'); */
               
        const prevModalDialog = document.querySelector(idM);
        
        prevModalDialog.classList.add('hide');
        openModal(idModal);
        
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modalTh');
        thanksModal.innerHTML = `
                <div data-close class="modal__close">&times;</div>
                <div class="modal__descr">${message}</div>
        `;
        /* document.querySelector('.overlay').append(thanksModal); */
        document.querySelector(idModal).append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal(idModal);          
            
        }, 4000);
    }
    fetch('http://localhost:3000/reviews')
        .then(data => data.json())
        .then(res => console.log(res));
    
    //карточки отзывов
    class ReviewBlock {
        constructor(name, descr, data, parentSelector) {
            this.name = name;
            this.descr = descr;
            this.data = data;
            this.parent = document.querySelector(parentSelector);
        }

        render () {
            const element = document.createElement('div');
            element.classList.add('col-md-5');
            element.innerHTML = `                
                    <div class="review_block">
                        <div class="review_text">${this.descr}</div>
                        <div class="review_name">${this.name}</div><div class="review_date">${this.data}</div>
                    </div>               
            `;
            this.parent.append(element);
        }
        
    }
    
    new ReviewBlock(
        "Светлана",
        "Пару дней как приехала с моря (неделю отдыхала в этом пансионате). Впечатления только положительные. В комнатах, в душах, во дворе чистота и порядок, хозяйка просто умничка. Советую всем - не пожалеете.",
        "25.06.15",
        ".reviews .offer__slider-reviews .offer__slide-reviews .row"
    ).render();

    new ReviewBlock(
        "Мария",
        "Хочу предупредить всех! Не везите с собой посуду и всё, что только вам придет в голову ) В этом году мы допустили эту ошибку и привезли всё с собой. <br>А оказалось в пансионате есть абсолютно всё, чему были очень приятно удивлены. Лариса, спасибо вам за то, что наш отдых был максимально комфортный и уютный. Привет от всей семьи.",
        "27.09.17",
        ".reviews .offer__slider-reviews .offer__slide-reviews .row"
    ).render();

    function offsetDiv() {
        const SliderBlocks = document.querySelectorAll('.offer__slider-reviews');
        SliderBlocks.forEach((item, i) => {
            const firstBlock = item.querySelector('.col-md-5');
            firstBlock.classList.add('offset-1');
        });
    }
    offsetDiv();

});
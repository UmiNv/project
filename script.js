window.addEventListener('DOMContentLoaded', ()=> {
    // slider


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

});
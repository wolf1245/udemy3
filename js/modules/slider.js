function slider({containerSlides,slide,nextArr,prevArr,totalCounter,currentCounter,wrapper,field}) 
{
    // Slider v2 start
    // отступ
    let offset = 0;
    // индекс слайда для нас с единицы, для жс с нуля
    let slideIndex = 1;

    // получаем псевдомассив с слайдами
    const slides = document.querySelectorAll(slide),
        // достаем слайдер
        slider = document.querySelector(containerSlides),
        // предыдущий слайд
        prev = document.querySelector(prevArr),
        // последующий слайд
        next = document.querySelector(nextArr),
        // получаем элемент показывающий общее к-во слайдов
        total = document.querySelector(totalCounter),
        // получаем элемент вывода текущего слайда 
        current = document.querySelector(currentCounter),
        // получаем обертку слайдера
        slidesWrapper = document.querySelector(wrapper),
        // получаем приминеную ширину к обертке
        width = window.getComputedStyle(slidesWrapper).width,
        // контейнер поле наших слайдеров
        slidesField = document.querySelector(field);

    // если слайд меньше 10
    if (slides.length < 10) 
    {
        // добавляем ноль перед цифрой
        total.textContent = `0${slides.length}`;
        // добавляем перед цифрой индексу
        current.textContent =  `0${slideIndex}`;
    } 
    else 
    {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }
    
    // устаннавливаем ему ширину,на все слайды
    slidesField.style.width = 100 * slides.length + '%';
    // ставим в ряд слайды
    slidesField.style.display = 'flex';
    // делаем плавный преход
    slidesField.style.transition = '0.5s all';

    // скрываем все выходящие за границу сладйы с полем
    slidesWrapper.style.overflow = 'hidden';

    // устанавливаем всем слайдам одинаковую ширину
    slides.forEach(slide => {
        slide.style.width = width;
    });

    // добавляем слайдеру цсс свойство
    slider.style.position = 'relative';

    // создаем список ол
    const indicators = document.createElement('ol'),
        // создаем массив
        dots = [];
    // добавляем класс
    indicators.classList.add('carousel-indicators');
    // добавляем стили цсс. если добавим в цсс файл то не будет доступа
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    // вставляем в слайдер в конец
    slider.append(indicators);

    // считаем количество слайдеров и создаем такое же количество ли
    for (let i = 0; i < slides.length; i++) 
    {
        // создаем тег ли
        const dot = document.createElement('li');
        // добавляем атрибут, начиная с 1
        dot.setAttribute('data-slide-to', i + 1);
        // добавляем стили
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        // 
        if (i == 0) 
        {
            // делаем не прозразным
            dot.style.opacity = 1;
        }
        // добавляем в ол список ли
        indicators.append(dot);
        // добавляем ли в массив
        dots.push(dot);
    }

    // ф-я анимации переключения точек слайда
    function arrDots(arr)
    {
        // делаем каждой лишке прозрачность на половину
        arr.forEach(dot => dot.style.opacity = ".5");
        // делаем видимым ту ли которая равна слайдеру
        arr[slideIndex-1].style.opacity = 1;
    }

    //ф-я добавления 0 если индекс меньше 10
    function plusZero(count)
    {
        if (count.length < 10) 
        {
            // если меньше 10, добавляем ноль перед числом
            return current.textContent =  `0${slideIndex}`;
        } 
        else 
        {
            return current.textContent =  slideIndex;
        }
    }

    // ф-я замены не цифр на пустоту
    function replaceToNotNumber(str)
    {
        return +str.replace(/\D/g, '');
    }
    //обработка клика
    next.addEventListener('click', () => {
        /**
         * если наш отступ будет равен умноженоое на количество
         * слайдев минус 1, то устанавлюем offset
         * чтоб вернуться в начало
         * обязательно унарный плюс превращаем строку '500px' в число +width.slice(0, width.length - 2)
         */
        if (offset == (replaceToNotNumber(width) * (slides.length - 1))) 
        {
            offset = 0;
        } 
        else 
        {
            // если не последний слайд добавляем смещение
            /**
             * Почему ф-я именно здесь не срабатывает без унарного плюса
             */
            offset += replaceToNotNumber(width); 
        }

        // передаем на сколько нужно здивунуть слайд
        slidesField.style.transform = `translateX(-${offset}px)`;

        // если дошли до конца перемещаемся на 1 слайд
        if (slideIndex == slides.length) 
        {
            slideIndex = 1;
        }
        // если нет
        else 
        {
            slideIndex++;
        }

        // запуск ф-и
        plusZero(slides);

        // запуск ф-и
        arrDots(dots);
    });

    // обработка клика
    prev.addEventListener('click', () => {
        // если мы на ходимся на первом слайде
        if (offset == 0) 
        {
            // просчитываем то количество на которое сдвинуть
            offset = replaceToNotNumber(width) * (slides.length - 1);
        } 
        else 
        {
            // просчитываем то количество на которое сдвинуть
            offset -= replaceToNotNumber(width);
        }

        // передаем на сколько нужно здивунуть слайд
        slidesField.style.transform = `translateX(-${offset}px)`;

        // если мы на 1 слайде, перемещаемся на последний
        if (slideIndex == 1) 
        {
            slideIndex = slides.length;
        }
        // если нет
        else 
        {
            slideIndex--;
        }

        // запуск ф-и
        plusZero(slides);

        // запуск ф-и
        arrDots(dots);
    });

    // проходимся по массиву
    dots.forEach(dot => {
        // при клике на ли 
        dot.addEventListener('click', (e) => {
            //при клике на  ли атрибут равен
            const slideTo = e.target.getAttribute('data-slide-to');

            // переназначаем индекс на индекс ли
            slideIndex = slideTo;
            // просчитываем на сколько нужно сдвинуть слайдер, с помощью регулярки заменяем все не цифры на пустоту
            offset = replaceToNotNumber(width) * (slideTo - 1);
            // сколько нужно сдвинуть
            slidesField.style.transform = `translateX(-${offset}px)`;

            // запуск ф-и
            plusZero(slides);

            // запуск ф-и
            arrDots(dots);
        });
    });
    // Slider v2 end
}

// экспортируем
export default slider;
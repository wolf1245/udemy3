// строгая типизация

"use strict"
// обращение к DOMElementam
window.addEventListener('DOMContentLoaded', () => {
    // Tabs start
    // стили питания
    let tabs = document.querySelectorAll('.tabheader__item'),
    // дивы с стилями питания
          tabsContent = document.querySelectorAll('.tabcontent'),
    // родитель стилей питания
          tabsParent = document.querySelector('.tabheader__items');
    
    // скрываем дивы с стилями питания
    function hideTabContent() 
    {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        // убираем класс активности
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    // возращаем дивы с стилями питания
    function showTabContent(i = 0)
    {
        tabsContent[i].classList.add('show', 'fade');
        // нужному элменту удаляем класс невидимости
        tabsContent[i].classList.remove('hide');
        // возращаем класс активности
        tabs[i].classList.add('tabheader__item_active');
    }

    // вызов ф-и с скрытием
    hideTabContent();
    // вызов ф-и с показом только 1 блока
    showTabContent();

    // обработка клика на родителе стилях питания
    tabsParent.addEventListener('click', (event)=> {
        // для частого использования записываем метод в переменную(клик пользователя)
        const target = event.target;

        // если при клике, класс равен
        if(target && target.classList.contains('tabheader__item'))
        {
            // перебираем массив и сравнимаем с элементом котрый кликнул пользователь
            tabs.forEach((item, i) => {
                if(target == item)
                {
                    // скрываем все остальные и показываем только тот котрый равен
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Tabs end

    // Timer start
    // время до которого считаем таймер, может приходить из разных источников
    const deadLine = '2020-06-29';

    // ф-я разницы времени c параметром даты которую мы можем получать в виде строки
    function getTimeRemaining(endTime)
    {
        //от даты которую получили в виде строки,парсим в милисекунды и отнимаем текущюю дату пользователя, получаем разницу
        const t = Date.parse(endTime) - Date.parse(new Date());
        // превращаем разницу в дни
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        // получаем остаток часов до даты
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        // получаем остаток минут
        let minutes = Math.floor((t / (1000 * 60)) % 60);
        // получаем остаток секунд
        let seconds = Math.floor((t / 1000) % 60);

        // возращаем обьект с результатами
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // ф-я помощник в проверке + подставляет 0 если число < 10
    function helperZero(num)
    {
        if(num >= 0 && num < 10)
        {
            return `0${num}`;
        }
        else  if(num < 0)
        {
            return '00';
        }
        else
        {
            return num;
        }
    }

    // ф-я вывода на экран, где selector это родительский элемент тайммера
    function setTimeClock(selector, endTime)
    {
        // получаем элементы где распологаеться таймер
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        // запускаем ф-ю вывода через каждую секунду
        let timeInterval = setInterval(upDateClock, 1000);

        /*для того чтоб убрать баг отображения при перезаругзки 
        таймера вызовим ф-и  для установки даты*/
        upDateClock();

        // расчет времени который остался на данный момент
        function upDateClock()
        {
            // записываем возращаемый объект из ф-и
            let t = getTimeRemaining(endTime);
            
            // выводим на страницу
            days.innerHTML = helperZero(t.days);
            hours.innerHTML = helperZero(t.hours);
            minutes.innerHTML = helperZero(t.minutes);
            seconds.innerHTML = helperZero(t.seconds);

            // проверяем разницу в милисекундых на исчерпание
            if(t.total <= 0)
            {
                // останавливаем если время вышло
                clearInterval(timeInterval);
            }
        }
    }

    // запуск ф-и c элементом поиска и датой окончания таймера
    setTimeClock('.timer', deadLine);
    // end Timer

    // Modal start
 
    //получаем кнопки
    let modelBtn = document.querySelectorAll('[data-model]');
    // получаем сам класс окна
    let modal = document.querySelector('.modal');

    //навешуем события при клике на показать
    modelBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    //ф-я ооткрытия окна
    function openModal()
    {
        modal.classList.add('show');
        modal.classList.remove('hide')
        // скрываем скролл для того чтоб не прокручивалась страница
        document.body.style.overflow = 'hidden';
        //
        clearTimeout(modalTimerId);
    }
    

    // ф-я закрытия модельного окна
    function closeModal()
    {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // снимаем запрет на скролл
        document.body.style.overflow = '';
    }


    // при клике на подложку закрываем а также если есть атрибут data-close у элемента то тоже закрываем
    modal.addEventListener('click', (event) => {
        // проверяем что клик пользователя был именно на подложку или элемент с атрибутом
        if(event.target === modal || event.target.getAttribute('data-close') == '')
        {
            closeModal();
        }
    });

    // при нажатии escape
    document.addEventListener('keydown', (event) => {
        // проверяем открыто ли окно
        if(event.code === 'Escape' && modal.classList.contains('show'))
        {
            closeModal();
        }
    });

    // показываем пользователю при входет окно на  3 сек
    const modalTimerId = setTimeout(openModal, 3000);

    // вычесляем когда пользователь проскролит страницу до низа
    function showModalScroll()
    {
        // проверяем сколько проскролили пользователь
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
        {
            openModal();
            // удаляем ф-я показа окна при скролее,чтоб 1 раз показалась
            window.removeEventListener('scroll', showModalScroll);
        }
    }

    // показываем пользователю окно, при скролле к низу страницы
    window.addEventListener('scroll', showModalScroll);
    //Modal end

    //class Карточек меню start
    class menuEat
    {
        /**
         * 
         * @param {string} src - путь картинки
         * @param {string} alt - название картинки
         * @param {string} subtitle - название карточки меню
         * @param {string} descr - описание меню
         * @param {number} price - цена меню
         * @param {number} priceDollar - цена доллара
         * @param {...array} classes - rest оператор
         * @param {string} parentSelector - элемерты поиска
         */
        constructor(src, alt, subtitle, descr, price, parentSelector, ...classes)
        {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
            this.priceDollar = 26.80;
            this.transerUAH();
            this.renderCart();
        }

        // метод конвертирования цены в гривне в доллар
        transerUAH()
        {
            this.price = Math.floor(this.price * this.priceDollar);
        }

        // метод создания какрточки
        renderCart()
        {
            let elem = document.createElement('div');
            // проверяем были ли переданы значения в массив
            if(this.classes.length === 0)
            {
                // если пустой то создаем класс по  умолчанию
                this.classes  = 'menu__item';
                // добавляем класс созданому диву
                elem.classList.add(this.classes);
            }
            else
            {
                // добавляем каждому элементу
                this.classes.forEach(className => elem.classList.add(className));
            }
            elem.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.subtitle}"</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            // вставляем после элемента переданого в класс
            this.parentSelector.append(elem);
        }
    }

    // ф-я запроса fecth промиса
    getResource('http://localhost:3000/menu')
    // обрабатываем    
    .then(data => {
        // достаем обьекты из массива, и эти обьекты деструктиризируем  {img, altimg, title, descr, price}   
        data.forEach(({img, altimg, title, descr, price}) => {
            // передаем в обьект класса данные деструктиризируемые из массива
            new menuEat(img, altimg, title, descr, price, ".menu .container");
        });
    });
    //class Карточек мею end

    // AJAX  start

    // берем все формы с страницы в псевдомассив
    const forms = document.querySelectorAll('form');
    
    // создаем обьект с выводм статуса
    const message = 
    {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // достаем каждую форму из псевдомассива
    forms.forEach(item => {
        // вызов ф-и и передача форм
        postData(item);
    });

    /*ф-я формирования отправки fecth промиса
    * где url путь
    * где data данные
    * async асинхроно с странице
    * await но ждет пока не отработают методы с ним
    */
    const postAndData = async (url, data) => {
        // переменная fecth промиса
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        
        // возрат данных конвертируемых из json формата
        return await res.json();
    };

    // ф-я запроса fecth промиса
    async function getResource(url) 
    {
        // переменная fecth промиса
        let res = await fetch(url);
        
        // проверяем ответ fecth промиса
        if (!res.ok) 
        {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        
        // если все прошло удачно возращаем данные в обьекте
        return await res.json();
    }

    //  обработки форм
    function postData(form) 
    {
        // при собитии отправить
        form.addEventListener('submit', (event) => {
            // сообщаем что событие не обработанно
            event.preventDefault();

            // создаем img куда будем выводить 
            let statusMessage = document.createElement('img');
            // добавляем путь картинки
            statusMessage.src = message.loading;;
            // добавляем стили картинке
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            // вставляем после формы
            form.insertAdjacentElement('afterend', statusMessage);
            
            // конструктор обьект с формами
            const formData = new FormData(form);
            
            // создаем обьект для превращения Конструктора FormData в JSON формат
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            // ф- я вызова промиса fecht 
            postAndData('http://localhost:3000/requests', json)
            // конвертируем json формат в текст
            .then(data => data.text())
            // обрабатываем промис в случае успеха
            .then(data => {
                console.log(data);
                // ответ что удачно отправил
                showThanksModal(message.success);
                // удаляем собщение
                statusMessage.remove();
            })
            // обрабатываем промис в случае неудачи
            .catch(() => {
                // если не успешен оповещаем
                showThanksModal(message.failure);
            })
            // после выпонения одного из результатов
            .finally(() => {
                // очищаем форму
                form.reset();
            });
        });
    }

    // ф-я вывода ответа на запрос пользователю
    function showThanksModal(message) 
    {
        // получаем модельное окно куда будем выводить
        const prevModalDialog = document.querySelector('.modal__dialog');

        // добавляем класс скрыть
        prevModalDialog.classList.add('hide');
        // показываем окно
        openModal();

        // создаем элемент
        const thanksModal = document.createElement('div');
        // добавляем существующий класс
        thanksModal.classList.add('modal__dialog');
        // вставляем в этот элемент элемент с атрибутом закрытия
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        // вставляем созданный элемент после
        document.querySelector('.modal').append(thanksModal);
        // ф-я изменения окна,удаляет о выводк отправке, делает окно прежним, и закрывает
        setTimeout(() => {
            // удаляем созданный элемент
            thanksModal.remove();
            // возращаем классы те что были
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            // закрываем окно
            closeModal();
        }, 4000);
    }
    // AJAX end
    /*
    // Slider v1 start
    // индекс слайда для нас с единицы, для жс с нуля
    let slideIndex = 1;
    // получаем псевдомассив с слайдами
    const slides = document.querySelectorAll('.offer__slide'),
        // предыдущий слайд
        prev = document.querySelector('.offer__slider-prev'),
        // последующий слайд
        next = document.querySelector('.offer__slider-next'),
        // получаем элемент показывающий общее к-во слайдов
        total = document.querySelector('#total'),
        // получаем элемент вывода текущего слайда 
        current = document.querySelector('#current');

    // запуск ф-и для скрытия всех и отображения 1 слайда
    showSlides(slideIndex);

    // проверяем ко-во слайдов в пседомассиве 
    if (slides.length < 10) 
    {
        //если меньше  10 добавляем ноль перед числом
        total.textContent = `0${slides.length}`;
    } 
    else 
    {
        // если больше выводим так
        total.textContent = slides.length;
    }

    // ф-я показа нужного слайда
    function showSlides(n) 
    {
        // возращаем на 1 слайд
        if (n > slides.length) 
        {
            slideIndex = 1;
        }
        // возращаем на последний слайд
        if (n < 1) 
        {
            slideIndex = slides.length;
        }

        // выключаем отображения свойства цсс у слайдов
        slides.forEach((item) => item.style.display = 'none');

        // включаем показ того слайда на котором находимся
        slides[slideIndex - 1].style.display = 'block'; // Как ваша самостоятельная работа - переписать на использование классов show/hide
        
        // текущий номер слайда
        if (slides.length < 10) 
        {
            // если меньше 10, добавляем ноль перед числом
            current.textContent =  `0${slideIndex}`;
        } 
        else 
        {
            current.textContent =  slideIndex;
        }
    }

    // ф-я переключения слайда 
    function plusSlides (n) 
    {
        showSlides(slideIndex += n);
    }

    // предыдущий слайд
    prev.addEventListener('click', function(){
        plusSlides(-1);
    });

    // следующий слайд
    next.addEventListener('click', function(){
        plusSlides(1);
    });
    // Slider v1 end
    */
    // Slider v2 start
    // отступ
    let offset = 0;
    // индекс слайда для нас с единицы, для жс с нуля
    let slideIndex = 1;

    // получаем псевдомассив с слайдами
    const slides = document.querySelectorAll('.offer__slide'),
        // достаем слайдер
        slider = document.querySelector('.offer__slider'),
        // предыдущий слайд
        prev = document.querySelector('.offer__slider-prev'),
        // последующий слайд
        next = document.querySelector('.offer__slider-next'),
        // получаем элемент показывающий общее к-во слайдов
        total = document.querySelector('#total'),
        // получаем элемент вывода текущего слайда 
        current = document.querySelector('#current'),
        // получаем обертку слайдера
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        // получаем приминеную ширину к обертке
        width = window.getComputedStyle(slidesWrapper).width,
        // контейнер поле наших слайдеров
        slidesField = document.querySelector('.offer__slider-inner');

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
    //обработка клика
    next.addEventListener('click', () => {
        /**
         * если наш отступ будет равен умноженоое на количество
         * слайдев минус 1, то устанавлюем offset
         * чтоб вернуться в начало
         * обязательно унарный плюс превращаем строку '500px' в число +width.slice(0, width.length - 2)
         */
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) 
        {
            offset = 0;
        } 
        else 
        {
            // если не последний слайд добавляем смещение
            offset += +width.slice(0, width.length - 2); 
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
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } 
        else 
        {
            // просчитываем то количество на которое сдвинуть
            offset -= +width.slice(0, width.length - 2);
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
            // просчитываем на сколько нужно сдвинуть слайдер
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            // сколько нужно сдвинуть
            slidesField.style.transform = `translateX(-${offset}px)`;

            // запуск ф-и
            plusZero(slides);

            // запуск ф-и
            arrDots(dots);
        });
    });
    // Slider v2 end
});

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc()
{
    // calc starts

    // получаем тег спан в классе 
    const result = document.querySelector('.calculating__result span');
    // временные переменные
    let sex, height, weight, age, ratio;

    // проверка пола, если пользователь был уже и кликал,если нет то ставим по умолчанию
    if (localStorage.getItem('sex')) 
    {
        sex = localStorage.getItem('sex');
    } 
    else 
    {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    // // проверка рициона питания, если пользователь был уже и кликал,если нет то ставим по умолчанию
    if (localStorage.getItem('ratio')) 
    {
        ratio = localStorage.getItem('ratio');
    } 
    else 
    {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    // ф-я просчета для ж и м
    function calcTotal() 
    {
        // проверка что если хоть одно поле не заполненно
        if (!sex || !height || !weight || !age || !ratio) 
        {
            result.textContent = '____';
            return;
        }

        // проверка м или ж
        if (sex === 'female') 
        {
            // ко-во калорий округленное
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } 
        else 
        {
            // ко-во калорий округленное
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    // запуск ф-и
    calcTotal();

    // ф-я запоминания выбора пользователя
    function initLocalSettings(selector, activeClass) {
        // обращаемся к элментам
        const elements = document.querySelectorAll(selector);

        // проходим форычем 
        elements.forEach(elem => {
            // у каждого элемента удала=яем не активный класс
            elem.classList.remove(activeClass);
            // проверяем если запись равно айди добавляем класс активности
            if (elem.getAttribute('id') === localStorage.getItem('sex')) 
            {
                elem.classList.add(activeClass);
            }
            // проверяем если запись равно атрибуту добавляем класс активности
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) 
            {
                elem.classList.add(activeClass);
            }
        });
    }

    // запуск ф-и где #gender div обращение к всем тегам
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    // запуск ф-и где calculating__choose_big div обращение к всем тегам
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // ф-я назначения пола и кофициэнта активности и активного класса при клике пользователя
    function getStaticInformation(selector, activeClass) {
        // получаем все дивы в классе котрый передадим
        const elements = document.querySelectorAll(selector);

        // вытягиваем все дивы
        elements.forEach(elem => {
            // при клике на див из класса
            elem.addEventListener('click', (event) => {
                // если клик пользователя на див с атрибутом 
                if (event.target.getAttribute('data-ratio')) 
                {
                    // записываем нажатый див с атрибутом в переменую
                    ratio = +event.target.getAttribute('data-ratio');
                    // записываем на какой див с атрибутом кликнул пользователь
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                }
                // если нет
                else 
                {
                    // записываем див с атрибутом пола
                    sex = event.target.getAttribute('id');
                    // записываем какой пол пользователь выбрал
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }
    
                // проходим форычем и удаляем активный класс
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                
                // добавляем активный класс нажатому диву
                event.target.classList.add(activeClass);
    
                // ф-я подчнета
                calcTotal();
            });
        });
    }

    // запуск ф-и с выбором пола,и вытакскиваем класс активности где #gender div обращение к всем тегам
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    // запуск ф-и с выбором активности, и вытакскиваем класс активности где .calculating__choose_big div обращение к всем тегам
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // ф-я  записи физических данных от пользователя
    function getDynamicInformation(selector) {
        // получаем элемент
        const input = document.querySelector(selector);

        // делаем проверку чтоб пользоваетель вводил только цифры
        input.addEventListener('input', () => {
            // если не цифра
            if (input.value.match(/\D/g)) 
            {
                // то красим в красный
                input.style.border = "1px solid red";
            } 
            else 
            {
                // даем браузеру применить свои свойства
                input.style.border = '';
            }
        });

        // отслеживаем событие
        input.addEventListener('input', () => {
            // проверяем айди атрибут элемента
            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            // запуск для пересчета при изменении полей инпута
            calcTotal();
        });
    }

    // ввод с длиной
    getDynamicInformation('#height');
    // ввод с шириной 
    getDynamicInformation('#weight');
    // запуск с возрастом
    getDynamicInformation('#age');
    // calc end
}

// экспортируем
/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
// импортируем ф-ю из сервеса


function cards()
{
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
    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/menu')
    // обрабатываем    
    .then(data => {
        // достаем обьекты из массива, и эти обьекты деструктиризируем  {img, altimg, title, descr, price}   
        data.forEach(({img, altimg, title, descr, price}) => {
            // передаем в обьект класса данные деструктиризируемые из массива
            new menuEat(img, altimg, title, descr, price, ".menu .container");
        });
    });


    //class Карточек мею end
}

// экспортируем
/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
// импортируем 2 ф-и из файла modal.js так как они используються в этом файле

//инпортируем ф-ю форм дата


function forms(formSelector, modalTimerId)
{
    // AJAX  start

    // берем все формы с страницы в псевдомассив
    const forms = document.querySelectorAll(formSelector);
    
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
            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postAndData"])('http://localhost:3000/requests', json)
            /*
            *  // конвертируем json формат в текст
            *  // .then(data => data.text())
            */
            // // обрабатываем промис в случае успеха
            .then(data => {
                console.log(data);
                // ответ что удачно отправил
                showThanksModal(message.success);
                // удаляем собщение
                statusMessage.remove();
            })
            // обрабатываем промис в случае неудачи
            .catch(() => {
                console.log(555);
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
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimerId);

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
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
        }, 4000);
    }
    // AJAX end
}

//экспортируем
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, openModal, closeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
// 2 отдельные ф-я для именованого экспорта так как используються в друглм файле
//ф-я ооткрытия окна
function openModal(modalSelect, modalTimerId)
{
    // получаем элемент
    const modal = document.querySelector(modalSelect);

    modal.classList.add('show');
    modal.classList.remove('hide')
    // скрываем скролл для того чтоб не прокручивалась страница
    document.body.style.overflow = 'hidden';
    // очищаем интервал  с проверкой если он есть
    if(modalTimerId)
    {
        clearTimeout(modalTimerId);
    }
}


// ф-я закрытия модельного окна
function closeModal(modalSelect)
{
    // получаем элемент
    const modal = document.querySelector(modalSelect);    

    modal.classList.add('hide');
    modal.classList.remove('show');
    // снимаем запрет на скролл
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelect, modalTimerId)
{
    // Modal start
 
    //получаем кнопки
    let modelBtn = document.querySelectorAll(triggerSelector);
    // получаем сам класс окна
    let modal = document.querySelector(modalSelect);

    //навешуем события при клике на показать, оборачиваем ф-я в каллбэк чтоб при загрузке сразу не срабатывала
    modelBtn.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelect, modalTimerId));
    });



    // при клике на подложку закрываем а также если есть атрибут data-close у элемента то тоже закрываем
    modal.addEventListener('click', (event) => {
        // проверяем что клик пользователя был именно на подложку или элемент с атрибутом
        if(event.target === modal || event.target.getAttribute('data-close') == '')
        {
            closeModal(modalSelect);
        }
    });

    // при нажатии escape
    document.addEventListener('keydown', (event) => {
        // проверяем открыто ли окно
        if(event.code === 'Escape' && modal.classList.contains('show'))
        {
            closeModal(modalSelect);
        }
    });


    // вычесляем когда пользователь проскролит страницу до низа
    function showModalScroll()
    {
        // проверяем сколько проскролили пользователь
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
        {
            openModal(modalSelect, modalTimerId);
            // удаляем ф-я показа окна при скролее,чтоб 1 раз показалась
            window.removeEventListener('scroll', showModalScroll);
        }
    }

    // показываем пользователю окно, при скролле к низу страницы
    window.addEventListener('scroll', showModalScroll);
    //Modal end
}

// экспортируем
/* harmony default export */ __webpack_exports__["default"] = (modal);
// делаем именнованый экспорта для файла forms.js так как они так используються

// делаем именнованый экспорта для файла forms.js так как они так используються


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) 
{
    // Tabs start
    // стили питания
    let tabs = document.querySelectorAll(tabsSelector),
    // дивы с стилями питания
          tabsContent = document.querySelectorAll(tabsContentSelector),
    // родитель стилей питания
          tabsParent = document.querySelector(tabsParentSelector);
    
    // скрываем дивы с стилями питания
    function hideTabContent() 
    {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        // убираем класс активности
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    // возращаем дивы с стилями питания
    function showTabContent(i = 0)
    {
        tabsContent[i].classList.add('show', 'fade');
        // нужному элменту удаляем класс невидимости
        tabsContent[i].classList.remove('hide');
        // возращаем класс активности
        tabs[i].classList.add(activeClass);
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
        if(target && target.classList.contains(tabsSelector.slice(1)))
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
}

// экспортируем
/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadLine)
{
    // Timer start

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
    setTimeClock(id, deadLine);
    // end Timer
}

// экспортируем
/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
// импортируем модули








// обращение к DOMElementam
window.addEventListener('DOMContentLoaded', () => {
    // глобально для всех, обернутая в каллбэк ф-ю
    // показываем пользователю форму модельного окна при входе через  3 сек
    const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["openModal"])('.modal', modalTimerId), 3000);

    // вызываем для запуска ф-и
    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-model]','.modal', modalTimerId);
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2020-09-15');
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form',modalTimerId);
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        containerSlides: '.offer__slider',
        slide: '.offer__slide',
        nextArr: '.offer__slider-next',
        prevArr: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postAndData, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postAndData", function() { return postAndData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
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



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
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
export default calc;
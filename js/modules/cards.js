// импортируем ф-ю из сервеса
import{getResource} from '../services/services';

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
}

// экспортируем
export default cards;
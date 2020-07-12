// импортируем модули
import tabs  from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';
// обращение к DOMElementam
window.addEventListener('DOMContentLoaded', () => {
    // глобально для всех, обернутая в каллбэк ф-ю
    // показываем пользователю форму модельного окна при входе через  3 сек
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 3000);

    // вызываем для запуска ф-и
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-model]','.modal', modalTimerId);
    timer('.timer', '2020-09-15');
    cards();
    calc();
    forms('form',modalTimerId);
    slider({
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

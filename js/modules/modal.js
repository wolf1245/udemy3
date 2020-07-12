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
export default modal;
// делаем именнованый экспорта для файла forms.js так как они так используються
export {openModal};
// делаем именнованый экспорта для файла forms.js так как они так используються
export {closeModal};
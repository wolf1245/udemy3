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
export default tabs;
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
export default timer;
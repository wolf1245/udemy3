// импортируем 2 ф-и из файла modal.js так как они используються в этом файле
import{closeModal, openModal} from './modal';
//инпортируем ф-ю форм дата
import{postAndData} from '../services/services';

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
            postAndData('http://localhost:3000/requests', json)
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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 4000);
    }
    // AJAX end
}

//экспортируем
export default forms;
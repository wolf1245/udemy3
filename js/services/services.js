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
export {postAndData};
export {getResource};
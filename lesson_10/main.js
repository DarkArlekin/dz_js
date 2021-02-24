//удаление рекламы
document.querySelector('.adv').remove();

//получение карточек с книгами
let listBook = document.querySelectorAll('.book');

//перестановка карточек книг
listBook[1].after(listBook[0]);
listBook[5].after(listBook[2]);
listBook[3].before(listBook[4]);

//замена фона
let bcg = document.querySelector('body');
bcg.style.backgroundImage = 'url(image//img2.jpg)';

//замена заголовка
listBook[4].querySelector('a').innerHTML = 'Книга 3. this и Прототипы Объектов';

//вставка 8 главы
let list = listBook[2].querySelectorAll('li');
list[8].after('Глава 8: За пределами ES6');

//перестановка елементов 2 книги
list = listBook[0].querySelectorAll('li');
list[8].after(list[4]);
list[4].after(list[5]);
list[9].before(list[7]);
list[10].before(list[2]);

//перестановка елементов 5 книги
list = listBook[5].querySelectorAll('li');
list[0].after(list[9]);
list[4].after(list[2]);
list[7].after(list[5]);

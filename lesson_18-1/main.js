const week = {
  0: 'Понедельник',
  1: 'Вторник',
  2: 'Среда',
  3: 'Четверг',
  4: 'Пятница',
  5: 'Суббота',
  6: 'Воскресенье',
};
const hello = document.querySelector('.hello'),
  today = document.querySelector('.today'),
  time = document.querySelector('.time'),
  newYear = document.querySelector('.newYear');

function getHello() {
  const hours = new Date().getHours();
  if (hours >= 5 && hours <= 11) {
    return 'Доброе утро!';
  }
  if (hours > 11 && hours <= 17) {
    return 'Добрый день!';
  }
  if (hours > 17 && hours <= 22) {
    return 'Добрый вечер!';
  }
  if (hours > 22 && hours < 5) {
    return 'Доброй ночи!';
  }
}

let dateNY = (new Date('01 01 2022') - new Date()) / (1000 * 60 * 60 * 24);
today.textContent += week[new Date().getDay()];
time.textContent += new Date().toLocaleTimeString();
hello.textContent = getHello();
newYear.textContent += Math.floor(dateNY);

'use strict';
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let i = 0,
  today = new Date().getUTCDay();
week.forEach((element) => {
  document.querySelector('.days').innerHTML += `<li class="day${i}">${element}</li>`;
  if (i == 5 || i == 6) {
    document.querySelector(`.day${i}`).classList.add('italic');
    console.log(element);
  }
  if (i === today) {
    document.querySelector(`.day${i - 1}`).classList.add('today');
  }
  i++;
});

console.log();

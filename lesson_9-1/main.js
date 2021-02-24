const months = {
  0: 'Января',
  1: 'Февраля',
  2: 'Марта',
  3: 'Апреля',
  4: 'Мая',
  5: 'Июня',
  6: 'Июля',
  7: 'Августа',
  8: 'Сентября',
  9: 'Октября',
  10: 'Ноября',
  11: 'Декабря',
};
const week = {
  0: 'Понедельник',
  1: 'Вторник',
  2: 'Среда',
  3: 'Четверг',
  4: 'Пятница',
  5: 'Суббота',
  6: 'Воскресенье',
};

const hours = function (hour) {
  let str = '';
  if (hour === 1) {
    str = ` ${hour} час`;
  } else {
    if (hour > 1 && hour < 5) {
      str = `${hour} часа`;
    } else {
      str = ` ${hour} часов`;
    }
  }
  return str;
};

const minutes = function (minute) {
  let str = '';
  if (minute === 1) {
    str = ` ${minute} минута`;
  } else {
    if (minute > 1 && minute < 5) {
      str = `${minute} минуты`;
    } else {
      str = ` ${minute} минут`;
    }
  }
  return str;
};

const seconds = function (second) {
  let str = '';
  if (second === 1) {
    str = ` ${second} секунда`;
  } else {
    if (second > 1 && second < 5) {
      str = `${second} секунды`;
    } else {
      str = ` ${second} секунд`;
    }
  }
  return str;
};
const dateOneType = function () {
  document.querySelector('.type_one').innerHTML = `Сегодня ${week[new Date().getDay()]}, ${new Date().getDate()} ${
    months[new Date().getMonth()]
  } ${new Date().getFullYear()} года, ${hours(new Date().getHours())} ${minutes(new Date().getMinutes())} ${seconds(
    new Date().getSeconds(),
  )}.`;
};

setInterval(dateOneType, 100);

function addNull(num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

const dateTwoType = function () {
  document.querySelector('.type_two').innerHTML = `${addNull(new Date().getDay())}.${addNull(
    new Date().getMonth(),
  )}.${addNull(new Date().getFullYear())} - ${addNull(new Date().getHours())}:${addNull(
    new Date().getMinutes(),
  )}:${addNull(new Date().getSeconds())}`;
};
setInterval(dateTwoType, 100);

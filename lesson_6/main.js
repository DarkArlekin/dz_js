'use strict';
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let inNum = function () {
  return +prompt('Введите число от 1 до 100:').trim();
};
function data() {
  let num = 25,
    x = inNum(),
    attempt = 10;
  if (isNumber(x) && x > 0 && x < 101) {
    console.log(x, attempt);
  } else {
    data();
  }
  let cycle = function (x) {
    attempt--;
    if (attempt === 0) {
      if (confirm('Попытки закончились! Желаете сыграть еще раз?')) {
        data();
      }
    } else {
      if (x === num) {
        if (confirm(`Поздравляю, Вы угадали!!! Хотели бы сыграть еще?`)) {
          data();
        }
      } else {
        if (x < num) {
          x = +prompt(`Осталось ${attempt} попыток.\nЗагаданное число больше:`);
          if (isNumber(x)) {
            cycle(x);
          } else {
            x = inNum();
            cycle(x);
          }
        }
        if (x > num) {
          x = +prompt(`Осталось ${attempt} попыток.\nЗагаданное число меньше:`);
          if (isNumber(x)) {
            cycle(x);
          }
        } else {
          x = inNum();
          cycle(x);
        }
      }
    }
  };
  return cycle(x);
}

data();

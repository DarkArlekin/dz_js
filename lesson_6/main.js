'use strict';
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// function game() {
//   let x = +prompt('Угадай число от 1 до 100:'),
//     num = 25,
//     attempt = 9;
//   if (!isNumber(x)) {
//     game();
//   }
//   function cycle(x) {
// if (x === num) {
//   let play = confirm(`Поздравляю, Вы угадали!!! Хотели бы сыграть еще?`);
//   if (play == true) {
//     game();
//   }
// } else {
//   if (x < num && attempt > 0) {
//     x = +prompt(`Осталось ${attempt} попыток.\nЗагаданное число больше:`);
//     attempt--;
//     if (!isNumber(x)) {
//       cycle(x);
//     }
//   }
//   if (x > num && attempt > 0) {
//     x = +prompt(`Осталось ${attempt} попыток.\nЗагаданное число меньше:`);
//     attempt--;
//     if (!isNumber(x)) {
//       cycle(x);
//     }
//   }
// }
// }
//   return cycle(x);
// }

// game();

// function game(x) {
//   // let num=25,
//   // attempt=9;
//   console.log(x);
// }
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

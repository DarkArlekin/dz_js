function getExpensesMonth(amount1, amount2) {
  return amount1 + amount2;
}
function getAccumulatedMonth(money, amount1, amount2) {
  return money - (amount1 + amount2);
}
function getTargetMonth(a, b) {
  return a / b;
}

let money = prompt('Ваш месяченый доход?', [0]);
if (money >= 1200) {
  console.log('У вас высокий уровень дохода');
} else {
  if (money >= 600) {
    console.log('У вас средний уровень дохода');
  } else {
    if (money > 0) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
      console.log('Что то пошло не так');
    }
  }
}

let addExpenses = ('Перечислите возможные расходы за расчитываемый период через запятую', [0]);
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?', []);
let expenses2 = prompt('Введите обязательную статью расходов?', []);
let amount1 = prompt('Во сколько это обойдется?', []);
let amount2 = prompt('Во сколько это обойдется?', []);
let mission = 50000000;
let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);
let butgetDay = accumulatedMonth / 30;
console.log(getExpensesMonth(amount1, amount2));
console.log(addExpenses);
console.log(getTargetMonth(mission, accumulatedMonth));
console.log(butgetDay);

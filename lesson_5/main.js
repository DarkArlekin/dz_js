let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;

let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};
start();
let income = 'Freelance',
  addExpenses = ('Перечислите возможные расходы за расчитываемый период через запятую', [0]),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 50000000,
  period = 3;
console.log(addExpenses.toLowerCase().split(','));
let expenses = [];
let getExpensesMonth = function () {
  let sum = 0,
    amEx = 0;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?', []);
    do {
      amEx = prompt('Во сколько это обойдется?', []);
    } while (!isNumber(money));
    sum += amEx;
  }
  console.log(expenses);
  return sum;
};
let expensesAmount = getExpensesMonth();
let getAccumulatedMonth = function () {
  return money - expensesAmount;
};

let getTargetMonth = function () {
  return mission / accumulatedMonth;
};

let showTypeof = function (item) {
  console.log(typeof item);
};
showTypeof(money);
showTypeof(income);
showTypeof(deposit);

let accumulatedMonth = getAccumulatedMonth();
let butgetDay = accumulatedMonth / 30;

console.log('Расходы за месяц:' + expensesAmount);
if (getTargetMonth() < 0) {
  console.log('Цель не будет достигнута!');
} else {
  console.log('Цель будет достигнута!');
}
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

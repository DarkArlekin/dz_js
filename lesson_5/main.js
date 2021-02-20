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

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpensesMonth: function () {
    for (let i = 0; i < 2; i++) {
      let a = prompt('Введите обязательную статью расходов?');
      do {
        appData.expenses[a] = +prompt('Во сколько это обойдется?');
      } while (!isNumber(appData.expenses[a]));
    }
    for (let value in appData.expenses) {
      appData.expensesMonth += appData.expenses[value];
    }
    console.log(appData.expenses);
    return appData.expensesMonth;
  },
  getBudget: function () {
    appData.budgetMonth = money-appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },
  getStatusIncome: function () {
    if (money >= 1200) {
      return 'У вас высокий уровень дохода';
    } else {
      if (money >= 600) {
        return 'У вас средний уровень дохода';
      } else {
        if (money > 0) {
          return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
          return 'Что то пошло не так';
        }
      }
    }
  },
};
appData.asking();
console.log('Расходы за месяц:' + appData.getExpensesMonth());
appData.getBudget();
console.log('Цель  будет достигнута через ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя такие данные:');
for (const key in appData) {
  console.log(key + ' : ' + appData[key]);
}

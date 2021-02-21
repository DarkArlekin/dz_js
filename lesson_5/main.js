let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;
let isNull = function (n) {
  return n.trim() === '' || +n == n;
};

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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
      let itemIncome = '';
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксист');
      } while (isNull(itemIncome));
      let cashIncome = 0;
      do {
        cashIncome = prompt('Сколько вы зарабатываете на этом?', 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = '';
    do {
      addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
    } while (isNull(addExpenses));
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    appData.getInfoDeposit();
    for (let i = 0; i < 2; i++) {
      let itemExpenses = '';
      do {
        itemExpenses = prompt('Введите обязательную статью расходов?');
      } while (isNull(itemExpenses));
      let cashExpenses;
      do {
        cashExpenses = prompt('Во сколько это обойдется?');
      } while (!isNumber(cashExpenses));
      appData.expenses[itemExpenses] = cashExpenses;
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    appData.budgetMonth * appData.period;
  },
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log('Расходы за месяц:' + appData.expensesMonth);

console.log('Цель  будет достигнута через ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя такие данные:');
for (const key in appData) {
  console.log(key + ' : ' + appData[key]);
}
let str = '';
appData.addExpenses.forEach((element) => {
  str += element.trim().charAt(0).toUpperCase() + element.slice(1, element.lenght);
  str += ', ';
});
console.log(str);

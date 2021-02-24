let start = document.getElementById('start'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositCheck = document.querySelectorAll('#deposit-check'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  expensesMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
  accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  incomeAmount = document.querySelector('.income-amount'),
  expensesTitle = document.querySelector('.expenses-amount'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  periodSelect = document.querySelector('.period-select');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let isNull = function (n) {
  return n.trim() === '' || +n == n;
};

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
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    if (salaryAmount.value === '') {
      alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
      return;
    }
    appData.budget = salaryAmount.value;
    // appData.asking();
    // appData.getExpensesMonth();
    // appData.getBudget();
  },
  addExpensesBlock: function () {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
    if (expensesItems.length === 2) {
      expensesPlus.style.display = 'none';
    }
  },
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
start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

if (appData.getTargetMonth() > 0) {
  console.log('Цель  будет достигнута через ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
  console.log('Цель не будет достигнута');
}

let str = '';
appData.addExpenses.forEach((element) => {
  str += element.trim().charAt(0).toUpperCase() + element.slice(1, element.lenght);
  str += ', ';
});
console.log(str);

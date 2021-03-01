let start = document.getElementById('start'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositCheck = document.querySelectorAll('#deposit-check'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  expensesTitle = document.querySelector('.expenses-amount'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let isNull = function (n) {
  return n.trim() === '' || +n == n;
};

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
  },
  getNullCoppyInput: function (nameElement, nameClass) {
    nameElement.querySelector(`${nameClass}`).value = '';
  },
  addExpensesBlock: function () {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    appData.getNullCoppyInput(cloneExpensesItems, '.expenses-title');
    appData.getNullCoppyInput(cloneExpensesItems, '.expenses-amount');
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    appData.getNullCoppyInput(cloneIncomeItems, '.income-title');
    appData.getNullCoppyInput(cloneIncomeItems, '.income-amount');
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getPeriod: function () {
    periodAmount.textContent = periodSelect.value;
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
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
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
};

start.addEventListener('click', () => {
  if (salaryAmount.value !== '') return appData.start();
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);
// if (appData.getTargetMonth() > 0) {
//   console.log('Цель  будет достигнута через ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
// } else {
//   console.log('Цель не будет достигнута');
// }

let str = '';
appData.addExpenses.forEach((element) => {
  str += element.trim().charAt(0).toUpperCase() + element.slice(1, element.lenght);
  str += ', ';
});
console.log(str);

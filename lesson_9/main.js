'use strick';

const start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  checkBox = document.querySelectorAll('#deposit-check'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  periodAmount = document.querySelector('.period-amount');
let incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
  constructor() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }
  check() {
    if (salaryAmount.value != '') {
      start.removeAttribute('disabled');
    }
  }
  start() {
    if (salaryAmount.value === '') {
      start.setAttribute('disabled', 'true');
      return;
    }
    const allInput = document.querySelectorAll('.data input[type=text]');
    allInput.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
    expensesPlus.setAttribute('disabled', 'true');
    incomePlus.setAttribute('disabled', 'true');
    start.style.display = 'none';
    cancel.style.display = 'block';

    this.budget = +salaryAmount.value;

    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getInfoDeposit();
    this.getStatusIncome();
    this.showResult();
  }
  showResult() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', function () {
      incomePeriodValue.value = _this.calcPeriod();
    });
  }
  addExpensesBlock() {
    const cloneExpensesItems = expensesItems[0].cloneNode(true);
    cloneExpensesItems.querySelector(`${'.expenses-title'}`).value = '';
    cloneExpensesItems.querySelector(`${'.expenses-amount'}`).value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }

  addIncomeBlock() {
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    cloneIncomeItems.querySelector(`${'.income-title'}`).value = '';
    cloneIncomeItems.querySelector(`${'.income-amount'}`).value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }

  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      console.log(startStr);
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };
    incomeItems.forEach(count);
    expensesItems.forEach(count);
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function (item) {
      item = item.trim();
      item = item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      itemValue = itemValue.charAt(0).toUpperCase() + itemValue.substring(1).toLowerCase();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  getStatusIncome() {
    if (this.budget >= 800) {
      return 'Высокий уровень дохода';
    } else if (this.budget >= 300 && this.budget < 800) {
      return 'Средний уровень дохода';
    } else if (this.budget > 0 && this.budget < 300) {
      return 'Уровень дохода ниже среднего';
    } else if (this.budget < 0) {
      return 'Что то пошло не так';
    }
  }
  getInfoDeposit() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', '12');
      } while (isNaN(this.percentDeposit) || this.percentDeposit === ' ' || this.percentDeposit === null);
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (isNaN(this.moneyDeposit) || this.moneyDeposit === ' ' || this.moneyDeposit === null);
    }
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  reset() {
    let inputTextData = document.querySelectorAll('.data input[type = text]'),
      resultInputAll = document.querySelectorAll('.result input[type = text]');

    inputTextData.forEach(function (elem) {
      elem.value = '';
      elem.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;
    });
    resultInputAll.forEach(function (elem) {
      elem.value = '';
    });

    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomePlus.style.display = 'block';
    }
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesPlus.style.display = 'block';
    }

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];

    cancel.style.display = 'none';
    start.style.display = 'block';
    expensesPlus.removeAttribute('disabled');
    incomePlus.removeAttribute('disabled');
    checkBox.checked = false;
  }
  eventListeners = function (obj) {
    start.addEventListener('click', this.start.bind(obj));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    salaryAmount.addEventListener('keyup', this.check);
    cancel.addEventListener('click', this.reset.bind(obj));

    periodSelect.addEventListener('change', function () {
      periodAmount.innerHTML = periodSelect.value;
    });
  };
}

const appData = new AppData();
appData.eventListeners(appData);

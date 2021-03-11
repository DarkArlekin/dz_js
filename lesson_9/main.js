'use strick';

const start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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
  periodAmount = document.querySelector('.period-amount'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  checkBox = document.querySelector('#deposit-check');
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
    this.getAddExpInc(additionalExpensesItem.value.split(','));
    this.getAddExpInc(additionalIncomeItem);
    this.getInfoDeposit();
    this.getBudget();
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

  addBlock(elem, btn) {
    let className = elem[0].className.split('-')[0];
    const cloneItems = elem[0].cloneNode(true);
    cloneItems.querySelector(`.${className}-title`).value = '';
    cloneItems.querySelector(`.${className}-amount`).value = '';
    elem[0].parentNode.insertBefore(cloneItems, btn);
    elem = document.querySelectorAll(`.${className}-items`);

    if (elem.length === 3) {
      btn.style.display = 'none';
    }
  }
  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
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
  getAddExpInc(incExp) {
    incExp.forEach((item) => {
      if (item !== '') {
        if (incExp === additionalIncomeItem) {
          let itemValue = item.value.trim();
          itemValue = itemValue.charAt(0).toUpperCase() + itemValue.substring(1).toLowerCase();
          this.addIncome.push(itemValue);
          return;
        }
        let itemValue = item.trim();
        itemValue = itemValue.charAt(0).toUpperCase() + itemValue.substring(1).toLowerCase();
        this.addExpenses.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
      if (depositPercent.value > 100 || depositPercent.value < 0) {
        this.percentDeposit = 0;
        this.moneyDeposit = depositAmount.value;
        alert('Введены неправильные данные в поле процент депозита');
      } else {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
      }
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

  changePercent() {
    const valueSelect = this.value;
    depositPercent.style.display = 'inline-block';
    if (valueSelect === 'other') {
      depositPercent.value = '';
      depositPercent.removeAttribute('disabled');
    } else {
      depositPercent.value = valueSelect;
      depositPercent.setAttribute('disabled', 'true');
    }
  }
  depositHandler() {
    if (checkBox.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventListeners = function (obj) {
    start.addEventListener('click', this.start.bind(obj));
    expensesPlus.addEventListener('click', () => this.addBlock(expensesItems, expensesPlus));
    incomePlus.addEventListener('click', () => this.addBlock(incomeItems, incomePlus));
    salaryAmount.addEventListener('keyup', this.check);
    checkBox.addEventListener('change', this.depositHandler.bind(this));
    cancel.addEventListener('click', this.reset.bind(obj));

    periodSelect.addEventListener('change', function () {
      periodAmount.innerHTML = periodSelect.value;
    });
  };
}

const appData = new AppData();
appData.eventListeners(appData);

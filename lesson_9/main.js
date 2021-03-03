'use strick'

let start = document.getElementById('start'),
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
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    periodAmount = document.querySelector('.period-amount');


const AppData = function() {
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
};

AppData.prototype.check = function() {
    if (salaryAmount.value != '') {
        start.removeAttribute('disabled');
    }
};

AppData.prototype.start = function () {
        if (salaryAmount.value === '') {
            start.setAttribute('disabled', 'true');
            return;
        }
        let allInput = document.querySelectorAll('.data input[type=text]');
        allInput.forEach(function(item) {
            item.setAttribute('disabled', 'true');
        });
        expensesPlus.setAttribute('disabled', 'true');
        incomePlus.setAttribute('disabled', 'true');
        start.style.display = 'none';
        cancel.style.display = 'block';

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.getInfoDeposit();
        this.getStatusIncome();
        this.showResult();
};

AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', function() {
        incomePeriodValue.value =  _this.calcPeriod();
    })
};


AppData.prototype.addExpensesBlock = function() {

    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    cloneExpensesItems.querySelector(`${'.expenses-title'}`).value = '';
    cloneExpensesItems.querySelector(`${'.expenses-amount'}`).value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.addIncomeBlock = function() {

    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    cloneIncomeItems.querySelector(`${'.income-title'}`).value = '';
    cloneIncomeItems.querySelector(`${'.income-amount'}`).value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function(item) {
        item = item.trim();
        item = item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        itemValue = itemValue.charAt(0).toUpperCase() + itemValue.substring(1).toLowerCase();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);

};

AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth;

};

AppData.prototype.getStatusIncome = function() {
    if (this.budget >= 800) {
        return 'Высокий уровень дохода';
    } else if (this.budget >= 300 && this.budget < 800) {
        return 'Средний уровень дохода';
    } else if (this.budget > 0 && this.budget < 300) {
        return 'Уровень дохода ниже среднего';
    } else if (this.budget < 0) {
        return 'Что то пошло не так';
    }
};

AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {
        do {
            this.percentDeposit = prompt('Какой годовой процент?', '12');
        } while (isNaN(this.percentDeposit) || this.percentDeposit === ' ' || this.percentDeposit === null);
        do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while (isNaN(this.moneyDeposit) || this.moneyDeposit === ' ' || this.moneyDeposit === null);
    }
};

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;

};
AppData.prototype.reset = function() {

    let inputTextData = document.querySelectorAll('.data input[type = text]'),
        resultInputAll = document.querySelectorAll('.result input[type = text]');

    inputTextData.forEach(function(elem) {
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;
    });
    resultInputAll.forEach(function(elem) {
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
};
AppData.prototype.eventListeners = function (obj) {
    start.addEventListener('click', this.start.bind(obj));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    salaryAmount.addEventListener('keyup', this.check);
    cancel.addEventListener('click', this.reset.bind(obj));
    
    periodSelect.addEventListener('change', function() {
        periodAmount.innerHTML = periodSelect.value;
    });  
};
const appData = new AppData();
appData.eventListeners(appData);


'use strick';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('todoData')) ?? [];

const render = function () {
  headerInput.value = '';
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span class="text-todo">${item.value}</span> 
        <div class="todo-buttons">
            <button class="todo-complete"></button>
            <button class="todo-remove"></button>
            
        </div>
        
        <div class="todo-calc">
        <div class='block'>
          <div class="todo-calc__items">
            <span class="title">Цена жилья</span>
            <input type="text" class="todo-input" value=${item.house} />
          </div>
          <div class="todo-calc__items">
            <span class="title">Еда</span>
            <input type="text" class="todo-input" value=${item.food} />
          </div>
          </div>
          <div class='block'>
          <div class="todo-calc__items">
            <span class="title">Развлечения</span>
            <input type="text" class="todo-input" value=${item.fun} />
          </div>
          <div class="todo-calc__items">
            <span class="title">Сувениры</span>
            <input type="text" class="todo-input" value=${item.souvenirs} />
          </div>
          </div>
          <div class='block block--3'>
          <div class="todo-calc__items--1">
           <span class="title">Количество дней: <span class='Day'>${item.days}</span></span>
            <input class="todo-input__Days" type="range" step="1" min="1" max="20" value=${item.days} /></div>
           
            <button id="start">Рассчитать</button></div>
            <div class="todo-result ">
            <div class='block block--3'>
            <h2 class="title">Расход:</h2>
            <span class="text-todo__value">${item.result}</span>
          </div></div>
            </div> `;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const _days = li.querySelector('.todo-input__Days');
    _days.addEventListener('change', () => {
      let day = li.querySelector('.Day');
      day.innerHTML = _days.value;
      item.days = _days.value;
      localStorage.setItem('todoData', JSON.stringify(todoData));
    });
    const start = li.querySelector('#start');
    start.addEventListener('click', () => {
      let todoValue = li.querySelector('.text-todo__value');
      let inputValue = li.querySelectorAll('.todo-input');
      let sum = 0;
      for (let i = 0; i < 3; i++) {
        sum += +inputValue[i].value;
      }
      sum *= _days.value;
      sum += +inputValue[3].value;
      todoValue.innerHTML = `${sum}`;
      item.house = +inputValue[0].value;
      item.food = +inputValue[1].value;
      item.fun = +inputValue[2].value;
      item.souvenirs = +inputValue[3].value;
      item.result = sum;
      localStorage.setItem('todoData', JSON.stringify(todoData));
    });
    const btnTodoCompleted = li.querySelector('.todo-complete');
    btnTodoCompleted.addEventListener('click', function () {
      item.completed = !item.completed;
      localStorage.setItem('todoData', JSON.stringify(todoData));
      render();
    });
    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function () {
      item.delete = !item.delete;
      todoData.splice(todoData.map((el) => el.delete).indexOf(true), 1);
      localStorage.setItem('todoData', JSON.stringify(todoData));
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false,
    delete: false,
    house: 0,
    food: 0,
    fun: 0,
    souvenirs: 0,
    days: 1,
    result: 0,
  };
  if (headerInput.value) {
    todoData.push(newTodo);
    localStorage.setItem('todoData', JSON.stringify(todoData));
  }
  render();
});
render();

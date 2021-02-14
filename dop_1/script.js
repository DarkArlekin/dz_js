function Data(sum, name) {
  document.querySelector('.sum').textContent = sum;
  document.querySelector('.name').textContent = name;
}

function select(cls) {
  return document.querySelector(cls);
}

let sum = 0;
let name = 'no name';
let btn1, btn2, btn3, btn4;

Data(sum, name);

btn1 = select('.btn_1');
btn2 = select('.btn_2');
btn3 = select('.btn_3');
btn4 = select('.btn_4');
console.log(btn1);

btn1.addEventListener('click', () => {
  sum += +prompt('Введите суму пополнения:', [0]);
  Data(sum, name);
});

btn2.addEventListener('click', () => {
  sum -= +prompt('Введите суму изьятия:', [0]);
  Data(sum, name);
});

btn3.addEventListener('click', () => {
  name = prompt('Введите имя клиента:');
  Data(sum, name);
});

btn4.addEventListener('click', () => {
  alert('Клиент удален!');
  name = 'no name';
  Data(sum, name);
});

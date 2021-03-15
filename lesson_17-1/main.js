const calculator = {
  sum: (a, b) => a + b,
  mult: (a, b) => a * b,
  show: function (a) {
    let num1 = +document.querySelector('#a').value,
    num2 = +document.querySelector('#b').value,
    res = document.querySelector('#res');
    res.value = a(num1, num2);
  },
};

const btnSum = document.querySelector('#sum'),
  btnMult = document.querySelector('#mult');

btnSum.addEventListener('click', () => {
  calculator.show(calculator.sum);
});
btnMult.addEventListener('click', () => {
  calculator.show(calculator.mult);
});

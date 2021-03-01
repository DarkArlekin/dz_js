'use strict';

const body = document.querySelector('body');
const btn = document.querySelector('.btn');
const text = document.querySelector('.text');
btn.addEventListener('click', () => {
  let newColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
  document.body.style.background = newColor;
  text.innerHTML = `${newColor}`;
});

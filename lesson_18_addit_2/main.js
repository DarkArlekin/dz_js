window.addEventListener('DOMContentLoaded', () => {
  const elem = document.querySelector('.img');
  let btnStart = document.querySelector('.start');
  btnReset = document.querySelector('.reset');
  elem.style.top = '250px';
  elem.style.left = '600px';

  let interval;
  let animation = () => {
    interval = requestAnimationFrame(animation);
    let x = Math.floor(Math.random() * Math.floor(4));
    switch (x) {
      case 0:
        elem.style.top = parseInt(elem.style.top) + 15 + 'px';
        break;
      case 1:
        elem.style.top = parseInt(elem.style.top) - 15 + 'px';
        break;
      case 2:
        elem.style.left = parseInt(elem.style.left) + 15 + 'px';
        break;
      case 3:
        elem.style.left = parseInt(elem.style.left) - 15 + 'px';
        break;
    }
  };

  let start = false;
  btnStart.addEventListener('click', () => {
    if (start) {
      btnStart.textContent = 'Stop';
      interval = requestAnimationFrame(animation);
      start = false;
    } else if (!start) {
      btnStart.textContent = 'Start';
      interval = cancelAnimationFrame(interval);
      start = true;
    }
  });
  btnReset.addEventListener('click', () => {
    btnStart.textContent = 'Start';
    elem.style.top = '250px';
    elem.style.left = '600px';
  });
});

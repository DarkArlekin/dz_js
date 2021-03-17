window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  //Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      if (timeRemaining < 0) {
        seconds = '00';
        minutes = '00';
        hours = '00';
      }
      if (seconds < 10) seconds = `0${seconds}`;
      if (minutes < 10) minutes = `0${minutes}`;
      if (hours < 10) hours = `0${hours}`;
      return { timeRemaining, hours, minutes, seconds };
    }
    function updateClock() {
      let timer = getTimeRemaining();
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
      setInterval(updateClock, 1000);
    }
    updateClock();
  }
  countTimer('16 march 2021');

  //меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      btnClose = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    let interval;
    const animation = () => {
      interval = requestAnimationFrame(animation);
      if (+menu.style.transform.match(/-?\d+/) < 100 && window.screen.width > 768) {
        menu.style.transform = `translate(${+menu.style.transform.match(/-?\d+/) + 3}%)`;
      } else {
        interval = cancelAnimationFrame(interval);
      }
    };

    const handlerMenu = () => {
      if (!menu.style.transform || menu.style.transform === 'translate(-100%)') {
        interval = requestAnimationFrame(animation);
      } else {
        menu.style.transform = 'translate(-100%)';
      }
    };

    btnMenu.addEventListener('click', handlerMenu);
    btnClose.addEventListener('click', handlerMenu);

    menuItems.forEach((item) => {
      item.addEventListener('click', handlerMenu);
    });
  };
  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      btnPopUp = document.querySelectorAll('.popup-btn'),
      popUpClose = document.querySelector('.popup-close');
    btnPopUp.forEach((elem) => {
      elem.addEventListener('click', () => {
        console.log(popup.style.display);
        popup.style.display = 'block';
      });
    });
    popUpClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };
  togglePopUp();

//nextSlide
  let nextSlide = document.querySelector('.nextSlide');
  nextSlide.addEventListener('click', (e) => {
    e.preventDefault();
    const blockID = nextSlide.getAttribute('href').substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

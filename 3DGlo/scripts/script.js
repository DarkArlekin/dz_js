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
      if (seconds < 10 && seconds > 0) seconds = `0${seconds}`;
      if (minutes < 10 && seconds > 0) minutes = `0${minutes}`;
      if (hours < 10 && seconds > 0) hours = `0${hours}`;
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
  countTimer('20 march 2021');

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
      btnPopUp = document.querySelectorAll('.popup-btn');

    btnPopUp.forEach((elem) => {
      elem.addEventListener('click', () => {
        console.log(popup.style.display);
        popup.style.display = 'block';
      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      }
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

  //табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, index) => {
          if (item === target) {
            toggleTabContent(index);
          }
        });
      }
    });
  };
  tabs();

  //слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      btn = document.querySelectorAll('.portfolio-btn'),
      dot = document.querySelectorAll('.dot'),
      slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
      interval;
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };
    const startSlide = () => {
      interval = setInterval(autoPlaySlide, 1000);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };
    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (+currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (+currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide();
  };
  slider();
});

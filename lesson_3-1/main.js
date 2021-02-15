'use strict';

let land = 'ru';

if (land == 'ru') {
  console.log('Понедельник, Вторник, Среда, Черверг, Пятница, Суббота, Воскресенье');
} else {
  if (land == 'en') {
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturda, Sunday');
  }
}

switch (land) {
  case 'ru':
    console.log('Понедельник, Вторник, Среда, Черверг, Пятница, Суббота, Воскресенье');
    break;
  case 'en':
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturda, Sunday');
    break;
}

let arr = [
  ['Понедельник, Вторник, Среда, Черверг, Пятница, Суббота, Воскресенье'],
  ['Monday, Tuesday, Wednesday, Thursday, Friday, Saturda, Sunday'],
];
land == 'ru' ? console.log(arr[0]) : console.log(arr[1]);

let lanD={
    ru : 'Понедельник, Вторник, Среда, Черверг, Пятница, Суббота, Воскресенье',
    en :  'Monday, Tuesday, Wednesday, Thursday, Friday, Saturda, Sunday'
}

land=='ru'?console.log(lanD.ru) : console.log(console.log(lanD.en));
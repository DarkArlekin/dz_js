const cityArr = {
  rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
  uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
  bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
  jap: ['Токио', 'Киото', 'Осака', 'Иокогама'],
};

const country = document.querySelector('#country'),
  res = document.querySelector('.result');
let cityes = document.querySelector('#city');
country.addEventListener('click', () => {
  cityes.innerHTML = '';
  cityes.style.display = 'inline-block';
  city = cityArr[country.value];
  city.forEach((element) => {
    cityes.innerHTML += `<option>${element}</option>`;
  });
});

cityes.addEventListener('change', () => {
  res.textContent = country[country.selectedIndex].textContent;
  res.textContent +=' ' + city[cityes.selectedIndex];
});

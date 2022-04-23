// import { elements } from './selectors.js';
// import fetchData from './fetch.js';

let characterData = [];
const cardContainer = document.querySelector('[data-js="cardContainer"]');
let pageNumber = getRandomPage(1, 42);
const button = document.querySelector('[data-js="button"]');

function fetchDataAndRender() {
  fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      characterData = data.results;
      characterData.forEach(character => {
        const item = createCharacterCard(character);
        cardContainer.appendChild(item);
      });
    });
}

function getRandomPage(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

button.addEventListener('click', () => {
  cardContainer.innerHTML = '';
  fetchDataAndRender();
});

function createCharacterCard(characterData) {
  const card = document.createElement('div');
  card.classList.add('card__element');
  card.innerHTML = `
  <img src="${characterData.image}" alt="${characterData.name}"></img>
  <h3>${characterData.name}</h3>
  `;
  return card;
}

// import { elements } from './selectors.js';
// import fetchData from './fetch.js';

let characterName = [];
let characterImage = [];
const cardContainer = document.querySelector('[data-js="cardContainer"]');

let randomCharacter = getRandomCharacter(1, 826);

const button = document.querySelector('[data-js="button"]');

function fetchDataAndRender() {
  fetch(`https://rickandmortyapi.com/api/character/${randomCharacter}`)
    .then(response => response.json())
    .then(data => {
      characterImage = data.image;
      characterName = data.name;
      const item = createCharacterCard();
      cardContainer.appendChild(item);
    });
}

function getRandomCharacter(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

button.addEventListener('click', () => {
  cardContainer.innerHTML = '';
  fetchDataAndRender();
});

function createCharacterCard() {
  const card = document.createElement('div');
  card.classList.add('card__element');
  card.innerHTML = `
  <img src="${characterImage}" alt="${characterName}"></img>
  <h3>${characterName}</h3>
  `;
  return card;
}

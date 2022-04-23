// import { elements } from './selectors.js';
// import fetchData from './fetch.js';

let characterName = [];
let characterImage = [];
const cardContainer = document.querySelector('[data-js="cardContainer"]');

const button = document.querySelector('[data-js="button"]');

function fetchDataAndRender() {
  let randomCharacter = getRandomCharacter(1, 826);
  fetch(`https://rickandmortyapi.com/api/character/${randomCharacter}`)
    .then(response => response.json())
    .then(data => {
      characterImage = data.image;
      characterName = data.name;
      const item = createCharacterCard();
      cardContainer.appendChild(item);
      onShowAnswer();
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
  <p>Who is this?</p>
  <h3 data-js="answer" hidden>${characterName}</h3>
  <button data-js="button__answer" class="button__answer" >Show Name</button>
  `;
  return card;
}

function onShowAnswer() {
  const elementAnswer = document.querySelector('[data-js="answer"]');
  const buttonAnswer = document.querySelector('[data-js="button__answer"]');
  buttonAnswer.addEventListener('click', () => {
    elementAnswer.toggleAttribute('hidden');
  });
}

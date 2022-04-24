// import { elements } from './selectors.js';
// import fetchData from './fetch.js';

const cardContainer = document.querySelector('[data-js="cardContainer"]');

const button = document.querySelector('[data-js="button"]');

function fetchDataAndRender() {
  const randomCharacter = getRandomCharacter(1, 826);
  let randomCharacterAlternative = getRandomCharacter(1, 826);
  while (randomCharacter === randomCharacterAlternative) {
    randomCharacterAlternative = getRandomCharacter(1, 826);
  }

  fetch(
    `https://rickandmortyapi.com/api/character/${randomCharacter},${randomCharacterAlternative}`
  )
    .then(response => response.json())
    .then(data => {
      const item = createCharacterCard(data, randomCharacter);
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

function createCharacterCard(characters, correctCharacter) {
  const correctIndex = characters.findIndex(
    character => character.id === correctCharacter
  );
  const incorrectIndex = characters.findIndex(
    character => character.id !== correctCharacter
  );

  const { name: nameFirst, image } = characters[correctIndex];
  const { name: nameSecond } = characters[incorrectIndex];
  const randomize = Math.floor(Math.random() * 2);

  const card = document.createElement('div');
  card.classList.add('card__element');
  card.innerHTML = `
  <img class="card__image"src="${image}" alt="${nameFirst}"></img>
  <p class="card_who">Who is this?</p>
  <div class="card__names-wrapper">
  <div>
  <input type="radio" id="answerOne" name="characterAnswers" value="${
    randomize < 1 ? nameFirst : nameSecond
  }">
  <label class="radio" for="answerOne">${
    randomize < 1 ? nameFirst : nameSecond
  }</label>
  </div>
  <div>
  <input type="radio" id="answerTwo" name="characterAnswers" value="${
    randomize > 0 ? nameFirst : nameSecond
  }">
  <label class="radio" for="answerTwo">${
    randomize > 0 ? nameFirst : nameSecond
  }</label>
  </div>
  </div>
  <h3 data-js="answer" hidden>${nameFirst}</h3>
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

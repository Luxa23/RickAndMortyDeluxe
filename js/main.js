// import { elements } from './selectors.js';
// import fetchData from './fetch.js';

const cardContainer = document.querySelector('[data-js="cardContainer"]');
const button = document.querySelector('[data-js="button"]');
let correctAnswer = [];
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
      checkRadioAndShowAnswer();
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
  <label class="radio" for="answerOne">${randomize < 1 ? nameFirst : nameSecond}
  <input data-js="checkRadio" type="radio" id="answerOne" name="characterAnswers" value="${
    randomize < 1 ? nameFirst : nameSecond
  }">
  <span class="radio__checkmark"></span>
  </label>
  <label class="radio" for="answerTwo">${
    randomize > 0 ? nameFirst : nameSecond
  }<input data-js="checkRadio" type="radio" id="answerTwo" name="characterAnswers" value="${
    randomize > 0 ? nameFirst : nameSecond
  }">
  <span class="radio__checkmark"></span>
  </label>

  </div>
  <h3 data-js="answer" hidden>${nameFirst}</h3>
  <button data-js="button__answer" disabled>Pic a name</button>
  `;
  correctAnswer = nameFirst;
  return card;
}

function checkRadioAndShowAnswer() {
  const elementAnswer = document.querySelector('[data-js="answer"]');
  const buttonAnswer = document.querySelector('[data-js="button__answer"]');
  const radioButtons = document.querySelectorAll('[data-js="checkRadio"]');
  radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
      buttonAnswer.removeAttribute('disabled');
      buttonAnswer.classList.add('button__answer');
      buttonAnswer.textContent = 'check result';
      buttonAnswer.addEventListener('click', () => {
        elementAnswer.toggleAttribute('hidden');
      });
      if (elementAnswer.value === correctAnswer.value) {
        elementAnswer.innerHTML = `It's ${correctAnswer}`;
        elementAnswer.style.color = 'chartreuse';
      } else {
        elementAnswer.innerHTML = `It's ${correctAnswer}`;
        elementAnswer.style.color = 'hotpink';
      }
    });
  });
}

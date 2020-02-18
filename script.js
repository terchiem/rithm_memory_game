const EMOJIS = ['🍔','🍕','🌭','🌮','🍗','🥓','🥪'];

function createCards() {
  const cards = [];
  for(let i = 0; i < EMOJIS.length; i++) {
    cards.push(EMOJIS[i]);
    cards.push(EMOJIS[i]);
  }
  return shuffleArr(cards);
}

function createCardHTML(arr) {
  let HTML = '';
  for(let i = 0; i < arr.length; i++) {
    HTML += `
      <div class="card">
        <p class="card-text">${arr[i]}</p>
      </div>
    `;
  }
  return HTML;
}

function newGame() {
  // reset variables
  // create cards
  // create card html
  // attach cards to dom
  // set up click events
  // set running state
}

function handleClick(e) {
  if(e.currentTarget.classList.contains('flipped')) {
    e.currentTarget.classList.remove('flipped');
  } else {
    e.currentTarget.classList.add('flipped');
  }
}

function loadScore() {
  // check local storage for high score
}

function shuffleArr(arr) {
  for(let i = arr.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** ================================ */
const cards = document.querySelector('.cards');
const HTML = createCardHTML(createCards());

cards.innerHTML = HTML;

const card = document.querySelectorAll('.card');
card.forEach((c) => {
  c.addEventListener('click', handleClick);
})
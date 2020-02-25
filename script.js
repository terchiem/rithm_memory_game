const CARDS = document.getElementById('card-container');
const EMOJIS = ['🍔','🍕','🌭','🌮','🍗','🥓','🥪','🍟'];
let currentGuess; // dom element
let correctGuesses = 0;
let numGuesses = 0;
let waiting = false;

/***************************
 *      Card Creation
 ***************************/
function createCards() {
  const cards = [];
  for(let i = 0; i < EMOJIS.length; i++) {
    cards.push(EMOJIS[i]);
    cards.push(EMOJIS[i]);
  }
  return shuffleArr(cards);
}

function createCardsHTML(arr) {
  let HTML = '';
  for(let i = 0; i < arr.length; i++) {
    HTML += `
      <div class="card">
        <div class="card-back"></div>
        <p class="card-text">${arr[i]}</p>
      </div>
    `;
  }
  return HTML;
}

function addCardListeners() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((c) => {
    c.addEventListener('click', handleClick);
  })
}

function shuffleArr(arr) {
  for(let i = arr.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/***************************
 *        Game Logic
 ***************************/
function handleClick(e) {
  if (e.currentTarget.classList.contains('flipped') || waiting) return;
 
  e.currentTarget.classList.add('flipped');
 
  if (currentGuess === null) {
    currentGuess = e.currentTarget;
  } 
  else {
    numGuesses++;
    updateGuessDisplay();
    if (currentGuess.innerHTML == e.currentTarget.innerHTML) {
      correctGuesses++;
      checkGameOver();
    } 
    else {
      waiting = true;
      flipBack(currentGuess);
      flipBack(e.currentTarget);
    }
    currentGuess = null;
  }
}

function flipBack(card) {
  setTimeout(() => {
    card.classList.remove('flipped');
    waiting = false;
  }, 1200);
}
 
function checkGameOver() {
  if (correctGuesses === EMOJIS.length) {
    const newRecord = setRecord(numGuesses);
    displayWin(newRecord);
    updateRecordDisplay();
  }
}

function newGame() {
  resetVariables();
  const newCards = createCardsHTML(createCards());
  CARDS.innerHTML = newCards;
  addCardListeners();
  updateRecordDisplay();
  updateGuessDisplay();
}
 
function resetVariables() {
  correctGuesses = 0;
  numGuesses = 0;
  currentGuess = null;
  waiting = false;
}

/***************************
 *        Display
 ***************************/
function setRecord(num) {
  const storage = window.localStorage;
  const record = storage.getItem('record');
 
  if (record === null || num < +record) {
    storage.setItem('record', num);
    return true;
  }
  return false;
}
 
function updateRecordDisplay() {
  const node = document.getElementById('record-guesses');
  node.innerHTML = window.localStorage.getItem('record') || "-";
}

function updateGuessDisplay() {
  const node = document.getElementById('current-guesses');
  node.innerHTML = numGuesses;
}
 
function resetRecord() {
  window.localStorage.removeItem('record');
  updateRecordDisplay();
}

function displayWin(newRecord) {
  let text = "You Win!";

  if(newRecord) {
    text += "\nNew Record!";
  }

  setModal(text, closeModal);
  showModal();
}
 
function promptNewGame() {
  setModal('Start a new game?', newGame);
  showModal();
}
 
function promptResetRecord() {
  setModal('Reset record score?', resetRecord);
  showModal();
}
/***************************
 *       Modal Dialog
 ***************************/
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalContent = document.getElementById('modal-content');
const modal = document.getElementById('modal');

function closeModal() {
  modalOverlay.classList.add('closed');
  modal.classList.add('closed');
}

function showModal() {
  modalOverlay.classList.remove('closed');
  modal.classList.remove('closed');
}

function setModal(text, callback) {
  // replace confirm button's callback
  const modalConfirm = document.getElementById('modal-confirm');
  const newConfirm = modalConfirm.cloneNode(true);
  modal.replaceChild(newConfirm, modalConfirm);
  newConfirm.addEventListener('click', () => {
    callback();
    closeModal();
  })

  modalContent.innerHTML = text;
}

modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => e.stopPropagation());

/** ================================ */

document.getElementById('new').addEventListener('click', promptNewGame);
document.getElementById('reset').addEventListener('click', promptResetRecord);

newGame();
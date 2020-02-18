const NUM_PAIRS = 7;

function createCards() {
  const cards = [];
  for(let i = 0; i < NUM_PAIRS; i++) {
    const letter = String.fromCharCode(65+i);
    cards.push(letter);
    cards.push(letter);
  }
  return shuffleArr(cards);
}

function createCardHTML() {
  // return string HTML of all cards
}

function newGame() {
  // reset variables
  // create cards
  // create card html
  // set running state
}

function handleClick(e) {
  // handle click events for document
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
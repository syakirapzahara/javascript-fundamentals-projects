// ===== STATE AWAL =====
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const startBtn = document.getElementById("start-btn");
const newCardBtn = document.getElementById("new-card-btn");

function getRandomCard() {
  // 1-13 (Ace sampai King)
  const randomNumber = Math.floor(Math.random() * 13) + 1;

  // rules blackjack:
  // - 1 (Ace) → 11
  // - 11-13 (Jack, Queen, King) → 10
  // - 2-10 → nilai asli
  if (randomNumber === 1) return 11;
  if (randomNumber > 10) return 10;
  return randomNumber;
}

function startGame() {
  // Reset state
  isAlive = true;
  hasBlackJack = false;

  // Bagi 2 kartu pertama
  const firstCard = getRandomCard();
  const secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;

  // Render
  renderGame();
}

function renderGame() {
  // Render kartu
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }

  // Render sum
  sumEl.textContent = "Sum: " + sum;

  // Utk tentukan message
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "You've got Blackjack! 🎉";
    hasBlackJack = true;
  } else {
    message = "You're out of the game! 💥";
    isAlive = false;
  }

  messageEl.textContent = message;
}

function newCard() {
  if (!isAlive || hasBlackJack) {
    messageEl.textContent = "Game over! Click START GAME to play again.";
    return;
  }

  const card = getRandomCard();
  sum += card;
  cards.push(card);

  renderGame();
}

startBtn.addEventListener("click", startGame);
newCardBtn.addEventListener("click", newCard);

'use strict';
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;

  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  diceEL.classList.add('hidden');
};
init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1 tao so ngau nhien
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2 hien thi hinh anh
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    //3 check xem co bang 1 k
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //1 luu diem
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2 ktra >=100
    if (scores[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');
    } else {
      switchPlayer();
    }
  } // doi nguoi
});

btnNew.addEventListener('click', init);

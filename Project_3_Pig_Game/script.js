'use strict';

// Selecting elements 
const score0Dom = document.querySelector('#score--0');
const current0Dom = document.getElementById('current--0') 
const score1Dom = document.getElementById('score--1');
const diceDom = document.querySelector('.dice');
const rollDiceDom = document.getElementById('btn--roll');
const holdbuttonDom = document.getElementById('btn--hold');
const newGameButtonDom = document.getElementById('btn--new');
const player0Dom = document.querySelector('.player--0');
const player1Dom = document.querySelector('.player--1');


// Variables
const scores = [0, 0]
let currentScore = 0; 
let activePlayer = 0; 


// Button Listeners
rollDiceDom.addEventListener('click', rollDice); 
holdbuttonDom.addEventListener('click', holdScore); 
newGameButtonDom.addEventListener('click', newGame);

// Setting start conditions
score0Dom.textContent = scores[0]; 
score1Dom.textContent = scores[1];
// diceDom.classList.toggle('hidden'); 
newGameButtonDom.classList.toggle('hidden');



// Helper functions
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function changePlayer(){
    // Reset current score. 
    currentScore = 0; 
    document.getElementById(`current--${activePlayer}`).textContent = currentScore; 

    // Change players.
    activePlayer = activePlayer === 0 ? 1 : 0; 
    player0Dom.classList.toggle('player--active');
    player1Dom.classList.toggle('player--active')
}

// Button functions
async function rollDice(){
    diceDom.classList.remove('hidden')
    let diceValue = 0;

    for(let i = 0; i < 10; i ++){
        await delay(150)
        diceValue = Math.floor(Math.random() * 6) +1; 
        diceDom.src = `dice-${diceValue}.png`; 
    }

    if(diceValue != 1){
        currentScore += diceValue;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore; 
    }else{
        changePlayer(); 
    }
}

function holdScore(){

    // Update active player running score.
    scores[activePlayer] += currentScore; 
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Check for winner or switch.
    if(scores[activePlayer] >= 100){
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        rollDiceDom.classList.toggle('hidden');
        holdbuttonDom.classList.toggle('hidden'); 
        newGameButtonDom.classList.toggle('hidden');
    }else{
        changePlayer();
    }
}

function newGame(){
    currentScore = 0; 
    for(let i = 0; i < 2; i ++){
        scores[i] = 0; 
        document.getElementById(`score--${i}`).textContent = scores[i];
        document.getElementById(`current--${i}`).textContent = currentScore; 
        document.querySelector(`.player--${i}`).classList.remove('player--winner');
    }
    document.querySelector(`.player--0`).classList.add('player--active');
    rollDiceDom.classList.toggle('hidden');
    holdbuttonDom.classList.toggle('hidden'); 
    newGameButtonDom.classList.toggle('hidden');
}
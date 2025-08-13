'use strict';

// Selecting elements 
const score0Dom = document.querySelector('#score--0');
const current0Dom = document.getElementById('current--0') 
const score1Dom = document.getElementById('score--1');
const diceDom = document.querySelector('.dice');
const rollDiceDom = document.querySelector('.btn--roll');

// Variables
let score0 = 0; 
let score1 = 0; 
let currentScore = 0; 

// Button Listeners
rollDiceDom.addEventListener('click', rollDice); 

// Setting elements
score0Dom.textContent = score0; 
score1Dom.textContent = score1;


diceDom.classList.add('hidden'); 

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function rollDice(){
    diceDom.classList.remove('hidden')
    let diceValue = 0;

    for(let i = 0; i < 10; i ++){
        await delay(150)
        diceValue = Math.floor(Math.random() * 6) +1; 
        diceDom.src = `dice-${diceValue}.png`; 
    }

    currentScore = diceValue === 1 ? 0: currentScore + diceValue; 
    current0Dom.textContent = currentScore; 

}
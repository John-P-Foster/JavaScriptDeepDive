'use strict';

/*
                  Notes section
    DOM: Document Object Model 
    - How JavaScript breaks up HTML elements to manipulate them. 
    - The DOM methods and properties are acutally part of WEB APIs NOT JS. 
*/

/* 
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct Number!'

document.querySelector('.number').textContent = 13; 
document.querySelector('.score').textContent = 20; 

document.querySelector('.guess').value = 23; 
*/


// the addEventListener expects to params, the event and a function. 

const newSecretNumber = function() {return Math.floor(Math.random() * 20) + 1};
let secretNumber = newSecretNumber();
const domSecretNumber = document.querySelector('.number');

let score = 20; 
const domScore = document.querySelector('.score'); 
domScore.textContent = score; 

const domPlayerMessage = document.querySelector('.message');

const domGuess = document.querySelector('.guess');

let highScore = 0; 
const domHighScore = document.querySelector('.highscore');


// while(number != 20){
//     number = Math.floor(Math.random() * 21)
//     console.log(number); 
// }


document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value); 

    // No input
    if(!guess){
        domPlayerMessage.textContent = ' ❌ No Number Given!'
    
    // Got the correct number.     
    }else if(guess === secretNumber){
        domPlayerMessage.textContent = '🎉 Correct Number!' ;
        domSecretNumber.textContent = secretNumber; 
        document.querySelector('body').style.backgroundColor = '#60b347';  
        document.querySelector('.number').style.width='30rem';
        highScore = Math.max(score, highScore); 
        domHighScore.textContent = highScore; 

    // Check if guess was higher or lower than secret number. 
    }else {
        domPlayerMessage.textContent = guess > secretNumber ? '🔥 Guess is Too high' : '❄️ Guess is Too low';
        score --; 
        domScore.textContent = score
    }

})


// Reset the game for the next round 
document.querySelector('.again').addEventListener('click', function() {
    secretNumber = newSecretNumber(); 
    score = 20; 
    domSecretNumber.textContent = '?'; 
    domScore.textContent = score;
    domGuess.value = ''
    domPlayerMessage.textContent = 'Start guessing...'
    document.querySelector('body').style.backgroundColor = '#222';  
    document.querySelector('.number').style.width='15rem';

})
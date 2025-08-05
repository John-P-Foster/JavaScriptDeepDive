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

const secretNumber = Math.floor(Math.random() * 21);
const domSecretNumber = document.querySelector('.number');
domSecretNumber.textContent = secretNumber; 

let score = 20; 
const domScore = document.querySelector('.score'); 
domScore.textContent = score; 

const domPlayerMessage = document.querySelector('.message');


// while(number != 20){
//     number = Math.floor(Math.random() * 21)
//     console.log(number); 
// }


document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value); 

    if(!guess){
        domPlayerMessage.textContent = ' ❌ No Number Given!'
    }else if(guess === secretNumber){
        domPlayerMessage.textContent = '🎉 Correct Number!'   
    }else if(guess > secretNumber){
        domPlayerMessage.textContent = '🔥 Guess is Too high'
        score --
        domScore.textContent = score
    }else{
        domPlayerMessage.textContent = '❄️ Guess is Too low'
        score --
        domScore.textContent = score
    }

})
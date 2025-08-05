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
document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value); 

    if(!guess){
        document.querySelector('.message').textContent = ' ❌ No Number Given!'
    }

})
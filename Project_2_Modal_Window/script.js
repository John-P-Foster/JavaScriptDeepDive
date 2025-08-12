'use strict';


// Dom Selectors
const modal = document.querySelector('.modal'); 
const overlay = document.querySelector('.overlay'); 
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal'); 

// Functions
const openModel = function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden'); 
}

const closeModel  = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden'); 
}


// Logic
for(let btn of btnOpenModal){
    btn.addEventListener('click', openModel)
}

btnCloseModal.addEventListener('click', closeModel);
overlay.addEventListener('click', closeModel); 

document.addEventListener('keydown', function(e){
    const key = e.key; 
    console.log(key)
    if(key === 'Escape' && !modal.classList.contains('hidden')){closeModel()}; 
})
'use strict';



// #region DOM Elements
        const modal = document.querySelector('.modal');
        const overlay = document.querySelector('.overlay');
        const btnCloseModal = document.querySelector('.btn--close-modal');
        const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
        const btnScrollTo = document.querySelector(`.btn--scroll-to`);
        const section1 = document.querySelector(`#section--1`);
    // #endregion 

// #region Functions 
    //#region Modal functions
        const openModal = function (e) {
        e.preventDefault();  
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        };

        const closeModal = function () {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
        };
    //#endregion
// #endregion


// #region EventListeners
    // #region Modal Listeners
        btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

        btnCloseModal.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
        });``

        // Creating smooth scrolling too function 
        btnScrollTo.addEventListener(`click`, function(e){
            e.preventDefault();
            const s1coords = section1.getBoundingClientRect(); 
            // Scrolling
            // window.scrollTo({
            //     left: s1coords.left+ window.pageXOffset,
            //     top: s1coords.top + window.pageYOffset,
            //     behavior: `smooth`,
            // })
            section1.scrollIntoView({behavior: `smooth`})
        })

    // #endregion
//#endregion

// #region Lessions, Tips, & Tricks.
    //region Selecting, Cretating, and Deleting Elements
        // Selection Elements
        console.log(document.documentElement);
        console.log(document.head);
        console.log(document.body);

        const header = document.querySelector(`.header`);
        const allSection = document.querySelectorAll(`.section`);
        console.log(allSection); 

        document.getElementById(`section--1`); 
        const allButtons = document.getElementsByTagName(`button`);
        console.log(allButtons)
        console.log(document.getElementsByClassName(`btn`)); 

        // Creating and Inserting Elements
        const message = document.createElement('div'); 
        message.classList.add(`cookie-message`);
        // message.textContent = `We use cookies for improved functionality and analytics`; 
        message.innerHTML = `We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>`
        // header.prepend(message); // first appears hear
        header.append(message);  // but moves here. An element can only exist in one place at a time in the DOM. 
        // header.append(message.cloneNode(true)); // Now it apears twice
        // header.before(message);
        // header.after(message)

        // Deleting Elements; 
        document.querySelector(`.btn--close-cookie`).addEventListener(`click`, function(){
            message.remove()
        }); 

    //endregion

    //#region Styles
        message.style.backgroundColor = `#37383d`;
        message.style.width = `120%`

        console.log(getComputedStyle(message).color); 

        message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + `px`;

        document.documentElement.style.setProperty(`--color-primary`, `orangered`)

    //#endregion

    //#region Attributes
        const logo = document.querySelector(`.nav__logo`);
        console.log(logo.alt);
        console.log(logo.className);

        logo.alt = `Beautiful minmalist logo`; 
        logo.setAttribute(`company`, `Bankist`);

        console.log(logo.getAttribute(`src`));

        const link = document.querySelector(`.twitter-link`);   
        console.log(link.getAttribute(`href`)); 

    //#endregion

    //#region Classes
        logo.classList.add('c', 'j');
        logo.classList.remove('c', 'j');
        logo.classList.toggle('c');
        logo.classList.contains('c');

    //#endregion

    //#region Events and Event Handlers
        const alertH1 =  function(e){
            alert(`Great! you are reading the heading!`)
            h1.removeEventListener(`mouseenter`, alertH1);
        }
        const h1 = document.querySelector(`h1`);
        h1.addEventListener(`mouseenter`,alertH1)

        // Old way of handling events; 
        // h1.onmouseenter = function(e){
        //     alert(`Great! you are reading the heading!`)
        // }

    //#endregion

    //#region Bubbling and Capturing
        const radomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min); 
        const randomColor = () => {
            const min = 0; 
            const max = 255;
            return `rgb(${radomInt(min, max)},${radomInt(min, max)},${radomInt(min, max)})` 
        }

        document.querySelector(`.nav__link`).addEventListener(`click`, function(e){
            e.preventDefault(); 
            this.style.backgroundColor = randomColor(); 
            console.log(`Link`, e.target)

            // Stop Propagation
            // e.stopPropagation(); 
            
        })

        document.querySelector(`.nav__links`).addEventListener(`click`, function(e){
            e.preventDefault(); 
            this.style.backgroundColor = randomColor(); 
            console.log(`CONTAINER`, e.target)
            
        })

        document.querySelector(`.nav`).addEventListener(`click`, function(e){
            e.preventDefault(); 
            this.style.backgroundColor = randomColor(); 
            console.log(`NAV`, e.target)
        })

    //#endregion
// #endregion
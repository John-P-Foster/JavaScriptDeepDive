'use strict';

// #region DOM Elements
        const modal = document.querySelector('.modal');
        const overlay = document.querySelector('.overlay');
        const btnCloseModal = document.querySelector('.btn--close-modal');
        const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
        const btnScrollTo = document.querySelector(`.btn--scroll-to`);
        const section1 = document.querySelector(`#section--1`);
        const h1 = document.querySelector(`h1`);
        const nav = document.querySelector(`.nav`);
        const tabs = document.querySelectorAll(`.operations__tab`);
        const tabsContainer = document.querySelector(`.operations__tab-container`);
        const tabsContent = document.querySelectorAll(`.operations__content`); 
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

    //#region Page navigation 

        const s1SmoothScroll = function(e){
            e.preventDefault();
            // const s1coords = section1.getBoundingClientRect(); 
            // Scrolling
            // window.scrollTo({
            //     left: s1coords.left+ window.pageXOffset,
            //     top: s1coords.top + window.pageYOffset,
            //     behavior: `smooth`,
            // })
            section1.scrollIntoView({behavior: `smooth`})
        }

        // // Not the best way to attach the event, we can attach it to the parrent el, and caputer when it bubbles up
        // document.querySelectorAll(`.nav__link`).forEach((function(el){
        //     el.addEventListener(`click`, function (e){
        //         e.preventDefault();
        //         const id = this.getAttribute(`href`); 
        //         document.querySelector(id).scrollIntoView({behavior: `smooth`})
        //     })
        // }))

        document.querySelector(`.nav__links`).addEventListener(`click`, function (e){
            e.preventDefault();

            // Matching Strategy
            if(e.target.classList.contains(`nav__link`)){
                const id = e.target.getAttribute(`href`); 
                document.querySelector(id).scrollIntoView({behavior: `smooth`})
            }
        })

 

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
        btnScrollTo.addEventListener(`click`, s1SmoothScroll)

    // #endregion
// #endregion

// #region Components
    // #region Tab


        tabsContainer.addEventListener(`click`, function(e){
            const clicked = e.target.closest(`.operations__tab`); 

            //Gaurd Clause
            if(!clicked) return; 
            tabs.forEach(t => t.classList.remove(`operations__tab--active`))
            tabsContent.forEach(c => c.classList.remove(`operations__content--active`))

            clicked.classList.add(`operations__tab--active`);

            // Activate content area
            document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add(`operations__content--active`);
            
        })

    // #endregion 

    //#region Fade Animation
        // Menu Fade
        const handleHove = function(e, opacity){
            if(e.target.classList.contains(`nav__link`)){
                const link = e.target; 
                const siblings = link.closest(`.nav`).querySelectorAll('.nav__link');
                const logo = link.closest(`.nav`).querySelector(`img`); 

                siblings.forEach(el => {
                    if(el !== link) el.style.opacity = opacity; 
                });
                logo.style.opacity = opacity; 
            }
        }


        nav.addEventListener(`mouseover`, function(e){
            handleHove(e, .5)
        })
        nav.addEventListener(`mouseout`, function(e){
            handleHove(e, 1)
        })

    //#endregion

    //#region Sticky Nav Bar
        // This works but the scroll listeners fires off way to often and can make apps slow
        // const initialCoords = section1.getBoundingClientRect()
        // window.addEventListener(`scroll`, function(e){
        //     if(this.window.scrollY > initialCoords.top){
        //         nav.classList.add('sticky'); 
        //     }else{
        //         nav.classList.remove(`sticky`); 
        //     }
        // })

        // Using the Intersection Observer API for sticky nav 
        // Example
        // const obsCallBack = function(entries, observer){
        //     entries.forEach(entry => {
        //         console.log(entry)
        //     })
        // }

        // const obsOptions ={
        //     root: null,
        //     threshold: [0, 0.2],
        // };

        // const observer = new IntersectionObserver(obsCallBack, obsOptions)
        // observer.observe(section1); 

        const header = document.querySelector(`.header`)
        const navHeight = nav.getBoundingClientRect().height;

        const stickyNav = function(entries){
            const  [entry] = entries; 
            if(!entry.isIntersecting) nav.classList.add('sticky');
            else nav.classList.remove(`sticky`);
        }

        const headerObserver = new IntersectionObserver(stickyNav, {
            root: null, 
            threshold: [0],
            rootMargin: `-${navHeight}px`,
        });

        headerObserver.observe(header);
    //#endregion
    //#region Reveal Sections
        
        const allSections = document.querySelectorAll(`.section`);

        const revealSection = function(entries, observer){
           entries.forEach(entry =>{
                if(!entry.isIntersecting) return; 
                entry.target.classList.remove(`section--hidden`); 
                observer.unobserve(entry.target);
            })
        }

        const sectionsObserver = new IntersectionObserver(revealSection, {
            root: null,
            threshold: 0.15
        })

        allSections.forEach(function(section){
            sectionsObserver.observe(section);
            section.classList.add(`section--hidden`); 
        })
    //#endregion

    //#region Lazy Loading Images
        const imgTargets = document.querySelectorAll(`img[data-src]`);

        const loadImg = function(entries, observer){
            const [entry] = entries; 
            if(!entry.isIntersecting) return; 
            
            // Replace the src with data-src
            entry.target.src = entry.target.dataset.src; 
            entry.target.addEventListener(`load`, function(){
                entry.target.classList.remove(`lazy-img`);
            })
            observer.unobserve(entry.target);
        }
        const imgObserver = new IntersectionObserver(loadImg, {
            root: null, 
            threshold: 0,
            rootMargin: `200px`,
        })

        imgTargets.forEach(img => imgObserver.observe(img) )

    //#endregion
    //#region Slider
        const slider = function(){
            const slider = document.querySelector(`.slider`);
            const btnLeft = document.querySelector(`.slider__btn--left`);
            const btnRight = document.querySelector(`.slider__btn--right`);
            const dotContainer = document.querySelector(`.dots`)

            slider.style.transform = `scale(0.5)`; 
            slider.style.overflow = `visible`;    

            const slides = document.querySelectorAll(`.slide`); 

            const createDots = function(){
                slides.forEach(function(_, i){
                    dotContainer.insertAdjacentHTML(`beforeend`, `<button class="dots__dot" data-slide="${i}"></button>`)
                })
            }

            const activateDot = function(slide){
                document
                    .querySelectorAll('.dots__dot')
                    .forEach(dot =>{
                        dot.classList.remove(`dots__dot--active`); 
                })

                document
                    .querySelector(`.dots__dot[data-slide="${slide}"]`)
                    .classList.add(`dots__dot--active`)
            }


            const goToSlide = function(slide){
                slides.forEach((s, i) => s.style.transform = `transLateX(${100 * (i - slide)}%)`)
                activateDot(slide);
            }


            const maxSlide = slides.length; 
            let curSlide = 0; 




            const nextSlide = function(){
                curSlide = curSlide === maxSlide - 1 ? 0: curSlide + 1;            
                goToSlide(curSlide)
            }

            const lastSlide = function(){
                curSlide = curSlide === 0? maxSlide - 1: curSlide - 1; 
                goToSlide(curSlide)
            }


            btnRight.addEventListener(`click`, nextSlide)
            btnLeft.addEventListener(`click`, lastSlide)

            document.addEventListener(`keydown`, function(e){
                if(e.key === "ArrowLeft") lastSlide(); 
                if(e.key === "ArrowRight") nextSlide(); 
            })

            dotContainer.addEventListener(`click`, function(e){
                if(e.target.classList.contains(`dots__dot`)){
                    const {slide} = e.target.dataset
                    goToSlide(slide);
                }
            })

            const int = function(){
                createDots(); 
                goToSlide(0);
            }

            int()
        }
        slider(); 

    //#endregion

    //#region Lifecycle DOM events
        document.addEventListener(`DOMContentLoaded`, function(e){
            console.log(`HTML parsed and DOM tree built. `)
        })

        window.addEventListener('load', function(e){
            console.log(`Page fully loaded`, e);
        })

        // window.addEventListener(`beforeunload`, function(e){
        //     e.preventDefault(); 
        //     console.log(e); 
        //     e.returnValue = '';
        // })

        
    //#endregion
// #endregion

// #region Lessions, Tips, & Tricks.
    //#region Selecting, Cretating, and Deleting Elements
        // Selection Elements
        console.log(document.documentElement);
        console.log(document.head);
        console.log(document.body);


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

    //#endregion

    //#region Styles
        // message.style.backgroundColor = `#37383d`;
        // message.style.width = `120%`

        // console.log(getComputedStyle(message).color); 

        // message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + `px`;

        // document.documentElement.style.setProperty(`--color-primary`, `orangered`)

    //#endregion

    //#region Attributes
        // const logo = document.querySelector(`.nav__logo`);
        // console.log(logo.alt);
        // console.log(logo.className);

        // logo.alt = `Beautiful minmalist logo`; 
        // logo.setAttribute(`company`, `Bankist`);

        // console.log(logo.getAttribute(`src`));

        // const link = document.querySelector(`.twitter-link`);   
        // console.log(link.getAttribute(`href`)); 

    //#endregion

    //#region Classes
        logo.classList.add('c', 'j');
        logo.classList.remove('c', 'j');
        logo.classList.toggle('c');
        logo.classList.contains('c');

    //#endregion

    //#region Events and Event Handlers
        // const alertH1 =  function(e){
        //     alert(`Great! you are reading the heading!`)
        //     h1.removeEventListener(`mouseenter`, alertH1);
        // }
        // h1.addEventListener(`mouseenter`,alertH1)

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

        // document.querySelector(`.nav__link`).addEventListener(`click`, function(e){
        //     e.preventDefault(); 
        //     this.style.backgroundColor = randomColor(); 
        //     console.log(`Link`, e.target)

        //     // Stop Propagation
        //     // e.stopPropagation(); 
            
        // })

        // document.querySelector(`.nav__links`).addEventListener(`click`, function(e){
        //     e.preventDefault(); 
        //     this.style.backgroundColor = randomColor(); 
        //     console.log(`CONTAINER`, e.target)
            
        // })

        // document.querySelector(`.nav`).addEventListener(`click`, function(e){
        //     e.preventDefault(); 
        //     this.style.backgroundColor = randomColor(); 
        //     console.log(`NAV`, e.target)
        // })

    //#endregion

    // //#region Page Navigation 

    //     // Going downward with children
    //     console.log(h1.querySelectorAll(`.highlight`));
    //     console.log(h1.childNodes); 
    //     console.log(h1.children);
    //     h1.firstElementChild.style.color = `white`; 
    //     h1.lastElementChild.style.color = `orangered`; 

    //     // Going upward with Parents
    //     console.log(h1.parentNode); 
    //     console.log(h1.parentElement); 
    //     h1.closest(`.header`).style.background = `var(--gradient-secondary)`;

    //     // Going sideways: siblings
    //     console.log(h1.previousElementSibling);
    //     console.log(h1.nextElementSibling);

    //     console.log(h1.previousSibling);
    //     console.log(h1.nextSibling);

    //     console.log(h1.parentElement.children);

    //     [...h1.parentElement.children].forEach(function(el){
    //         if(el !== h1){
    //             el.style.transform = `scale(0.5)`; 
    //         }
    //     })
    //#endregion
// #endregion
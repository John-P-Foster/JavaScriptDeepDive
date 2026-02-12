'use strict';

// prettier-ignore

//#region Dom Element Selections
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const form = document.querySelector('.form');
    const containerWorkouts = document.querySelector('.workouts');
    const inputType = document.querySelector('.form__input--type');
    const inputDistance = document.querySelector('.form__input--distance');
    const inputDuration = document.querySelector('.form__input--duration');
    const inputCadence = document.querySelector('.form__input--cadence');
    const inputElevation = document.querySelector('.form__input--elevation');


//#endregion

//#region App Class
    class App {

        // Static Variables
        #map; 
        #mapEvent; 
        #workouts = [];

        constructor(){
            this.#getPosition(); 


            form.addEventListener(`submit`, this.#newWorkOut.bind(this))

            inputType.addEventListener(`change`, this.#toggleElevationField)

        }

        #getPosition(){
            // Using leaflet to show maps 
            navigator.geolocation.getCurrentPosition(this.#loadMap.bind(this), function(){
                alert(`Could not get your position`)
            })

        }

        #loadMap(position){
            const {latitude} = position.coords
            const {longitude} = position.coords
            const coords = [latitude, longitude]

            console.log(`https://www.google.com/maps/@${latitude},${longitude}`); 

            this.#map = L.map('map').setView(coords, 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);

            L.marker(coords).addTo(this.#map)
                .bindPopup('A pretty CSS popup.<br> Easily customizable.')
                .openPopup();

            // Adding workouts to the map
            this.#map.on(`click`, this.#showForm.bind(this)) ;
                
        }

        
        #showForm(mapE){
            this.#mapEvent = mapE
            form.classList.remove(`hidden`);
            inputDistance.focus();
        }

        #toggleElevationField(){
            inputElevation.closest(`.form__row`).classList.toggle(`form__row--hidden`)
            inputCadence.closest(`.form__row`).classList.toggle(`form__row--hidden`)
        }

        #renderWorkoutMarker(workout){
            L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250, 
                minWidth: 100, 
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            }))
            .setPopupContent(`workout`)
            .openPopup();
        }

        #renderWorkOut(workout){
            let html = 
           `<li class="workout workout--${workout.type}" data-id="${workout.id}">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`}</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">miles</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>`

            if(workout.type === `running`){
                html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(1)}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
            </li>`
            }

            if(workout.type === `cycling`){
                html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(1)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>`
            }
            form.insertAdjacentHTML(`afterend`, html)
        }


        #newWorkOut(e){

            const validInputs = (...inputs) => inputs.every(input => Number.isFinite(input) && input > 0);

            e.preventDefault();

            // Get Data from Form 
            const type = inputType.value; 
            const distance = + inputDistance.value; 
            const duration = +inputDuration.value; 
            const {lat, lng} = this.#mapEvent.latlng; 
            let workout; 

            // If activity is running, create running object
            if(type === `running`){
                const cadence = +inputCadence.value; 
                // Check if data is valid
                if(!validInputs(distance, duration, cadence)) return alert(`Inputs must be positive numbers`);
                workout = new Running([lat, lng], distance, duration, cadence);
                this.#workouts.push(workout)
            }
            // If activity is cycling, create cycling object
            if(type === `cycling`){
                const elevation = +inputElevation.value; 
                // Check if data is valid
                if(!validInputs(distance, duration, elevation)) return alert(`Inputs must be positive numbers`);
                workout = new Cycling([lat, lng], distance, duration, elevation);
                this.#workouts.push(workout)
            }

            // Add the new object to the workout array
            this.#renderWorkoutMarker(workout); 
            // Render workout on map as a marker
            this.#renderWorkOut(workout); 

            // Clear input fields and hide form
                inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''
                form.classList.add(`hidden`);

        }



    }

//#endregion

//#region Work Out Class & Childern Classes
    class Workout{
        date = new Date();
        id = (Date.now() + '').slice(-10);
        constructor(coords, distance, duration){
            this.coords = coords; 
            this.distance = distance; 
            this.duration = duration; 
        }
        setDescription(){
            this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
        }
    }

    class Running extends Workout {
        type = `running`
        constructor(coords, distance, duration, cadence){
            super(coords, distance, duration); 
            this.cadence = cadence; 
            this.calcPace();
            this.setDescription(); 
        }

        calcPace(){
            this.pace = this.duration / this.distance
            return this.pace
        }
    }

    class Cycling extends Workout {
        type = `cycling`
        constructor(coords, distance, duration, elevationGain){
            super(coords, distance, duration); 
            this.elevationGain = elevationGain; 
            this.calcSpeed(); 
            this.setDescription(); 
        }

        calcSpeed(){
            this.speed = this.distance / this.duration / 60; 
            return this.speed; 
        }
    }
//#endregion

//#region App Launcher
    const app = new App();
//#endregion

 const run1 = new Running([39, -12], 5.3, 24, 178)
 const cyc1 = new Running([39, -12], 27, 24, 523)

 console.log(run1)
 console.log(cyc1)


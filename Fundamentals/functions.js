'use strict'; 


const bookings  = [];

const createBooking = function(flightNum, numPasssengers = 1, price = 199 * numPasssengers) {
    // ES5
    // numPasssengers = numPasssengers || 1; 
    // price = price || 199; 

    const booking = {
        flightNum,
        numPasssengers,
        price
    }

    console.log(booking);
    bookings.push(booking); 

}

createBooking('LH124')

const flight = 'LH234';
const john = {
    name: 'John Foster', 
    passport: 23456512412,
};

const checkIn = function (flightNum, passenger){
    flightNum = 'LH999'; 
    passenger.name = 'Mr. ' + passenger.name; 

    if(passenger.passport === 23456512412 ){
        console.log('Checked in'); 
    }else{
        console.log('Wrong person!');
    }
}

checkIn(flight, john); 
console.log(flight); 
console.log(john); 

//flightNum = flight; 

let passenger = john; 



// Higher Order Functions

const oneWord = function(str){
    return str.replace(/ /g, '').toLowerCase(); 
};

const upperFirstWord = function(str){
    const[first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function(str, foo){
    console.log(`Orginal string: ${str}`); 
    console.log(`Transformed string: ${foo(str)}`);
    console.log(`Transformed by ${foo.name}`);
}

transformer(`JavaScript is the best!`, upperFirstWord);
transformer(`JavaScript is the best!`, oneWord);

const fire = function(){
    console.log('🔥');
}

// Call back functions
const names = ['Johns', 'Martha', 'Adam']
names.forEach(fire); 


// Returning functions

const greet = function(greeting){
    return function(name){
        console.log(`${greeting} ${name}`)
    }
}

const greeterHey = greet('Hey'); 
greeterHey('John'); 
greet('Hello')('Mia')
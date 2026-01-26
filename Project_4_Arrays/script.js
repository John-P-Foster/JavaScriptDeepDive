console.log('SCRIPT LOADED');

'use strict';

// #region 1.) Arrays Data
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data for array section
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
//   type: `premium`
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
//   type: `basic`
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
//   type: `premium`
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
//   type: `standard`
// };

// const accounts = [account1, account2, account3, account4];
// #endregion

// #region 2.)  Arrays for Numbers, Times, Dates section
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// #endregion

// #region 3.) Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
console.log(containerMovements);

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// #endregion


const displayMovements = function(acc, sort = false){
  
  containerMovements.innerHTML = ''; 

  const movs = sort ? acc.movements
                      .slice()
                      .sort((a, b) => a - b)
                    : acc.movements; 

  movs.forEach(function(mov, i){
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const newDate = new Date(acc.movementsDates[i]);
    const day = `${newDate.getDate()}`.padStart(2, 0);
    const month = `${newDate.getMonth() + 1}`.padStart(2, 0)
    const year = newDate.getFullYear()
    const displayDate = `${day}/${month}/${year}`; 
  
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${mov.toFixed(2)}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

// displayMovements(account1.movements)

///////////////////////////////////////////////
///////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const createUserNames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join(''); 
  });
};

createUserNames(accounts); 

const updateUI = function(acc){
      //Display movements
      displayMovements(acc);
      // display balance
      calcPrintBalance(acc);
      // Display Summary
      calcDispalySummary(acc);
}



// #region 4.) Array methods

let arr = ['a', 'b', 'c', 'd', 'e']

// SLICE
console.log(arr.slice(2)); 
console.log(arr.slice(2,4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

// SPLICE

//console.log(arr.splice(2)); 
arr.splice(-1);
console.log(arr); 
arr.splice(1, 2);
console.log(arr); 

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2); 

// Concat
const letters = arr.concat(arr2); 
console.log(letters); 
console.log([...arr, ...arr2]); 

// Join
console.log(letters.join(' - ')); 

const nArr =[23, 11, 64]; 
console.log(nArr[0]); 
console.log(nArr.at(0)); 
console.log(nArr.at(-1)); 

for(const [i, movement] of movements.entries()){
    if(movement > 0){
        console.log(`Movement ${i} You deposited ${movement}`);
    }else {
        console.log(`Movement ${i}  You withdrew ${Math.abs(movement)}`);
    }
}

// forEach has no break out option. 
console.log(''); 
movements.forEach(function(movement, index, array){
    if(movement > 0){
        console.log(`Movement ${index} You deposited ${movement}`);
    }else {
        console.log(`Movement ${index} You withdrew ${Math.abs(movement)}`);
    }
})

const currencies2 = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);
  


// Maps
currencies2.forEach(function(value, key, map){
    console.log(`${key} : ${value}`); 
})




const calcPrintBalance = function(acc){
  acc.balance = acc.movements.reduce((a, b) => a + b, 0); 
  labelBalance.textContent = `$${acc.balance.toFixed(2)} USD`; 
}; 

// calcPrintBalance(account1.movements); 

const calcDispalySummary = function(acc){
  const incomes = acc.movements
    .filter(move => move > 0)
    .reduce((a,b)=> a + b, 0); 
  labelSumIn.textContent = `${incomes.toFixed(2)}`; 

  const withdrawal = acc.movements
    .filter(move => move < 0)
    .reduce((a, b)=> a + b, 0); 
  labelSumOut.textContent = `${withdrawal.toFixed(2)}`;

  const interest = acc.movements
    .filter(move => move > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter(move => move >= 1)
    .reduce((a,b) => a + b, 0); 
    labelSumInterest.textContent = `$${interest.toFixed(2)}`
} 

// calcDispalySummary(account1.movements)

// Findind the maximum value 
const getMaxMovement = function(movements){
  const max = movements.reduce((a , b) => Math.max(a, b), movements[0]); 
  console.log(`The max movement was ${max}`); 
}

// getMaxMovement(account1.movements)

// Chaining Methods AKA Pipeline
const eurToUsd = 1.1; 
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((a,b) => a + b, 0); 

console.log(`Total Depoists in USD: ${totalDepositsUSD}`); 

// The find method
const firstWithdrawal = movements.find(mov => mov < 0) // returns the first element in the array that this is true/ 
console.log(firstWithdrawal); 

console.log(accounts); 
const account = accounts.find(acc => acc.owner === `Jessica Davis`); 
console.log(account); 
// #endregion

// #region 5.) Event Handlers
    let currentAccount

    // Fake alays logged in for dev work
    currentAccount = account1;
    updateUI(currentAccount);
    containerApp.style.opacity = 100;


    btnLogin.addEventListener('click', function(e){
      e.preventDefault(); 
      currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
      );
      
      if(currentAccount?.pin === Number(inputLoginPin.value)){
        //Display UI and welcome message. 
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
        containerApp.style.opacity = 100; 

        // Creating current date and time; 
        const now = new Date(); 
        const day = `${now.getDate()}`.padStart(2, 0);
        const month = `${now.getMonth() + 1}`.padStart(2, 0)
        const year = `${now.getFullYear() + 1}`.padStart(2, 0)
        const hour = `${now.getHours() + 1}`.padStart(2, 0)
        const mins = `${now.getMinutes() + 1}`.padStart(2, 0)
        labelDate.textContent = `${day}/${month}/${year}, ${hour}:${mins}`; 
        
        // Clear Input Fields
        inputLoginUsername.value = inputLoginPin.value = ''; 
        inputLoginPin.blur(); 

        // Update the page
        updateUI(currentAccount); 


        console.log(`Logged in : ${currentAccount.owner}`); 
      }
    })

    btnTransfer.addEventListener('click', function(e){
      e.preventDefault();
      const amount = Number(inputTransferAmount.value);
      const reciverAcc = accounts.find( acc => acc.username === inputTransferTo.value); 
      inputTransferAmount.value = inputTransferTo.value = ''; 
      if(
          amount > 0 &&
          reciverAcc &&
          currentAccount.balance >= amount && 
          reciverAcc?.username !== currentAccount.username
      ) {
          // Conduct Transfer
          currentAccount.movements.push(-amount); 
          reciverAcc.movements.push(amount); 
          
          // Add transfer date
          currentAccount.movementsDates.push(new Date().toISOString());
          reciverAcc.movementsDates.push(new Date().toISOString());

          // Update UI
          updateUI(currentAccount); 
        }
    })

    btnClose.addEventListener('click', function(e){
      e.preventDefault();


      if(
        currentAccount.username === inputCloseUsername.value &&
        currentAccount.pin === Number(inputClosePin.value)
      ){
        const index = accounts.findIndex(
          acc => acc.username === currentAccount.username
        )

        // Delete account
        accounts.splice(index, 1);

        // clear fields
        inputClosePin.value = inputCloseUsername.value = '';

        // Hide UI
        containerApp.style.opacity = 0; 

      }
    })

    btnLoan.addEventListener('click', function(e) {
      e.preventDefault(); 
      const amount = Math.floor(inputLoanAmount.value);
      if(
        amount > 0 && 
        currentAccount.movements.some(mov => mov >= amount * 0.1)
      ){
        // Add movement here
        currentAccount.movements.push(amount); 

        // Add loan date
        currentAccount.movementsDates.push(new Date().toISOString());

        // Update the UI
        updateUI(currentAccount); 
        inputLoanAmount.value = ''; 
      }
    })

    let sorted = false; 
    btnSort.addEventListener(`click`, function(e){
      e.preventDefault(); 
      displayMovements(currentAccount.movements, !sorted); 
    sorted = !sorted; 
    })

    // const lastWithdrawl = movements.find(mov => mov < 0); 
    // console.log(lastWithdrawl)

    // const latestLargMovementIndex = movements.findLastIndex(mov => Math.abs(mov) > 1000);
    // console.log(`Your latest large movement was ${movements.length - latestLargMovementIndex - 1} transfers ago. `); 

    // Every method
    // console.log(movements.every(mov => mov > 0)); 

    // #endregion
    
    //----------------
    // Sorting Arrays
    //----------------
    const owners = accounts
                    .map(account => account.owner.split(' ')[0])
                    .sort(); 
    
    console.log(owners); 

    movements.sort((a,b) => a -b )

    console.log(movements); 

    //----------------
    // Grouping Arrays
    //----------------

    const groupedMovements = Object.groupBy(movements, movement => movement > 0 ? `deposits` : `withdrawl`); 
    console.log(groupedMovements); 

    const groupedByActivity = Object.groupBy(accounts, account => {
      const movementCount = account.movements.length; 
      if(movementCount >= 8) return `very active`;
      if(movementCount >= 4) return `active`;
      if(movementCount) return ` moderate`; 
      return `inactive`; 
    })

    console.log(groupedByActivity); 

    const groupedByType = Object.groupBy(accounts, account => account.type)

    console.log(groupedByType); 

/**
 * Creating arrays programtically 
 */

const x = new Array(7); 
x.fill(0);

console.log(x); 

const y = Array.from({length: 7}, (cur, i) => i + 1); 
console.log(y)


labelBalance.addEventListener(`click`, function(e){
  e.preventDefault(); 
  const movementsUI = Array.from(document.querySelectorAll(`.movements__value`), el =>  el.textContent.replace('$', '') );
  console.log(movementsUI)
})


/**
 * ---------------------------------------------------------
 *  Start of Numbers, Dates, Intl, and Timers Lessons. 
 * ---------------------------------------------------------
 */

  // #region 6.) Example of numbers limit in JS thanks to its 64 bit base 2 system. 
      console.log(.1 + .2); 
      console.log(.1 + .2 === .3); 

  // Conversion
      console.log(Number(`14`));
      console.log(+`14`); 

  // Parsing
      console.log(Number.parseInt(`30px`)); 

  // Is NaN
      console.log(Number.isNaN(`30`))
      console.log(Number.isNaN(+`30`))
      console.log(Number.isNaN(+`30X`))
      console.log(Number.isNaN(30))
      console.log(Number.isNaN(30/0))

      console.log(Number.isFinite(23/0)); 

  // Math Opperations 

      console.log(Math.sqrt(25));
      console.log(25 ** (1/2));
      console.log(8 ** (1/3));

      console.log(Math.PI * Number.parseFloat(`10px`) ** 2); 

      console.log(Math.trunc(Math.random() * 6 + 1))
      const ranomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
      console.log(ranomInt(10, 20)); 

  // Rounding Integers
      console.log(Math.trunc(23.2));
      console.log(Math.round(23.9)); 
      console.log(Math.ceil(23.9)); 
      console.log(Math.floor(2.99)); 

  // Rounding Floats
      console.log((2.7).toFixed(0)); 
      console.log((2.7).toFixed(3)); 
      console.log(+(2.745).toFixed(2)); 

  // Modulo Operator 
      console.log(5 % 2); 
      console.log( 5 / 2); 

  // Numeric Separator

      const diameter = 287_400_000_000
      console.log(diameter); 

      const priceCents = 345_99; 
      console.log(priceCents); 

      const transferFee = 15_00; 

      console.log(Number(`230_000`)) // wont work js can't parse it. 

  // BigInt
      console.log(2 ** 53 - 1);
      console.log(Number.MAX_SAFE_INTEGER); 

      //BigInt in action
      console.log(99999999999999999999999999999999999999999n)
      console.log(BigInt(9999999999))


  // Dates and Times
    // Creating a date

    // const now = new Date()
    // console.log(now); 
    // console.log(new Date(account1.movementsDates[0]));
    // console.log(new Date(2027, 10, 19, 15, 23,5))
    // console.log(new Date(0)) // start of the js counter
    // console.log(new Date(3 * 24 * 60 * 60 * 1000)); // time stamp of third day

    // Workign with dates
    const future = new Date(2037, 10, 19, 15, 23); 
    console.log(future); 
    console.log(future.getFullYear()); 
    console.log(future.getMonth()); 
    console.log(future.getDate()); 
    console.log(future.getDay()); 
    console.log(future.getMinutes()); 
    console.log(future.getSeconds()); 
    console.log(future.toISOString()); 
    console.log(future.getTime());
    
    console.log(new Date(2142274980000))

    future.setFullYear(2050);
    console.log(future); 
    
    // #endregion
    

// #region 7. Date Functions in Bankis
/**
 * -----------------------------------------------
 *  Functions for the Bankist app
 * -----------------------------------------------
 */




// #endregion




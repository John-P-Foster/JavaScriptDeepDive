console.log('SCRIPT LOADED');

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
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

const displayMovements = function(movements){
  
  containerMovements.innerHTML = ''; 

  movements.forEach(function(mov, i){
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

displayMovements(account1.movements)

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
      displayMovements(acc.movements);
      // display balance
      calcPrintBalance(acc);
      // Display Summary
      calcDispalySummary(acc);
}


/////////////////////////////////////////////////

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
  labelBalance.textContent = `$${acc.balance} USD`; 
}; 

// calcPrintBalance(account1.movements); 

const calcDispalySummary = function(acc){
  const incomes = acc.movements
    .filter(move => move > 0)
    .reduce((a,b)=> a + b, 0); 
  labelSumIn.textContent = `${incomes}`; 

  const withdrawal = acc.movements
    .filter(move => move < 0)
    .reduce((a, b)=> a + b, 0); 
  labelSumOut.textContent = `${withdrawal}`;

  const interest = acc.movements
    .filter(move => move > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter(move => move >= 1)
    .reduce((a,b) => a + b, 0); 
    labelSumInterest.textContent = `$${interest}`
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

// Event Handlers
    let currentAccount

    btnLogin.addEventListener('click', function(e){
      e.preventDefault(); 
      currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
      );
      
      if(currentAccount?.pin === Number(inputLoginPin.value)){
        //Display UI and welcome message. 
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
        containerApp.style.opacity = 100; 
        
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
      const amount = Number(inputLoanAmount.value);
      if(
        amount > 0 && 
        currentAccount.movements.some(mov => mov >= amount * 0.1)
      ){
        // Add movement here
        currentAccount.movements.push(amount); 
        updateUI(currentAccount); 
        inputLoanAmount.value = ''; 
      }
    })

    // const lastWithdrawl = movements.find(mov => mov < 0); 
    // console.log(lastWithdrawl)

    // const latestLargMovementIndex = movements.findLastIndex(mov => Math.abs(mov) > 1000);
    // console.log(`Your latest large movement was ${movements.length - latestLargMovementIndex - 1} transfers ago. `); 

    // Every method
    // console.log(movements.every(mov => mov > 0)); 
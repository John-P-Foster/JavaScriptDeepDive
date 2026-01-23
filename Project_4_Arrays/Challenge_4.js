/**
 * More Array Methods Practice
 */

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    type: `premium`
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    type: `basic`
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    type: `premium`
  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    type: `standard`
  };
  
  const accounts = [account1, account2, account3, account4];
  

  const testResults = new Array();

// 1. 
const bankDepositSum = accounts
    .flatMap(acc => acc.movements)
    .filter(mov => mov > 0)
    .reduce((a, b) => a + b, 0); 

testResults.push(bankDepositSum);

// 2.
const numDeposits1000 = accounts
    .flatMap(acc => acc.movements)
    .reduce((a, b) => (b >= 1000 ? a + 1 : a), 0);

testResults.push(numDeposits1000);


// 3.
const {deposits, withdrawals} = accounts
    .flatMap(acc => acc.movements)
    .reduce((sums, cur) => {
        sums[cur > 0 ? `deposits` : `withdrawals`] += cur; 
        return sums; 
    }, {deposits: 0, withdrawals: 0})

testResults.push([deposits, withdrawals]); 

// 4. 
const convertTitleCase = function(title){
    const exceptions = ['a', 'an','the', 'but', 'or', 'on', 'in', 'with'];
    
    const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1))
    .join(' '); 
    return titleCase; 
}

console.log(convertTitleCase(`this is a nice title`))

// Testing Harness
testResults.forEach((test, i) => {
    console.log(`Test ${i + 1}: ${test}`)
})
/**
 * More Array Methods Practice
 */

/**
 * Data for warm ups
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

/**
 * Warm up problems
 */
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


    // #region 3.
    const {deposits, withdrawals} = accounts
        .flatMap(acc => acc.movements)
        .reduce((sums, cur) => {
            sums[cur > 0 ? `deposits` : `withdrawals`] += cur; 
            return sums; 
        }, {deposits: 0, withdrawals: 0})

    testResults.push([deposits, withdrawals]); 
    // #endregion

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

    // console.log(convertTitleCase(`this is a nice title`))

// // Testing Harness
//     testResults.forEach((test, i) => {
//         console.log(`Test ${i + 1}: ${test}`)
//     })

/*
|------------------------------|
| Coding Challenge # 5         |
|------------------------------|
/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

TEST DATA:
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

testResults.length = 0; 
// YOUR TASKS:
// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
    dogs.forEach((dog)=>{
        dog.recFood = Math.floor(dog.weight ** 0.75 * 28);
        console.log(dog); 
    })

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
    const saraDogs = dogs.filter((dog)=> dog.owners.includes('Sarah'));
    saraDogs.forEach(dog =>{
        testResults.push(`Sarah's dog is eating ${dog.curFood > dog.recFood ? 'too much' : 'too little'}`)
    });

// 3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
    const ownersTooMuch = dogs
        .filter(dog => dog.curFood > dog.recFood)
        .flatMap(dog => dog.owners); 
    testResults.push(ownersTooMuch); 

    const ownersTooLittle = dogs
        .filter(dog => dog.curFood < dog.recFood)
        .flatMap(dog => dog.owners); 
    testResults.push(ownersTooLittle); 

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
    testResults.push(`${ownersTooMuch.join(' and ')}'s dogs eat too much!`)
    testResults.push(`${ownersTooLittle.join(' and ')}'s dogs eat too little!`)

// 5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
    testResults.push(dogs.some(dog => dog.curFood === dog.recFood)); 

// 6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
    testResults.push(
        dogs.every(dog => (dog.curFood > dog.recFood * .9) && (dog.curFood < dog.recFood * 1.1))
    )

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
    testResults.push(
        dogs.filter(dog => (dog.curFood > dog.recFood * .9) && (dog.curFood < dog.recFood * 1.1))
    )

// 8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
    const dogsGroupedByPortion = Object.groupBy(dogs, dog => {
        if (dog.curFood > dog.recFood) {
        return 'too-much';
        } else if (dog.curFood < dog.recFood) {
        return 'too-little';
        } else {
        return 'exact';
        }
    });


// 9. Group the dogs by the number of owners they have
    const dogsGroupedByOwners = Object.groupBy(
        dogs,
        dog => `${dog.owners.length}-owners`
    );

// 10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!
    const dogsSorted = dogs.toSorted((a, b) => a.recFood - b.recFood);
    testResults.push(dogsSorted);

// HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.


// Testing Harness
testResults.forEach((test, i) => {
    console.log(`Test ${i + 1}: ${test}`)
})

// const aDogs = [3, 5, 2,12,7];
// const bDogs = [4,1,15,8,3];

// const checkDogs = function(a, b){
//   const aCorrected = a.slice();
//   aCorrected.splice(0, 1); 
//   aCorrected.splice(-2); 
//   const dogs = [...aCorrected, ...b];

//   dogs.forEach(function(dog, i){
//     const adult = dog > 3 ? `adult` : `puppy`
//     console.log(`Dog #${i + 1} is an ${adult}.`)
//   })


// }

// const createUserNames = function(accs){
//   accs.forEach(function(acc){
//     acc.userName = acc.owner
//       .split(' ')
//       .map(name => name[0])
//       .join('');
//   })

// }

// checkDogs(aDogs, bDogs); 

// const user = `John Pete Foster`;
// const userName = createUserNames(user)
  
// console.log(userName); 

// const deposits = movements.filter(function(mov){
//   return mov > 0; 
// })

// console.log(deposits)

// const depositsFor = [];
// for(const mov of movements) if (mov > 0) depositsFor
//   .push(mov); 

// console.log(depositsFor); 

// const withdrawals = movements.filter(function(mov){
//   return mov < 0; 
// })

const movements = [1, 4, -1, 5]

const balance = movements.reduce(function(acc, cur, i, arr){
  return acc + cur
})

let test = movements.reduce((a, b) => a + b, 0)
console.log(test);
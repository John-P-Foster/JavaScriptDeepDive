// Object References in Practice 

// How objects are passed as memory references. 
const mia = {
    firstName: 'Mia',
    LastName: 'Sawyer',
    age: 34,
    family: [`Don`, `Sada`, `Jen`]
}


const marriedMia = mia;
marriedMia.LastName = 'Foster'; 

console.log(`Original: `, mia); 
console.log(`Reference: `, marriedMia); 

// Even in functions. 

function marryPerson(originalPerson, newLastName){
    originalPerson.LastName = newLastName; 
    return originalPerson; 
}

const marriedMia2 = marryPerson(mia, `Foster2`);
console.log(`Original: `, mia)
console.log(`After Function: `, marriedMia2)


// To really create a new copy of an Object use the Spreader



const miaCopy = {...mia}; 
marryPerson(miaCopy, `Foster Copy`);
console.log(`Orginial: `, mia)
console.log(`After Spreader Copy: `, miaCopy)

// But if there on object with in the object the references will still be the same
miaCopy.family.push(`John`);
miaCopy.family.push(`Bradley`);

console.log(`Orginal with Object: `, mia)
console.log(`Spreader with Object: `, miaCopy)

// The spreader only creates a shallow copy of the object. 

// What we want is a deep copy

// Deep Copy/Clone

const miaClone = structuredClone(mia); 
miaClone.family.push(`Sophia`);
miaClone.family.push(`Lilly`);

console.log(`Orginal: `, mia)
console.log(`Clone: `, miaClone)
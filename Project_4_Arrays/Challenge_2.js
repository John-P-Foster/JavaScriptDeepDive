const testData1 = [5, 2, 4, 1, 15, 8, 3];
const testData2 = [16, 6, 10, 5, 6, 1, 4];
const testData3 = [1,2,3]; 

const tests = [testData1, testData2, testData3]

const calAvgHumanAge = function(ages){
    const dogyears = ages
    .map( age => age <= 2 ? age * 2 : 16 + age * 4)
    .filter(age => age >= 18); 

    console.log(dogyears); 
    console.log(`The average age of the given dogs is ${(dogyears.reduce((a, b) => a + b, 0) / ages.length)}`)
}

tests.forEach(test => {
    calAvgHumanAge(test)
});
 /*
  Strings in JavaScript 
 */

  const firstName = 'John'; 
  const job = 'teacher';
  const birthYear = 1991; 
  const year = 2025; 

  const john = "I'm " + firstName + ', a ' + (year - birthYear) + ' years old ' + job + '!'; 
  console.log(john); 

  // Template Literals

  const johnNew = `I'm ${firstName}, a ${year - birthYear} year old  ${job} !`
  console.log(johnNew); 
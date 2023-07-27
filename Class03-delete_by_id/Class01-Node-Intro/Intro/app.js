const { isEmail } = require("validator");

console.log("from node js");

const fakeEmail = "asdasdsd@gmail.com";

const isEmailValid = isEmail(fakeEmail);

console.log(`Email is valid: ${isEmailValid}`);

const addTwoNums = (numOne, numTwo) => {
  return numOne + numTwo;
};

console.log(addTwoNums(10, 2));
console.log(addTwoNums(10, 29));
console.log(addTwoNums(40, 500));

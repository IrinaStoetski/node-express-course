const names = require("./04-names.js");
const isBelowThreshold = require("./05-utils.js");
console.log(names);
console.log(isBelowThreshold(10));

const {
  password,
  secret,
  isAboveThreshold,
} = require("./06-alternative-flavor.js");

console.log(password, secret, isAboveThreshold(50));
console.log(isBelowThreshold(10));

require("./07-mind-grenade.js");

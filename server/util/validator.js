const validator = require("validator");

function validateName(value) {
  return validator.isLength(value, { min: 3, max: 35 });
}

function validateEmail(value) {
  return validator.isEmail(value);
}

function validatePhone(value) {
  return validator.isMobilePhone(value, "vi-VN");
}

function validatePassword(value) {
  return validator.isStrongPassword(value, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
    pointsPerUnique: 1,
    pointsPerRepeat: 0.5,
    pointsForContainingLower: 10,
    pointsForContainingUpper: 10,
    pointsForContainingNumber: 10,
    pointsForContainingSymbol: 10,
  });
}

module.exports = {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
};

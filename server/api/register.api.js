const Register = require("../models/register.models.js");
const validator = require("validator");
const bcrypt = require("bcrypt");

exports.registerForm = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // console.log("name:", name);
    // console.log("email:", email);
    // console.log("password:", password);
    // console.log("req.body:", req.body); // Log req.body separately

    // Basic validations
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, password are required fields" });
    }

    if (!validator.isLength(name, { min: 3, max: 35 })) {
      return res.status(400).json({ message: "Please enter valid name" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter valid email" });
    }

    if (
      !validator.isStrongPassword(password, {
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
      })
    ) {
      return res.status(400).json({ message: "Please enter valid password" });
    }
    // const result = validator.isStrongPassword(password, {
    //   minLength: 8,
    //   minLowercase: 1,
    //   minUppercase: 1,
    //   minNumbers: 1,
    //   minSymbols: 1,
    //   returnScore: true,
    //   pointsPerUnique: 1,
    //   pointsPerRepeat: 0.5,
    //   pointsForContainingLower: 10,
    //   pointsForContainingUpper: 10,
    //   pointsForContainingNumber: 10,
    //   pointsForContainingSymbol: 10,
    // });
    // console.log(result); // Output: true or false
    // console.log(result.isValid); // Output: true or false
    // console.log(result.score);

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    // // Create a new contact instance
    const newRegister = new Register({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Save the contact to the database
    await newRegister.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

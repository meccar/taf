const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const AccountSchema = new Schema({
  username: {
    type: String,
    required: [true, "Name is required"],
    minlength: [4, "Name must be at least 4 characters long"],
    maxlength: [35, "Name cannot exceed 35 characters"],
    trim: true,
    match: [
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Email is required"],
    trim: true,
    validate: {
      validator: [validator.isEmail, "Please enter a valid email"],
    },
  },
  is_email_verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    validate: {
      validator: [
        validator.isStrongPassword({
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
        }),
        "Please enter a valid Password",
      ],
    },
  },
  timestamp: {
    type: Date,
    default: Date.now, // Set timestamp on creation
  },
});

// AccountSchema.pre(/^find/, function (next) {
//   this.find({ is_email_verified: { $ne: false } });
//   next();
// });

AccountSchema.pre("save", async function (next) {
  // Only run this func if password was modified
  if (!this.isModified("password")) return next();

  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

AccountSchema.pre("^find", async (next) => {
  this.find({ is_email_verified: { $ne: false } });
  next();
});

const Account = mongoose.model("accounts", AccountSchema);
module.exports = Account;

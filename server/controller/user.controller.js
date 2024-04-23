const catchAsync = require("../util/catchAsync");
const Account = require("../models/account.models");
const AppError = require("../util/appError");
const Email = require("../util/email");
const crypto = require("crypto");

const handler = require("./handler.controller");

exports.GetMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.register = catchAsync(async (req, res) => {
  // Create a new account
  const newAccount = await Account.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Send verification email
  // await VerifyMailController.sendMail(req, res, req.body.email);
  const secretCode = crypto.randomBytes(32).toString("hex");
  // const secretCode = crypto.randomBytes(8).toString("hex");

  const url = `${req.protocol}://${req.get("host")}/api/v1/verifymail/${req.body.email}/${secretCode}`;

  await new Email(newAccount, url).sendEmailVerification();

  newAccount.password = undefined;

  return res.status(202).json({
    status: "success",
    message: "Verification email sent successful",
    data: { newAccount },
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.DeleteMe = catchAsync(async (req, res, next) => {
  await Account.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.UpdateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "Incorrect route for updating password. Please send request at /updatePassword",
        400,
      ),
    );
  }

  const filterBody = filterObj(req.body, "username", "email");
  if (req.file) filterBody.photo = req.file.filename;

  const updateUser = await Account.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

exports.CreateAccount = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /register instead",
  });
};

exports.DeleteAccount = handler.deleteOne(Account);
exports.GetAccount = handler.getOne(Account);
exports.UpdateAccount = handler.updateOne(Account);
exports.GetAllAccount = handler.getAll(Account);

// exports.login = catchAsync(async (req, res, next) => {
//   const { username, email, password } = req.body;

//   // Check if account exists and email is verified concurrently
//   // const [user, isEmailVerified, passwordMatch] = await Promise.all([
//   const user = await Account.findOne({ $or: [{ email }, { username }] }).select(
//     "+password",
//   );

//   if (!user || !(await user.correctPassword(password, user.password))) {
//     return next(new AppError("Incorrect Email or Password", 401));
//   }

//   delete user.password;

//   const { accessToken, refreshToken } = await JWT.generateTokens(user._id);

//   await JWT.generateCookie(req, res, accessToken);
//   await res.setHeader("Authorization", `Bearer ${accessToken}`);

//   // const { accessToken, refreshToken, user } = req;

//   return res
//     .status(200)
//     .json({ status: "success", accessToken, refreshToken, data: { user } });
// });

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ status: "success", message: "Logout successful" });
});

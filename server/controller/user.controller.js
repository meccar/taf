const catchAsync = require("../util/catchAsync");

exports.register = catchAsync(async (req, res, next) => {
  const { newAccount } = req;
  return res.status(202).json({
    status: "success",
    message: "Verification email sent successful",
    data: { newAccount },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { accessToken, refreshToken, user } = req;
  return res
    .status(200)
    .json({ status: "success", data: { accessToken, refreshToken, user } });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ status: "success", message: "Logout successful" });
});

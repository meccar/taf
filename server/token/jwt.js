const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const { promisify } = require("util");

const Account = require("../models/account.models");
const Config = require("../config/config");
const option = require("../config/jwtConfig");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

// Function to generate JWT token asynchronously
exports.generateToken = (id) => jwt.sign({ id }, Config.privateKey, option);

// exports.verifyToken = catchAsync(async (req, res, next) => {
//   // 1) Getting token and check of it's there
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }

//   if (!token) {
//     return next(
//       new AppError("You are not logged in! Please log in to get access.", 401),
//     );
//   }

//   // 2) Verification token
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   // 3) Check if user still exists
//   const currentUser = await Account.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError(
//         "The user belonging to this token does no longer exist.",
//         401,
//       ),
//     );
//   }

//   // 4) Check if user changed password after the token was issued
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError("User recently changed password! Please log in again.", 401),
//     );
//   }

//   // GRANT ACCESS TO PROTECTED ROUTE
//   req.user = currentUser;
//   res.locals.user = currentUser;
//   next();
// });

exports.decodedToken = (token) => {
  // Decode the token and return the payload (consider using verification with secret key for better security)
  const decoded = jwt.decode(token);
  return decoded;
};

// class JWT {
//   async generateTokens(user_id) {
//     try {
//       const accessToken = await this.generateToken(user_id);
//       const refreshToken = await this.generateToken(user_id);
//       return { accessToken, refreshToken };
//     } catch (error) {
//       throw new Error(`Failed to generate JWT tokens: ${error.message}`);
//     }
//   }

//   async generateCookie(req, res, token) {
//     try {
//       const cookieOptions = {
//         httpOnly: false,
//         secure: Config.node_env === "production",
//         sameSite: "lax",
//         path: "/",
//         expires: new Date(Date.now() + 99999999999),
//       };

//       // await res.setHeader("Bearer", cookie.serialize(token));

//       await res.cookie("token", token, cookieOptions);
//     } catch (error) {
//       throw error;
//     }
//   }

//   async verifyToken(req, res, next) {
//     try {
//       // Get the token from the cookie
//       const { token } = req.cookies;

//       if (!token) {
//         // Token is missing, throw specific error
//         throw new Error("Access denied");
//       }

//       // Verify the token
//       const decodedToken = await jwt.verify(token, Config.privateKey);

//       // Token is valid, set decoded data and proceed
//       req.decodedToken = decodedToken;
//       next();
//     } catch (error) {
//       return res
//         .status(200)
//         .json({ status: "fail", message: "Failed to verify user" });
//     }
//   }

//   async decodedToken(token) {
//     try {
//       // Decode the token and return the payload (consider using verification with secret key for better security)
//       const decoded = jwt.decode(token);
//       return decoded;
//     } catch (error) {
//       throw new Error("Can't verify user");
//     }
//   }
// }
// module.exports = new JWT();

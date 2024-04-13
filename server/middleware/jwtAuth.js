const jwt = require("jsonwebtoken");

const Config = require("../config/config");
const payload = require("../config/jwtConfig");
const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");

// Load the public key
const { publicKey } = Config;

exports.verifyToken = catchAsync(async (req, res, next) => {
  // getJwtFromHeader(req);
  const token = req.header("Cookie").replace("token=", "");
  if (!token) return next(new AppError("Access denied", 401));
  // Verify the token using the public key and additional options
  jwt.verify(token, publicKey, payload, (err, decoded) => {
    if (err) {
      return next(new AppError("Invalid token", 401));
    }

    // Capture the decoded payload
    req.userId = decoded.userId;
    next();
  });
});

// // Middleware to verify JWT token
// exports.verifyToken = (req, res, next) => {
//   // Get the authorization header
//   const authHeader = req.header("Cookie");

//   // Check if authorization header exists
//   if (typeof authHeader !== "undefined") {
//     // Split the header into two parts: Bearer and the token
//     const tokenParts = authHeader.split("=");
//     if (tokenParts.length === 2 && tokenParts[0] === "token") {
//       // Extract and verify the token
//       const token = tokenParts[1];
//       jwt.verify(token, publicKey, (err, decodedToken) => {
//         if (err) {
//           // Token is not valid
//           return next(new AppError("Unauthorized", 401));
//         }
//         // Token is valid, set the decoded token in the request object
//         req.decodedToken = decodedToken;
//         next(); // Proceed to the next middleware
//       });
//     } else {
//       // Invalid authorization header format
//       return next(new AppError("Unauthorized", 401));
//     }
//   } else {
//     // Authorization header is missing
//     return next(new AppError("Unauthorized", 401));
//   }
// };

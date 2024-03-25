const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

// Load the public key
const publicKey = fs.readFileSync(path.join(__dirname, "..", "pub.pem"));

function verifyToken(req, res, next) {
  // getJwtFromHeader(req);
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    // Verify the token using the public key and additional options
    jwt.verify(
      token,
      publicKey,
      {
        algorithms: ["RS256"],
        audience: "urn:https://qd4djl-3000.csb.app",
        issuer: "urn:https://qd4djl-3000.csb.app",
      },
      (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid token" });
        }

        // Capture the decoded payload
        req.userId = decoded.userId;
        next();
      },
    );
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;

// // Middleware to verify JWT token
// function verifyToken(req, res, next) {
//   // Get the authorization header
//   const authHeader = req.headers['authorization'];

//   // Check if authorization header exists
//   if (typeof authHeader !== 'undefined') {
//     // Split the header into two parts: Bearer and the token
//     const tokenParts = authHeader.split(' ');
//     if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
//       // Extract and verify the token
//       const token = tokenParts[1];
//       jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
//         if (err) {
//           // Token is not valid
//           res.status(401).json({ error: 'Unauthorized' });
//         } else {
//           // Token is valid, set the decoded token in the request object
//           req.decodedToken = decodedToken;
//           next(); // Proceed to the next middleware
//         }
//       });
//     } else {
//       // Invalid authorization header format
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//   } else {
//     // Authorization header is missing
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// }

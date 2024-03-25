const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    console.log(decoded.foo);
    // verify a token asymmetric
    // var cert = fs.readFileSync('public.pem');  // get public key
    // jwt.verify(token, cert, function(err, decoded) {
    //   console.log(decoded.foo) // bar
    // });

    // // verify audience
    // var cert = fs.readFileSync('public.pem');  // get public key
    // jwt.verify(token, cert, { audience: 'urn:foo' }, function(err, decoded) {
    //   // if audience mismatch, err == invalid audience
    // });

    // // verify issuer
    // var cert = fs.readFileSync('public.pem');  // get public key
    // jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer' }, function(err, decoded) {
    //   // if issuer mismatch, err == invalid issuer
    // });

    // // verify jwt id
    // var cert = fs.readFileSync('public.pem');  // get public key
    // jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid' }, function(err, decoded) {
    //   // if jwt id mismatch, err == invalid jwt id
    // });

    // // verify subject
    // var cert = fs.readFileSync('public.pem');  // get public key
    // jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid', subject: 'subject' }, function(err, decoded) {
    //   // if subject mismatch, err == invalid subject
    // });

    // // alg mismatch
    // var cert = fs.readFileSync('public.pem'); // get public key
    // jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, payload) {
    //   // if token alg != RS256,  err == invalid signature
    // });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;

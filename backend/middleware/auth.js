import jwt from "jsonwebtoken";

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    // if there is no token
    return res
      .status(400)
      .send({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWTPRIVATEKEY, (error, validToken) => {
    /// verify token
    if (error) {
      return res.status(400).send({ message: "Invalid token." }); // if token is invalid
    } else {
      // if token is valid
      req.user = validToken;
      next();
    }
  });
};

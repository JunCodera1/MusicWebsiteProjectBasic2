import jwt from "jsonwebtoken";

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(400)
      .send({ message: "Access denied. No token provided." }); // if there is no token
  }

  jwt.verify(token, process.env.JWTPRIVATEKEY, (error, validToken) => {
    /// verify token
    if (error) {
      return res.status(400).send({ message: "Invalid token." });
    } else {
      if (!validToken.isAdmin) {
        // if user is not admin
        return res
          .status(403)
          .send({ message: "You don't have access this content." });
      }
      req.user = validToken; // if user is admin
      next();
    }
  });
};

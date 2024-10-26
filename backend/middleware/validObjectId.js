import mongoose from "mongoose";

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    // if id is not valid
    return res.status(404).send({ message: "Invalid ID." });
  }
  next(); // if id is valid
};

import router from "express";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "Invalid email or password" });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send({ message: "Invalid email or password" });
  }
  const token = user.generateAuthToken();
  res.status(200).send({ data: token, message: "Logged in successfully" });
});

export default router;

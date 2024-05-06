const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
  });
  await user.save();
  // console.log(user);
  res.json({ message: "User registered successfully" });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    { userId: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48 },
    "secretkey"
  );
  // console.log(token);
  res.json({ token });
};

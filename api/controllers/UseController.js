const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSingUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(400).json("Email alredy exist");
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedpassword,
      email,
    });
    await newUser.save();
    res.status(201).json({ meaasge: "User registerd successfuly " });
  } catch (error) {
    res.status(500).json({ error: "Internal sewrver error" });
    console.log("error form UserSingUp", error);
  }
};

const userSingIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const comparPassword = await bcrypt.compare(password, user.password);
    if (!user || !comparPassword) {
      return res.status(401).json({ error: "Invalid Username or passeword " });
    }
    const token = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("error form UserSingIn", error);
  }
};

module.exports = { userSingIn, userSingUp };

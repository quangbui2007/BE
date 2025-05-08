const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
require('dotenv').config()

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: "60m" }
    );

    const refreshToken = jwt.sign(
      { id: checkUser._id },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, { httpOnly: true, secure: false })
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: false })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          userName: checkUser.userName,
        },
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  res.clearCookie("token").clearCookie("refreshToken").json({
    success: true,
    message: "Logged out successfully!",
  });
};

const refreshTokenHandler = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res
      .status(401)
      .json({ success: false, message: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    const checkUser = await User.findOne({ _id: decoded.id });
    if (!checkUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const newAccessToken = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: "60m" }
    );

    res
      .cookie("token", newAccessToken, { httpOnly: true, secure: false })
      .json({
        success: true,
        message: "Access token refreshed",
      });
  } catch (err) {
    res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions!",
      });
    }
    next();
  };
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  checkRole,
  refreshTokenHandler,
};

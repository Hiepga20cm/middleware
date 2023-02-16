const User = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const encodedToken = (userID) => {
  return JWT.sign(
    {
      iss: "Hiep Nguyen",
      sub: userID,
    },
    "JWT_SECRET",
    {
      expiresIn: "10s",
    }
  );
};

const createRefreshToken = (data) => {
  const access_token = JWT.sign({ data }, "REFRESH_TOKEN", {
    expiresIn: "10m",
  });
  return access_token;
};

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (refreshToken) {
      JWT.verify(refreshToken, "REFRESH_TOKEN", function (err, user) {
        if (err) {
          return res.status(404).json({
            message: "The user is not authentication",
          });
        }
        if (user) {
          const newAccessToken = encodedToken(user.data);
          return res.json({
            status: "OK",
            access_token: newAccessToken,
            user: user.data,
          });
        } else {
          return res.json({
            message: "The user is not authentication",
          });
        }
      });
    } else {
      return res.json({
        message: "The refreshToken is not valid",
      });
    }
  } catch (err) {
    return res.json({
      status: "err",
      message: err,
    });
  }
};

const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "tài khoản hoặc mật khẩu không chính xác",
      });
    } else {
      const isCorrectPassword = await user.isValidPassword(req.body.password);

      if (!isCorrectPassword) {
        return res
          .status(404)
          .json({ success: false, message: "mật khẩu không chính xác" });
      } else {
        const token = encodedToken(user._id);
        const refreshToken = createRefreshToken(user._id);
        return res.status(200).json({
          success: true,
          token,
          refreshToken,
          User: user._id,
          message: "Đăng nhập thành công",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Tài khoản hoặc mật khẩu không đúng" });
  }
};

const signUp = async (req, res, next) => {
  try {
    console.log("aasd");
    console.log(req.body);
    const { email, password } = req.body;
    const foundUser = await User.find({ email: email });
    console.log("asdhaha");
    if (foundUser.length > 0) {
      return res
        .status(403)
        .json({ success: false, message: "Email is already in use." });
    } else {
      const newUser = new User({ email, password });

      newUser.save();

      // Encode a token
      const token = encodedToken(newUser._id);
      return res.status(201).json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
  }

  // Create a new user
};
const success = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, message: " Thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: " Thaats baij" });
  }
};
const logout = async (req, res, next) => {
  console.log("a");
};
module.exports = {
  signIn,
  refreshToken,
  signUp,
  success,
  logout,
};

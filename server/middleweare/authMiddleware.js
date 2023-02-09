const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(404).json({
      message: "Token is valid",
    });
  }
  try {
    const decode = jwt.verify(token, "JWT_SECRET");
    console.log(decode);
    next();
  } catch (error) {
    console.log(error);

    return res.status(500);
  }
  // jwt.verify(token, "JWT_SECRET", function (err, user) {
  //   if (err) {
  //     return res.status(404).json({
  //       message: "The user is not authentication1",
  //     });
  //   }
  //   if (user) {
  //     console.log(user);
  //     console.log(user.exp);
  //     console.log(new Date().getTime());
  //     if (new Date().getTime() <= user.exp * 1000) {
  //       next();
  //     } else {
  //       return res.status(404).json({
  //         message: "The user is not authentication1",
  //       });
  //     }
  //   } else {
  //     return res.status(404).json({
  //       message: "The user is not authentication",
  //     });
  //   }
  // });
};
module.exports = authMiddleware;

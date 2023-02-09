const express = require("express");
const route = require("express-promise-router")();
const Controller = require("../controllers/auth");
const authMiddleware = require("../middleweare/authMiddleware");

route.route("/login").post(Controller.signIn);
route.route("/signUp").post(Controller.signUp);
route.route("/refreshToken").post(Controller.refreshToken);
route.route("/success").get(authMiddleware, Controller.success);
module.exports = route;

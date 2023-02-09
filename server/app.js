const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const mongoClient = require("mongoose");
const cors = require("cors");
const auth = require("./routes/auth");
// setup connect mongodb by mongoose
mongoClient.set("strictQuery", false);
mongoClient
  .connect("mongodb://127.0.0.1:27017/quanlyphiendangnhap", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected database from mongodb."))
  .catch((error) =>
    console.error(`❌ Connect database is failed with error which is ${error}`)
  );

const app = express();

// Middlewares

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", auth);
// Routes
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Server is OK!",
  });
});

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // response to client
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
const port = app.get("port") || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug");
const cors = require("cors");
const csurf = require("csurf");
const bcrypt = require("bcryptjs");
const { isProduction } = require("./config/keys");
require("./models/User");
require("./models/Attend");
require("./config/passport");
const passport = require("passport");
const openStreetsRouter = require("./routes/api/openStreets");
const usersRouter = require("./routes/api/users");
const csrfRouter = require("./routes/api/csrf");
const eventRouter = require("./routes/api/event");
const attendRouter = require('./routes/api/attend')
const commentRouter = require("./routes/api/comment");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// Security Middleware
if (!isProduction) {
  // Enable CORS only in development because React will be on the React
  // development server (http://localhost:3000). (In production, React files
  // will be served statically on the Express server.)
  app.use(cors());
}

// Set the _csrf token and create req.csrfToken method to generate a hashed
// CSRF token
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// Attach Express routers
app.use("/api/users", usersRouter);
app.use("/api/csrf", csrfRouter);
app.use("/api/openStreets", openStreetsRouter);
app.use("/api/events", eventRouter);
app.use("/api/attend", attendRouter)
app.use("/api/comments", commentRouter);

app.get(/^(?!\/?api).*/, (req, res) => {
  res.cookie("CSRF-TOKEN", req.csrfToken());
  res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
});

if (isProduction) {
  // console.log("is production running!")
  const path = require("path");
  // Serve the frontend's index.html file at the root route
  app.get("/", (req, res) => {
    res.cookie("CSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });

  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("CSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug("backend:error");

// Express custom error handler that will be called whenever a route handler or
// middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors,
  });
});

// console.log(app.routes)

module.exports = app;

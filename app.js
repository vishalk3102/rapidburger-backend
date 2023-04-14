const express = require("express");
const dotenv = require("dotenv");
const connectPassport = require("./utils/Provider");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });
const app = express();

// USING MIDDLEWARES
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

// ROUTES IMPORTS
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
app.use("/api/v1", user);
app.use("/api/v1", order);

connectPassport();

// USING ERROR MIDDLEWARE
app.use(errorMiddleware);

module.exports = app;

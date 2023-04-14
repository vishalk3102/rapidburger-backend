const express = require("express");
const passport = require("passport");
const {
  myProfile,
  logout,
  getAdminUsers,
  getAdminStats,
} = require("../controllers/userController");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// router.get(
//   "/login",
//   passport.authenticate("google", {
//     scope: ["profile"],
//     successRedirect: process.env.FRONTEND_URL,
//   })
// );

router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
  }),
  (req, res, next) => {
    res.send("logged in");
  }
);

router.get("/me", isAuthenticated, myProfile);
router.get("/logout", logout);

// ADMIN ROUTES
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);
router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);

module.exports = router;

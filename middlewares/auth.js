const ErrorHandler = require("../utils/ErrorHandler");

exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies["connect.sid"];
  // console.log(token);
  if (!token) {
    return next(new ErrorHandler("Not Logged In", 401));
  }
  next();
};

exports.authorizeAdmin = (req, res, next) => {
  const token = req.cookies["connect.sid"];
  // console.log(token);
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only Admin Allowed", 405));
  }
  next();
};

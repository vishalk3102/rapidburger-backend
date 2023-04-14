const express = require("express");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");
const {
  placeOrder,
  getMyOrders,
  getOrderDetails,
  getAdminOrders,
  processOrder,
  placeOrderOnline,
  paymentVerification,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/createorder", isAuthenticated, placeOrder);

router.post("/createOrderOnline", isAuthenticated, placeOrderOnline);
router.post("/paymentVerification", isAuthenticated, paymentVerification);

router.get("/myorders", isAuthenticated, getMyOrders);
router.get("/order/:id", isAuthenticated, getOrderDetails);

// ADD ADMIN MIDDLEWARE
router.get("/admin/orders", isAuthenticated, authorizeAdmin, getAdminOrders);
router.get("/admin/order/:id", isAuthenticated, authorizeAdmin, processOrder);

module.exports = router;

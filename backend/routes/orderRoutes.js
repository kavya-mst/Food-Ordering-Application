const express = require("express");

const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");


const {

createOrder,
getOrders,
getOrderById,
updateStatus,
patchOrder,
cancelOrder,
deleteOrder

} = require("../controllers/orderController");



router.use(authMiddleware);



router.post("/", createOrder);


router.get("/", getOrders);


router.get("/:id", getOrderById);


router.put("/:id", updateStatus);


router.patch("/:id", patchOrder);


router.put("/:id/cancel", cancelOrder);


router.delete("/:id", deleteOrder);



module.exports = router;
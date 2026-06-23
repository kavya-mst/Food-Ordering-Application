const express = require("express");

const router = express.Router();


const adminMiddleware = require("../middleware/adminMiddleware");

const authMiddleware = require("../middleware/authMiddleware");



const {
 createFood,
 getFoods,
 getFoodById,
 updateFood,
 patchFood,
 deleteFood

} = require("../controllers/foodController");



// login required

router.use(authMiddleware);



// user + admin dono

router.get("/", getFoods);

router.get("/:id", getFoodById);



// admin only

router.post(
"/",
adminMiddleware,
createFood
);


router.put(
"/:id",
adminMiddleware,
updateFood
);


router.patch(
"/:id",
adminMiddleware,
patchFood
);


router.delete(
"/:id",
adminMiddleware,
deleteFood
);



module.exports = router;
const express = require("express");

const router = express.Router();


const {
register,
login,
getProfile,
updateSettings,
deleteAccount
}=require("../controllers/authController");


const authMiddleware = require("../middleware/authMiddleware");



router.post("/register",register);


router.post("/login",login);



// PROFILE

router.get(
"/profile",
authMiddleware,
getProfile
);



// SETTINGS

router.put(
"/settings",
authMiddleware,
updateSettings
);



// DELETE ACCOUNT

router.delete(
"/delete-account",
authMiddleware,
deleteAccount
);



module.exports = router;
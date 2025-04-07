const express = require("express");
const userController = require("../controllers/UseController");

const router = express.Router();

router.post("/user-singup", userController.userSingUp);
router.post("/user-singin", userController.userSingIn);

module.exports = router;

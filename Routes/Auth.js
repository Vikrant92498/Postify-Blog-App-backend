const router = require("express").Router();
const authControllers = require('../controllers/authControllers')

//REGISTER
router.post("/register",authControllers.userRegister);
router.post("/login", authControllers.userLogin);
module.exports = router;

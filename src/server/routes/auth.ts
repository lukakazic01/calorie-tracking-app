import express from "express";
const router = express.Router();
const authController = require('../controllers/auth');
const userSchema = require('../models/validation/userSchema')
const validatePayload = require('../middlewares/validateSchema')

router.post('/register', validatePayload(userSchema), authController.register)
router.post('/login', authController.login)
router.post('/verifyToken', authController.verifyToken)


module.exports = router;
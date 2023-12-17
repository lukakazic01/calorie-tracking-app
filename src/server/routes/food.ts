import express from "express";
const router = express.Router();
const validateJwt = require('../middlewares/auth')
const foodController = require('../controllers/food')

router.get('/getFood', validateJwt, foodController.getFood)

module.exports = router
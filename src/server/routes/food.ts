import express from "express";
const router = express.Router();
const validateJwt = require('../middlewares/auth')
const foodController = require('../controllers/food')

router.get('/getFoodEntries', validateJwt, foodController.getFood)
router.post('/addFoodEntry', foodController.addFoodEntry);
router.delete('/deleteFoodEntry', foodController.deleteFoodEntry)

module.exports = router
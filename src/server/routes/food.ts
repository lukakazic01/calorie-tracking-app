import express from "express";
const router = express.Router();
const validateJwt = require('../middlewares/auth')
const foodController = require('../controllers/food')

router.get('/getFoodEntries', validateJwt, foodController.getFood)
router.post('/addFoodEntry', validateJwt, foodController.addFoodEntry);
router.delete('/deleteFoodEntry', validateJwt, foodController.deleteFoodEntry)
router.put('/updateFoodEntry', validateJwt, foodController.updateFoodEntry)
router.get('/caloriesByDay', validateJwt, foodController.caloriesByDay)
router.get('/weeklyFood', validateJwt, foodController.weeklyFoodCount)
router.get('/averageCalories', validateJwt, foodController.averageCalories)

module.exports = router
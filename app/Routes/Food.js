const express = require('express');
const router = express.Router();
const foodRouter = require('../ApiCalls/foodRouter');


// POST
router.route('/deleteFood').post(foodRouter.deleteFood);
router.route('/addLocationToChain').post(foodRouter.addLocationToChain);
router.route('/addRestaurant').post(foodRouter.addRestaurant);
router.route('/removeLocationChain').post(foodRouter.removeLocationChain);
router.route('/removeRestaurant').post(foodRouter.removeRestaurant);




// GET
router.route('/listOfFood').get(foodRouter.listOfFood)
router.route('/detailsOfFood/:idfood').get(foodRouter.foodDetailsById)
router.route('/selectNearest').get(foodRouter.selectNearest)

module.exports = router;
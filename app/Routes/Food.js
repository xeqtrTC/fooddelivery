const express = require('express');
const router = express.Router();
const foodRouter = require('../ApiCalls/foodRouter');
const upload = require('../multer/multer');


// POST
router.route('/deleteFood').post(foodRouter.deleteFood);
router.route('/addRestaurant').post(foodRouter.addRestaurant);
router.route('/removeRestaurant').post(foodRouter.removeRestaurant);
router.route('/orderFood').post(foodRouter.orderFood);
router.route('/addReview').post(foodRouter.addReview);
router.route('/addComments').post(foodRouter.addComments)
router.route('/addfood').post(upload.single('image'), foodRouter.addFood)


// GET

router.route('/listOfFood').get(foodRouter.listOfFood)
router.route('/detailsOfFood/:idfood').get(foodRouter.foodDetailsById)


module.exports = router;
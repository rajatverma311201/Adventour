const express = require('express');
const router = express.Router();
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

router.use(authController.isLoggedIn);

router.get(
    '/',
    bookingController.createBookingCheckout,
    viewController.overview
);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.getLoginForm);
// router.get('/tour', viewController.getTour);
router.get('/me', authController.protect, viewController.getMyAccountPage);
router.post('/me', authController.protect, viewController.updateUser);
router.get('/my-bookings', authController.protect, viewController.getMyTours);
module.exports = router;

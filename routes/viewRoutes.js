const express = require('express');
const router = express.Router();
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

router.use(authController.isLoggedIn);

router.get('/', viewController.overview);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.getLoginForm);
// router.get('/tour', viewController.getTour);

module.exports = router;

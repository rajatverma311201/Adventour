const router = require('express').Router();
const authController = require('./../controllers/authController');

router.post('/provider', authController.providerAuth);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/analytics');

router.get('/overview', controller.overview);
router.get('/register', controller.analytics);

module.exports = router;

const { Router } = require('express');
const userRoutes = require('./controllers/user');
const rules = require('./validators');

const router = new Router();

router.post('/users/register', rules('register'), userRoutes.register);
router.post('/auth/login', rules('login'), userRoutes.login);

module.exports = router;

const Router = require('express').Router;
const userController = require('./../controllers/user-controller')
const router = new Router();

router.post('/register', userController.registration);
router.post('/authenticate', userController.authentication);
router.get('/users', userController.getUser);
router.patch('/users/:id/boss', userController.changeBoss);

module.exports = router;
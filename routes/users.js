const router = require('express').Router();
const { Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const { getAboutUser, updateUser } = require('../controllers/users');
const { validationUpdateUser } = require('../middlewares/validation');

router.get('/me', getAboutUser);
router.patch('/me', validationUpdateUser(), updateUser);

module.exports = router;

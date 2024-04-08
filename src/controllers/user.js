/* eslint-disable no-underscore-dangle */
const { omit, isEmpty } = require('lodash');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Auth = require('../models/auth');
const { errorResponse, successResponse } = require('../utils/responses');
const { logger } = require('../../config');
const { generateToken } = require('../utils/helpers');

exports.register = async (req, res) => {
  try {
    const authProfile = await Auth.findOne({ identifier: req.body.email }).lean();
    if (!isEmpty(authProfile)) {
      return errorResponse(res, 400, 'USER_ALREADY_EXISTS', 'User already exists, Please login');
    }
    const auth = await Auth.create({
      identifier: req.body.email,
      password: req.body.password,
    });
    const user = await User.create(omit(req.body, ['password']));
    auth.user = user._id;
    await auth.save();
    logger.info(`Users: -> ${req.body.email} created successfully.`);
    return successResponse(res, 201, user, 'Registration successful');
  } catch (error) {
    logger.error(error);
    return errorResponse(res, 500, error, 'An error occurred while registering user');
  }
};

exports.login = async (req, res) => {
  try {
    const authProfile = await Auth.findOne({ identifier: req.body.identifier }).lean();
    if (isEmpty(authProfile)) {
      return errorResponse(res, 401, 'USER_NOT_EXISTS', 'Account details supplied is incorrect, please check and try again');
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      authProfile.password,
    );
    if (!checkPassword) {
      return errorResponse(res, 401, 'INVALID_PASSWORD', 'Account details supplied is incorrect, please check and try again');
    }
    const user = await User.findById(authProfile.user).lean();
    const token = generateToken(user);
    logger.info(`User ${req.body.identifier} signed in successfully.`);
    return successResponse(res, 201, { user, token }, 'Login successful');
  } catch (error) {
    logger.error(error);
    return errorResponse(res, 500, error, 'An error occurred while registering user');
  }
};

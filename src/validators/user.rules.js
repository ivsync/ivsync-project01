const Joi = require('joi');
const { GENDER, USER_ROLES } = require('../utils/constants');

const requiredString = Joi.string().required();
const mongoID = Joi.string().regex(/^[a-fA-F0-9]{24}$/);
const keys = (object) => Joi.object().keys(object);

exports.register = keys({
  first_name: requiredString
    .max(60)
    .description("User's first name (60 characters max)"),
  last_name: requiredString
    .max(60)
    .description("User's last name (60 characters max)"),
  password: requiredString
    .min(8)
    .max(50)
    .description("User's password (8 min, 50 characters max)"),
  email: Joi.string().email().max(50).description("User's valid email address"),
  role: Joi.string()
    .default('STAFF')
    .description('The role of the user to created'),
  // We need to make this required later on, as we need to know the organization the user belongs to
  organization: mongoID.description('The organization/ hospital the user belongs to'),
});

exports.updateUser = keys({
  first_name: Joi.string()
    .max(60)
    .description("User's first name (60 characters max)"),
  last_name: Joi.string()
    .max(60)
    .description("User's last name (60 characters max)"),
  email: Joi.string().email().max(60).description("User's valid email address"),
  profile_img: Joi.string(),
  country: Joi.string(),
  date_of_birth: Joi.date().iso().max('now'),
  gender: Joi.string().valid(...GENDER),
});

exports.updateSettings = keys({
  sms_communication: Joi.boolean(),
  email_communication: Joi.boolean(),
  promotion_offers: Joi.boolean(),
  phone_communication: Joi.boolean(),
});

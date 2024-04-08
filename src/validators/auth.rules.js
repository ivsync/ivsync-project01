const Joi = require('joi');

const requiredString = Joi.string().required();
const requiredNumber = Joi.string().required();
const mongoID = Joi.string().regex(/^[a-fA-F0-9]{24}$/);
const keys = (object) => Joi.object().keys(object);

exports.login = keys({
  identifier: requiredString
    .min(7)
    .max(50)
    .description("User's valid email address or phone number"),
  password: requiredString
    .min(8)
    .max(50)
    .description("User's password (8 min, 50 characters max)"),
});

exports.activate = keys({
  identifier: requiredString
    .min(7)
    .max(50)
    .description("User's valid email address or phone number"),
});
exports.deactivate = keys({
  identifier: requiredString
    .min(7)
    .max(50)
    .description("User's valid email address or phone number"),
});

exports.changePassword = keys({
  new_password: requiredString
    .min(8)
    .max(50)
    .description("User's password (8 min, 50 characters max)"),
  old_password: requiredString
    .min(8)
    .max(50)
    .description("User's password (8 min, 50 characters max)"),
});

exports.comfirmResetPassword = keys({
  verification_code: requiredNumber.length(6),
  identifier: requiredString
    .min(7)
    .max(50)
    .description("User's valid email address or phone number"),
});

exports.resetPassword = keys({
  temp_token: requiredString.length(36),
  password: requiredString
    .min(8)
    .max(50)
    .description("User's password (8 min, 50 characters max)"),
});

const { Joi, celebrate } = require('celebrate');
const { LINK_PATTERN } = require('../../utils/constants');

module.exports.userIdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.userSignInValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

module.exports.userSignUpValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(LINK_PATTERN),
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

module.exports.userInfoValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.userAvatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(LINK_PATTERN).required(),
  }),
});

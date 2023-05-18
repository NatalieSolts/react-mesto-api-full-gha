const { Joi, celebrate } = require('celebrate');
const { LINK_PATTERN } = require('../../utils/constants');

module.exports.cardDataValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(LINK_PATTERN).required(),
  }),
});
module.exports.cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

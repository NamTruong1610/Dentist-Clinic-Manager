const { body } = require('express-validator');

exports.validateRegistrationRules = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Username must be at least 3 characters long'),

  body('email').isEmail().normalizeEmail().withMessage('Invalid Mail Format'),

  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];


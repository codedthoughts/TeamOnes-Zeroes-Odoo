const { body } = require('express-validator');

exports.askQuestionValidator = [
    body('title')
        .notEmpty().withMessage('Title is required.')
        .isLength({ min: 10, max: 150 }).withMessage('Title must be between 10 and 150 characters.'),
    body('content')
        .notEmpty().withMessage('Content body is required.')
        .isLength({ min: 20 }).withMessage('Content must be at least 20 characters long.'),
    body('tags')
        .isArray({ min: 1, max: 5 }).withMessage('You must provide between 1 and 5 tags.')
        .custom((tags) => {
            if (tags.some(tag => tag.length > 20)) {
                throw new Error('Tags cannot be longer than 20 characters.');
            }
            return true;
        })
];

exports.postAnswerValidator = [
    body('content')
        .notEmpty().withMessage('Answer content cannot be empty.')
        .isLength({ min: 10 }).withMessage('Answer must be at least 10 characters long.')
];
const express = require('express');
const router = express.Router();
const {
    getQuestions,
    getQuestionById,
    askQuestion,
    updateQuestion,
    deleteQuestion  
} = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');
const { askQuestionValidator } = require('../validators/questionValidators');
const validateRequest = require('../middleware/validateRequest');

// Routes for '/api/questions'
router.route('/')
    .get(getQuestions)
    .post(protect, askQuestionValidator, validateRequest, askQuestion);

// Routes for '/api/questions/:id'
router.route('/:id')
    .get(getQuestionById)
    .put(protect, updateQuestion)   
    .delete(protect, deleteQuestion); 

module.exports = router;
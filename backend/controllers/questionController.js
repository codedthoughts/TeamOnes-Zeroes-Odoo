const Question = require('../models/Question');
const Answer = require('../models/Answer');
const asyncHandler = require('../utils/asyncHandler');


exports.askQuestion = asyncHandler(async (req, res) => {
    const { title, content, tags } = req.body;
    
    const question = await Question.create({
        title,
        content,
        tags: tags.map(tag => tag.toLowerCase()),
        author: req.user.id
    });

    res.status(201).json(question);
});


exports.getQuestions = asyncHandler(async (req, res) => {
    const { tag, sort, search } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (tag) query.tags = tag;
    if (sort === 'unanswered') query.answers = { $size: 0 };
    if (search) query.$text = { $search: search };
    
    if (!req.user || req.user.role !== 'admin') {
        query.status = 'approved';
    }

    const questions = await Question.find(query)
        .populate('author', 'username')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);
    
    const totalQuestions = await Question.countDocuments(query);

    res.json({
        questions,
        currentPage: page,
        totalPages: Math.ceil(totalQuestions / limit),
        totalQuestions
    });
});


exports.getQuestionById = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id)
        .populate('author', 'username')
        .populate({
            path: 'answers',
            populate: { path: 'author', select: 'username' },
            options: { sort: { 'upvotes': -1, 'createdAt': -1 } } // Sort answers by votes, then date
        });

    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }

    res.json(question);
});

exports.deleteQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);

    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }

    // Check if user is the author or an admin
    if (question.author.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(403); // Forbidden
        throw new Error('User not authorized to delete this question');
    }
    
    await Answer.deleteMany({ question: req.params.id });

    await question.deleteOne();

    res.json({ success: true, message: 'Question and associated answers removed' });
});


exports.updateQuestion = asyncHandler(async (req, res) => {
    let question = await Question.findById(req.params.id);
    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }

    if (question.author.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User not authorized to update this question');
    }

    const { title, content, tags } = req.body;
    question.title = title || question.title;
    question.content = content || question.content;
    if(tags) {
        question.tags = tags.map(tag => tag.toLowerCase());
    }
    
    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
});
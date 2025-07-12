const Answer = require('../models/Answer');
const Question =require('../models/Question');
const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');

exports.postAnswer = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { questionId } = req.params;

    const question = await Question.findById(questionId);
    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }

    const answer = await Answer.create({
        content,
        author: req.user.id,
        question: questionId,
    });

    // Add answer reference to the question
    question.answers.push(answer._id);
    await question.save();

    // Create and emit a real-time notification
    if (question.author.toString() !== req.user.id) {
        const notification = await Notification.create({
            recipient: question.author,
            sender: req.user.id,
            type: 'NEW_ANSWER',
            message: `${req.user.username} answered your question: "${question.title.substring(0, 30)}..."`,
            link: `/questions/${question.id}`,
        });
    
        const io = req.app.get('socketio');
        const recipientId = question.author.toString();
        io.to(recipientId).emit('new_notification', notification);
        
        console.log(`Emitting 'new_notification' to room: ${recipientId}`);
    }

    const populatedAnswer = await Answer.findById(answer.id).populate('author', 'username');
    res.status(201).json(populatedAnswer);
});


exports.voteAnswer = asyncHandler(async (req, res) => {
    const { answerId } = req.params;
    const { voteType } = req.body; // 'upvote' or 'downvote'
    const userId = req.user.id;

    const answer = await Answer.findById(answerId);
    if (!answer) {
        res.status(404);
        throw new Error('Answer not found');
    }

    const upvoteIndex = answer.upvotes.indexOf(userId);
    const downvoteIndex = answer.downvotes.indexOf(userId);

    if (voteType === 'upvote') {
        // If user has downvoted, remove the downvote
        if (downvoteIndex !== -1) {
            answer.downvotes.splice(downvoteIndex, 1);
        }
        // If user has already upvoted, remove the upvote (toggle off)
        if (upvoteIndex !== -1) {
            answer.upvotes.splice(upvoteIndex, 1);
        } else {
            // Otherwise, add the upvote
            answer.upvotes.push(userId);
        }
    } else if (voteType === 'downvote') {
        // If user has upvoted, remove the upvote
        if (upvoteIndex !== -1) {
            answer.upvotes.splice(upvoteIndex, 1);
        }
        // If user has already downvoted, remove the downvote (toggle off)
        if (downvoteIndex !== -1) {
            answer.downvotes.splice(downvoteIndex, 1);
        } else {
            // Otherwise, add the downvote
            answer.downvotes.push(userId);
        }
    } else {
        res.status(400);
        throw new Error('Invalid vote type');
    }
    
    await answer.save();
    res.json(answer);
});

exports.acceptAnswer = asyncHandler(async (req, res) => {
    const { questionId, answerId } = req.params;

    const question = await Question.findById(questionId);
    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }

    if (question.author.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to accept an answer for this question');
    }
    
    const answer = await Answer.findById(answerId);
    if (!answer || answer.question.toString() !== questionId) {
        res.status(404);
        throw new Error('Answer not found or does not belong to this question');
    }

    question.acceptedAnswer = answerId;
    await question.save();

    res.json({ message: 'Answer accepted successfully', acceptedAnswerId: answerId });
});


exports.deleteAnswer = asyncHandler(async (req, res) => {
    const answer = await Answer.findById(req.params.answerId);
    if (!answer) {
        res.status(404);
        throw new Error('Answer not found');
    }

    if (answer.author.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('User not authorized to delete this answer');
    }

    await Question.updateOne({ _id: answer.question }, { $pull: { answers: answer._id } });

    await answer.deleteOne();

    res.json({ success: true, message: 'Answer removed' });
});
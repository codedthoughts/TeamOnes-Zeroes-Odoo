const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    tags: [{ type: String, lowercase: true, index: true }], // Added index for tag-based filtering
    status: { type: String, enum: ['pending_approval', 'approved', 'rejected'], default: 'approved' }, // For admin moderation
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer', default: null },
    // Add full-text search index for better searching
}, { timestamps: true });

// Creates a text index for full-text search on title and content
QuestionSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Question', QuestionSchema);
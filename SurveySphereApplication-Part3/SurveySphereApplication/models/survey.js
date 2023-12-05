const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: String,
    responseType: { 
        type: String, 
        enum: ['text', 'multipleChoice', 'checkbox', 'rating', 'dropdown', 'yesNo', 'dateTime'], 
        default: 'text' 
    },
    options: [String], // Used for multipleChoice, checkbox, and dropdown
    scale: Number, // Used for rating
});

const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questions: [questionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Survey', surveySchema);

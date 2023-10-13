const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    subject: String,
    body: String,
});

module.exports = mongoose.model("Feedback", feedbackSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chefreviewSchema = new Schema({
    body: String,
    rating: Number
});

module.exports = mongoose.model("Chefreview", chefreviewSchema);
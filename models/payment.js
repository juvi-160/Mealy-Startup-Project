const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    PaymentDate: Number,
    Amount: Number,
    PaymentMethod : String,
    feedback: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ]

});

module.exports = mongoose.model("Payment", paymentSchema);
const express = require('express');
const router = express.Router({ mergeParams: true });

const Payment = require('../models/payment');
const Feedback = require('../models/feedback');

const { feedbackSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');



const validateFeedback = (req, res, next) => {
    const { error } = feedbackSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


router.post('/', validateFeedback, catchAsync(async (req, res) => {
    const payment = await Payment.findById(req.params.id);
    const feedback = new Feedback(req.body.review);
    Payment.feedback.push(feedback);
    await feedback.save();
    await payment.save();
    req.flash('success', 'Created new feedback!');
    res.redirect(`/payment/${payment._id}`)
}))


module.exports = router;
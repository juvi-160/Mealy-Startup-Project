const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validatePayment } = require('../middleware');

const Payment = require('../models/payment');

router.get('/payments', catchAsync(async (req, res) => {
    const payment = await payment.find({});
    res.render('payment/index', { payment })
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('payment/new');
})


router.post('/', isLoggedIn, validatePayment, catchAsync(async (req, res, next) => {
    const payment = new Payment(req.body.meals);
    meals.author = req.user._id;
    await payment.save();
    req.flash('success', 'Successfully made a new Meal!');
    res.redirect(`/payment/${payment._id}`)
}))

router.get('/:id', catchAsync(async (req, res,) => {
    const payment = await Payment.findById(req.params.id).populate({
        path: 'feedback',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(payment);
    if (!payment) {
        req.flash('error', 'Payment Not Done!');
        return res.redirect('/payment');
    }
    res.render('payment/show', { meals });
}));



module.exports = router;
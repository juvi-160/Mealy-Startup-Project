const express = require('express');
const router = express.Router({ mergeParams: true });

const Recipies = require('../models/recipies');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


router.post('/', validateReview, catchAsync(async (req, res) => {
    const recipies = await Recipies.findById(req.params.id);
    const review = new Review(req.body.review);
    Recipies.reviews.push(review);
    await review.save();
    await recipies.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/recipies/${recipies._id}`)
}))


module.exports = router;
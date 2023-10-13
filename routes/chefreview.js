const express = require('express');
const router = express.Router({ mergeParams: true });

const Chef = require('../models/chef');
const Chefreview = require('../models/chefreview');

const { chefreviewSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


const validateChefreview = (req, res, next) => {
    const { error } = chefreviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


router.post('/chef', validateChefreview, catchAsync(async (req, res) => {
    const chef = await Chef.findById(req.params.id);
    const chefreview = new Chefreview(req.body.review);
    Chef.chefreviews.push(review);
    await chefreview.save();
    await chef.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/chef/${chef._id}`)
}))


module.exports = router;
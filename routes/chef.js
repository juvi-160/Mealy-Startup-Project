const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateChef } = require('../middleware');

const Chef = require('../models/chef');

router.get('/chef', catchAsync(async (req, res) => {
    const chef = await Chef.find({});
    res.render('meals/chef', { chef })
}));

router.get('/chef_new', isLoggedIn, (req, res) => {
    res.render('chef/new');
})


router.post('/', isLoggedIn, validateChef, catchAsync(async (req, res, next) => {
    const chef = new Chef(req.body.meals);
    chef.author = req.user._id;
    await chef.save();
    req.flash('success', 'Successfully added a Chef!');
    res.redirect(`/chef/${chef._id}`)
}))

router.get('/:id', catchAsync(async (req, res,) => {
    const chef = await Chef.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(chef);
    if (!chef) {
        req.flash('error', 'Cannot find that chef!');
        return res.redirect('/chef');
    }
    res.render('chef/show', { meals });
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const chef = await Chef.findById(id)
    if (!chef) {
        req.flash('error', 'Cannot find that Chef!');
        return res.redirect('/chef');
    }
    res.render('chef/edit', { chef });
}))

router.put('/:id', isLoggedIn, isAuthor, validateChef, catchAsync(async (req, res) => {
    const { id } = req.params;
    const chef = await Chef.findByIdAndUpdate(id, { ...req.body.recipies });
    req.flash('success', 'Successfully updated Chef!');
    res.redirect(`/chef/${chef._id}`)
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Chef.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the Chef')
    res.redirect('/chef');
}));

module.exports = router;
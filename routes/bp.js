const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateRecipies } = require('../middleware');

const Recipies = require('../models/recipies');

router.get('/', catchAsync(async (req, res) => {
    const recipies = await Recipies.find({});
    res.render('recipies/index', { recipies })
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('recipies/new');
})


router.post('/', isLoggedIn, validateRecipies, catchAsync(async (req, res, next) => {
    const recipies = new Recipies(req.body.recipies);
    recipies.author = req.user._id;
    await recipies.save();
    req.flash('success', 'Successfully made a new recipie!');
    res.redirect(`/recipies/${recipies._id}`)
}))

router.get('/:id', catchAsync(async (req, res,) => {
    const recipies = await Recipies.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(recipies);
    if (!recipies) {
        req.flash('error', 'Cannot find that recipies!');
        return res.redirect('/recipies');
    }
    res.render('recipies/show', { recipies });
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipies = await Recipies.findById(id)
    if (!recipies) {
        req.flash('error', 'Cannot find that recipie!');
        return res.redirect('/recipies');
    }
    res.render('recipies/edit', { recipies });
}))

router.put('/:id', isLoggedIn, isAuthor, validateRecipies, catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipies = await Recipies.findByIdAndUpdate(id, { ...req.body.recipies });
    req.flash('success', 'Successfully updated recipie!');
    res.redirect(`/recipies/${recipies._id}`)
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Recipies.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted recipie')
    res.redirect('/recipies');
}));

module.exports = router;
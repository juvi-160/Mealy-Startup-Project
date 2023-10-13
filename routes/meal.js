const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateMeals } = require('../middleware');

const Meals = require('../models/meals');

router.get('/', catchAsync(async (req, res) => {
    const meals = await Meals.find({});
    res.render('meals/index', { meals })
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('meals/new');
})


router.post('/', isLoggedIn, validateMeals, catchAsync(async (req, res, next) => {
    const meals = new Meals(req.body.meals);
    meals.author = req.user._id;
    await recipies.save();
    req.flash('success', 'Successfully made a new Meal!');
    res.redirect(`/meals/${meals._id}`)
}))

router.get('/:id', catchAsync(async (req, res,) => {
    const meals = await Meals.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(meals);
    if (!meals) {
        req.flash('error', 'Cannot find that recipies!');
        return res.redirect('/meals');
    }
    res.render('meals/show', { meals });
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const meals = await Meals.findById(id)
    if (!meals) {
        req.flash('error', 'Cannot find that Meal!');
        return res.redirect('/meals');
    }
    res.render('recipies/edit', { recipies });
}))

router.put('/:id', isLoggedIn, isAuthor, validateRecipies, catchAsync(async (req, res) => {
    const { id } = req.params;
    const meals = await Meals.findByIdAndUpdate(id, { ...req.body.recipies });
    req.flash('success', 'Successfully updated Meal!');
    res.redirect(`/meals/${meals._id}`)
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Meals.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Meal')
    res.redirect('/meals');
}));

module.exports = router;
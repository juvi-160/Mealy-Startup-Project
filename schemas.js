const Joi = require('joi');
const { number } = require('joi');



//repicies 
module.exports.recipiesSchema = Joi.object({
    Recipies: Joi.object({
        recipieID: Joi.string().required(),
        restaurantID: Joi.string().required(),
        name: Joi.string().required(),
        ingerdients: Joi.string().required(),
        chefID: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

//review
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})

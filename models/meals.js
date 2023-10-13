const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

//meals
const mealsSchema = new Schema({
    recipieID: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    description: { type: String, required: true },

    chefName: { type: String, required: true, },
    ingerdients: { type: String, required: true },
    price: { type: String, required: true , unique: true },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

mealsSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Recipies', recipiesSchema);
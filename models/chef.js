const mongoose = require('mongoose');
const Chefrevieweview = require('./chefreview');
const Schema = mongoose.Schema;


const chefSchema = new Schema({
    chefID: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    specialties: { type: String, required: true },
    email: { type: String, required: true ,unique: true },
    address: { type: String, required: true},
    phoneNumber: { type: Number, required: true ,unique: true },
});



chefSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Chefreview.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Chef', chefSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    postID: { type: Number, required: true, unique: true},
    title: { type: String, required: true },
    content: { type: String, required: true },
    Date: { type: Number, required: true },
    //image
});

blogSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Blog', blogSchema);s
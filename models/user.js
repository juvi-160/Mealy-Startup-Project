const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {type: String,required: true,unique: true},
    password: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

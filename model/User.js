const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    backPoster: {
        type: String,
    },
    popularity: {
        type: Number,
    },
    title: {
        type: String,
        required: true
    },
    poster: {
        type: String,
    },
    overview: {
        type: String,
    },
    rating: {
        type: Number,
    },
    added_date: {
        type: Date,
        default: Date.now
    }
});
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    movie: [MovieSchema]
});


module.exports = User = mongoose.model('user', UserSchema);
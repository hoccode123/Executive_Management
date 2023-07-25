const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
})

module.exports = mongoose.model('gender', Schema);
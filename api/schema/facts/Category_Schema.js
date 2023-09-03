const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {type: String, require: true, unique: true},
    slug: {type: String, require: true, unique: true},

    products: Array, // [objectid, objectid, ...]

    type: {type: String, default: ''},
    desription: {type: String, default: ''},
    content: {type: String, default: ''},

    status: {type: Boolean, default: true},

    metaTitle: {type: String, default: ''}, // 10 - 70
    metaDescription: {type: String, default: ''}, // 160 - 300

    schemaStar: {type: Number, default: 5},
    trash:{type: Boolean, default: true},
    createDate: {type: Date, default: Date.now()},
    updateDate: {type: Date, default: null},

    createByID:{type: mongoose.Types.ObjectId, default: null},
    updateByID:{type: mongoose.Types.ObjectId, default: null},
})

module.exports = mongoose.model('category', Schema);
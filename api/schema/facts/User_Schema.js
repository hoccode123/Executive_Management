const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userCode: {type:String, default: null},
    fullName: {type: String, default: ''},
    email: {type: String, require: true, unique: true},
    phone: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    avatar: {type: String, default: ''},
    active: {type: Boolean, default: false},
    genderID:{type: mongoose.Types.ObjectId, default: null},
    createnew: {type: Boolean, default: true},
    trash:{type: Boolean, default: true},
    // department: Array, // [id, id, id, id, id, id],
    role: Array, // [value, value]
    createDate: {type: Date, default: Date.now()},
    updateDate: {type: Date, default: null},
    createByID:{type: mongoose.Types.ObjectId, default: null},
    updateByID:{type: mongoose.Types.ObjectId, default: null},
})

module.exports = mongoose.model('user', schema);

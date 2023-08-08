const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userCode:{type:String, default: null},
    fullName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    phone: {type: String, default: ''},
    avatar: {type: String, default: ''},
    active: {type: Boolean, default: false},
    genderID:{type: mongoose.Types.ObjectId, default: null},
    createnew: {type: Boolean, default: true},
    departmentID:{type: mongoose.Types.ObjectId, default: null},
    roleID: {type: mongoose.Types.ObjectId, default: null},
    createDate: {type: Date, default: Date.now()},
    updateDate: {type: Date, default: null},
    createByID:{type: mongoose.Types.ObjectId, default: null},
    updateByID:{type: mongoose.Types.ObjectId, default: null},
})

module.exports = mongoose.model('user', schema);

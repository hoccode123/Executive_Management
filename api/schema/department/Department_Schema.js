const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {type: String, require: true},
    code:{type: String, require: true, unique: true},
    avatar: {type: String, default: ''},
    parentID: {type: mongoose.Types.ObjectId, default: null},
    user: Array, // [id, id, id, id, id, id]
    trash: {type: Boolean, default: false},
    customerID: {type: mongoose.Types.ObjectId, default: null},
    date_created: {type: Date, default: Date.now()},
    date_updated: {type: Date, default: null}
})

module.exports = mongoose.model('department', departmentSchema);
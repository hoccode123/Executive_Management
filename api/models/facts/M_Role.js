const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    value: {type: String, require: true, unique: true},
    customerID: {type: mongoose.Types.ObjectId,  default: null},
})


module.exports = mongoose.model('role', roleSchema);
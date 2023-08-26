const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    name: {type: String, require: true, unique:true},
    customerID: {type: mongoose.Types.ObjectId, default: null},
    date_created: {type: Date, default: Date.now()},
    date_updated: {type: Date, default: null}
})

module.exports = mongoose.model('position', positionSchema);
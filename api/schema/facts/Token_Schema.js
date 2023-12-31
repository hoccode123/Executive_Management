const mongoose = require('mongoose');
const tokenSchema = new mongoose.Schema({
    token: {type: String, require: true, unique: true},
    userID: {type: mongoose.Types.ObjectId, default: null},
    status: {type: Boolean, default: true},
    date_created: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('token', tokenSchema);


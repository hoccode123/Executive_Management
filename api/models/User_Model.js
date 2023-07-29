
// Call Schema
const User_Schema = require('../schema/facts/User_Schema')

class User_Model{
    async getList(){
        return await User_Schema.find().exec()
    }

    async create(body){
        return await User_Schema.create(body)
    }

    async update(id, body){
        return await User_Schema.updateMany(id, body).exec()
    }

    async delete(id){
        return await User_Schema.deleteMany(id).exec()
    }
}

module.exports = new User_Model;
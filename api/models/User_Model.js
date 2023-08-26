
// Call Schema
const User_Schema = require('../schema/facts/User_Schema')

class User_Model{
    async getList(){
        return await User_Schema.find().exec()
    }
    // async getDetail(id){
    //     return await User_Schema.find({_id:id}).exec()
    // }
    async create(body){
        return await User_Schema.create(body)
    }
    async update(id, body){
        return await User_Schema.updateMany(id, body).exec()
    }
    async delete(obj={}){
        return await User_Schema.deleteMany(obj).exec()
    }
    async getField(obj={}, select=''){
        return await User_Schema.find(obj).select(select).exec()
    }
}

module.exports = new User_Model;
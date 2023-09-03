
// Call Schema
const Category_Schema = require('../schema/facts/Category_Schema')

class Category_Model{
    async getList(){
        return await Category_Schema.find().exec()
    }
    // async getDetail(id){
    //     return await Category_Schema.find({_id:id}).exec()
    // }
    async create(body){
        return await Category_Schema.create(body)
    }
    async update(id, body){
        return await Category_Schema.updateMany(id, body).exec()
    }
    async delete(obj={}){
        return await Category_Schema.deleteMany(obj).exec()
    }
    async getField(obj={}, select=''){
        return await Category_Schema.find(obj).select(select).exec()
    }
}

module.exports = new Category_Model;
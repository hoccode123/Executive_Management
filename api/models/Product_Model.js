
// Call Schema
const Product_Schema = require('../schema/facts/Product_Schema')

class Product_Model{
    async getList(){
        return await Product_Schema.find().exec()
    }
    // async getDetail(id){
    //     return await Product_Schema.find({_id:id}).exec()
    // }
    async create(body){
        return await Product_Schema.create(body)
    }
    async update(id, body){
        return await Product_Schema.updateMany(id, body).exec()
    }
    async delete(obj={}){
        return await Product_Schema.deleteMany(obj).exec()
    }
    async getField(obj={}, select=''){
        return await Product_Schema.find(obj).select(select).exec()
    }
}

module.exports = new Product_Model;
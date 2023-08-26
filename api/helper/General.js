const { text } = require('express')
const Admin = require('../helper/Admin')


const Role_Model = require('../schema/facts/Role_Schema')

class General extends Admin{
    constructor(url){
        super(url)
    }

    // async getList(filter={},model=''){
    //     return await model.find(filter).exec()
    // }

    // async getIDSchema(text,model){
    //    // console.log(text);
    //     const data = await this.getList({name:text},model)
    //     return data[0]._id
    // }

    async getRole(){
        return await Role_Model.find({}).exec()
    }
}

module.exports = General
const Admin = require('../controllers/Admin')

const Gender_Model = require('../schema/department/M_Gender')
const Role_Model = require('../schema/facts/M_Role')

class General extends Admin{
    async getGender(){
        return await Gender_Model.find({}).exec()
    }

    async getRole(){
        return await Role_Model.find({}).exec()
    }
}

module.exports = General
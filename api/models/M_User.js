
const Admin = require('../controllers/Admin')

const User_Schema = require('../schema/facts/M_User')

class M_User extends Admin{
    async getList(req, res){
        const {
            fullname,
            email
        } = req.query

        console.log({
            fullname,
            email
        });

        return await User_Schema.find().exec()
    }
}

module.exports = M_User;
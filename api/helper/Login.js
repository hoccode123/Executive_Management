const Admin = require('../helper/Admin')

const User_Model = require('../models/User_Model')
const Token_Schema = require('../schema/facts/Token_Schema')
const bcrypt = require('bcryptjs');

class Login extends Admin{
    // async getGender(){
    //     return await Gender_Model.find({}).exec()
    // }

    // async getRole(){
    //     return await Role_Model.find({}).exec()
    // }
    
    // async login(req, res) {
    //     const { email, password } = req.body

    //     // check email vs password

    //     const data = await User_Model.getField({ email })
    //     const result = bcrypt.compareSync(password, data[0]['password']);

    //     if (result) {
    //         const token = jwt.sign(
    //             { data: { _id: data[0]['_id'], email: data[0]['email'] } },
    //             this.secret_default,
    //             { expiresIn: this.expiresIn_default }
    //         );
    //         await Token_Schema.create({ token, userID: data[0]['_id'] })
    //         return this.response(res, 200, { token })
    //     }

    //     return this.response(res, 200, result)
    // }
}

module.exports = Login
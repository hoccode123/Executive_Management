const Admin = require('../helper/Admin')

// Call model
const User_Model = require('../models/User_Model')

// Call View: pendding

const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

class User_Controller extends Admin{
    async getList(req, res){
        const {
            fullname,
            email
        } = req.query


        const data = await User_Model.getList()

        return this.response(res, 200, data);
    }
    async create(req, res){
        const {
            fullname,
            email,
            phone,
        } = req.body

        // check data
        if(this.check_empty(fullname)) return this.response(res, 603, '', 'fullname')
        if(this.check_empty(email)) return this.response(res, 603, '', 'email')
        if(this.check_email_format(email)) return this.response(res, 604, '', 'email')
        if(this.check_phone_format(phone)) return this.response(res, 604, '', 'phone')
       
        const data = await User_Model.create({
            fullname,
            email,
            phone,
            password: bcrypt.hashSync(this.makeid(8), salt)
        })

        return this.response(res, 200, data);
    }
}

module.exports = new User_Controller
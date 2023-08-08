const Admin = require('../helper/Admin')

// Call model
const User_Model = require('../models/User_Model')

// Call View: pendding

const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

class User_Controller extends Admin{
    async getList(req, res){
        // const {
        //     fullname,
        //     email
        // } = req.query
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
        if(this.checkEmpty(fullname)) return this.response(res, 603, '', 'fullname')
        if(this.checkEmpty(email)) return this.response(res, 603, '', 'email')
        if(this.checkEmailFormat(email)) return this.response(res, 604, '', 'email')
        if(this.checkPhoneFormat(phone)) return this.response(res, 604, '', 'phone')
        //Thiếu kiểm tra tồn tại (không được trùng email)

        const check_email_exist = await User_Model.getField({email})
        if(check_email_exist.length != 0) return this.response(res, 605, '', 'email')

        const data = await User_Model.create({
            fullname,
            email,
            phone,
            password: bcrypt.hashSync(this.makeid(8), salt)
        })

       // if(data) await this.sendEmail(data._id, email)
       
        return this.response(res, 200, data);
    }
    async getID(req, res){
        const id = req.query
        const data = await User_Model.getID(id)
        return this.response(res, 200, data);
    }
    async delete(req, res){
        const id = req.params // ?id=
       //console.log(_id)
       //; if(User_Model.getID(_id)=='') return this.response(res, 404)
        const data = await User_Model.delete(id)

        return this.response(res,200, data)
    }
}

module.exports = new User_Controller
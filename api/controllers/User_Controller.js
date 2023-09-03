const { mongoose } = require('mongoose');
const Admin = require('../helper/Admin')
const General = require('../helper/General')
// Call model
const User_Model = require('../models/User_Model')
const Gender_Schema = require('../schema/department/Gender_Schema')
const Department_Schema = require('../schema/department/Department_Schema')
const Role_Schema = require('../schema/facts/Role_Schema')
// Call View: pendding
const jwt = require('jsonwebtoken');
const fs = require('fs');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

// const multer  = require('multer')
// var fs = require('fs');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         // var flag = 1

//         // //file lúc này có 2 thông tin:
//         // // 1. originalname: kiểm tra file có tồn tại trong folder hay ko?

//         // const path = 'uploads/' + file.originalname;

//         // try {
//         //     if (fs.existsSync(path)) {
//         //         flag = 0
//         //         cb('File đã tồn tại')
//         //     }
//         // } catch (err) {
//         //     cb('Lỗi cú pháp: ' + err)
//         // }

//         // //2. mimetype: kiểm tra đuôi file
//         // //console.log(file.mimetype)

//         // if (file.mimetype != 'image/png') {
//         //     flag = 0
//         //     cb('File không đúng định dạng')
//         // }

//         // //console.log(flag)

//         // // upload file
//         // if (flag == 1) {
//         //     cb(null, file.originalname)
//         // }
//         if( (file.mimetype != 'image/png') && (file.mimetype != 'image/jpeg') && (file.mimetype != 'image/jpg')  )
//         {
//             cb('SV: File không đúng định dạng');
//         }
//         else
//         {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

//             // phân tích file
//             const name_file = file.originalname.split('.'); // abc.jpg => ['abc', 'jpg']
            
//             const lastItem = name_file[name_file.length - 1];

//             var result;

//             var firstItem = '';

//             if(name_file.length > 2)
//             {
//                 // loại bỏ phần từ cuối trong mảng
//                 name_file.pop();

//                 // nối phần tử thành 1 chuỗi
//                 name_file.forEach(e => { firstItem+= e + '-'; });

//                 // xóa kí tự cuối trong chuỗi
//                 result = firstItem.substring(0, firstItem.length - 1);
//             }
//             else
//             {
//                 result = name_file[0];
//             }
        
//             cb(null, result + '-' + uniqueSuffix + '.' + lastItem);
//         }

//     }
// })

// const limits = { fileSize: 1024 * 1024 * 5 } // 1kb = 1024B, 100kb = 102400
// const upload = multer({ storage, limits }).single('file')


class User_Controller extends Admin{
    async getList(req, res){
        // const {
        //     fullname,
        //     email
        // } = req.query
        const data = await User_Model.getList()
        //console.log(data);
        return this.response(res, 200, data);
    }

    async create(req, res){
        // console.log(await this.checkToken());
        // get token
         //this.verifyToken((await this.checkToken()['data']));
         const userLogin = await this.decoded(req)
        const {
            fullName,
            email,
            phone,
            gender,
            role
        } = req.body

        // check data
        if(this.checkEmpty(fullName)) return this.response(res, 603, '', 'fullname')
        if(this.checkEmpty(email)) return this.response(res, 603, '', 'email')
        if(this.checkEmailFormat(email)) return this.response(res, 604, '', 'email')
        if(this.checkPhoneFormat(phone)) return this.response(res, 604, '', 'phone')
        const check_email_exist = await User_Model.getField({email})
        if(check_email_exist.length != 0) return this.response(res, 605, '', 'email')
        const check_phone_exist = await User_Model.getField({phone})
        if(check_phone_exist.length != 0) return this.response(res, 605, '', 'phone')
        const checkGender = await this.checkModelField(gender, this.genderList())
        if(!checkGender) return this.response(res, 404,'', 'Giới tính')
        const checkRole = await this.checkModelField(role, this.roleList());
        if(!checkRole) return this.response(res, 610,'', '');
        //console.log(checkDepartment);
        const data = await User_Model.create({
            fullName,
            email,
            phone,
            gender,
            role,
            password: bcrypt.hashSync(this.makeid(8), salt),
            avatar: res.locals.avatar,
            createByID: userLogin.data._id
        })
        //console.log(userLogin.data._id); 
       if(data) await this.sendEmail(data._id, email)
        return this.response(res, 200, data);
    }
    
    async update(req,res){
        const userLogin = await this.decoded(req)
        const {

            fullName,
            phone,
            gender,
            //departmentID,
            role
        } = req.body

        if(this.checkEmpty(req.params.id)) return this.response(res, 603, '', 'id')
        if(!this.checkObjectId(req.params.id)) return this.response(res, 604, '', 'id')
        if(this.checkEmpty(fullName)) return this.response(res, 603, '', 'fullname')
        if(this.checkPhoneFormat(phone)) return this.response(res, 604, '', 'phone')
        const check_phone_exist = await User_Model.getField({phone, _id: {$ne: new mongoose.Types.ObjectId(req.params.id)}})
        if(check_phone_exist.length != 0) return this.response(res, 605, '', 'phone')
        const checkGender = await this.checkModelField(gender, this.genderList())
        if(!checkGender) return this.response(res, 404,'', 'Giới tính')
        const checkRole = await this.checkModelField(role, this.roleList());
        if(!checkRole) return this.response(res, 610,'', '');
        if (req.body['password']!= undefined && req.body['password'].trim() !='') req.body['password'] = bcrypt.hashSync(req.body['password'], salt)
        req.body['updateDate'] = new Date()
        req.body['updateByID'] = userLogin.data._id
        req.body['avatar'] = res.locals.avatar
       // console.log(req.body);

       const oldData = await User_Model.getField({_id: new mongoose.Types.ObjectId(req.params.id)})
       const avatar = oldData[0]['avatar']
        await User_Model.update({_id: new mongoose.Types.ObjectId(req.params.id)}, req.body)
        // delete old file
        if(req.body['avatar']!=undefined && req.body['avatar'] != ''){
            fs.unlinkSync('public/uploads/user/' + avatar)
        }
        const data = await User_Model.getField({_id: new mongoose.Types.ObjectId(req.params.id)})
        return this.response(res, 200, data);

    }
    async getID(req, res){
        const id = req.query
        const array = await User_Model.getField(id, 'userCode fullName email phone avatar genderID createnew departmentID roleID createDate updateDate createByID updateByID')
        const data=[]
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            element['avatar'] = process.env.URL + 'uploads/user/' + element['avatar']
            data.push(element) 
        }
        return this.response(res, 200, data);
    }
   

    async active(req, res){
        const {id, status} = req.query
        
        // console.log({id, status});
        // return 
        // 1 check id have exist
        if(id==undefined) return this.response(res, 609, '', 'id')
        // 2. check empty
        if(this.checkEmpty(id)) return this.response(res, 603, '', 'id')
        // 3. check format: object id
        if(!this.checkObjectId(id)) return this.response(res, 604, '', 'id')
        // 4. check db
        const check_id_exist = await User_Model.getField({_id: {$ne: new mongoose.Types.ObjectId(id)}})
        if(check_id_exist.length = 0) return this.response(res, 609, '', 'id')
        // 1 check status have exist
        if(status==undefined) return this.response(res, 404, '', 'status')
        // 2. check status empty
        if(this.checkEmpty(status)) return this.response(res, 603, '', 'status')
        // 3. check status format : ['on', 'off']
        //console.log(status.toLowerCase());
        if((status.toLowerCase()!='on' && status.toLowerCase()!='off')) return this.response(res, 604, '', 'status')
        await User_Model.update({_id: new mongoose.Types.ObjectId(id)}, {active: status.toLowerCase()=='on'?true:false}) 
        const data = await User_Model.getField({_id: new mongoose.Types.ObjectId(id)}, '_id email active createDate createByID')
        return this.response(res,200, data)
    }

    async delete(req, res){
      
       const checkRole = await this.checkModelField(role, this.roleList());
       if(!checkRole) return this.response(res, 610,'', '');
        const data = await User_Model.delete(req.params.id)
        return this.response(res,200, data)
    }
}

module.exports = new User_Controller
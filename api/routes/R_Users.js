const express = require('express')
const moment = require('moment')
const router = express.Router()

// Gọi model
// const userModels = require('../models/facts/M_User')
// const tokenModels = require('../models/facts/M_Token')
// const roleModels = require('../models/facts/M_Role')
// const departmentModel = require('../models/department/M_Department')
// const positionModels= require('../models/department/M_Position')

const nodemailer = require('nodemailer');
// Gọi bcryptjs
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

// Gọi json web token
const jwt = require('jsonwebtoken');
// khóa bí mật

const secret = '#$#@#dsds';

// Gọi class
// const Admin = require('../controllers/Admin')
// const Users = require('../controllers/Users')
// const { find } = require('../models/facts/M_User')
//const { route } = require('./R_Generals')
//sd class admin
// const Class_Admin = new Admin();


const M_User = require('../models/M_User')
const Class_User = new M_User()

router.get('/getList', async (req, res) => {
    Class_User.response(res, 200, await Class_User.getList(req, res))
})


// user/getList: userCode, fullName,avatar, email, phone, active, gender, new, departmentID, roleID, createDate, updateDate, createByID, updateByID
router.post('/created', async (req, res) => {

    const {
        userCode, 
        fullName, 
        email, 
        phone,
        departmentID,
        roleID,
        genderID 
    } = req.body

    // gender: nam, nu
    // role: admin, user, guest

    const check_email_empty = Class_Admin.check_empty(email)
    if(check_email_empty!='') return check_email_empty

    const check_userCode_empty = Class_Admin.check_empty(userCode)
    if(check_userCode_empty!='') return check_userCode_empty

    const check_fullName_empty = Class_Admin.check_empty(fullName)
    if(check_fullName_empty!='') return check_fullName_empty

    const check_email_format = Class_Admin.check_email_format(email)
    if(check_email_format!='') return check_email_format
   
    const hash = bcrypt.hashSync(Class_Admin.makeid(8), salt);
    const data = await userModels.create({email, password:hash,userCode, fullName, phone, genderID, createnew, departmentID, roleID})

    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'tothuyit2@gmail.com',
    //       pass: 'dtybqszyuqfgvowz'
    //     }
    // });
      
    // var mailOptions = {
    //     from: 'tothuyit2@gmail.com',
    //     to: email,
    //     subject: 'Xac nhan va kich koat tai khoan',
    //     html: '<a href="http://localhost:3010/api/users/active?id='+data._id+'" target="_blank">Click vào dây</a>'
    // };
      
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //         response(res, 608)
    //         return
    //     }
    // });

    Class_Admin.response(res, 200, data)
})
//user/getList: userCode, fullName, avatar, email, phone, active, gender, new, departmentID, roleID, createDate, updateDate, createByID, updateByID
// router.get('/list', async (req, res) => {
//     const {userCode, fullName, avatar, email, phone, active, gender, createnew, departmentID, roleID, createDate, updateDate, createByID, updateByID } = req.body
//     const data = await userModels.find().exec()
//     response(res, 200, data)
// })

// router.get('/listold', (req, res) => {
//     userModels
//         .find()
//         .exec((err, data) => {
//             if (err) {
//                 res.send({ kq: 0, msg: 'Kết nối Database thất bại.' })
//             } else {

//                 res.send({ kq: 1, data })
                
//             }
//         })
// })


// router.get('/list/:id', (req, res) => {
//     // const mongoose = require('mongoose');
//     // const _id = mongoose.Types.ObjectId('req.params.id');
//     // console.log(_id)
//     userModels
//         .find({_id: req.params.id})
//         .exec((err, data) => {
//             if (err) {
//                 res.send({ kq: 0, msg: 'Kết nối Database thất bại.' })
//             } else {
//                 res.send({ kq: 1, data })
//             }
//         })
// })

// router.get('/getphone/:id', (req, res) => {
//     // const mongoose = require('mongoose');
//     // const _id = mongoose.Types.ObjectId('req.params.id');
//     // console.log(_id)
//     userModels
//         .find({_id: req.params.id})
//         .exec((err, datauser) => {
//             var data= datauser[0].phone
//                 if (err) {
//                     res.send({ kq: 0, msg: 'Kết nối Database thất bại.' })
//                 } else {
//                     res.send({ kq: 1, data })
//                 }        
//         })
// })

// xóa all
// router.post('/deleteAll', function (req, res) {
//     userModels.deleteMany({}, (err) => {
//         if (err) {
//             res.send({ kq: 0, msg: 'Kết nối Database thất bại.' })
//         } else {
//             res.send({ kq: 1, msg: 'Đã xóa toàn bộ dữ liệu.' })
//         }
//     })
// })

// api thêm, sửa
// router.post('/add', function (req, res) {
//     var id= name = sex = code = username = password = email = phone = avatar = positionID  = departmentID = roleID = error = '', flag = 1;
    
//     id= req.body.id;
//     name = req.body.name;
//     sex = req.body.sex;
//     code = req.body.code;
//     username = req.body.username;
//     password = req.body.password;
//     email = req.body.email;
//     phone = req.body.phone;
//     avatar = req.body.avatar;
//     positionID = req.body.positionID;
//     //customerID = req.body.customerID;
//     departmentID = req.body.departmentID;
//     roleID = req.body.roleID;
//     //res.send({kq:1, msg: 'ok'});
//     //console.log(id);
//     //Thêm mới
//     if (id==''){
//         if (flag == 1) {
//             userModels
//                 .find({ $or:[ {username}, {code}, {phone}]})
//                 .exec((err, data) => {
//                     if (err) {
//                         res.send({ kq: 0, msg: 'Kết nối Database thất bại.' })
//                     } else {
//                         //console.log(data);
//                         if (data == '') {
                          
//                             var hash = bcrypt.hashSync(password, salt);
//                             // Tạo object để thêm vào db
//                             const obj = {
//                                 name: name,
//                                 sex: sex,
//                                 code: code,
//                                 username: username,
//                                 password: hash,
//                                 email: email,
//                                 phone: phone,
//                                 avatar: avatar,
//                                 positionID: positionID,
//                                 departmentID: departmentID,
//                                 roleID: roleID
//                             };
//                             //res.send({kq:1, msg: '1'})
//                             userModels.create(obj, (err) => {
//                                 if (err) {
//                                     res.send({ kq: 0, msg: 'Kết nối Database thất bại.' })
//                                 } else {
//                                     res.send({ kq: 1, msg: 'Tạo tài khoản thành công.' })
    
//                                     // Gửi mail để kích hoạt tài khoản
//                                 }
//                             })       
//                         } else {
    
//                             res.send({ kq: 0, msg: 'Tài khoản hay mã nhân viên hay số điện thoại này đã tồn tại.' })
//                         }
//                     }
//                 })
//         } else {
//             res.send({ kq: 0, msg: error })
//         }
//     //Cập nhật
//     }else{
//         if (flag == 1) {
//             userModels
//                 //.find({ $or:[ {code}, {phone}]})
//                 .find({_id:id})
//                 .exec((err, data) => {
//                     if (err) {
//                         res.send({ kq: 0, msg: 'Kết nối Database thất bại ' })
//                     } else {
//                         //console.log(data);
//                         if (data != '') {
//                             // Tạo object để cập nhật vào db
//                             const _id= id;
//                             const obj = {
                               
//                                 name: name,
//                                 sex: sex,
//                                 code: code,
//                                 //username: username,
//                                 password: password,
//                                 email: email,
//                                 phone: phone,
//                                 avatar: avatar,
//                                 positionID: positionID,
                               
//                                 departmentID: departmentID,
//                                 roleID: roleID
//                             };
//                             //console.log(obj)
//                             //res.send({kq:1, msg: '1'})
//                             userModels
//                             .find({ $or:[{code}, {phone}]})
//                             .exec((err, data) => {
//                                 if (err) {
//                                     res.send({ kq: 0, msg: 'Kết nối Database thất bại' })
//                                 } else {
//                                     if (data.length==1) {
//                                         userModels.updateMany({_id}, obj, (err)=>{
//                                             if (err) {
//                                                 res.send({ kq: 0, msg: 'Kết nối Database thất bại' })
//                                             } else {
//                                                 res.send({ kq: 1, msg: 'Cập nhật tài khoản thành công.' })
                
//                                                 // Gửi mail để kích hoạt tài khoản
//                                             }
//                                         })      
//                                     }else{
//                                         res.send({ kq: 0, msg: 'Mã nhân viên hay số điện thoại này đã tồn tại.' })
//                                     }
//                                 }
//                             })
                              
//                         } else {
    
//                             res.send({ kq: 0, msg: 'Mã nhân viên hay số điện thoại này đã tồn tại.' })
//                         }
//                     }
//                 })
//         } else {
//             res.send({ kq: 0, msg: error })
//         }
//     }
   
// })

// router.get('/confirmEmail', (req, res) => {
//     const {id} = req.query
// })
// login
// router.post('/login', function (req, res) {
//    // const {username, password} = req.body

//   // console.log({username, password});return
//     var _username = _password = error = '', flag = 1;

//     _username = req.body.username;
//     _password = req.body.password;
//     const check_username_empty= Class_Admin.check_empty(_username,'Username')
//     if (check_username_empty !='') return check_username_empty
    
//     const check_password_empty= Class_Admin.check_empty(_password,'Password')
//     if (check_password_empty !='') return check_password_empty

  

//     if (flag == 1) {
//         userModels
//             .find({ username: _username, status: true }, (err, data) => {
//                 if (err) {
//                     res.send({ kq: 0, msg: 'Kết nối Database thất bại.' })

//                 } else {
//                     if (data != '') {
//                         // check password
//                         const check_pass = bcrypt.compareSync(_password, data[0].password);

//                         if (check_pass == true) {
//                             // Lưu lại giá trị khi login thành công
//                             const obj_token = {
//                                 id: data[0]._id,
//                                 name: data[0].name,
//                                 departmentID:data[0].departmentID,
//                                 roleID: data[0].roleID,
//                                 phone: data[0].phone,
//                                 username: data[0].username,
//                                 positionID: data[0].positionID,
//                                 device: req.headers
//                             };
//                             //console.log(obj_token)
//                             jwt.sign(obj_token, secret, { expiresIn: 60 * 60 }, (err, token) => {
//                                 if (err) {
//                                     res.send({ kq: 0, msg: 'Lỗi tạo Token' })
//                                 } else {
//                                     // Cần lưu lại token vào database Token
//                                     tokenModels.create({
//                                         token,
//                                         userID: data[0]._id,
//                                         name:data[0].name,
//                                         status: true
//                                     }, (err) => {
//                                         if (err) {
//                                             res.send({ kq: 0, msg: 'Kết nối Database thất bại.' })
//                                         } else {
//                                             //res.cookie('token', token, { maxAge: 60000 * 60 }).send({ kq: 1, msg: 'Kết nối thành công' });
//                                             res.send({ kq: 1, msg: {token,userID: data[0]._id,name:data[0].name,departmentID:data[0].departmentID}})
//                                         }
//                                     })
//                                 }
//                             });
//                         } else {
//                             res.send({ kq: 0, msg: 'Kiểm tra thông tin đăng nhập.' })
//                         }
//                     } else {
//                         res.send({ kq: 0, msg: 'Tài khoản này không tồn tại, hoặc chưa được kích hoạt.' })
//                     }
//                 }
//             })
//     } else {
//         res.send({ kq: 0, msg: error })
//     }
// })




// function user_table(array = [], link = '') {
//     // code html
//     var str = '';
//     array.forEach(e => {
//         var checked = (e.status == true) ? 'checked' : '';
//         str += `<tr class="even pointer" id="id_delete_` + e.id + `">
            
//             <td class="align-middle">
//                 <img src="/assets/images/user/img-avatar-1.jpg" alt="contact-img" title="contact-img" class="rounded me-3" height="48" />
//                 <p class="m-0 d-inline-block align-middle font-16">
//                     <a href="#!" class="text-body">Amazing Rolling Chair</a>
//                     <br />
//                     <span class="text-warning feather icon-star-on"></span>
//                     <span class="text-warning feather icon-star-on"></span>
//                     <span class="text-warning feather icon-star-on"></span>
//                     <span class="text-warning feather icon-star-on"></span>
//                     <span class="text-warning feather icon-star-on"></span>
//                 </p>
//             </td>
//             <td class="align-middle">
//             `+ e.name + `
//             </td>
//             <td class="align-middle">
//             `+ e.username + `
//             </td>
//             <td class="align-middle">
//             `+ e.role + `
//             </td>
//             <td class="align-middle">
//             `+ e.department + `
//             </td>
//             <td >
//                 <div class="switch switch-success d-inline m-r-10">
//                     <input type="checkbox" id="switch-p-1" checked="">
//                     <label for="switch-p-1" class="cr "></label>
//                 </div>
//             </td>
//             <td class="table-action">
//                 <a href="#!" class="btn btn-icon btn-outline-primary"><i class="feather icon-edit"></i></a>
//                 <a href="#!" class="btn btn-icon btn-outline-danger"><i class="feather icon-trash-2"></i></a>
//             </td>
//         </tr>`;
//     })

//     return str;
// }

// router.post('/deteteRow', (req, res)=>{
//      // 1. khai bao
//      var id,  error, flag=1;

//      // 2. get value
//      id = req.body.id;
//     //console.log(id);
//        // res.send({kq:1, results: id});
 
//      // 3. check value
 
//      // 3.1 check empty
//      // 3.2 check 24 characters
 
 
//      // 4. sumary
//      if(flag==1){
//          userModels
//          .find({_id: id})
//          .exec((err, data)=>{
//              if(err){
//                  res.send({kq:0, results: 'Kết nối DB thất bại'})
//              }
//              else{
//                  if(data == ''){
//                      res.send({kq:0, results: 'Dữ liệu không tồn tại'})
//                  }
//                  else{
//                      userModels
//                      . findByIdAndDelete({_id: id}, (err, data)=>{
//                          if(err){
//                              res.send({kq:0, results: 'Kết nối DB thất bại'})
//                          }
//                          else{
//                              res.send({kq:1, results: 'Xóa người dùng thành công'})
//                          }
//                      })
                    
//                  }
//              }
//          }) 
 
//          //res.send({kq:1, results: {id, status}});
//      }
    
// })
// router.post('/status', function(req,res){
//     // 1. khai bao
//     var id, status, error, flag=1;

//     // 2. get value
//     id = req.body.id.replace(/\s+/g, '');
//     status = req.body.status;

//     // 3. check value

//     // 3.1 check empty
//     // 3.2 check 24 characters


//     // 4. sumary
//     if(flag==1){
        
//         // check db
//         // 1. id co ton tai ko
//         //
//         userModels
//         .find({_id: id})
//         .exec((err, data)=>{
//             if(err){
//                 res.send({kq:0, results: 'Kết nối DB thất bại'})
//             }
//             else{
//                 if(data == ''){
//                     res.send({kq:0, results: 'Dữ liệu không tồn tại'})
//                 }
//                 else{
//                     userModels
//                     .updateMany({_id: id}, {status}, (err, data)=>{
//                         if(err){
//                             res.send({kq:0, results: 'Kết nối DB thất bại'})
//                         }
//                         else{
//                             res.send({kq:1, results: 'Cập nhật thành công'})
//                         }
//                     })
//                     //res.send({kq:1, results: data});
//                 }
//             }
//         }) 

//         //res.send({kq:1, results: {id, status}});
//     }
//  })
 // login abc
// router.post('/login', function (req, res) {
//     var _username = _password = error = '', flag = 1;

//     _username = req.body.username;
//     _password = req.body.password;

//     if (flag == 1) {
//         userModels
//             .find({ username: _username, status: true }, (err, data) => {
//                 if (err) {
//                     res.send({ kq: 0, msg: 'Kết nối Database thất bại.' })

//                 } else {
//                     if (data != '') {
//                         // check password
//                         const check_pass = bcrypt.compareSync(_password, data[0].password);

//                         if (check_pass == true) {
//                             // Lưu lại giá trị khi login thành công
//                             const obj_token = {
//                                 id: data[0]._id,
//                                 device: req.headers
//                             };
//                             jwt.sign(obj_token, secret, { expiresIn: 60 * 60 }, (err, token) => {
//                                 if (err) {
//                                     res.send({ kq: 0, msg: 'Lỗi tạo Token' })
//                                 } else {
//                                     // Cần lưu lại token vào database Token
//                                     tokenModels.create({
//                                         token,
//                                         id_user: data[0]._id,
//                                         status: true
//                                     }, (err) => {
//                                         if (err) {
//                                             res.send({ kq: 0, msg: 'Kết nối Database thất bại.' })
//                                         } else {
//                                             res.send({ kq: 1, msg: token });
//                                         }
//                                     })
//                                 }
//                             });
//                         } else {
//                             res.send({ kq: 0, msg: 'Kiểm tra thông tin đăng nhập.' })
//                         }
//                     } else {
//                         res.send({ kq: 0, msg: 'Tài khoản này không tồn tại, hoặc chưa được kích hoạt.' })
//                     }
//                 }
//             })
//     } else {
//         res.send({ kq: 0, msg: error })
//     }
// })

// router.get('/test/:token', (req, res) => { // /:token => req.params.token, ?token='zxczxcxz'=> req.query.token
//     // token
//     // => find collection token => userID
//     // => find collection user => roleID
//     // => find collection role => vaitro
// })

module.exports = router;
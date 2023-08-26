// Gọi json web token
const jwt = require('jsonwebtoken');
// khóa bí mật
//const secret = '#$#@#dsds';
const nodemailer = require('nodemailer');
var fs = require('fs');

const User_Model = require('../models/User_Model')
const Department_Schema = require('../schema/department/Department_Schema')
const Gender_Schema = require('../schema/department/Gender_Schema')
const Token_Schema = require('../schema/facts/Token_Schema')
const Role_Schema = require('../schema/facts/Role_Schema')
const bcrypt = require('bcryptjs');

const Gender_Model = require('../schema/department/Gender_Schema')

class Admin {

    expiresIn_default = 60 * 60 * 24;
    secret_default = '#$#@#dsds';
    min_default = 5;
    max_default = 50;

    constructor(url = '') {
        this.url = url;
    }

    // uploadFile(req, res){
    //     const storage = multer.diskStorage({
    //         destination: function (req, file, cb) {
    //             cb(null, 'uploads')
    //         },
    //         filename: function (req, file, cb) {

    //             if( (file.mimetype != 'image/png') && (file.mimetype != 'image/jpeg') && (file.mimetype != 'image/jpg')  )
    //             {
    //                 cb('SV: File không đúng định dạng');
    //             }
    //             else
    //             {
    //                 const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

    //                 // phân tích file
    //                 const name_file = file.originalname.split('.'); // abc.jpg => ['abc', 'jpg']

    //                 const lastItem = name_file[name_file.length - 1];

    //                 var result;

    //                 var firstItem = '';

    //                 if(name_file.length > 2)
    //                 {
    //                     // loại bỏ phần từ cuối trong mảng
    //                     name_file.pop();

    //                     // nối phần tử thành 1 chuỗi
    //                     name_file.forEach(e => { firstItem+= e + '-'; });

    //                     // xóa kí tự cuối trong chuỗi
    //                     result = firstItem.substring(0, firstItem.length - 1);
    //                 }
    //                 else
    //                 {
    //                     result = name_file[0];
    //                 }

    //                 cb(null, result + '-' + uniqueSuffix + '.' + lastItem);
    //             }

    //         }
    //     })

    //     const limits = { fileSize: 1024 * 1024 * 5 } // 1kb = 1024B, 100kb = 102400
    //     return multer({ storage, limits }).single('avatar')

    //     // return upload(req, res, async (err) => {
    //     //     res.locals.avatar=''
    //     //     if(req.file != undefined){
    //     //         if (err instanceof multer.MulterError) {
    //     //             res.send({ kq: 0, msg: err })
    //     //         } else if (err) {
    //     //             res.send({ kq: 0, msg: err })
    //     //         } else { 
    //     //             res.locals.avatar = req.file.filename;
    //     //         }
    //     //     }
    //     // })
    // }
    ///chuyển viết hoa từ đầu tiên của chữ
    jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
    get_parent_module_name() {
        return this.url.split('/')[2];
    }
    get_module_name() {
        return this.url.split('/')[3];
    }
    get_module_child_name() {
        return this.url.split('/')[4];
    }

    getError(key, field = '', data = [], min, max) {
        let value = '';
       
        switch (key) {

            case 608:
                value = 'Gửi email thất bại';
                break;
            case 607:
                value = 'Password va Re-Password phải giống nhau';
                break;
            case 606:
                value = field + ' phai > ' + min + ' và < ' + max + '';
                break;
            case 605:
                value = field + ' đã tồn tại';
                break;
            case 609:
                value = field + ' không tồn tại';
                break;  
                case 610:
                    value =' Bạn không có quyền với chức năng này';
                    break;   
            case 604:
                value = field + ' không đúng định dạng';
                break;
            case 603:
                value = field + ' không đưuọc trống';
                break;
            case 404:
                value = field + ' không tìm thấy';
                break;
            case 700:
                value = field;
                break;
            case 200:
                value = 'Success';
                break;
            default:
                value = 'code does not exist';
                break;
        }
        return { code: key, error: value, data };
    }
    response(res, code, data, field) {
        res.send(this.getError(code, field, data))
    }
    // checkLogin(req, res, next) {
    //     if (req.cookies.token == undefined) {
    //         res.redirect('/login.html')
    //     } else {
    //         next()
    //     }
    // }
    //     check_token(tokenModels, cookies,next) {
    //         tokenModels.find({token: cookies}, (err, data)=>{
    //             if(err){
    //                 res.send({kq:0, msg: 'Kết nối Database thất bại.'})
    //             }else{
    //                 if(data==''){
    //                     res.send({kq:0, msg: 'Token không hợp lệ.'})

    //                 }else{
    //                     // check thời gian sử dụng token
    //                     jwt.verify(cookies, secret, function(err, decoded) {
    //                         if(err){
    //                             res.send({kq:0, msg: 'Token đã hết hạn sử dụng'})
    //                         }else{
    //                             next()
    //                         }
    //                     });
    //                 }
    //             }
    //         })   
    //     }
    //     check_role(userModels,roleModels,cookies,next){
    //         jwt.verify(cookies, secret, function(err, decoded) {
    //             if(err){
    //                 res.send({kq:0, msg: 'Token đã hết hạn sử dụng'})
    //             }else{
    //                 // Lấy được id từ token
    //                 userModels.find({_id: decoded.id}, (err, data)=>{
    //                     if(err){
    //                         res.send({kq:0, msg: 'Kết nối Database thất bại.'})
    //                     }else{
    //                         if(data==''){
    //                             res.send({kq:0, msg: 'Không tồn tại Thành Viên này.'})
    //                         }else{
    //                             // Lấy ra vai trò của thành viên
    //                             // 1. admin : toàn quyền
    //                             // 2. user : không được xóa
    //                             // 3. guest : xem

    //                             roleModels.find({_id: data[0].roleID}, (err, data)=>{
    //                                 if(err){
    //                                     res.send({kq:0, msg: 'Kết nối Database thất bại.'})
    //                                 }else{
    //                                     if(data==""){
    //                                         res.send({kq:0, msg: 'Dữ liệu không tồn tại trong hệ thống'})
    //                                     }else{
    //                                         if(data[0].value=='admin' || data[0].value=='user'){
    //                                             next()
    //                                         }else{
    //                                             res.send({kq:0, msg: 'Bạn không đủ vai trò để vào link này.'})
    //                                         }
    //                                     }


    //                                 }
    //                             })

    //                         }
    //                     }
    //                 })
    //             }
    //         });

    //     }
    signToken(data, secret = secret ?? secret_default, expiresIn = expiresIn ?? expiresIn_default) {
        return jwt.sign(data, secret, { expiresIn });
    }
    verifyToken(token, secret = secret ?? secret_default) {
        var decoded = jwt.verify(token, secret);
        return decoded
    }
    checkEmpty(value = '') {
        return (value.trim() == '') ? true : false;
    }
    checkEmailFormat(email) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return (!regex.test(email.trim())) ? true : false;
    }
    checkPasswordFormat(password) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return (!(regex.test(password.trim()))) ? Error(604, 'Password') : '';
    }
    checkPasswordDistance(password, min = min ?? min_default, max = max ?? max_default) {
        return (password.trim().length < min || password.trim().length > max) ? Error(606, 'Password', [], min, max) : '';
    }
    checkCompare(password, re_password) {
        return (password.trim() != re_password.trim()) ? Error(607, 'Re_Password') : '';
    }
    checkPhoneFormat(phone) {
        var regex = /^(03|05|07|08|09)[0-9]{8}$/;
        return (!regex.test(phone.trim())) ? Error(604, field) : '';
    }
    checkObjectId(id) {
        var ObjectId = require('mongoose').Types.ObjectId;
        return ObjectId.isValid(id)
    }
    checkBoolen(text) {
        var ObjectId = require('mongoose').Types.Boolean;
        return ObjectId.isValid(id)
    }
    genderList(){
        return ["NAM", "NỮ", "KHÁC"];
    }
    departmentList(){
        return ["TRUNG TÂM 1", "TRUNG TÂM 2"];
    }
    roleList(){
        return ["ADMIN", "USER", "GUEST"];
    }
    // async getList(filter={},model=''){
    //     return await model.find(filter).exec()
    // }
    // async departmentList(filter={},model=''){
    //     const propertyNames  = Object.keys(await this.getList(filter={},model=''))
    //     //console.log(propertyNames)
    //     return propertyNames
    // }
    async checkModelField(name, schema, list) {
        return (name!=undefined && list.includes(name.trim().toLocaleUpperCase())) ? await schema.find({name: name.trim().toLocaleUpperCase()}) : false
    }
    async checkToken(req, res, next) {
        if(req.headers.authorization == undefined){
            return this.response(res, 603, '', 'Token')
        }
        const token = req.headers.authorization.split(' ')[1]

        const checkExist = await Token_Schema.find({token, status: true}).exec()

        if(checkExist[0].length == 0){
            return this.response(res, 404, '', 'Token')
        }
        const checkToken = jwt.verify(token, this.secret_default);
       // console.log(checkToken);

        return ( typeof checkToken != 'string') ? next() : this.response(res, 700, '', checkToken)
    }
    checkRole(req, res, next) {
        var request = require('request');
        fs.readFile(req.cookies.username + '.txt', function (err, data) {
            if (err) res.send({ kq: 0, msg: "Đọc file thất bại!" });
            request(
                {
                    method: 'get',
                    url: 'http://localhost:3001/api/generals/checkrole/' + JSON.parse(data.toString()).token,
                    json: true
                }, function (error, response, body) {
                    if (body.data == 'admin' || body.data == 'user') {
                        next()
                    } else {
                        res.send({ kq: 0, msg: 'Bạn không đủ vai trò để vào link này.' })
                    }
                });
        });
        //res.send(req.cookies.login.token);
    }
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
    //         return this.response(res, 608)
    //     }
    // });
    async sendEmail(id = '', email = '') {
        
        var transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASS
            }
        });
        var mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Xac nhan va kich koat tai khoan',
            html: '<a href="' + process.env.URL + 'api/users/active?id=' + id + '&status=on" target="_blank">Click vào dây</a>'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
        });
        // return await transporter.sendMail(mailOptions);
    }
    makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    async login(req, res) {
        const { email, password } = req.body

        // check email vs password
        if(email==undefined) return this.response(res, 609, '', 'email')
        
        if(this.checkEmpty(email)) return this.response(res, 603, '', 'email')
         
         if(password==undefined) return this.response(res, 609, '', 'password')
         // 2. check empty
         if(this.checkEmpty(password)) return this.response(res, 603, '', 'password')

        const data = await User_Model.getField({ email })
        const result = bcrypt.compareSync(password, data[0]['password']);

        if (result) {
            const token = jwt.sign(
                { data: { _id: data[0]['_id'], email: data[0]['email'] } },
                this.secret_default,
                { expiresIn: this.expiresIn_default }
            );
            await Token_Schema.create({ token, userID: data[0]['_id'] })
            return this.response(res, 200, { token })
        }

        return this.response(res, 200, result)
    }
}

module.exports = Admin
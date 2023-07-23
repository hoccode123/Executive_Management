// Gọi json web token
const jwt = require('jsonwebtoken');
// khóa bí mật
//const secret = '#$#@#dsds';

class Admin {

    expiresIn_default = 60 * 60 * 24;
    secret_default = '#$#@#dsds';
    min_default = 5;
    max_default = 50;

    constructor(url = '') {
        this.url = url;
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

    Error(key, field, data=[],min,max) {
        let value='';
        switch (key) {
           
            case 608:
                value = 'Gửi email thất bại';
                break;
            case 607:
                value = 'Password va Re-Password phải giống nhau';
                break;
            case 606:
                value = field + ' phai > '+min+' và < '+max+'';
                break;
            case 605:
                value = field + ' đã tồn tại';
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
            case 200:
                value = 'Success';
                break;
            default:
                value = 'code does not exist';
                break;
        }
        return {code: key, error: value, data};
    }
    response(res, code, field, data) {
        res.send(Error(code, field, data))
    }
    check_login(req, res, next) {
        if(req.cookies.token==undefined){
            res.redirect('/login.html')
        }else{
            next()
        }
    } 
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
    sign_token(data, secret=secret??secret_default, expiresIn=expiresIn??expiresIn_default){
        return jwt.sign(data, secret, { expiresIn });
    }
    verify_token(token, secret=secret??secret_default){
        var decoded = jwt.verify(token, secret);
        return decoded
    }
    check_empty(value='', field=''){
        return (value.trim()=='') ? Error(603, field) : '';
    }
    check_email_format(email){
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
        return (!regex.test(email.trim())) ? Error(604, field) : '';
    }
    check_password_format(password){
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return (!(regex.test(password.trim())))? Error(604, 'Password'):'';
    }
    check_password_distance(password, min=min??min_default, max=max??max_default){
        return (password.trim().length < min || password.trim().length > max)? Error(606, 'Password', [], min, max):'';
    }
    check_compare(password,re_password){
        return (password.trim() != re_password.trim())? Error(607,'Re_Password'):'';
    }
  
   // check_token(req, res, next) {
        // 1. lay cokie luu vao db
        // 2. xoa cokie
        // 3. goi ten file tu db vua luu ten
        //console.log(req.cookies.username)
       // var decoded = jwt.verify(token, 'shhhhh');
        // var request = require('request');

        // fs.readFile(req.cookies.username + '.txt', function (err, data) {
        //     if (err) res.send({ kq: 0, msg: "Đọc file thất bại!" });
        //     //res.send({kq:1, msg:JSON.parse(data.toString()).token});
        //     request(
        //         {
        //             method: 'get',
        //             url: 'http://localhost:3001/api/generals/checktoken/' + JSON.parse(data.toString()).token,
        //             json: true
        //         }, function (error, response, body) {
                
        //             if (body.kq == 1) {
        //                 next()
        //             } else {
        //                 res.redirect('/login.html')
        //             }
        //         });

        // });
    //}
    check_role(req, res, next) {
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

    send_email(service='', email_send='', pass_send='', email_receive='', subject='', html=''){
        var transporter = nodemailer.createTransport({
            service:  service,
            auth: {
              user: email_send,
              pass:  pass_send
            }
        });

        var mailOptions = {
            from: email_send,
            to: email_receive,
            subject: subject,
            html:  html
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            
            if (error) {
                this.response(res, 608)
                return
            }
        });
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

}

module.exports = Admin
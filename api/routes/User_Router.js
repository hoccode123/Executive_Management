const express = require('express')
const router = express.Router()

const User_Controller = require('../controllers/User_Controller')


const multer  = require('multer')
var fs = require('fs');

// Gọi json web token
const jwt = require('jsonwebtoken');
// khóa bí mật
const secret = '#$#@#dsds';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/user')
    },
    filename: function (req, file, cb) {

        if( (file.mimetype != 'image/png') && (file.mimetype != 'image/jpeg') && (file.mimetype != 'image/jpg')  )
        {
            cb('SV: File không đúng định dạng');
        }
        else
        {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

            // phân tích file
            const name_file = file.originalname.split('.'); // abc.jpg => ['abc', 'jpg']
            
            const lastItem = name_file[name_file.length - 1];

            var result;

            var firstItem = '';

            if(name_file.length > 2)
            {
                // loại bỏ phần từ cuối trong mảng
                name_file.pop();

                // nối phần tử thành 1 chuỗi
                name_file.forEach(e => { firstItem+= e + '-'; });

                // xóa kí tự cuối trong chuỗi
                result = firstItem.substring(0, firstItem.length - 1);
            }
            else
            {
                result = name_file[0];
            }
        
            cb(null, result + '-' + uniqueSuffix + '.' + lastItem);
        }

    }
})

const limits = { fileSize: 1024 * 1024 * 5 } // 1kb = 1024B, 100kb = 102400
const upload = multer({ storage, limits }).single('avatar')

router.get('/getList', 
(req, res, next) => User_Controller.checkToken(req, res, next), 
async (req, res) => {
    return await User_Controller.getList(req, res)
})
router.get('/getDetail/:id',
(req, res, next) => User_Controller.checkToken(req, res, next), 
async (req, res) => {
    return await User_Controller.getID(req, res)
})

const updloadFile = (req, res, next) => {
    upload(req, res, async (err) => {
        res.locals.avatar=''
        if (err instanceof multer.MulterError) {
            res.send({ kq: 0, msg: err })
        } else if (err) {
            res.send({ kq: 0, msg: err })
        } else { 
            if(req.file != undefined){
                res.locals.avatar = req.file.filename;
            }
            next()
        }
    })
}

router.post('/create', 
(req, res, next) => User_Controller.checkToken(req, res, next), 
(req, res, next) => updloadFile(req, res, next),
async (req, res) => {
    return await User_Controller.create(req, res)
})

router.put('/update/:id',
(req, res, next) => User_Controller.checkToken(req, res, next), 
(req, res, next)=>updloadFile(req, res, next),

 async (req, res) => {
    return await User_Controller.update(req, res)
})

router.get('/active',
(req, res, next) => User_Controller.checkToken(req, res, next), 
async function (req, res) {
    return await User_Controller.active(req, res)
})

router.delete('/delete/:id', 
(req, res, next) => User_Controller.checkToken(req, res, next), 
async function (req, res) {
    return await User_Controller.delete(req, res)
})

router.post('/login', async (req, res) => {
    return await User_Controller.login(req, res)
})

module.exports = router;
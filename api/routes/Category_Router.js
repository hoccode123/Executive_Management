const express = require('express')
const router = express.Router()
//const User_Controller = require('../controllers/User_Controller')
const Category_Controller = require('../controllers/Category_Controller')
// const multer  = require('multer')
// var fs = require('fs');

// Gọi json web token
const jwt = require('jsonwebtoken');
// khóa bí mật
const secret = '#$#@#dsds';

router.get('/getList', 
(req, res, next) => Category_Controller.checkToken(req, res, next), 
async (req, res) => {
    return await Category_Controller.getList(req, res)
})
router.get('/getDetail/:id',
(req, res, next) => Category_Controller.checkToken(req, res, next), 
async (req, res) => {
    return await Category_Controller.getID(req, res)
})

// const updloadFile = (req, res, next) => {
//     upload(req, res, async (err) => {
//         res.locals.avatar=''
//         if (err instanceof multer.MulterError) {
//             res.send({ kq: 0, msg: err })
//         } else if (err) {
//             res.send({ kq: 0, msg: err })
//         } else { 
//             if(req.file != undefined){
//                 res.locals.avatar = req.file.filename;
//             }
//             next()
//         }
//     })
// }

router.post('/create', 
(req, res, next) => Category_Controller.checkToken(req, res, next), 
//(req, res, next) => updloadFile(req, res, next),
async (req, res) => {
    return await Category_Controller.create(req, res)
})

router.put('/update/:id',
(req, res, next) => Category_Controller.checkToken(req, res, next), 
//(req, res, next)=>updloadFile(req, res, next),

 async (req, res) => {
   
    return await Category_Controller.update(req, res)
})

router.get('/active',
(req, res, next) => Category_Controller.checkToken(req, res, next), 
async function (req, res) {
    return await Category_Controller.active(req, res)
})

router.delete('/delete/:id', 
(req, res, next) => Category_Controller.checkToken(req, res, next), 
async function (req, res) {
    return await Category_Controller.delete(req, res)
})



module.exports = router;
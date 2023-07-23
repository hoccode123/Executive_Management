const express = require('express')
const router = express.Router()
const moment = require('moment')


// Gọi model
const roleModels = require('../models/facts/M_Role')

//api danh sách vai trò
router.get('/list', (req, res) => {

    roleModels
    .find({})
    .exec((err, data)=>{
        if(err){
            res.send({kq:0, msg: 'Kết nối Database thất bại.'})
        }else{

            var arr=[];
            data.forEach(e=>{
                arr.push({
                    "name":e.name,
                    "value": e._id
                })
            })
            res.send({kq:1, data:arr})
        }
    })
})

// api thêm
router.post('/add', function (req, res) {
    var _name=_value=_customerID='', flag=1;
    _name=req.body.name;
    _value=req.body.value;
    _customerID=req.body.customerID;

    if(flag==1){
        roleModels
        .find({name: _name,}, (err, data)=>{
            if(err){
                res.send({kq:0, msg: 'Kết nối Database thất bại.'})
            }else{
                if(data==''){
                    // Tạo object để thêm vào db
                    const obj = {
                        name: _name,
                        value: _value,
                        customerID: _customerID,
                       
                    };
                   res.send({kq:1, obj})
                   roleModels.create(obj, (err)=>{
                        if(err){
                            res.send({kq:0, msg: 'Kết nối Database thất bại.'})
                        }else{
                            res.send({kq:1, msg: 'Tạo vai trò thành công.'})

                            // Gửi mail để kích hoạt tài khoản
                        }
                    })
                }else{
                    res.send({kq:0, msg: 'Vai trò này đã tồn tại.'})
                }
            }
        })
    }else{
        res.send({kq:0, msg: error})
    }
})
module.exports = router;
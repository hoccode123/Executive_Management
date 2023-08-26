const express = require('express')
const router = express.Router()
const User_Controller = require('../controllers/User_Controller')

router.use('/api/user', 
//(req, res, next) => User_Controller.checkToken(req, res, next), check chung 
require('../routes/User_Router'))


const General = require('../helper/General')
const Class_General = new General();

router.get('/api/gender/getList', async (req, res)=>{
    Class_General.response(res, 200, '', await Class_General.getGender())
})


module.exports = router;
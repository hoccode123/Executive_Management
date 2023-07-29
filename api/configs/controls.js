const express = require('express')
const router = express.Router()

router.use('/api/user', require('../routes/User_Router'))

const General = require('../helper/General')
const Class_General = new General();

router.get('/api/gender/getList', async (req, res)=>{
    Class_General.response(res, 200, '', await Class_General.getGender())
})


module.exports = router;
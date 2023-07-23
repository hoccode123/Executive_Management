const express = require('express')
const router = express.Router()
const moment = require('moment')
// Gọi routes
// router.use('/admin/generaldirectory/dashboards', require('../routes/R_Dashboards'))
router.use('/api/users', require('../routes/R_Users'))
//router.use('/api/cars', require('../routes/R_Cars'))
// router.use('/admin/generaldirectory/journeys', require('../routes/R_Journeys'))
// router.use('/admin/setting/menu', require('../routes/R_Settings'))
//router.use('/api/generals', require('../routes/R_Generals'))
router.use('/api/departments', require('../routes/R_Departments'))
router.use('/api/roles', require('../routes/R_Roles'))
//router.use('/api/positions', require('../routes/R_Positions'))
//router.use('/api/journeys', require('../routes/R_Journeys'))
//router.use('/api/reportpartys', require('../routes/R_ReportParty'))
// router.use('/api/words', require('../routes/R_Words'))
// router.use('/api/rooms', require('../routes/R_Rooms'))

// router.get('/calendermonth.html', (req, res) => {
//     res.render('partials/calendermonth')
// })

module.exports = router;
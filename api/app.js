// const express = require('express')
// const app = express()
// const moment = require('moment')

// const port = 3001

// // Gọi body-parser
// const bodyParser = require('body-parser')
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
// app.use(bodyParser.json())

// // Gọi database
// require('./configs/database')

// // Gọi controls
// app.use('/', require('./configs/controls'))

// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const express = require('express')
const app = express()
const port = 3010
// Gọi body-parser
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Gọi database
require('./configs/database')

// Gọi controls
app.use('/', require('./configs/controls'))

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
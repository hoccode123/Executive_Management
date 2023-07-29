const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('./configs/database')
app.use('/', require('./configs/controls'))
app.get('/', (req, res) => res.send('Hello!!!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
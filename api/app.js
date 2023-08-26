const express = require('express')
const app = express()
// var multer = require('multer');
// var forms = multer();
require('dotenv').config();
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(forms.array()); 
// app.use(bodyParser.json())
app.use(express.static('public'))
require('./configs/database')
app.use('/', require('./configs/controls'))
app.get('/', (req, res) => res.send('Hello!!!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
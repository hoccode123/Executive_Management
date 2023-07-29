const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI).then(()=>{}).catch((error)=>{console.log(error)})
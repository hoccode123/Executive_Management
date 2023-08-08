const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI).then(()=>{}).catch((error)=>{console.log(error)})
//mongoose.connect('mongodb+srv://tothuy:T123456%40@cluster0.zqvdu.mongodb.net/qlxect?retryWrites=true&w=majority').then(()=>{}).catch((error)=>{console.log(error)})
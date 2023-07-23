const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://tothuy:T123456%40@cluster0.zqvdu.mongodb.net/qlxect?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://tothuy:T123456%40@cluster0.zqvdu.mongodb.net/Executive_Management?retryWrites=true&w=majority')
.then(()=>{console.log('Kết nối thành công')})
//mongoose.connect('mongodb+srv://mean12072021:sXgqzcenqi6tKHxt@cluster0.k5bmk.mongodb.net/mean_20_12_2022?retryWrites=true&w=majority')
//.then(()=>{console.log('Kết nối thành công')})
.catch((error)=>{console.log(error)})
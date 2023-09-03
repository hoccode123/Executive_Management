
const { mongoose } = require('mongoose');
const Admin = require('../helper/Admin')
const General = require('../helper/General')
// Call model
//const Product_Model = require('../models/Product_Model')
const Product_Model = require('../models/Product_Model')
//const Gender_Schema = require('../schema/department/Gender_Schema')
//const Department_Schema = require('../schema/department/Department_Schema')
//const Role_Schema = require('../schema/facts/Role_Schema')
// Call View: pendding
const jwt = require('jsonwebtoken');
//const fs = require('fs');

// const bcrypt = require('bcryptjs');
// const salt = bcrypt.genSaltSync(10);

// const multer  = require('multer')
// var fs = require('fs');

class Product_Controller extends Admin{
    async getList(req, res){
        // const {
        //     fullname,
        //     email
        // } = req.query
        const data = await Product_Model.getList()
        //console.log(data);
        return this.response(res, 200, data);
    }
   
    async create(req, res){
        // console.log(await this.checkToken());
        // get token
         //this.verifyToken((await this.checkToken()['data']));
        const userLogin = await this.decoded(req)

               
        const {
            title,
            slug,
            desription,
            content,
            status,
            metaTitle,
            metaDescription,
            schemaStart,

        } = req.body
        //console.log(title);
        //return
        // check data
        if(this.checkEmpty(title)) return this.response(res, 603, '', 'title')
        if(this.checkEmpty(slug)) return this.response(res, 603, '', 'slug')
        const check_title_exist = await Product_Model.getField({title})
        if(check_title_exist.length != 0) return this.response(res, 605, '', 'title')
        const check_slug_exist = await Product_Model.getField({slug})
        if(check_slug_exist.length != 0) return this.response(res, 605, '', 'slug')
        
        if(this.checkDistance(metaTitle,10,70)) return this.response(res, 606,'','metaTitle',10,70)
        if(this.checkDistance(metaDescription,16,300)) return this.response(res, 606,'','metaTitle',16,300)//160-300
       
        const checkRole = await this.checkModelFieldArray(userLogin.data.role, this.roleList());
        if(!checkRole) return this.response(res, 610,'', '');
        //console.log(checkDepartment);
        const data = await Product_Model.create({
            title,
            slug,
            desription,
            content,
            status,
            metaTitle,
            metaDescription,
            schemaStart,
            createByID: userLogin.data._id
        })
        //console.log(userLogin.data._id); 
       //if(data) await this.sendEmail(data._id, email)
        return this.response(res, 200, data);
    }
    
    async update(req,res){
        //console.log(1);
        const userLogin = await this.decoded(req)
        const {
            title,
            slug,
            desription,
            content,
            status,
            metaTitle,
            metaDescription,
            schemaStart,
        } = req.body

        if(this.checkEmpty(title)) return this.response(res, 603, '', 'title')
        if(this.checkEmpty(slug)) return this.response(res, 603, '', 'slug')
        const check_title_exist = await Product_Model.getField({title})
        if(check_title_exist.length != 0) return this.response(res, 605, '', 'title')
        const check_slug_exist = await Product_Model.getField({slug})
        if(check_slug_exist.length != 0) return this.response(res, 605, '', 'slug')
        
        if(this.checkDistance(metaTitle,10,70)) return this.response(res, 606,'','metaTitle',10,70)
        if(this.checkDistance(metaDescription,16,300)) return this.response(res, 606,'','metaTitle',16,300)//160-300
       
        const checkRole = await this.checkModelFieldArray(userLogin.data.role, this.roleList());
        if(!checkRole) return this.response(res, 610,'', '');
        req.body['updateDate'] = new Date()
        req.body['updateByID'] = userLogin.data._id
       // req.body['avatar'] = res.locals.avatar
       //console.log(req.body);

       const oldData = await Product_Model.getField({_id: new mongoose.Types.ObjectId(req.params.id)})
       //const avatar = oldData[0]['avatar']
        await Product_Model.update({_id: new mongoose.Types.ObjectId(req.params.id)}, req.body)
       
        const data = await Product_Model.getField({_id: new mongoose.Types.ObjectId(req.params.id)})
        return this.response(res, 200, data);

    }
    
    async getID(req, res){
        const id = req.query
        const array = await Product_Model.getField(id, 'title slug desription content status metaTitle metaDescription schemaStart createDate updateDate createByID updateByID')
        const data=[]
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            //element['avatar'] = process.env.URL + 'uploads/user/' + element['avatar']
            data.push(element) 
        }
        return this.response(res, 200, data);
    }

    async active(req, res){
        const {id, status} = req.query
        
        // console.log({id, status});
        // return 
        // 1 check id have exist
        if(id==undefined) return this.response(res, 609, '', 'id')
        // 2. check empty
        if(this.checkEmpty(id)) return this.response(res, 603, '', 'id')
        // 3. check format: object id
        if(!this.checkObjectId(id)) return this.response(res, 604, '', 'id')
        // 4. check db
        const check_id_exist = await Product_Model.getField({_id: {$ne: new mongoose.Types.ObjectId(id)}})
        if(check_id_exist.length = 0) return this.response(res, 609, '', 'id')
        // 1 check status have exist
        if(status==undefined) return this.response(res, 404, '', 'status')
        // 2. check status empty
        if(this.checkEmpty(status)) return this.response(res, 603, '', 'status')
        // 3. check status format : ['on', 'off']
        //console.log(status.toLowerCase());
        if((status.toLowerCase()!='on' && status.toLowerCase()!='off')) return this.response(res, 604, '', 'status')
        await Product_Model.update({_id: new mongoose.Types.ObjectId(id)}, {active: status.toLowerCase()=='on'?true:false}) 
        const data = await Product_Model.getField({_id: new mongoose.Types.ObjectId(id)}, '_id email active createDate createByID')
        return this.response(res,200, data)
    }

    async delete(req, res){
        //const id = req.params // ?id=
       //console.log(_id)
       //; if(Product_Model.getID(_id)=='') return this.response(res, 404)
       const checkRole = await this.checkModelFieldArray(userLogin.data.role, this.roleList());
        if(!checkRole) return this.response(res, 610,'', '');
       
        const data = await Product_Model.delete(req.params.id)

        return this.response(res,200, data)
    }
}

module.exports = new Product_Controller
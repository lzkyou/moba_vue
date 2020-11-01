module.exports = app => {
  const express = require('express')
  const router = express.Router({ mergeParams: true })
  // const Model = require('../../models/Category')


  //post向集合(表)增加数据
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //put根据id修改数据
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //delete根据id删除数据
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  //get获取集合(表)数据limit为10条
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if(req.Model.modelName === 'Category'){
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  //通过url参数id查找相应数据
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  //CRUD通用接口，实现原理：
  //  1.通过:resource接收自定义参数(对应模型)
  //  2.编写中间件，将接收到自定义参数后通过infletion模块转换模型名称(转换成类名形式，首字母大写、去除复数)
  //  3.将自定的接口地址发送给express.Router
  app.use('/admin/api/rest/:resource', async (req,res,next)=>{
    const modelName = require('inflection').classify(req.params.resource)
    console.log(modelName);
    req.Model = require(`../../models/${modelName}`)
    next()
  } , router)
  //图片上传接口 利用multer模块创建上传地址
  const multer= require('multer')
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload', upload.single('file'), async (req,res)=>{
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    //直接返回图片的url到前端
    res.send(file.url)
  })
}
module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const router = express.Router({ mergeParams: true })
  const assert = require('http-assert')

  const AdminUser = require('../../models/AdminUser')
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

  //编写中间件验证用户登录token及真实性
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    //get获取集合(表)数据limit为10条
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  //通过url参数id查找相应数据
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })


  const auth = require('../../middleware/auth')
  const resource = require('../../middleware/resource')

  //CRUD通用接口，实现原理：
  //  1.通过:resource接收自定义参数(对应模型)
  //  2.编写中间件，将接收到自定义参数后通过infletion模块转换模型名称(转换成类名形式，首字母大写、去除复数)
  //  3.将自定的接口地址发送给express.Router
  app.use('/admin/api/rest/:resource', auth(), resource(), router)

  //图片上传接口 利用multer模块创建上传地址
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload',auth(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    //直接返回图片的url到前端
    res.send(file.url)
  })

  //登录login接口api，验证后返回一个token到前端页面
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.查找用户
    // 引入adminuser数据库，从库中查找req.body中的username是否存在
    // const AdminUser = require('../../models/AdminUser')
    const user = await AdminUser.findOne({ username }).select('+password')
    // 如果在库中无法查找到前端传过来的username，则返回报错，错误码400, 错误信息message: 用户名不存在
    assert(user, 400, '用户不存在！')
    // if (!user) {
    //   return res.status(400).send({
    //     message: '用户名不存在！'
    //   })
    // }
    //2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 400, '用户名或密码错误！')
    //3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  //异步错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
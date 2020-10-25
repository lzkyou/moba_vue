const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  //新加入的数据始终会有一个parent字段对应父分类，从而实现无限级添加分类
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

module.exports = mongoose.model('Category', schema)
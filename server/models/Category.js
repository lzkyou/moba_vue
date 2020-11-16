const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  //新加入的数据始终会有一个parent字段对应父分类，从而实现无限级添加分类
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

schema.virtual('children',{
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

schema.virtual('newsList',{
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})
module.exports = mongoose.model('Category', schema)
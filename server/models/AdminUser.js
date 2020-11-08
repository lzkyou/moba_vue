const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    //默认无法查询密码，在前端不显示
    select: false,
    set(val){
      return require('bcrypt').hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)
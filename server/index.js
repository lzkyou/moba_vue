//package.json 里面的serve配置启动项 通过nodemon启动当前index.js页面
const express = require('express')
const app = express()

app.set('secret','lzkyou')
//cors插件解决跨域 问题
app.use(require('cors')())
//json文件分析Expressv4.16.0后内置
app.use(express.json())
//静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin')(app);
require('./database/db')(app);

app.listen(3000,()=>{
  console.log('listening on port 3000!');
})

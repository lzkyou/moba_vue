const express = require('express')
const app = express()

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

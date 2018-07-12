// node 后端服务器
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const userApi = require('./api/userApi');
const articleApi = require('./api/articleApi');
const articleSortApi = require('./api/articleSortApi');


app.use(bodyParser.json({limit: '50mb'})); // 用来接收post提交的json数据
app.use(bodyParser.urlencoded({limit: '50mb',extended:true})); // 也可以接收任何数据类型的数据，包括文本、视频、图片等

// 后端api路由
app.use('/wm/user', userApi);
app.use('/wm/article', articleApi);
app.use('/wm/articleSort', articleSortApi);

// 监听端口
app.listen(3000);

console.log('Your api is running here: http://localhost:3000');
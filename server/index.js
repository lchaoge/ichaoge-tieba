// node 后端服务器
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const userController = require('./controller/userController');
const userAttentionController = require('./controller/userAttentionController');
const articleController = require('./controller/articleController');
const articleSortController = require('./controller/articleSortController');
const stayMessageController = require('./controller/stayMessageController');
const browseHistoryController = require('./controller/browseHistoryController');


app.use(bodyParser.json({limit: '50mb'})); // 用来接收post提交的json数据
app.use(bodyParser.urlencoded({limit: '50mb',extended:true})); // 也可以接收任何数据类型的数据，包括文本、视频、图片等

// 后端api路由
app.use('/wm/user', userController);
app.use('/wm/userAttention', userAttentionController);
app.use('/wm/article', articleController);
app.use('/wm/articleSort', articleSortController);
app.use('/wm/stayMessage', stayMessageController);
app.use('/wm/browseHistory', browseHistoryController);

//app.use(express.static(path.join(__dirname, 'docs')))

// 监听端口
app.listen(3000,()=>{
	console.log('Your api is running here: http://localhost:3000');	
});


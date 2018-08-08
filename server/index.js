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
const articleSortUserController = require('./controller/articleSortUserController');
const stayMessageController = require('./controller/stayMessageController');
const browseHistoryController = require('./controller/browseHistoryController');


app.use(bodyParser.json({limit: '50mb'})); // 用来接收post提交的json数据
app.use(bodyParser.urlencoded({limit: '50mb',extended:true})); // 也可以接收任何数据类型的数据，包括文本、视频、图片等

// 后端api路由
app.use('/wm/user', userController);
app.use('/wm/userAttention', userAttentionController);
app.use('/wm/article', articleController);
app.use('/wm/articleSort', articleSortController);
app.use('/wm/articleSortUser', articleSortUserController);
app.use('/wm/stayMessage', stayMessageController);
app.use('/wm/browseHistory', browseHistoryController);

// view engine setup
app.set('../views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

app.use(express.static(path.join(__dirname, '../views')));

//路由设置
app.get('*',function(req,res){
    res.render('index',{});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = {status:404};
    next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err);
    if(!err.status){
        err.status=500;
    }
    switch(err.status){
        case 403:
        err.message = '没有权限访问';
        break;
        case 404:
        err.message = '找不到这个页面';
        break;
        case 500:
        err.message='系统出错了';
        break;
    }
    res.status(err.status);
    res.render('error', {
        title: '出错拉',
        error:err
    });
});


// 监听端口
let server = app.listen(3000,()=>{
	let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


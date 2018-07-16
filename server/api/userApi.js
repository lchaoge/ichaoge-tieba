var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMapping');
var crypto = require('crypto');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '9999',
            msg: '操作失败'
        });
    } else {
    	res.json({
            code: '0000',
            msg: '操作成功',
            data:ret
        });
    }
};

// 注册
router.post('/register', (req, res) => {
	const md5 = crypto.createHash('md5');
    let addSql = $sql.user.add;
    let loginSql = $sql.user.login;
    let params = req.body;
    params.userPwd = md5.update(params.userPwd).digest('hex');
    console.log(params);
    conn.query(loginSql, [params.userPhone, params.userPwd], (err, result) => {
        if (err) {
            console.log("错误："+err);
        }
        if (result.length == 0) {
			conn.query(addSql,[params.userPhone, params.userPwd], (err, result) => {
				if(err){
					console.log('错误：'+err)
				}
				if(result){
					jsonWrite(res,0)
				}
			})	
        }else{
        	// 已经注册
        	jsonWrite(res,1)
        }
    })
    
	
});

// 登录
router.post('/login',(req,res)=>{
	const md5 = crypto.createHash('md5');
	let sql = $sql.user.login;
	let params = req.body;
	params.userPwd = md5.update(params.userPwd).digest('hex');
	conn.query(sql,[params.userPhone,params.userPwd],(err,result) => {
		if(err){
			console.log('登录错误：'+err)
		}
		if(result){
			jsonWrite(res,result)
		}
	})
});

// 搜索用户名
router.post('/likeUserName',(req,res)=>{
//	let sql = $sql.articleSort.likeArtsName;
	let params = req.body;
	let sql = 'select * from user where user.user_name like "%'+params.name+'%"'
	console.log(sql)
	// 获取前台页面传过来的参数
	conn.query(sql,[],(err,result) => {
		if(err){
			console.log('搜索用户名错误：'+err)
		}
		if(result){
			jsonWrite(res,result)
		}
	})
});

// 分页
router.post('/queryAllUser',(req,res)=>{
	let sql = $sql.user.queryAllUser;
	let params = req.body;
	console.log("==========")
	console.log(params);
	console.log("==========")
	// 获取前台页面传过来的参数
    let currentPage = parseInt(params.currentPage || 1);// 页码
    let end = parseInt(params.pageSize || 10); // 默认页数
    let start = (currentPage - 1) * end;
	conn.query(sql,[start,end],(err,result) => {
		if(err){
			console.log('错误：'+err)
		}
		if(result){
			jsonWrite(res,result)
		}
	})
});

module.exports = router;
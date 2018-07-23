const models = require('../db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sqlMapping');
const crypto = require('crypto');
const commonController = require('./base/CommonController')

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

let loginEvt = (params,callback)=>{
	let queryByUserPhone = $sql.user.queryByUserPhone;
	conn.query(queryByUserPhone, [params.user_phone], (err, result) => {
		if (err) {
            console.log("错误："+err);
        }
		if(result){
			callback(result)
		}
	})
}
// 注册
router.post('/register', (req, res) => {
	const md5 = crypto.createHash('md5');
    let addSql = $sql.user.add;
    let params = req.body;
    params.user_pwd = md5.update(params.user_pwd).digest('hex');
    params.user_image_url = '../../static/images/user.jpg'
    params.user_name = params.user_phone
    loginEvt(params,(data)=>{
    	if (data.length == 0) {
			conn.query(addSql,[params.user_phone, params.user_pwd,params.user_image_url,params.user_name], (err, result) => {
				if(err){
					console.log('错误：'+err)
				}
				if(result){
					commonController.jsonWrite(res,0)
				}
			})	
        }else{
        	// 已经注册
        	commonController.jsonWrite(res,1)
        }
    })
});

// 登录
router.post('/login',(req,res)=>{
	const md5 = crypto.createHash('md5');
	let sql = $sql.user.login;
	let params = req.body;
	params.user_pwd = md5.update(params.user_pwd).digest('hex');
	conn.query(sql,[params.user_phone,params.user_pwd],(err,result) => {
		if(err){
			console.log('登录错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

// 搜索用户名
router.post('/likeUserName',(req,res)=>{
//	let sql = $sql.articleSort.likeArtsName;
	let params = req.body;
	let sql = 'select * from user where user.user_name like "%'+params.name+'%"'
	// 获取前台页面传过来的参数
	conn.query(sql,[],(err,result) => {
		if(err){
			console.log('搜索用户名错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

// 分页
router.post('/queryAllUser',(req,res)=>{
	let sql = $sql.user.queryAllUser;
	let params = req.body;
    let currentPage = parseInt(params.currentPage || 1);// 页码
    let end = parseInt(params.pageSize || 10); // 默认页数
    let start = (currentPage - 1) * end;
	conn.query(sql,[start,end],(err,result) => {
		if(err){
			console.log('错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

module.exports = router;
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMapping');
const multer = require('../multer');

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


// 分页
router.post('/queryAllArticle',(req,res)=>{
	let sql = $sql.article.queryAllArticle;
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
function getDateFunc(allFlag, times) {
    var date = new Date();
    if (undefined !== times && /^[0-9]*$/.test(times)) {
      date = new Date(times);
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month > 9 ? month : '0' + month);
    var day = date.getDate();
    day = (day > 9 ? day : '0' + day);
    var hours = date.getHours();
    hours = (hours > 9 ? hours : '0' + hours);
    var minutes = date.getMinutes();
    minutes = (minutes > 9 ? minutes : '0' + minutes);
    var seconds = date.getSeconds();
    seconds = (seconds > 9 ? seconds : '0' + seconds);
    return allFlag == 'all' ? (year + '-' + month + "-" + day + " " + hours + ':' + minutes + ':' + seconds) : (year + '-' + month + "-" + day);
}
// 插入
router.post('/insert', multer.array('img'),(req,res,next)=>{
	let articleInsertSql = $sql.article.insert;
	let articleImagesInsertSql = 'insert into article_image (article_id,article_image_url)values';
	let params = req.body;
	params.article_up = 0
	params.article_support = 0
	params.article_time = getDateFunc('all')
	
	console.log(params);
	// 主表
	let p = new Promise((resolve, reject)=>{
		conn.query(articleInsertSql,[params.article_name,params.article_time,params.article_ip,params.article_click,params.sort_article_id,params.user_id,params.article_type,params.article_content,params.article_up,params.article_support],(err,result) => {
			result ? resolve(result) : reject(error);
		})
	})
	// 主表查询用户插入的最后一条ID 插入子表
	p.then((result)=>{
		if(req.files.length>0){
			console.log("===============================")
			req.files.forEach((item)=>{
				let filePath = '../../static/uploads/images/' + item.filename;
				articleImagesInsertSql += '((select a.article_id from article as a where a.user_id = '+params.user_id+' order by a.article_id desc limit 1),"'+filePath+'"),'
			})
			let imagesInsertSql = articleImagesInsertSql.substring(0,articleImagesInsertSql.length-1)
			console.log(imagesInsertSql)
			conn.query(imagesInsertSql,[],(err,result) => {
				if(err){
					console.log('子表插入错误：'+err)
				}
				if(result){
					jsonWrite(res,result)
				}
			})	
		}else{
			jsonWrite(res,result)
		}
				
	}).catch(err=>{
		console.log('主表插入错误：'+err)
	})
	
});


// 首页
router.post('/index',(req,res)=>{
	let sql = $sql.article.queryAllArticle;
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
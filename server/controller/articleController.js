const models = require('../db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sqlMapping');
const multer = require('../multer');
const commonController = require('./base/CommonController')

// 连接数据库
let conn = mysql.createConnection(models.mysql);
conn.connect();


let getCount = (callback)=>{
	let sql = $sql.article.count;
	conn.query(sql,[],(err,result) => {
		if(err){
			console.log('查询总行数错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}
let getImages = (article_id,callback)=>{
	let sql = $sql.articleImages.queryByArticleId;
	conn.query(sql,[article_id],(err,result) => {
		if(err){
			console.log('根据article_id查询images错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}

// 查询用户发布总数
let queryCountByUserIdEvt = (user_id,callback)=>{
	let sql = $sql.article.queryCountByUserId;
	conn.query(sql,[user_id],(err,result) => {
		if(err){
			console.log('查询用户发布总数错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}

// 我的帖子分页
let queryByUserIdEvt = (user_id,currentPage,pageSize,callback)=>{
	let sql = $sql.article.queryByUserId;
	currentPage = parseInt(currentPage || 1);// 页码
    let end = parseInt(pageSize || 10); // 默认页数
    let start = (currentPage - 1) * end;
	conn.query(sql,[user_id,start,end],(err,result) => {
		if(err){
			console.log('我的帖子分页错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}

// 搜索文章
router.post('/likeArtName',(req,res)=>{
//	let sql = $sql.articleSort.likeArtsName;
	let params = req.body;
	let sql = 'select * from article where article.article_name like "%'+params.name+'%"'
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

// 我的帖子分页
router.post('/articlePageByUserId',(req,res)=>{
	let params = req.body;
	queryCountByUserIdEvt(params.user_id,(c)=>{
		queryByUserIdEvt(params.user_id,params.currentPage,params.pageSize,(result)=>{
			if(result.length>0){
				let queryByArticleId = '';
				result.forEach(item=>{
					queryByArticleId+=' SELECT article_image_id,article_id,article_image_url FROM article_image where article_id='+item.article_id+' UNION ALL'
				})
				queryByArticleId = queryByArticleId.substring(0,queryByArticleId.length-9)
				let p = new Promise((resolve, reject)=>{
					conn.query(queryByArticleId,[],(err,data) => {
						data ? resolve(data) : reject(err);
					})
				})
				p.then((data)=>{
					result.forEach(item=>{
						item.images = []
						data.forEach(el=>{
							if(el.article_id == item.article_id){
								item.images.push(el)
							}
						})
					})	
					commonController.jsonWrite(res,{
						currentPage:params.currentPage,
						pageSize:params.pageSize,
						count:c[0].count,
						pageCount:Math.ceil(c[0].count/(params.currentPage*params.pageSize)),
						list:result
					})
				}).catch(err=>{
					console.log('查询帖子图片失败：'+err)
				})
			}else{
				commonController.jsonWrite(res,{
					currentPage:params.currentPage,
					pageSize:params.pageSize,
					count:c[0].count,
					pageCount:Math.ceil(c[0].count/(params.currentPage*params.pageSize)),
					list:result
				})
			}
			
			
			
		})
	})
	
});

// 修改查看人数
router.post('/updateClickByArticleId',(req,res)=>{
	let sql = $sql.article.updateClickByArticleId;
	let params = req.body;
	// 获取前台页面传过来的参数
	conn.query(sql,[params.article_id],(err,result) => {
		if(err){
			console.log('错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

// 详情
router.post('/detail',(req,res)=>{
	let sql = $sql.article.queryByArticleId;
	let params = req.body;
	// 获取前台页面传过来的参数
	getImages(params.article_id,(data)=>{
		conn.query(sql,[params.article_id],(err,result) => {
			if(err){
				console.log('错误：'+err)
			}
			if(result){
				result[0].images = []
				data.forEach(item=>{
					result[0].images.push(item)
				})
				commonController.jsonWrite(res,result)
			}
		})
	})
});

// 增加帖子
router.post('/insert', multer.array('img'),(req,res,next)=>{
	let articleInsertSql = $sql.article.insert;
	let articleImagesInsertSql = 'insert into article_image (article_id,article_image_url)values';
	let params = req.body;
	params.article_up = 0
	params.article_support = 0
	params.article_click = 0
	params.article_time = commonController.getDateFunc('all')
	// 主表
	let p = new Promise((resolve, reject)=>{
		conn.query(articleInsertSql,[params.type_id,params.article_name,params.article_time,params.article_ip,params.article_click,params.sort_article_id,params.user_id,params.article_type,params.article_content,params.article_up,params.article_support],(err,result) => {
			result ? resolve(result) : reject(err);
		})
	})
	// 主表查询用户插入的最后一条ID 插入子表
	p.then((result)=>{
		if(req.files.length>0){
			req.files.forEach((item)=>{
				let filePath = '../../static/uploads/images/' + item.filename;
				articleImagesInsertSql += '((select a.article_id from article as a where a.user_id = '+params.user_id+' order by a.article_id desc limit 1),"'+filePath+'"),'
			})
			let imagesInsertSql = articleImagesInsertSql.substring(0,articleImagesInsertSql.length-1)
			conn.query(imagesInsertSql,[],(err,result) => {
				if(err){
					console.log('子表插入错误：'+err)
				}
				if(result){
					commonController.jsonWrite(res,result)
				}
			})	
		}else{
			commonController.jsonWrite(res,result)
		}
				
	}).catch(err=>{
		console.log('主表插入错误：'+err)
	})
	
});

// 当前用户发布的帖子
router.post('/queryArticleByUserId',(req,res)=>{
	let sql = $sql.article.queryArticleByUserId;
	let params = req.body;
	// 获取前台页面传过来的参数
	conn.query(sql,[params.user_id],(err,result) => {
		if(err){
			console.log('错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

// 首页
router.post('/index',(req,res)=>{
	let indexSql = $sql.article.index;
	let queryByArticleId = '' //SELECT article_image_id,article_id,article_image_url FROM article_image where article_id=? UNION ALL
	let params = req.body;
	getCount((c)=>{
		// 获取前台页面传过来的参数
	    let currentPage = parseInt(params.currentPage || 1);// 页码
	    let end = parseInt(params.pageSize || 10); // 默认页数
	    let start = (currentPage - 1) * end;
	    // 主表
		conn.query(indexSql,[start,end],(err,result) => {
			if(err){
				console.log('主表查询错误：'+err)
			}
			if(result){
				result.forEach(item=>{
					queryByArticleId+=' SELECT article_image_id,article_id,article_image_url FROM article_image where article_id='+item.article_id+' UNION ALL'
				})
				queryByArticleId = queryByArticleId.substring(0,queryByArticleId.length-9)
				let p = new Promise((resolve, reject)=>{
					conn.query(queryByArticleId,[],(err,data) => {
						data ? resolve(data) : reject(err);
					})
				})
				p.then((data)=>{
					result.forEach(item=>{
						item.images = []
						data.forEach(el=>{
							if(el.article_id == item.article_id){
								item.images.push(el)
							}
						})
					})	
					commonController.jsonWrite(res,{
						currentPage:params.currentPage,
						pageSize:params.pageSize,
						count:c[0].count,
						pageCount:Math.ceil(c[0].count/(params.currentPage*params.pageSize)),
						list:result
					})
				}).catch(err=>{
					console.log('子表查询错误：'+err)
				})
				
			}
		})
		
	})
	
	
	
	
	
});


module.exports = router;
const models = require('../db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sqlMapping');
const commonController = require('./base/CommonController')


// 连接数据库
const conn = mysql.createConnection(models.mysql);
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
// 最近逛的吧
router.post('/latelys',(req,res)=>{
//	let sql = $sql.articleSort.latelys;
	let params = req.body;
	let sql = 'select * from article_sort as art_s where art_s.sort_article_id in ('+params.latelys+')'
	conn.query(sql,[params.latelys],(err,result) => {
		if(err){
			console.log('最近逛的吧查询错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});
// 关注的吧查询
let followEvt = (user_id,callback)=>{
	let sql = $sql.articleSort.follow;
	conn.query(sql,[user_id],(err,result) => {
		if(err){
			console.log('关注的吧查询错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}
// 关注的吧分页查询
router.post('/followPage',(req,res)=>{
	let params = req.body;
	followEvt(params.user_id,(c)=>{
		let sql = $sql.articleSort.followPage;
		let currentPage = parseInt(params.currentPage || 1);// 页码
	    let end = parseInt(params.pageSize || 10); // 默认页数
	    let start = (currentPage - 1) * end;
	    
		conn.query(sql,[params.user_id,start,end],(err,result) => {
			if(err){
				console.log('关注的吧分页查询错误：'+err)
			}
			if(result){
				commonController.jsonWrite(res,{
					currentPage:params.currentPage,
					pageSize:params.pageSize,
					count:c.length,
					pageCount:Math.ceil(c.length/(params.currentPage*params.pageSize)),
					list:result
				})
			}
		})
	})
	
});

// 关注的吧查询
router.post('/follow',(req,res)=>{
	let params = req.body;
	followEvt(params.user_id,(data)=>{
		commonController.jsonWrite(res,data)
	})
});

// 根据ID查询
router.post('/queryById',(req,res)=>{
	let sql = $sql.articleSort.queryById;
	let params = req.body;
	// 获取前台页面传过来的参数
	conn.query(sql,[params.sort_article_id],(err,result) => {
		if(err){
			console.log('根据ID查询错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

// 搜索贴吧名
router.post('/likeArtsName',(req,res)=>{
//	let sql = $sql.articleSort.likeArtsName;
	let params = req.body;
	let sql = 'select * from article_sort where article_sort.sort_article_name like "%'+params.name+'%"'
	// 获取前台页面传过来的参数
	conn.query(sql,[],(err,result) => {
		if(err){
			console.log('搜索贴吧名错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

// 根据ID所有文章
router.post('/articleSortIndex',(req,res)=>{
//	let sql = $sql.articleSort.articleSortIndex;
	let essence = ''
	let params = req.body;
	if(params.essence == 1){
		essence = 'and art.essence = 1'
	}
	let sql = 'SELECT art.image_type_id,art.article_id,art.article_name,art.article_content,art.article_time,art.article_click,art_s.sort_article_name,u.user_image_url,u.user_name,u.user_id,art_s.sort_article_id	FROM article AS art left JOIN article_sort AS art_s ON art.sort_article_id = art_s.sort_article_id left JOIN USER AS u ON u.user_id = art.user_id where art.type_id = 0 and art.sort_article_id = ? '+essence+' ORDER BY art.article_time desc limit ?,?';
	let currentPage = parseInt(params.currentPage || 1);// 页码
    let end = parseInt(params.pageSize || 10); // 默认页数
    let start = (currentPage - 1) * end;
	getCount((c)=>{
		conn.query(sql,[params.sort_article_id,start,end],(err,result) => {
			if(err){
				console.log('根据ID所有文章错误：'+err)
			}
			if(result && result.length>0){
				let queryByArticleId = ''
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
			}else{
				commonController.jsonWrite(res,{
					currentPage:params.currentPage,
					pageSize:params.pageSize,
					count:c[0].count,
					pageCount:Math.ceil(c[0].count/(params.currentPage*params.pageSize)),
					list:[]
				})
			}
		})
	})
});

module.exports = router;
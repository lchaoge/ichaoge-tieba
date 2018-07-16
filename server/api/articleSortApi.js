var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMapping');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = (res, ret) => {
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
			jsonWrite(res,result)
		}
	})
});
// 关注的吧查询
router.post('/follow',(req,res)=>{
	let sql = $sql.articleSort.follow;
	let params = req.body;
	conn.query(sql,[params.user_id],(err,result) => {
		if(err){
			console.log('关注的吧查询错误：'+err)
		}
		if(result){
			jsonWrite(res,result)
		}
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
			jsonWrite(res,result)
		}
	})
});

// 搜索贴吧名
router.post('/likeArtsName',(req,res)=>{
//	let sql = $sql.articleSort.likeArtsName;
	let params = req.body;
	let sql = 'select * from article_sort where article_sort.sort_article_name like "%'+params.name+'%"'
	console.log(sql)
	// 获取前台页面传过来的参数
	conn.query(sql,[],(err,result) => {
		if(err){
			console.log('搜索贴吧名错误：'+err)
		}
		if(result){
			jsonWrite(res,result)
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
	let sql = 'SELECT art.article_id,art.article_name,art.article_content,art.article_time,art.article_click,art_s.sort_article_name,u.user_image_url,u.user_name,art_s.sort_article_id	FROM article AS art left JOIN article_sort AS art_s ON art.sort_article_id = art_s.sort_article_id left JOIN USER AS u ON u.user_id = art.user_id where art.type_id = 0 and art.sort_article_id = ? '+essence+' ORDER BY art.article_time desc limit ?,?';
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
					jsonWrite(res,{
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
				jsonWrite(res,{
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
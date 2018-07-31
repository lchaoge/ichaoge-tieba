const models = require('../db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sqlMapping');
const commonController = require('./base/CommonController')


// 连接数据库
const conn = mysql.createConnection(models.mysql);
conn.connect();

// 查看用户是否关注贴吧
let isFollowEvt = (user_id,article_sort_id,callback)=>{
	let sql = $sql.articleSortUser.queryIsFollow;
	conn.query(sql,[user_id,article_sort_id],(err,result) => {
		if(err){
			console.log('查看用户是否关注贴吧错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}

// 查询多少人关注了吧
router.post('/queryCountBySortId',(req,res)=>{
	let sql = $sql.articleSortUser.queryCountBySortId;
	let params = req.body;
	conn.query(sql,[params.sort_article_id],(err,result) => {
		if(err){
			console.log('查询多少人关注了吧错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

// 查看用户是否关注贴吧
router.post('/isFollow',(req,res)=>{
	let params = req.body;
	isFollowEvt(params.user_id,params.article_sort_id,(data)=>{
		commonController.jsonWrite(res,data)
	})
});

// 插入
router.post('/insert',(req,res)=>{
	let sql = $sql.articleSortUser.insert;
	let params = req.body;
	params.createtime = commonController.getDateFunc('all')
	conn.query(sql,[params.user_id,params.article_sort_id,params.createtime],(err,result) => {
		if(err){
			console.log('插入关注的吧错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

module.exports = router;
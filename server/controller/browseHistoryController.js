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


let countByUserIdEvt = (user_id,callback)=>{
	let sql = $sql.browseHistory.countByUserId;
	conn.query(sql,[user_id],(err,result) => {
		if(err){
			console.log('查询总行数错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}
let isExistEvt = (user_id,article_id,callback)=>{
	let sql = $sql.browseHistory.isExist;
	conn.query(sql,[user_id,article_id],(err,result) => {
		if(err){
			console.log('查询总行数错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}
// 插入浏览历史
router.post('/insert',(req,res)=>{
	let sql = $sql.browseHistory.insert;
	let params = req.body;
	params.createtime = commonController.getDateFunc('all');
	isExistEvt(params.user_id,params.article_id,(data)=>{
		if(data.length>0){
			// 有这条数据 修改时间即可
			let sql = $sql.browseHistory.update;
			conn.query(sql,[params.user_id,params.article_id,params.createtime,data[0].b_id],(err,result) => {
				if(err){
					console.log('修改浏览历史错误：'+err)
				}
				if(result){
					commonController.jsonWrite(res,result)
				}
			})
		}else{
			let sql = $sql.browseHistory.insert;
			conn.query(sql,[params.user_id,params.article_id,params.createtime],(err,result) => {
				if(err){
					console.log('插入浏览历史错误：'+err)
				}
				if(result){
					commonController.jsonWrite(res,result)
				}
			})
		}
	})
	
});

// 清空用户浏览
router.post('/empty',(req,res)=>{
	let sql = $sql.browseHistory.empty;
	let params = req.body;
	conn.query(sql,[params.user_id],(err,result) => {
		if(err){
			console.log('清空用户浏览错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

// 浏览历史分页
router.post('/historyPage',(req,res)=>{
	let sql = $sql.browseHistory.historyPage;
	let params = req.body;
	countByUserIdEvt(params.user_id,(c)=>{
	    let currentPage = parseInt(params.currentPage || 1);// 页码
	    let end = parseInt(params.pageSize || 10); // 默认页数
	    let start = (currentPage - 1) * end;
		conn.query(sql,[params.user_id,start,end],(err,result) => {
			if(err){
				console.log('浏览历史分页错误：'+err)
			}
			if(result){
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




module.exports = router;
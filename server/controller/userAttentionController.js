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

// 查询关注总数
let followCount = (user_id,callback)=>{
	let sql = $sql.userAttention.followCount;
	conn.query(sql,[user_id],(err,result) => {
		if(err){
			console.log('查询关注总数错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}

// 用户关注
let followEvt = (user_id,currentPage,pageSize,callback)=>{
	let sql = $sql.userAttention.follow;
	currentPage = parseInt(currentPage || 1);// 页码
    let end = parseInt(pageSize || 10); // 默认页数
    let start = (currentPage - 1) * end;
	conn.query(sql,[user_id,start,end],(err,result) => {
		if(err){
			console.log('用户关注错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}

// 查询用户粉丝总数
let fansCountEvt = (attention_id,callback)=>{
	let sql = $sql.userAttention.fansCount;
	conn.query(sql,[attention_id],(err,result) => {
		if(err){
			console.log('查询用户粉丝总数错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}

// 查询用户粉丝
let fansEvt = (attention_id,currentPage,pageSize,callback)=>{
	let sql = $sql.userAttention.fans;
	currentPage = parseInt(currentPage || 1);// 页码
    let end = parseInt(pageSize || 10); // 默认页数
    let start = (currentPage - 1) * end;
	conn.query(sql,[attention_id,start,end],(err,result) => {
		if(err){
			console.log('查询用户粉丝错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}

// 用户关注
router.post('/follow',(req,res)=>{
	let params = req.body;
	followCount(params.user_id,(c)=>{
		// 我关注的并且关注我的用户
		followEvt(params.user_id,params.currentPage,params.pageSize,(data)=>{
			let sql = $sql.userAttention.follow2;
			conn.query(sql,[params.user_id,params.user_id],(err,result) => {
				if(err){
					console.log('我关注的并且关注我的用户查询错误：'+err)
				}
				if(result){
					let obj = []
					data.forEach(item=>{
						result.forEach(el=>{
							if(item.user_id == el.user_id){
								item.attention_type = 1 // 互相关注
							}else{
								item.attention_type = 0 // 已关注
							}
							item.show = true
							console.log()
						})
						obj.push(item)
					})
					console.log(obj)
					commonController.jsonWrite(res,{
						currentPage:params.currentPage,
						pageSize:params.pageSize,
						count:c[0].count,
						pageCount:Math.ceil(c[0].count/(params.currentPage*params.pageSize)),
						list:obj
					})
				}
			})	
		})
	})
	
});

// 查询关注总数 
router.post('/followCount',(req,res)=>{
	let sql = $sql.userAttention.followCount;
	let params = req.body;
	followCount(params.user_id,(c)=>{
		commonController.jsonWrite(res,c)
	})
});

// 插入关注 
router.post('/insert',(req,res)=>{
	let sql = $sql.userAttention.insert;
	let params = req.body;
	params.createtime = commonController.getDateFunc('all');
	conn.query(sql,[params.user_id,params.attention_id,params.createtime],(err,result) => {
		if(err){
			console.log('插入关注错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

// 删除关注 
router.post('/delete',(req,res)=>{
	let sql = $sql.userAttention.delete;
	let params = req.body;
	conn.query(sql,[params.user_id,params.attention_id],(err,result) => {
		if(err){
			console.log('删除关注错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

// 查询关注总数 
router.post('/fansCount',(req,res)=>{
	let sql = $sql.userAttention.followCount;
	let params = req.body;
	fansCountEvt(params.user_id,(c)=>{
		commonController.jsonWrite(res,c)
	})
});

// 用户粉丝
router.post('/fans',(req,res)=>{
	let params = req.body;
	fansCountEvt(params.user_id,(c)=>{
		fansEvt(params.user_id,params.currentPage,params.pageSize,(data)=>{
			let sql = $sql.userAttention.fans2;		
			conn.query(sql,[params.user_id],(err,result) => {
				if(err){
					console.log('查询粉丝关注的用户错误：'+err)
				}
				if(result){
					let obj = []
					data.forEach(item=>{
						item.attention_type = 0 // 没关注
						result.forEach(el=>{
							if(item.user_id == el.user_id && el.attention_id == params.user_id){
								item.attention_type = 1 // 互相关注
							}
						})
						obj.push(item)
					})
					commonController.jsonWrite(res,{
						currentPage:params.currentPage,
						pageSize:params.pageSize,
						count:c[0].count,
						pageCount:Math.ceil(c[0].count/(params.currentPage*params.pageSize)),
						list:obj
					})
				}
			})
			
		})
	})
	
	
	
});


module.exports = router;
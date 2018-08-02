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

// 查询最后一个插入的楼层
let queryByFloorEvt = (article_id,callback)=>{
	let queryByFloorSql = $sql.stayMessage.queryByFloor;
	conn.query(queryByFloorSql,[article_id],(err,result) => {
		if(err){
			console.log('查询最后一个插入的楼层错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}

// 楼层查询
let queryFloorAllEvt = (article_id,callback)=>{
	let queryFloorAllSql = $sql.stayMessage.queryFloorAll;
	conn.query(queryFloorAllSql,[article_id],(err,result) => {
		if(err){
			console.log('楼层查询错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}
// 查看总数
let queryOneFloorListCountEvt = (article_id,floor,callback)=>{
	let queryFloorAllSql = $sql.stayMessage.queryOneFloorListCount;
	conn.query(queryFloorAllSql,[article_id,floor],(err,result) => {
		if(err){
			console.log('楼层查询总数错误：'+err)
		}
		if(result){
			callback(result)
		}
	})
}

// 查询单个楼层
router.post('/queryOneFloor',(req,res)=>{
	let params = req.body;
	let sql = $sql.stayMessage.queryOneFloor;
	conn.query(sql,[params.article_id,params.floor],(err,result) => {
		if(err){
			console.log('查询单个楼层错误：'+err)
		}
		if(result){
			commonController.jsonWrite(res,result)
		}
	})
});

// 查看单个楼层的子评论
router.post('/queryOneFloorList',(req,res)=>{
	let params = req.body;
	queryOneFloorListCountEvt(params.article_id,params.floor,(c)=>{
		let sql = $sql.stayMessage.queryOneFloorList;
		let currentPage = parseInt(params.currentPage || 1);// 页码
	    let end = parseInt(params.pageSize || 10); // 默认页数
	    let start = (currentPage - 1) * end;
		conn.query(sql,[params.article_id,params.floor,start,end],(err,result) => {
			if(err){
				console.log('查看单个楼层的子评论错误：'+err)
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

// 插入评论
router.post('/insert',(req,res)=>{
	let params = req.body;
	let insertSql = $sql.stayMessage.insert;
	queryByFloorEvt(params.article_id,(data)=>{
		params.message_stay_time = commonController.getDateFunc('all');
		if(params.parent_id){
			// 子评论
		}else{
			if(data[0]){
				params.floor = parseInt(data[0].floor)+1;	
			}else{
				params.floor = 1
			}
		}
		conn.query(insertSql,[params.article_id,params.user_id,params.stay_user_id,params.parent_id,params.floor,params.message_content,params.stay_user_ip,params.message_stay_time],(err,result) => {
			if(err){
				console.log('插入评论错误：'+err)
			}
			if(result){
				commonController.jsonWrite(res,result)
			}
		})
	})
});

// 查询评论
router.post('/queryFloorAll',(req,res)=>{
	let params = req.body;
	queryFloorAllEvt(params.article_id,(data)=>{
		if(data.length>0){
			let queryFloorByParentIdSql = ''
			data.forEach(stayMessage=>{
				queryFloorByParentIdSql += '(select s.*,u.user_name,u.user_image_url,(select uu.user_name from user as uu where uu.user_id = s.user_id) as stay_user_name from stay_message as s join user as u on s.stay_user_id = u.user_id where s.article_id = '+stayMessage.article_id+' and s.parent_id = '+stayMessage.stay_id+' order by s.stay_id)UNION ALL'					
			})
			queryFloorByParentIdSql = queryFloorByParentIdSql.substring(0,queryFloorByParentIdSql.length-9)
			conn.query(queryFloorByParentIdSql,[],(err,result) => {
				if(err){
					console.log('楼层评论错误：'+err)
				}
				if(result){
					data.forEach(item=>{
						item.children = []
						result.forEach(el=>{
							if(el.parent_id == item.stay_id){
								item.children.push(el)
							}
						})
					})	
					commonController.jsonWrite(res,data)
				}
			})	
		}else{
			commonController.jsonWrite(res,[])
		}
	})
});


module.exports = router;
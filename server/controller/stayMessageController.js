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
				queryFloorByParentIdSql += '(select s.*,u.user_name,u.user_image_url from stay_message as s join user as u on s.stay_user_id = u.user_id where s.article_id = '+stayMessage.article_id+' and s.parent_id = '+stayMessage.stay_id+' order by s.stay_id)UNION ALL'					
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
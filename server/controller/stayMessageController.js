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
let queryByFloorEvt = (callback)=>{
	let queryByFloorSql = $sql.stayMessage.queryByFloor;
	conn.query(queryByFloorSql,[],(err,result) => {
		if(err){
			console.log('查询最后一个插入的楼层错误：'+err)
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
	queryByFloorEvt((data)=>{
		params.message_stay_time = commonController.getDateFunc('all');
		params.floor = parseInt(data[0].floor)+1;
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


module.exports = router;
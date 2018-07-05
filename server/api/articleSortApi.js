var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMapping');

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
router.post('/queryAllByUserId',(req,res)=>{
	let sql = $sql.articleSort.queryAllByUserId;
	let params = req.body;
	console.log(params);
	// 获取前台页面传过来的参数
	conn.query(sql,[params.userId],(err,result) => {
		if(err){
			console.log('错误：'+err)
		}
		if(result){
			jsonWrite(res,result)
		}
	})
});

module.exports = router;
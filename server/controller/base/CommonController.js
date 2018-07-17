/*
 * Description: 公共方法
 * Author: chaoge
 * Date: 2018/05/23
*/

module.exports ={
	
	/*
	 * 返回公共方法
	 */
	jsonWrite(res, ret){
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
	},
	
	/*
	 * 获取日期
	 * @allFlag = all 精确到时分秒
	 * @times = 传入参数
	 */
	getDateFunc(allFlag, times){
	    var date = new Date();
	    if (undefined !== times && /^[0-9]*$/.test(times)) {
	      date = new Date(times);
	    }
	    var year = date.getFullYear();
	    var month = date.getMonth() + 1;
	    month = (month > 9 ? month : '0' + month);
	    var day = date.getDate();
	    day = (day > 9 ? day : '0' + day);
	    var hours = date.getHours();
	    hours = (hours > 9 ? hours : '0' + hours);
	    var minutes = date.getMinutes();
	    minutes = (minutes > 9 ? minutes : '0' + minutes);
	    var seconds = date.getSeconds();
	    seconds = (seconds > 9 ? seconds : '0' + seconds);
	    return allFlag == 'all' ? (year + '-' + month + "-" + day + " " + hours + ':' + minutes + ':' + seconds) : (year + '-' + month + "-" + day);
	}
	
}

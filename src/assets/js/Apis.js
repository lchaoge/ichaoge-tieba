/*
 * Description: Apis公共方法
 * Author: chaoge
 * Date: 2018/05/23
*/

export default class Apis {
	constructor(){
		
	}
	
	/**
	 * get 查看
	 */
	async ajaxGetFetch(url){
		const response = await fetch(url);
		const resData = await response.json();
		return resData;		
	}
	
	/**
	 * post 新增
	 */
	async ajaxPostFetch(url,param){
		const response = await fetch(url,{
			method:'post',
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.stringify(param)
		});
		const resData = await response.json();
		return resData;		
	}
	
	/**
	 * put 修改
	 */
	async ajaxPutFetch(url,param){
		const response = await fetch(url,{
			method:'PUT',
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.stringify(param)
		});
		const resData = await response.json();
		return resData;
	}

	/*
	 * delete 删除
	 */
	async ajaxDeleteFetch(url){
		const response = await fetch(url,{
			method:'DELETE',
			headers:{
				'Content-type':'application/json'
			}
		});
		const resData = await '数据删除成功！';
		return resData;		
	}
	
	/**
	 * 获取日期
	 * 对Date的扩展，将 Date 转化为指定格式的String
	 * 月(M)、日(d)、小时(h)、分(m)、秒(s)可以用 1-2 个占位符，
	 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	 * 例子：
	 * publicNode.dateFormat("yyyy-MM-dd hh:mm:ss.S","2016-07-02") ==> 2006-07-02 08:09:04.423
	 * publicNode.dateFormat("yyyy-M-d h:m:s.S","2016/07/02")      ==> 2006-7-2 8:9:4.18
	 * publicNode.dateFormat("yyyy-M-d h:m:s.S","2016/7/2")      ==> 2006-7-2 8:9:4.18
	 * times:格式必须为：2016-07-02||2016/07/02
	 */
	dateFormat(fmt,times){
	    if(fmt === "" && fmt === undefined){
	        return null;
	    }
	    let date = new Date();
	    if (undefined !== times && times!== "") {
	        let timestamp = times;
	        if(!(/[0-9]{13}/.test(times))){
	            if(/^(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/.test(times)){
	                timestamp = new Date((times+"").replace(/(-|年|月)/g,'/').replace(/日/g,"")).getTime();
	            }else{
	                return null;
	            }
	        }
	        date = new Date(parseInt(timestamp));
	    }
	    let o = {
	        "M+": date.getMonth() + 1, //月份
	        "d+": date.getDate(), //日
	        "h+": date.getHours(), //小时
	        "m+": date.getMinutes(), //分
	        "s+": date.getSeconds(), //秒
	        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
	        "S": date.getMilliseconds() //毫秒
	    };
	    if (/(y+)/.test(fmt))
	        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (let k in o)
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	
	/**
	 * 获取日期
	 */
  	getDateFunc(allFlag, times) {
	    let date = new Date();
	    if (undefined !== times && /^[0-9]*$/.test(times)) {
	      date = new Date(times);
	    }
	    let year = date.getFullYear();
	    let month = date.getMonth() + 1;
	    month = (month > 9 ? month : '0' + month);
	    let day = date.getDate();
	    day = (day > 9 ? day : '0' + day);
	    let hours = date.getHours();
	    hours = (hours > 9 ? hours : '0' + hours);
	    let minutes = date.getMinutes();
	    minutes = (minutes > 9 ? minutes : '0' + minutes);
	    let seconds = date.getSeconds();
	    seconds = (seconds > 9 ? seconds : '0' + seconds);
	    return allFlag == 'all' ? (year + '-' + month + "-" + day + " " + hours + ':' + minutes + ':' + seconds) : (year + '-' + month + "-" + day);
  	}
	
	/**
	 * 判断IE
	 */
	_IE(){
	    let v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
	    while (
	        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
	            all[0]
	        );
	    return v > 4 ? v : false;
	}
	
	/**
	 * 判断开始时间小于结束时间
	 */
	compareDate(startTime,endTime){
	  	return ((new Date(startTime.replace(/-/g,"\/"))) > (new Date(endTime.replace(/-/g,"\/"))));
	}
	
	/**
	 * 获取网络IP
	 * return returnCitySN
	 * cip
	 * cid
	 * cname
	 */
	getIntnetIP() {
	    let script = document.createElement('script')
		script.src = "http://pv.sohu.com/cityjson?ie=utf-8"
		document.getElementsByTagName('head')[0].appendChild(script)
	}
	
	/**
	 * 存储最近浏览的贴吧
	 */
	insertLatelys(sort_article_id){
		if(window.localStorage.getItem("lately")!=null){
			let latelys = window.localStorage.getItem("lately"); //1,2,3,4
			latelys += ","+sort_article_id;
			let arrLatelys = [...new Set(latelys.split(","))];
			window.localStorage.setItem("lately",arrLatelys.join(','))
		}else{
			window.localStorage.setItem("lately",sort_article_id)
		}	
	}
	/**
	 * 存储搜索的名字
	 */
	insertSearchList(name){
		if(window.localStorage.getItem("searchList")!=null){
			let latelys = window.localStorage.getItem("searchList"); //1,2,3,4
			latelys += ","+name;
			let arrLatelys = [...new Set(latelys.split(","))];
			window.localStorage.setItem("searchList",arrLatelys.join(','))
		}else{
			window.localStorage.setItem("searchList",name)
		}	
	}
	/**
	 * 存储tabbar
	 */
	inserttabbarSelected(index){
		window.localStorage.removeItem("tabbarSelected")
		window.localStorage.setItem("tabbarSelected",index)
	}
	/**
	 * 获取用户注册多少天
	 *  
	 */
	getUserRegDay(time){
		// 当前日期
		let a = new Date();
		// 注册日期
		let b = new Date(time);
		// 日期差  得到的是毫秒
		let diff = a - b;
		// 算天数
		let days = diff / 1000 / 60 / 60 /24;
		// 除去未完成的今天，这就是你要的天数
		days = Math.floor(days);
		let year = (days/365).toFixed(0)
		return year
	}
	/**
	 * @getDateDiff(1489821062951)
	 * @dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
	 * @param {Object} dateTimeStamp
	 */
	getDateDiff(dateTimeStamp){
		let result = '';
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;
		if(diffValue < 0){return;}
		var monthC =diffValue/month;
		var weekC =diffValue/(7*day);
		var dayC =diffValue/day;
		var hourC =diffValue/hour;
		var minC =diffValue/minute;
		if(monthC>=1 || weekC>=1){
//			result="" + parseInt(monthC) + "月前";
//		}
//		else if(weekC>=1){
//			result="" + parseInt(weekC) + "周前";	
			result=""+ this.dateFormat("MM-dd",new Date(dateTimeStamp).getTime());
		}
		else if(dayC>=1){
			result=""+ parseInt(dayC) +"天前";
		}
		else if(hourC>=1){
			result=""+ parseInt(hourC) +"小时前";
		}
		else if(minC>=1){
			result=""+ parseInt(minC) +"分钟前";
		}else{
			result="刚刚";	
		}
		return result;
	}
}

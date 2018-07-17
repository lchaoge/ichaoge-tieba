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
    var date = new Date();
    if (undefined !== times && times!== "") {
        var timestamp = times;
        if(!(/[0-9]{13}/.test(times))){
            if(/^(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/.test(times)){
                timestamp = new Date((times+"").replace(/(-|年|月)/g,'/').replace(/日/g,"")).getTime();
            }else{
                return null;
            }
        }
        date = new Date(parseInt(timestamp));
    }
    var o = {
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
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
	}
	
	/**
	 * 获取日期
	 */
  getDateFunc(allFlag, times) {
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
	
	/**
	 * 判断IE
	 */
	_IE(){
    var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
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
}

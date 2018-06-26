/*
 * Description: UrlMapping后台接口
 * Author: chaoge
 * Date: 2018/05/23
*/


export default class UrlMapping {
	constructor(){
		this.isLocalHost = window.location.host.toLowerCase() == 'http://localhost:8080';
		this.isLocalHost = true
		this.origin = window.location.origin;
		
		this.POST_USER_LOGIN = (this.isLocalHost?'/apis':this.origin)+'/wm/user/login';   // 登录               
		this.POST_USER_REGISTER = (this.isLocalHost?'/apis':this.origin)+'/wm/user/register';   // 注册       
		
	}
	
}

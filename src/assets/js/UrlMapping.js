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
		
		// 用户
		this.POST_USER_LOGIN = (this.isLocalHost?'/apis':this.origin)+'/wm/user/login';   // 登录               
		this.POST_USER_REGISTER = (this.isLocalHost?'/apis':this.origin)+'/wm/user/register';   // 注册       
		
		// 文章类型
		this.POST_ARTICLESORT_QUERYALLBYUSERID = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSort/queryAllByUserId';   // 根据用户查询文章分类
		
		// 文章
		this.POST_ARTICLE_INSERT = (this.isLocalHost?'/apis':this.origin)+'/wm/article/insert';   // 插入
		
	}
	
}

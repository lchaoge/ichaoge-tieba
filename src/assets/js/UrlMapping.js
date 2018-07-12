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
		this.POST_ARTICLESORT_FOLLOW = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSort/follow';   // 关注的吧
		this.POST_ARTICLESORT_LATELYS = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSort/latelys';   // 最近逛的吧
		this.POST_ARTICLESORT_INDEX = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSort/articleSortIndex';   // 根据ID所有文章
		this.POST_ARTICLESORT_QUERYBYID = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSort/queryById';   // 根据ID查询
		
		// 文章
		this.POST_ARTICLE_INSERT = (this.isLocalHost?'/apis':this.origin)+'/wm/article/insert';   // 插入
		this.POST_ARTICLE_DETAIL = (this.isLocalHost?'/apis':this.origin)+'/wm/article/detail';   // 详情
		this.POST_ARTICLE_INDEX = (this.isLocalHost?'/apis':this.origin)+'/wm/article/index';   // 首页
		this.POST_ARTICLE_UPDATECLICK = (this.isLocalHost?'/apis':this.origin)+'/wm/article/updateClickByArticleId';   // 修改查看人数
		
		
	}
	
}

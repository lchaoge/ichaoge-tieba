/*
 * Description: UrlMapping后台接口
 * Author: chaoge
 * Date: 2018/05/23
*/

export default class UrlMapping {
	constructor(){
		this.isLocalHost = window.location.host.toLowerCase() == 'localhost:8080';
//		this.origin = window.location.origin;
		this.origin = 'http://47.105.121.106:3000';
		
		// 用户
		this.POST_USER_LOGIN = (this.isLocalHost?'/apis':this.origin)+'/wm/user/login';   // 登录               
		this.POST_USER_REGISTER = (this.isLocalHost?'/apis':this.origin)+'/wm/user/register';   // 注册       
		this.POST_USER_LIKEUSERNAME = (this.isLocalHost?'/apis':this.origin)+'/wm/user/likeUserName';   // 搜索用户
		this.POST_USER_UPDATEUSER = (this.isLocalHost?'/apis':this.origin)+'/wm/user/updateUser';   // 修改个人信息
		this.POST_USER_QUERYBYUSERID = (this.isLocalHost?'/apis':this.origin)+'/wm/user/queryByUserId';   // 根据ID查询用户

		// 用户关注
		this.POST_USERATTENTION_FOLLOW = (this.isLocalHost?'/apis':this.origin)+'/wm/userAttention/follow';   // 用户关注
		this.POST_USERATTENTION_FANS = (this.isLocalHost?'/apis':this.origin)+'/wm/userAttention/fans';   // 用户粉丝
		this.POST_USERATTENTION_INSERT = (this.isLocalHost?'/apis':this.origin)+'/wm/userAttention/insert';   // 插入关注
		this.POST_USERATTENTION_DELETE = (this.isLocalHost?'/apis':this.origin)+'/wm/userAttention/delete';   // 删除关注
		this.POST_USERATTENTION_FOLLOWCOUNT = (this.isLocalHost?'/apis':this.origin)+'/wm/userAttention/followCount';   // 查询用户关注总数
		this.POST_USERATTENTION_FANSCOUNT = (this.isLocalHost?'/apis':this.origin)+'/wm/userAttention/fansCount';   // 查询用户粉丝总数
		this.POST_USERATTENTION_QUERYBYID = (this.isLocalHost?'/apis':this.origin)+'/wm/userAttention/queryById';   // 查询是否关注用户
		
		// 贴吧
		this.POST_ARTICLESORT_FOLLOW = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSort/follow';   // 关注的吧
		this.POST_ARTICLESORT_FOLLOWPAGE = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSort/followPage';   // 关注的吧分页
		this.POST_ARTICLESORT_LATELYS = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSort/latelys';   // 最近逛的吧
		this.POST_ARTICLESORT_INDEX = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSort/articleSortIndex';   // 根据ID所有文章
		this.POST_ARTICLESORT_QUERYBYID = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSort/queryById';   // 根据ID查询
		this.POST_ARTICLESORT_LIKEARTSNAME = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSort/likeArtsName';   // 搜索贴吧名
		
		// 帖子
		this.POST_ARTICLE_INSERT = (this.isLocalHost?'/apis':this.origin)+'/wm/article/insert';   // 插入
		this.POST_ARTICLE_DETAIL = (this.isLocalHost?'/apis':this.origin)+'/wm/article/detail';   // 详情
		this.POST_ARTICLE_INDEX = (this.isLocalHost?'/apis':this.origin)+'/wm/article/index';   // 首页
		this.POST_ARTICLE_FOLLOWINDEX = (this.isLocalHost?'/apis':this.origin)+'/wm/article/followIndex';   // 首页-关注
		
		this.POST_ARTICLE_UPDATECLICK = (this.isLocalHost?'/apis':this.origin)+'/wm/article/updateClickByArticleId';   // 修改查看人数
		this.POST_ARTICLE_LIKEARTNAME = (this.isLocalHost?'/apis':this.origin)+'/wm/article/likeArtName';   // 搜索文章
		this.POST_ARTICLE_QUERYBYUSERID = (this.isLocalHost?'/apis':this.origin)+'/wm/article/queryArticleByUserId';   // 当前用户发布的帖子
		this.POST_ARTICLE_ARTICLEPAGEBYUSERID = (this.isLocalHost?'/apis':this.origin)+'/wm/article/articlePageByUserId';   // 当前用户发布的帖子分页
		this.POST_ARTICLE_QUERYCOUNTBYSORTID = (this.isLocalHost?'/apis':this.origin)+'/wm/article/queryCountBySortId';   // 查询贴吧发布了多少帖子
		
		// 帖子浏览历史
		this.POST_BROWSEHISTORY_INSERT = (this.isLocalHost?'/apis':this.origin)+'/wm/browseHistory/insert';   // 插入
		this.POST_BROWSEHISTORY_HISTORYPAGE = (this.isLocalHost?'/apis':this.origin)+'/wm/browseHistory/historyPage';   // 分页
		this.POST_BROWSEHISTORY_EMPTY = (this.isLocalHost?'/apis':this.origin)+'/wm/browseHistory/empty';   // 清空用户浏览
	
		// 评论
		this.POST_STAYMESSAGE_INSERT = (this.isLocalHost?'/apis':this.origin)+'/wm/stayMessage/insert';   // 插入
		this.POST_STAYMESSAGE_QUERYFLOORALL = (this.isLocalHost?'/apis':this.origin)+'/wm/stayMessage/queryFloorAll';   // 查询评论
		this.POST_STAYMESSAGE_QUERYONEFLOOR = (this.isLocalHost?'/apis':this.origin)+'/wm/stayMessage/queryOneFloor';   // 查询单个楼层
		this.POST_STAYMESSAGE_QUERYONEFLOORLIST = (this.isLocalHost?'/apis':this.origin)+'/wm/stayMessage/queryOneFloorList';   // 查看单个楼层的子评论
		
	
		// 用户关注的吧
		this.POST_ARTICLESORTUSER_QUERYCOUNTBYSORTID = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSortUser/queryCountBySortId';   // 查询多少人关注了吧
		this.POST_ARTICLESORTUSER_ISFOLLOW = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSortUser/isFollow';   // 查看用户是否关注贴吧
		this.POST_ARTICLESORTUSER_INSERT = (this.isLocalHost?'/apis':this.origin)+'/wm/articleSortUser/insert';   // 插入
		
	}
	
}


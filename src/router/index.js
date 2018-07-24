// 首页
import Home from './../components/home/Home'
import Index from './../components/home/children/Index'// 首页
import Menu from './../components/home/children/Menu'// 进吧
import News from './../components/home/children/News' // 消息
import UserInfo from './../components/home/children/UserInfo' // 我的

// 搜索
import Searchs from './../components/search/Search'
import Search from './../components/search/children/Search'
import SearchIndex from './../components/search/children/Index'

// 登录
import Login from './../components/account/Login'
import ForgetPwd from './../components/account/ForgetPwd'
import Register from './../components/account/Register'

// 用户
import User from './../components/user/User'
import UserIndex from './../components/user/children/Index'
import UserFans from './../components/user/children/Fans'
import UserFollow from './../components/user/children/Follow'
import UserFollowArticleSort from './../components/user/children/FollowArticleSort'

// 帖子
import Article from './../components/article/Article'
import ArticleIndex from './../components/article/children/Index'
import ArticleInsert from './../components/article/children/Insert'
// 贴吧
import ArticleSort from './../components/articleSort/ArticleSort'
import ArticleSortIndex from './../components/articleSort/children/Index'
// 设置
import Setup from './../components/setup/Setup'
import SetupIndex from './../components/setup/children/Index'
import SetupUserInfo from './../components/setup/children/UserInfo'
export const routes = [
	{path:'/',name:'homeLink',component:Home,redirect:'/index',children:[
		{path:'/index',name:'indexLink',component:Index},
		{path:'/menu',name:'menuLink',component:Menu},
		{path:'/news',name:'newsLink',component:News},
		{path:'/userinfo',name:'userinfoLink',component:UserInfo}	
	]},
	// 搜索
	{path:'/searchs',name:'searchsLink',component:Searchs,redirect:'/searchs/search',children:[
		{path:'/searchs/search',name:'SearchLink',component:Search},	
		{path:'/searchs/index',name:'SearchIndexLink',component:SearchIndex},	
	]},
	// 登录
	{path:'/login',name:'loginLink',component:Login},
	{path:'/register',name:'registerLink',component:Register},
	{path:'/forgetpwd',name:'forgetpwdLink',component:ForgetPwd},
	// 我的主页
	{path:'/user',name:'userLink',component:User,redirect:'/user/index',children:[
		{path:'/user/index',name:'userIndexLink',component:UserIndex},
		{path:'/user/fans',name:'userFansLink',component:UserFans},
		{path:'/user/follow',name:'userFollowLink',component:UserFollow},
		{path:'/user/followArticleSort',name:'userFollowArticleSortLink',component:UserFollowArticleSort},
	]},
	// 文章详情
	{path:'/article',name:'articleLink',component:Article,redirect:'/article/index',children:[
		{path:'/article/index',name:'articleIndexLink',component:ArticleIndex},	
		{path:'/article/insert',name:'articleInsertLink',component:ArticleInsert},	
	]},
	// 贴吧
	{path:'/articleSort',name:'articleSortLink',component:ArticleSort,redirect:'/articleSort/index',children:[
		{path:'/articleSort/index',name:'articleSortIndexLink',component:ArticleSortIndex},	
	]},
	// 设置
	{path:'/setup',name:'setupLink',component:Setup,redirect:'/setup/index',children:[
		{path:'/setup/index',name:'setupIndexLink',component:SetupIndex},	
		{path:'/setup/userinfo',name:'setupUserInfoLink',component:SetupUserInfo}
	]},
	{path:'*',redirect:'/'}
]

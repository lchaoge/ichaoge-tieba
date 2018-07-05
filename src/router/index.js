import demo from './../components/demo'
// 首页
import Home from './../components/home/Home'
import Index from './../components/home/children/Index'// 首页
import Menu from './../components/home/children/Menu'// 进吧
import News from './../components/home/children/News' // 消息
import UserInfo from './../components/home/children/UserInfo' // 我的

// 搜索
import Search from './../components/search/Search'

// 登录
import Login from './../components/account/Login'
import ForgetPwd from './../components/account/ForgetPwd'
import Register from './../components/account/Register'

// 用户
import User from './../components/user/User'
import UserIndex from './../components/user/children/Index'
// 贴吧主页
import Article from './../components/article/Article'
import ArticleIndex from './../components/article/children/Index'
import ArticleInsert from './../components/article/children/Insert'


export const routes = [
	{path:'/demo',name:'demoLink',component:demo},
	
	{path:'/',name:'homeLink',component:Home,redirect:'/index',children:[
		{path:'/index',name:'indexLink',component:Index},
		{path:'/menu',name:'menuLink',component:Menu},
		{path:'/news',name:'newsLink',component:News},
		{path:'/userinfo',name:'userinfoLink',component:UserInfo}	
	]},
	// 搜索
	{path:'/search',name:'searchLink',component:Search},
	// 登录
	{path:'/login',name:'loginLink',component:Login},
	{path:'/register',name:'registerLink',component:Register},
	{path:'/forgetpwd',name:'forgetpwdLink',component:ForgetPwd},
	// 我的主页
	{path:'/user',name:'userLink',component:User,redirect:'/user/index',children:[
		{path:'/user/index',name:'userIndexLink',component:UserIndex},	
	]},
	// 贴吧主页
	{path:'/article',name:'articleLink',component:Article,redirect:'/article/index',children:[
		{path:'/article/index',name:'articleIndexLink',component:ArticleIndex},	
		{path:'/article/insert',name:'articleInsertLink',component:ArticleInsert},	
	]},
	
	{path:'*',redirect:'/'}
]

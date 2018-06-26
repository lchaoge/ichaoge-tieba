import home from './../components/home'
import demo from './../components/demo'

// 首页
import index from './../components/home/index'

// 进吧
import menu from './../components/menu/menu'

// 消息
import news from './../components/news/news'

// 我的
import userinfo from './../components/userinfo/userinfo'

// 搜索
import search from './../components/search/search'

// 登录
import login from './../components/login/login'
import register from './../components/login/register'


export const routes = [
	{path:'/',name:'homeLink',component:home,redirect:'/index',children:[
		{path:'/index',name:'indexLink',component:index,children:[
		
		]},
		{path:'/menu',name:'menuLink',component:menu,children:[
		
		]},
		{path:'/news',name:'newsLink',component:news,children:[
			
		]},
		{path:'/userinfo',name:'userinfoLink',component:userinfo,children:[
			
		]}	
	]},
	{path:'/search',name:'searchLink',component:search},
	{path:'/login',name:'loginLink',component:login},
	{path:'/register',name:'registerLink',component:register},
	{path:'*',redirect:'/'}
	
	
]

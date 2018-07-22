<template>
	<view-box ref="viewBox" class="login">
	    <x-header :left-options="{backText: ''}" slot="header">贴吧账号登录</x-header>
	    <div class="content">
	    	<img src="../../assets/images/logo2.png"/>
	    	<h1>欢迎登录贴吧账号</h1>
	    	<group>
		      	<x-input type="text" placeholder='请输入手机号' v-model="pageData.from.user_phone"></x-input>
		      	<x-input type="password" placeholder='请输入登录密码' v-model="pageData.from.user_pwd"></x-input>
		    </group>
		    <div class="button-group">
		    	<router-link :to="{name:'registerLink'}" class="text">注册账号</router-link>
		    	<router-link :to="{name:'forgetpwdLink'}" class="fr text">忘记密码</router-link>
		    </div>
		    <div class="button-group">
	      		<x-button :disabled="pageData.isLogin" :type="pageData.btnType" action-type="button" @click.native="loginEvt">登录</x-button>
	      	</div>
	    </div>
  	</view-box>
</template>

<script>
import { Toast ,Group,XHeader,ViewBox,XInput,XButton } from 'vux'
export default {
  	components: {
	  	Group,
	    XHeader,
	    ViewBox,
	    XInput,
	    XButton,
	    Toast 
  	},
  	data(){
	  	return{
	  		pageData:{
	  			isLogin:true,
	  			router:{},
	  			from:{
	  				user_phone:'',
	  				user_pwd:''
	  			}
	  		}
	  	}
  	},
  	beforeRouteEnter:(to,from,next)=>{
		next(vm=>{
			vm.$store.dispatch("setUser",null)
			vm.pageData.router = from
		})
	},
  	methods:{
	  	loginEvt(){
	  		let params = {
	  			user_phone:this.pageData.from.user_phone,
	  			user_pwd:this.pageData.from.user_pwd
	  		}
	  		this.$Axios.post(this.$Urls.POST_USER_LOGIN,params).then(res=>res.data).then((res)=>{
	  			if(res.code === '0000'){
	  				let user = res.data
	  				if(user.length>0){
	  					this.$vux.toast.text('登录成功', 'bottom')
	  					this.$store.dispatch("setUser",user[0])
	  					let routerName = this.pageData.router.name
	  					let query = this.pageData.router.query
	  					this.$router.push({
	  						name:routerName,
	  						query:query
	  					})
	  				}else{
	  					this.$vux.toast.text('账号或密码错误', 'bottom')
	  				}
	  			}else{
	  				this.$store.dispatch("setUser",null)
	  				this.$vux.toast.text('系统错误', 'bottom')
	  			}
	  		}).catch(err=>console.log("系统错误："+err))
	  	},
	  	watchIsLogin(){
	  		let params = {
	  			user_phone:this.pageData.from.user_phone,
	  			user_pwd:this.pageData.from.user_pwd
	  		}
	  		if(params.user_phone == "" || params.user_pwd == ""){
	  			this.pageData.btnType = 'default'
	  			this.pageData.isLogin = true
	  			return false
	  		}
	  		this.pageData.btnType = 'primary'
	  		this.pageData.isLogin = false
	  	}
  	},
  	watch:{
	  	'pageData.from.user_phone':'watchIsLogin',
	  	'pageData.from.user_pwd':'watchIsLogin'
  	}
}
</script>

<style>
	.login .vux-header-title{
		color: #666 !important;
	}
	.login .text{
		text-decoration: none;
		color: #333;
	}
	.login .content{
		margin-top: 46px;
		padding: 20px;
	}
	.login .content img{
		margin-left: 15px;
		width: 100px;
	}
	.login .content h1{
		font-size: 20px;
		padding: 10px 15px;
		margin-bottom: 50px;
	}
	.login .weui-cells{
		background: none;
	}
	.login .button-group{
		padding: 10px 15px;
	}
	.login button.weui-btn{
		border-radius: 44px;
	}
	.login .weui-btn:after{
		border-radius: 44px !important;
	}
</style>
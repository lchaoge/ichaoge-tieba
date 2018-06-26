<template>
	<view-box ref="viewBox">
	    <x-header :left-options="{backText: ''}" slot="header">贴吧账号登录</x-header>
	    <div class="content">
	    	<img src="../../assets/images/logo2.png"/>
	    	<h1>欢迎登录贴吧账号</h1>
	    	<group>
		      	<x-input type="text" placeholder='请输入手机号' v-model="pageData.from.userPhone"></x-input>
		      	<x-input type="password" placeholder='请输入登录密码' v-model="pageData.from.password"></x-input>
		    </group>
		    <div class="button-group">
	      		<x-button :disabled="pageData.isLogin" v-if="pageData.isLogin" action-type="button">登录</x-button>
	      		<x-button v-if="!pageData.isLogin" type="primary" action-type="button" @click.native="loginEvt">登录</x-button>
	      	</div>
	    </div>
	    <toast v-model="pageData.toast.showPositionValue" type="text" :time="800" is-show-mask :text="pageData.toast.text" position="bottom"></toast>
  	</view-box>
</template>

<script>
import { Toast ,Group,XHeader,ViewBox,XInput,XButton } from 'vux'
import axios from 'axios'
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
  			toast:{
  				text:"",	
  				showPositionValue:false
  			},
  			isLogin:true,
  			from:{
  				userPhone:'',
  				userPwd:''
  			}
  		}
  	}
  },
  beforeRouteEnter:(to,from ,next)=>{
//		this.$store.dispatch("setUser",null)
		next(vm=>vm.$store.dispatch("setUser",null))
	},
  methods:{
  	loginEvt(){
  		let params = {
  			userPhone:this.pageData.from.userPhone,
  			userPwd:this.pageData.from.userPwd
  		}
  		this.$Axios.post(this.$Urls.POST_USER_LOGIN,params).then(res=>res.data).then((res)=>{
  			if(res.code === '0000'){
  				let user = res.data
  				if(user.length>0){
  					this.pageData.toast.text = "登录成功"
  					this.pageData.toast.showPositionValue = true
  					this.$store.dispatch("setUser",user)
  					this.$router.push({
  						name:'homeLink'
  					})
  				}else{
  					this.$store.dispatch("setUser",null)
  					this.pageData.toast.text = "账号或密码错误"
  					this.pageData.toast.showPositionValue = true
  				}
  			}else{
  				this.$store.dispatch("setUser",null)
  				this.pageData.toast.text = "系统错误"
  				this.pageData.toast.showPositionValue = true
  			}
  		}).catch(err=>console.log("系统错误："+err))
  	},
  	watchIsLogin(){
  		let params = {
  			userName:this.pageData.from.username,
  			userPwd:this.pageData.from.password
  		}
  		if(params.userName == ""){
  			this.pageData.isLogin = true
  			return false
  		}
  		if(params.userPwd == ""){
  			this.pageData.isLogin = true
  			return false
  		}
  		this.pageData.isLogin = false
  	}
  },
  watch:{
  	'pageData.from.username':'watchIsLogin',
  	'pageData.from.password':'watchIsLogin'
  }
}
</script>

<style>
	body{
		background: #fff !important;
	}
	.vux-header{
		background: #fff !important;
	}
	.vux-header:after {
	    content: " ";
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    height: 1px;
	    border-top: 1px solid #C0BFC4;
	    color: #C0BFC4;
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    -webkit-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	}
	.vux-header-title{
		color: #666 !important;
	}
	.content{
		padding: 20px;
	}
	.content img{
		margin-left: 15px;
		width: 100px;
	}
	.content h1{
		font-size: 20px;
		padding: 10px 15px;
		margin-bottom: 50px;
	}
	.weui-cells{
		background: none;
	}
	.button-group{
		padding: 10px 15px;
	}
	button.weui-btn{
		border-radius: 44px;
	}
	.weui-btn:after{
		border-radius: 44px !important;
	}
</style>
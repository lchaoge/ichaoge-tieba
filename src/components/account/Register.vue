<template>
	<view-box ref="viewBox" class="register">
	    <x-header :left-options="{backText: ''}" slot="header">贴吧账号注册</x-header>
	    <div class="content">
	    	<img src="../../assets/images/logo2.png"/>
	    	<h1>欢迎注册贴吧账号</h1>
	    	<group>
		      	<x-input type="text" placeholder='请输入手机号' v-model="pageData.from.userPhone"></x-input>
		      	<x-input type="password" placeholder='请输入登录密码' v-model="pageData.from.userPwd"></x-input>
		    </group>
		    <div class="button-group">
		    	<router-link :to="{name:'loginLink'}" class="text">登录账号</router-link>
		    	<router-link :to="{name:'forgetpwdLink'}" class="fr text">忘记密码</router-link>
		    </div>
		    <div class="button-group">
	      		<x-button :disabled="pageData.isLogin" :type="pageData.btnType" action-type="button" @click.native="registerEvt">注册</x-button>
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
	  			btnType:'default',
	  			from:{
	  				userPhone:'',
	  				userPwd:''
	  			}
	  		}
	  	}
  	},
  	beforeRouteEnter:(to,from ,next)=>{
		next()  	
	},
	created(){
	},
  	methods:{
	  	registerEvt(){
	  		let params = {
	  			userPhone:this.pageData.from.userPhone,
	  			userPwd:this.pageData.from.userPwd
	  		}
	  		this.$Axios.post(this.$Urls.POST_USER_REGISTER,params).then(res=>res.data).then((res)=>{
	  			if(res.code === '0000'){
					if(res.data == 0){
						this.$vux.toast.text('注册成功', 'bottom')
						this.$router.push({name:'loginLink'});	
					}else{
						this.$vux.toast.text('账号注册失败', 'bottom')
					}
	  			}else{
	  				this.$vux.toast.text('系统错误', 'bottom')
	  			}
	  		}).catch(err=>console.log("系统错误："+err))
	  	},
	  	watchIsLogin(){
	  		let params = {
	  			userPhone:this.pageData.from.userPhone,
	  			userPwd:this.pageData.from.userPwd
	  		}
	  		if(params.userPhone == "" || params.userPwd == ""){
	  			this.pageData.btnType = 'default'
	  			this.pageData.isLogin = true
	  			return false
	  		}
	  		this.pageData.btnType = 'primary'
	  		this.pageData.isLogin = false
	  	}
  	},
  	watch:{
	  	'pageData.from.userPhone':'watchIsLogin',
	  	'pageData.from.userPwd':'watchIsLogin'
  	}
}
</script>

<style>
	.register .vux-header{
		background: #fff !important;
	}
	.register .vux-header:after {
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
	.register .vux-header-title{
		color: #666 !important;
	}
	.register .text{
		text-decoration: none;
		color: #333;
	}
	.register .content{
		padding: 20px;
	}
	.register .content img{
		margin-left: 15px;
		width: 100px;
	}
	.register .content h1{
		font-size: 20px;
		padding: 10px 15px;
		margin-bottom: 50px;
	}
	.register .weui-cells{
		background: none;
	}
	.register .button-group{
		padding: 10px 15px;
	}
	.register button.weui-btn{
		border-radius: 44px;
	}
	.register .weui-btn:after{
		border-radius: 44px !important;
	}
</style>
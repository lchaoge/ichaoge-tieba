<template>
	<view-box ref="viewBox" class="userFans">
		<x-header :left-options="{backText: ''}" slot="header">
			<h1 style="color: #666;">我的粉丝</h1>
		</x-header>
		<div style="margin-top: 46px;">
			<scroller lock-x :scrollbar-y=false height="-46" class="vux-scroller">
		    	<div class="panel">
		    		<divider v-if="queryObj.list.length<=0">暂无数据</divider>
		    		<div class="panel-user" v-for="item in queryObj.list">
						<div class="panel-user-photo">
							<x-img :src="item.user_image_url" default-src="../static/images/tieba.jpg"></x-img>
						</div>
						<div class="panel-user-content">
							<div class="panel-user-name">{{item.user_name}}</div>
						</div>
						<div class="panel-user-right">
							<!--<x-button mini plain type="primary" class="btn active">相互关注</x-button>-->
							<x-button mini plain type="primary" class="btn"><i class="icon iconfont icon-zengjia"></i>关注</x-button>
						</div>
					</div>
		    	</div>
		    </scroller>	
		</div>
	</view-box>
</template>

<script>
	import {XButton,Scroller,ViewBox,XHeader,XImg,TransferDom,Divider } from 'vux'
	export default{
		name: 'userFans',
		directives: {
		    TransferDom
		},
	  	components:{
	  		Divider,
	  		XButton,
	  		Scroller,
	  		XImg,
	  		ViewBox,
		  	XHeader,
	  	},
	  	data(){
			return {
				queryObj:{
					list:[]
				}
			}
		},
		beforeRouteEnter:(to,from ,next)=>{
			next((vm)=>{
				let isLogin = vm.$store.getters.isLogin
				if(!isLogin){
					vm.$router.push({name:'loginLink'})
				}
			})
		},
		created() {
			this.queryFansEvt()
		},
		methods:{
			// 用户粉丝
			queryFansEvt(){
				let params = {
					user_id:this.$store.getters.currentUser.user_id
				}
				this.$Axios.post(this.$Urls.POST_USER_FANS,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						if(res.data.length>0){
							this.queryObj.list = res.data
						}
					}else{
						this.$vux.toast.text('系统错误', 'bottom')
					}
				}).catch(err=>{
					this.$vux.toast.text('系统错误：'+err, 'bottom')
				})
			},
		}
	}
</script>

<style>
	.vux-header{
		background-color: #fff !important;
		position: fixed !important;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 999;
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
	.vux-header .vux-header-title{
		margin: 0 100px !important;
	}
	.userFans .panel{
		overflow: hidden;
		padding: 10px;
		background: #fff;
	}
	.userFans .panel-user{
		padding-bottom: 10px;
		display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    margin-bottom: 10px;
	    position: relative;
	}
	.userFans .panel-user:after{
		content: " ";
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    height: 1px;
	    border-top: 1px solid #D9D9D9;
	    color: #D9D9D9;
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    -webkit-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	}
	.userFans .panel-user:last-of-type{
		margin-bottom: 0;
		padding-bottom: 0;
	}
	.userFans .panel-user:last-of-type:after{
		border-top: 0px none;
	}
	.userFans .panel-user .panel-user-photo {
	    margin-right: .8em;
	    width: 40px;
	    height: 40px;
	    line-height: 40px;
	    text-align: center;
	    border-radius: 50%;
	    overflow: hidden;
	}
	.userFans .panel-user .panel-user-content {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    min-width: 0;
	}
	.userFans .panel-user .panel-user-right{
		display: flex;
    	text-align: center;
	}
	.userFans .panel-user .panel-user-right .btn{
		line-height: 30px;
		height: 30px;
		background: #fff;
		border: 1px solid #09BB07;
		color: #09BB07;
	}
	.userFans .panel-user .panel-user-right .btn.active{
		color: #999;
		border: 1px solid #999;
	}
	.userFans .panel-user .panel-user-right .btn .icon{
		font-size: 12px;
	}
</style>
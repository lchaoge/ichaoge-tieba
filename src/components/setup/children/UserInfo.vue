<template>
	<view-box ref="viewBox" class="setupIndex">
		<x-header :left-options="{showBack: false}" slot="header">
			<a slot="left">
				<i class="icon iconfont icon-guanbi"></i>
			</a>
			<a slot="right" @click="addEvt">保存</a>
			我的资料
		</x-header>
		<div style="margin-top: 46px;">
		    <group label-margin-right="2em" label-width="5.5em" label-align="right">
		    	<div class="iamge">
		    		<img :src="currentUser.user_image_url" />
		    	</div>
		      	<x-input title="手机号" v-model="currentUser.user_phone" placeholder="请输入手机号" :readonly="true"></x-input>
		      	<x-input title="昵称" v-model="currentUser.user_name" placeholder="请输入昵称"></x-input>
		      	<selector title="性别" :options="[{key:0, value:'女'},{key:1, value:'男'}]" v-model="currentUser.user_sex"></selector>
		      	<datetime title="生日" v-model="currentUser.user_birthday" clear-text="clear"></datetime>
		      	<x-address title="地址选择" v-model="currentUser.user_address" raw-value :list="addressData" value-text-align="left"></x-address>
		      	<x-textarea title="个性签名" :max="200" placeholder="请点击添加简介" v-model="currentUser.user_description" :show-counter="false" :rows="1" autosize></x-textarea>
		    </group>
		</div>
	</view-box>
</template>

<script>
	import {ViewBox,Group,XHeader,Cell,XInput,XTextarea,Datetime,PopupPicker,ChinaAddressData,XAddress,Selector} from 'vux'
	export default {
		components: {
			ViewBox,
			XHeader,
		  	Group,
		   	Cell,
		   	XInput,
		   	XTextarea,
		   	Datetime,
		   	PopupPicker,
		   	XAddress,
		   	Selector
		},
		data () {
		    return {
		    	currentUser:{},
		    	addressData:ChinaAddressData
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
		},
		mounted(){
			if(this.$store.getters.isLogin){
				this.currentUser = this.$store.getters.currentUser
			}
		},
		methods:{
			addEvt(){
				let params = this.currentUser
				params.user_address = params.user_address.join(',') 
				this.$Axios.post(this.$Urls.POST_USER_UPDATEUSER,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						debugger
						this.$vux.toast.text('取消关注成功', 'bottom')
					}else{
						this.$vux.toast.text('取消关注失败', 'bottom')
					}
				}).catch(err=>{
					this.$vux.toast.text('系统错误：'+err, 'bottom')
				})
			}
		}
	}
</script>

<style>
	.setupIndex .iamge{
		width: 100px;
		height: 100px;
		overflow: hidden;
		border-radius: 50%;
		margin: 30px auto;
	}
	.setupIndex .weui-cell{
		text-decoration: none;
	}
	.setupIndex .weui-cell_access .weui-cell__ft{
		text-align: left;
	}
</style>
<template>
	<view-box ref="viewBox" class="setupIndex">
		<!--:left-options="{showBack: false}"-->
		<x-header  :left-options="{backText: ''}" slot="header">
			<!--<a slot="left">
				<i class="icon iconfont icon-guanbi"></i>
			</a>-->
			<a slot="right" @click="addEvt">保存</a>
			我的资料
		</x-header>
		<div style="margin-top: 46px;">
		    <group label-margin-right="2em" label-width="5.5em" label-align="right">
		    	<div class="iamge">
		    		<img :src="user_image_url" name="img" />
		    		<input type="file" class="upload-image" @change="uploadImage" />
		    	</div>
		      	<x-input title="手机号" v-model="currentUser.user_phone" placeholder="请输入手机号" :readonly="true"></x-input>
		      	<x-input title="昵称" v-model="currentUser.user_name" placeholder="请输入昵称"></x-input>
		      	<selector title="性别" :options="[{key:0, value:'女'},{key:1, value:'男'}]" v-model="currentUser.user_sex"></selector>
		      	<datetime title="生日" v-model="currentUser.user_birthday" clear-text="clear"></datetime>
		      	<x-textarea title="个性签名" :max="200" placeholder="请点击添加简介" v-model="currentUser.user_description" :show-counter="false" :rows="1" autosize></x-textarea>
		    </group>
		</div>
	</view-box>
</template>

<script>
	import axios from 'axios'
	import {ViewBox,Group,XHeader,Cell,XInput,XTextarea,Datetime,PopupPicker,ChinaAddressData,XAddress,Selector,Value2nameFilter as value2name} from 'vux'
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
		   	Selector,
		   	value2name
		},
		data () {
		    return {
		    	currentUser:{},
		    	routerName:'',
		    	routerQuery:{},
		    	user_image_url:'',
		    	formDataImage:null,
		    	address:'',
		    	addressData:ChinaAddressData
		    }
		},
		beforeRouteEnter:(to,from ,next)=>{
			next((vm)=>{
				vm.routerName = from.name
				vm.routerQuery = from.query
				let isLogin = vm.$store.getters.isLogin
				if(!isLogin){
					vm.$router.push({name:'loginLink'})
				}
			})
		},
		created() {
			if(this.$store.getters.isLogin){
				this.currentUser = this.$store.getters.currentUser
				this.currentUser.user_birthday = this.$Apis.dateFormat("yyyy-MM-dd",this.currentUser.user_birthday) 
				this.user_image_url = this.currentUser.user_image_url
			}
		},
		mounted(){
		},
		methods:{
			uploadImage(e){
				let _this = this
				this.formDataImage = e.target.files[0]
				let reader = new FileReader();
			    reader.onload = function() {
			        let base64Url = this.result;
			        _this.user_image_url = base64Url
			    };
			    reader.readAsDataURL(this.formDataImage);
			},
			getAddressName (value) {
		      	return value2name(value, ChinaAddressData)
		    },
			addEvt(){
				let obj = this.currentUser
				let params = new FormData(); 
				params.append("user_phone",obj.user_phone)
				params.append("user_name",obj.user_name)
				params.append("user_sex",obj.user_sex)
				params.append("user_birthday",obj.user_birthday)
				params.append("user_address",obj.user_address)
				params.append("user_description",obj.user_description)
				params.append("user_id",obj.user_id)
				params.append("img",this.formDataImage)
				let config = {
			        headers: {'Content-Type': 'multipart/form-data'}
			    }
			    axios.post(this.$Urls.POST_USER_UPDATEUSER, params, config).then(res => res.data).then((res)=>{
			    	if(res.code == '0000'){
			    		this.$vux.toast.text('保存成功', 'bottom')
						this.$router.push({
							name:this.routerName,
							query:this.routerQuery
						})
					}else{
						this.$vux.toast.text('保存失败', 'bottom')
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
		position: relative;
	}
	.setupIndex .iamge img{
		width: 100%;
		height: 100%;
	}
	.setupIndex .iamge .upload-image{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.setupIndex .weui-cell{
		text-decoration: none;
	}
	.setupIndex .weui-cell_access .weui-cell__ft{
		text-align: left;
	}
	
</style>
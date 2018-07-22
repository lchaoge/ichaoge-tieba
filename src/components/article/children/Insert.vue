<template>
	<view-box ref="viewBox" class="articleInsert">
	    <x-header :left-options="{showBack: false}" slot="header">
	    	<a slot="left" @click="goBack">
	    		<i class="icon iconfont icon-guanbi"></i>
	    	</a>
	    	<h1>发布到{{pageData.sort_article_name}}<span v-if="article.type_id==0">吧</span></h1>
	    	<a slot="right" @click="insertEvt">发布</a>
	    </x-header>
	    <div class="content">
	    	<group>
		    	<x-input v-if="!pageData.isShowName" placeholder="加个标题哟~" v-model="article.article_name" :show-clear="false" autocapitalize="characters"></x-input>
		      	<x-textarea placeholder="来吧，尽情发挥吧..." v-model="article.article_content" :show-counter="false" :rows="4" autosize :max="300"></x-textarea>
		      	<uploader :max="uploader.varmax" :images="uploader.images" :handle-click="false" :autoUpload="false" :show-header="false" :readonly="false"
			  :upload-url="uploader.uploadUrl" :name="uploader.imgName" :params="uploader.params" size="small"
			  @upload-image="uploadImageMethod" @preview="previewMethod" @add-image="addImageMethod" @remove-image="removeImageMethod"></uploader>
		    </group>
	    </div>
	    <div class="footer">
	    	<span class="vux-badge" @click="articleNameEvt">{{pageData.isShowName?"添加标题":"隐藏标题"}}</span>
	    	<span class="vux-badge fr" @click="articleTypeEvt" v-if="article.type_id==1">{{articleTypeName}}</span>
	    </div>
  	</view-box>
</template>
<script>
import axios from 'axios'
import { Badge,ViewBox,XHeader,XTextarea,XInput,Group,Alert,Toast } from 'vux'
import Uploader from 'vux-uploader'
export default {
  	name: 'articleInsert',
  	components:{
  		Uploader,
	  	ViewBox,
	  	XHeader,
	  	XTextarea,
	  	XInput,
	  	Group,
	  	Badge,
	  	Alert,
	  	Toast
  	},
  	data () {
	    return {
	    	pageData:{
	    		isShowName:true,
	    		sort_article_name:''
	    	},
	    	articleTypeName:"所有人可见",
	    	uploader:{
	    		varmax:10,
		    	images:[],
		    	uploadUrl:'',
		    	params:{},
		    	imgName:'img'	
	    	},
	    	article:{
	    		article_name:"", // 文章名称
	    		article_ip:"", // 发布IP
	    		user_id:"", // 所属用户ID
	    		article_content:"", // 文章内容
	    		article_type:"1", // 文章的模式:0:仅自己可见，1:所有人可见，2:仅好友可见
	    		type_id:"", // 文章分类ID 0：贴吧 1：个人主页
	    		sort_article_id:"", // 贴吧ID
	    		sort_article_name:'',
	    		images:null
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
	created(){
		this.article.type_id = this.$route.query.type_id
		this.article.sort_article_id = this.$route.query.sort_article_id
		this.article.sort_article_name = this.$route.query.sort_article_name
		if(this.article.type_id == 0){
			this.pageData.sort_article_name = this.article.sort_article_name
		}else{
			this.pageData.sort_article_name = '个人主页'
		}
		this.$Apis.getIntnetIP()
	},
  	methods:{
  		previewMethod(item){
  			console.log(item)
  		},
  		addImageMethod(){
  			console.log(this.uploadUrl)
  			console.log(this.images)
  			console.log(this.params)
  		},
  		removeImageMethod(item){
  			console.log(item)
  		},
  		uploadImageMethod(formData){
  			let _this = this
		 	let reader = new FileReader();
		    reader.onload = function() {
		        let base64Url = this.result;
		        _this.uploader.images.push({url:base64Url})
		    };
		    reader.readAsDataURL(formData.get(this.uploader.imgName));
		    if(this.article.images == null){
  				this.article.images = new FormData()
  			}
  			this.article.images.append('img',formData.get(this.uploader.imgName))
  		},
  		goBack(){
  			this.$router.go(-1)
  		},
  		// 发布文章
  		insertEvt(){
  			let user = this.$store.getters.currentUser;
  			let params = new FormData(); 
  			params.append("article_name",this.article.article_name);
  			params.append("article_ip",returnCitySN.cip);
  			params.append("user_id",user.user_id);
  			params.append("article_content",this.article.article_content);
  			params.append("article_type",this.article.article_type);
  			params.append("type_id",this.article.type_id);
			params.append("sort_article_id",this.article.sort_article_id)
  			if(this.article.images!=null){
	  			this.article.images.forEach((item)=>{
	  				params.append("img",item);
	  			})	
  			}
//			if(params.get('article_name') =="" || params.get('article_name') ==null ){
//				this.$vux.toast.text('文章名称不能为空', 'bottom')
//	  			return false
//			}
//			if(params.get('article_name').length>30){
//				this.$vux.toast.text('文章名称不能超过30字', 'bottom')
//	  			return false
//			}
			if(params.get('article_content') =="" || params.get('article_content') ==null){
				this.$vux.toast.text('文章名称不能为空', 'bottom')
	  			return false
			}
			if(params.get('article_content').length>300){
				this.$vux.toast.text('文章名称不能超过30字', 'bottom')
	  			return false
			}
  			
		    let config = {
		        headers: {'Content-Type': 'multipart/form-data'}
		    }
		    // 添加请求头
		    axios.post(this.$Urls.POST_ARTICLE_INSERT, params, config).then(res => res.data).then((res)=>{
		    	if(res.code == '0000'){
		    		// 显示
					this.$vux.alert.show({
					  	title: '提示',
					  	content: '添加成功',
					  	onHide:()=>{
					   		this.$router.push({name:'homeLink'})
					  	}
					})
				}else{
					this.$vux.toast.text('系统错误', 'bottom')
				}
		    })
  		},
  		// 切换文章模式
  		articleTypeEvt(){
  			this.article.article_type++
  			if(this.article.article_type>2){
  				this.article.article_type = 0
  			}
  			if(this.article.article_type == 0){
  				this.articleTypeName = "仅自己可见"
  			} else if(this.article.article_type == 1){
  				this.articleTypeName = "所有人可见"
  			} else if(this.article.article_type == 2){
  				this.articleTypeName = "仅好友可见"
  			}  
  		},
  		articleNameEvt(){
  			this.pageData.isShowName = !this.pageData.isShowName 
  		}
  	},
  	
}
</script>

<style>
	.articleInsert .vux-header-title{
		color: #666 !important;
	}
	.articleInsert .content{
		margin-top: 46px;
	}
	.articleInsert .footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
	}
	.articleInsert .footer .vux-badge{
		background: #D9D9D9;
		color: #333;
	}
</style>
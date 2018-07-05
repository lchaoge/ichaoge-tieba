<template>
	<view-box ref="viewBox" class="articleInsert">
	    <x-header :left-options="{showBack: false}" slot="header">
	    	<a slot="left" @click="goBack">
	    		<i class="icon iconfont icon-guanbi"></i>
	    	</a>
	    	发布到我的主页
	    	<a slot="right" @click="insertEvt">发布</a>
	    </x-header>
	    <div class="content">
	    	<group>
		    	<x-input placeholder="加个标题哟~" v-model="article.article_name" :show-clear="false" autocapitalize="characters"></x-input>
		      	<x-textarea placeholder="来吧，尽情发挥吧..." v-model="article.article_content" :show-counter="false" :rows="4" autosize :max="300"></x-textarea>
		      	<uploader :max="uploader.varmax" :images="uploader.images" :handle-click="false" :autoUpload="false" :show-header="false" :readonly="false"
			  :upload-url="uploader.uploadUrl" :name="uploader.imgName" :params="uploader.params" size="small"
			  @upload-image="uploadImageMethod" @preview="previewMethod" @add-image="addImageMethod" @remove-image="removeImageMethod"></uploader>
		    </group>
	    </div>
	    <div class="footer">
	    	<span class="vux-badge" @click="articleTypeEvt">{{articleTypeName}}</span>
	    </div>
	    <toast v-model="pageData.toast.showPositionValue" type="text" :time="800" is-show-mask :text="pageData.toast.text" position="bottom"></toast>
  	</view-box>
</template>
<script>
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
	    		toast:{
	    			showPositionValue:false,
	    			text:""
	    		}
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
	    		images:[]
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
		    
		    this.article.images.push(formData.get(this.uploader.imgName));
  		},
  		goBack(){
  			this.$router.go(-1)
  		},
  		// 发布文章
  		insertEvt(){
  			let user = this.$store.getters.currentUser
  			let params = {
	    		article_name:this.article.article_name, // 文章名称
	    		article_ip:returnCitySN.cip, // 发布IP
	    		user_id:user.user_id, // 所属用户ID
	    		article_content:this.article.article_content, // 文章内容
	    		article_type:this.article.article_type, // 文章的模式:0:仅自己可见，1:所有人可见，2:仅好友可见
	    		images:this.article.images, // 上传的图片
	    		type_id:"1" 
	    	}
  			if(params.article_name =="" || params.article_name ==null ){
  				this.pageData.toast.text = "文章名称不能为空"
	  			this.pageData.toast.showPositionValue = true
	  			return false
  			}
  			if(params.article_name.length>30){
  				this.pageData.toast.text = "文章名称不能超过30字"
	  			this.pageData.toast.showPositionValue = true
	  			return false
  			}
  			if(params.article_content =="" || params.article_content ==null){
  				this.pageData.toast.text = "文章名称不能为空"
	  			this.pageData.toast.showPositionValue = true
	  			return false
  			}
  			if(params.article_content.length>300){
  				this.pageData.toast.text = "文章名称不能超过30字"
	  			this.pageData.toast.showPositionValue = true
	  			return false
  			}
			this.$Axios.post(this.$Urls.POST_ARTICLE_INSERT,params).then(res=>res.data).then((res)=>{
				if(res.code == '0000'){
					this.$vux.alert.show({
				        title: '提示',
				        content: '发布成功',
				        onShow () {
				          	alert('111')
				        },
				        onHide () {
				          	alert('2222')
				        }
				    })
				}else{
					console.log(err)
					this.pageData.toast.text = "系统错误："+err
		  			this.pageData.toast.showPositionValue = true	
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
  		}
  	},
  	
}
</script>

<style>
	.articleInsert .vux-header{
		background: #fff !important;
	}
	.articleInsert .vux-header:after {
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
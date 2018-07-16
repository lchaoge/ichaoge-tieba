<template>
	<view-box ref="viewBox" class="searchIndex">
	    <search placeholder="大家都在搜" name="search" @result-click="resultClick" @on-change="getResult"
	      :results="results" v-model="pageData.search.value" position="absolute" auto-scroll-to-top
	      @on-focus="onFocus" @on-cancel="onCancel" @on-clear="onClear" @on-submit="onSubmit" ref="search"></search>
	    <div class="content">
		    <scroller lock-x :scrollbar-y=false ref="scroller" height="-44">
		    	<tab :line-width="2" :custom-bar-width="getBarWidth">
			      	<tab-item active-class="active-6-1" @on-item-click="tabItemEvt(1)" selected>贴</tab-item>
			      	<tab-item active-class="active-6-2" @on-item-click="tabItemEvt(2)">吧</tab-item>
			      	<tab-item active-class="active-6-3" @on-item-click="tabItemEvt(3)">人</tab-item>
			    </tab>
			   	<div class="swiper-item" v-if="pageData.tabItemIndex==1">
			   		1
			   	</div>
			   	<div class="swiper-item" v-else-if="pageData.tabItemIndex==2">
			   		<div class="panel-user" v-for='item in pageData.search.articleSortList' v-if="pageData.search.articleSortList.length>0">
						<div class="panel-user-photo">
							<img :src="item.image_url" />
						</div>
						<div class="panel-user-right">
							<div class="panel-user-name">{{item.sort_article_name}}</div>
							<div class="panel-user-more">
								<span>关注：{{item.sort_article_name}}</span>
								<span>帖子：{{item.sort_article_name}}</span>
							</div>	
						</div>
					</div>
					<divider v-if="pageData.search.articleSortList.length<=0">您搜索的贴吧不存在哦</divider>
			   	</div>
			   	<div class="swiper-item" v-else="pageData.tabItemIndex==3">
			   		<div class="panel-user" v-for='item in pageData.search.userList' v-if="pageData.search.userList.length>0">
						<div class="panel-user-photo">
							<img :src="item.user_image_url" />
						</div>
						<div class="panel-user-right">
							<div class="panel-user-name">
								{{item.user_name}}
							</div>
							<div class="panel-user-more">{{item.user_description}}</div>
							<div class="panel-user-more">粉丝：0</div>	
						</div>
					</div>
					<divider v-if="pageData.search.userList.length<=0">您搜索的用户不存在哦</divider>
			   	</div>
		    </scroller>	
	    </div>
	</view-box>
</template>

<script>
	import { Search, Group, Cell ,Scroller,ViewBox,Panel  } from 'vux'
	import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
	export default {
	  	components: {
	  		Panel,
		  	Search,
		    Group,
		    Cell,
		    Scroller,
		    ViewBox,
		    Tab,
		    TabItem,
		    Sticky,
		    Divider,
		    XButton,
		    Swiper,
		    SwiperItem
	  	},
	  	data () {
		    return {
		    	results: [],
		      	pageData:{
		      		search:{
		      			isFocus:true,
		      			value:'',
		      			userList:[],
		      			articleList:[],
		      			articleSortList:[],
		      		},
		      		tabItemIndex:'1'
		      		
		      	},
		      	index: 0,
		      	getBarWidth: function (index) {
		        	return (1) * 22 + 'px'
		     	}
		    }
	  	},
	  	created(){
  			this.pageData.search.value = this.$route.query.name
  			this.queryUser()
    		this.queryArticle()
    		this.queryArticleSprt()
  		},
	  	mounted(){
	  		this.setFocus()
	  	},
	  	methods: {
	  		tabItemEvt(index){
	  			this.pageData.tabItemIndex = index
	  		},
	  		onImgError (item, $event) {
		      	console.log(item, $event)
		    },
		    setFocus() {
		      	this.$refs.search.setFocus()
		    },
		    resultClick(item) {
		     	window.alert('you click the result item: ' + JSON.stringify(item))
		    },
		    getResult(val) {
		    	this.pageData.search.list = []
		    	let params = {
		    		sort_article_name:this.pageData.search.value
		    	}
		    },
		    queryUser(){
		    	let params = {
		    		name:this.pageData.search.value
		    	}
		    	this.$Axios.post(this.$Urls.POST_USER_LIKEUSERNAME,params).then(res=>res.data).then((res)=>{
		  			if(res.code === '0000'){
		  				if(res.data.length>0){
		  					this.pageData.search.userList = res.data	
		  				}else{
		  					this.$vux.toast.text('您搜索的用户不存在哦', 'bottom')
		  				}
		  			}else{
		  				this.$vux.toast.text('系统错误', 'bottom')
		  			}
		  		}).catch(err=>console.log("系统错误："+err))
		    },
		    queryArticle(){
		    	let params = {
		    		name:this.pageData.search.value
		    	}
		    	this.$Axios.post(this.$Urls.POST_ARTICLE_LIKEARTNAME,params).then(res=>res.data).then((res)=>{
		  			if(res.code === '0000'){
		  				if(res.data.length>0){
		  					this.pageData.search.articleList = res.data	
		  				}else{
		  					this.$vux.toast.text('您搜索的帖子不存在哦', 'bottom')
		  				}
		  			}else{
		  				this.$vux.toast.text('系统错误', 'bottom')
		  			}
		  		}).catch(err=>console.log("系统错误："+err))
		    },
		    queryArticleSprt(){
		    	let params = {
		    		name:this.pageData.search.value
		    	}
		    	this.$Axios.post(this.$Urls.POST_ARTICLESORT_LIKEARTSNAME,params).then(res=>res.data).then((res)=>{
		  			if(res.code === '0000'){
		  				if(res.data.length>0){
		  					this.pageData.search.articleSprtlist = res.data	
		  				}else{
		  					this.$vux.toast.text('您搜索的贴吧不存在哦', 'bottom')
		  				}
		  			}else{
		  				this.$vux.toast.text('系统错误', 'bottom')
		  			}
		  		}).catch(err=>console.log("系统错误："+err))
		    },
		    onSubmit() {
		      	this.$refs.search.setBlur()
		      	this.$vux.toast.show({
			        type: 'text',
			        position: 'top',
			        text: 'on submit'
		      	})
		    },
		    onFocus() {
		    },
		    onClear(){
		    	this.$router.push({
		    		name:'SearchLink'
		    	})
		    },
		    onCancel() {
		    	this.$router.push({
		    		name:'homeLink'
		    	})
		    }
	  	},
	}
</script>

<style>
	.weui-search-bar__label{
		top: 5px !important;
	}
	.searchIndex .weui-search-bar{
		background: #fff !important;	
	}
	.searchIndex .content{
		margin-top: 44px;
	}
	.weui-cells{
		margin-top: 0 !important;
	}
	.empty{
		background: #fff;
		padding: 10px 15px;
		color: #999;
	}
	.active-6-1 {
	  color: rgb(252, 55, 140) !important;
	  border-color: rgb(252, 55, 140) !important;
	}
	.active-6-2 {
	  color: #04be02 !important;
	  border-color: #04be02 !important;
	}
	.active-6-3 {
	  color: rgb(55, 174, 252) !important;
	  border-color: rgb(55, 174, 252) !important;
	}
</style>
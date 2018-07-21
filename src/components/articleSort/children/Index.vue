<template>
	<view-box ref="viewBox" class="articleSortIndex">
		<x-header :left-options="{backText: ''}" slot="header">
	    	<a slot="right">
	    		<i class="icon iconfont icon-sousuo"></i>
	    	</a>
	    	<a slot="right">
	    		<i class="icon iconfont icon-tixing"></i>
	    	</a>
	    </x-header>
	    <div class="content">
	    	<div class="panel">
	    		<div class="panel-user" style="margin-bottom: 0;">
					<div class="panel-user-photo" style="border: 0px none;border-radius: inherit;">
						<x-img :src="articleSort.image_url" default-src="../static/images/tieba.jpg"></x-img>
					</div>
					<div class="panel-user-right">
						<div class="panel-user-name">{{articleSort.sort_article_name}}吧</div>
						<div class="panel-user-desc">{{articleSort.desc?articleSort.desc:'暂无签名'}}</div>	
					</div>
				</div>
	    	</div>
	    </div>
      	<sticky scroll-box="vux_view_box_body" ref="sticky" :offset="46" :check-sticky-support="false" :disabled="stickyDisabled">
	        <tab :line-width="1">
	          	<tab-item selected @on-item-click="essenceEvt(0)">全部</tab-item>
	          	<tab-item @on-item-click="essenceEvt(1)">精华</tab-item>
	        </tab>
      	</sticky>
      	<scroller lock-x :scrollbar-y=false use-pullup use-pulldown height="-90" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
	    	<div class="">
		    	<div class="panel" v-for="item in queryObj.list" :key="item.article_id">
					<div class="panel-user mb10">
						<div class="panel-user-photo">
							<x-img :src="item.user_image_url" default-src="../static/images/user.jpg"></x-img>
						</div>
						<div class="panel-user-right">
							<div class="panel-user-name">
								{{item.user_name}}
							</div>
							<div class="panel-user-more">
								<span>{{item.article_time}}</span>
							</div>	
						</div>
					</div>
					<div class="panel-content" @click="detailEvt(item.article_id)">
						<p class="panel-content-text">{{item.article_content}}</p>
						<flexbox :gutter="0" class="mb10" v-if="item.images.length>0">
					      	<flexbox-item v-for="(img, index) in item.images" :key="index" v-if="index<3">
					      		<img :src="img.article_image_url" default-src="../static/images/tieba.jpg" style="width:100%;height:8rem;" />
					      	</flexbox-item>
					    </flexbox>
					</div>
					<div class="panel-button">
						<flexbox :gutter="0">
					        <flexbox-item><div class="panel-flex-button">
					        	<i class="icon iconfont icon-fenxiang"></i>
					        	<span>11</span>
					        </div></flexbox-item>
					      	<flexbox-item><div class="panel-flex-button">
					      		<i class="icon iconfont icon-bianji"></i>
					        	<span>29</span>
					      	</div></flexbox-item>
					      	<flexbox-item><div class="panel-flex-button">
					      		<i class="icon iconfont icon-buxing"></i>
					        	<span>{{item.article_click}}</span>
					      	</div></flexbox-item>
					    </flexbox>
					</div>
				</div>
		    </div>
		    <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-loading" style="position: absolute; width: 100%; height: 40px;line-height: 40px; top: -40px; text-align: center;">
		      	<p v-show="status.pulldownStatus === 'loading'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;正在加载...</span></p>
		      	<p v-show="status.pulldownStatus === 'down'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;下拉刷新...</span></p>
		      	<p v-show="status.pulldownStatus === 'up'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;释放刷新...</span></p>
		    </div>
		    <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px;line-height: 40px; bottom: -40px; text-align: center;">
		      	<p v-show="status.pullupStatus === 'up'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;上拉刷新...</span></p>
		      	<p v-show="status.pullupStatus === 'down'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;释放刷新...</span></p>
		      	<p v-show="status.pullupStatus === 'loading'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;正在加载...</span></p>
		      	<p v-show="status.pullupStatus === 'disabled'"><span style="vertical-align:middle;display:inline-block;font-size:14px;">暂无数据</span></p>
		    </div>
	    </scroller>
		<div class="insert" @click="insertEvt">
			<i slot="icon" class="icon iconfont icon-roundadd"></i>
		</div>
	</view-box>
</template>

<script>
	import {InlineLoading,Scroller,Flexbox,FlexboxItem,Badge,ViewBox,XHeader,XTextarea,XInput,Group,Alert,Toast,XImg,Previewer,Sticky,Tab,TabItem,TransferDom } from 'vux'
	export default{
		name: 'articleIndex',
		directives: {
		    TransferDom
		},
	  	components:{
	  		InlineLoading,
	  		Scroller,
	  		FlexboxItem,
	  		Flexbox,
	  		XImg,
	  		Previewer,
		  	ViewBox,
		  	XHeader,
		  	XTextarea,
		  	XInput,
		  	Group,
		  	Badge,
		  	Alert,
		  	Toast,
		  	Sticky,
		  	Tab,
		  	TabItem
	  	},
	  	data(){
			return {
				stickyDisabled:typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
				pullupEnabled: true,
		      	status: {
			        pullupStatus: 'default',
			        pulldownStatus: 'default'
		      	},
				articleSort:{},
				queryObj:{
					sort_article_id:-1,
					sort_article_name:'',
					essence:'0',
					currentPage:1,
		    		pageSize:10,
		    		count:0,
		    		pageCount:0,
					list:[]
				}
			}
		},
		created(){
			this.queryObj.sort_article_id = this.$route.query.sort_article_id
			this.queryObj.sort_article_name = 
			this.$Apis.insertLatelys(this.queryObj.sort_article_id)
			this.initFunc()
		},
		methods:{
			loadMore () {
		      	setTimeout(() => {
			        this.queryObj.currentPage++
			        if(this.queryObj.currentPage<this.queryObj.pageCount){
			        	this.queryEvt()
			        	setTimeout(() => {
				          this.$refs.scroller.donePullup()
				        }, 10)
			        }else{
			        	this.$refs.scroller.disablePullup()
			        }
		      	}, 2000)
		    },
		    refresh () {
		      	setTimeout(() => {
			        this.queryObj.currentPage = 1
			        this.queryObj.list = []
			        this.queryEvt()
			        this.$nextTick(() => {
			          setTimeout(() => {
			            this.$refs.scroller.donePulldown()
			            this.pullupEnabled && this.$refs.scroller.enablePullup()
			          }, 10)
			        })
		      	}, 2000)
		    },
			initFunc(){
				this.queryById()
				this.queryEvt()
			},
			queryById(){
				let params = {
					sort_article_id:this.queryObj.sort_article_id
				}
				this.$Axios.post(this.$Urls.POST_ARTICLESORT_QUERYBYID,params).then(res=>res.data).then((res)=>{
		  			if(res.code === '0000'){
						this.articleSort = res.data[0]  				
		  			}else{
		  				this.$vux.toast.text('系统修改查看人数错误', 'bottom')
		  			}
		  		}).catch(err=>console.log("系统修改查看人数错误："+err))
			},
			queryEvt(){
				let params = {
					sort_article_id:this.queryObj.sort_article_id,
					essence:this.queryObj.essence,
					currentPage:this.queryObj.currentPage,
		    		pageSize:this.queryObj.pageSize,
		    		
				}
				this.$Axios.post(this.$Urls.POST_ARTICLESORT_INDEX,params).then(res=>res.data).then((res)=>{
		  			if(res.code === '0000'){
						res.data.list.forEach(item=>{
							item.article_time = this.$Apis.dateFormat("MM-dd",new Date(item.article_time).getTime())
							this.queryObj.list.push(item)
						})
						this.queryObj.currentPage = res.data.currentPage
			    		this.queryObj.pageSize = res.data.pageSize
			    		this.queryObj.count = res.data.count
			    		this.queryObj.pageCount = res.data.pageCount			
		  			}else{
		  				this.$vux.toast.text('系统修改查看人数错误', 'bottom')
		  			}
		  		}).catch(err=>console.log("系统修改查看人数错误："+err))
			},
			detailEvt(id){
		    	this.$router.push({
		    		name:'articleIndexLink',
		    		query:{
			    		article_id:id
			    	}
		    	})
		   	},
		   	essenceEvt(essence){
		   		this.queryObj.essence = essence
		   		this.queryObj.list = []
		   		this.status= {
			        pullupStatus: 'default',
			        pulldownStatus: 'default'
		      	}
		   		this.queryObj.currentPage = 1
		    	this.queryObj.pageSize = 10
		    	this.queryObj.count = 0
		    	this.queryObj.pageCount = 0
		   		this.queryEvt()
		   	},
		   	// 增加
		   	insertEvt(){
				this.$router.push({
					path:'/article/insert',
					query:{
						type_id:0,
						sort_article_id:this.queryObj.sort_article_id,
						sort_article_name:this.articleSort.sort_article_name
					}
				})
		   	}
		}
	}
</script>

<style>
	.vux-sticky-box{
		z-index: 1000 !important;
	}
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
	.articleSortIndex .content{
		margin-top: 46px;
	}
	.articleSortIndex .panel {
	    background: #fff;
	    margin-bottom: 10px;
	    padding: 10px;
	}
	.articleSortIndex .panel-user-photo {
	    float: left;
	    border-radius: 50px;
	    border: 1px solid #A3A3A3;
	    overflow: hidden;
	    width: 50px;
	    height: 50px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	}
	.articleSortIndex .panel-user-photo img {
	    display: block;
	    width: 50px;
	    height: 50px;
	}
	.articleSortIndex .panel-user-right {
	    height: 50px;
	    padding-left: 60px;
	}
	.articleSortIndex .panel-user-name {
	    color: #333;
	    line-height: 22px;
	    margin-bottom: 6px;
	}
	.articleSortIndex .panel-user-desc{
		color: #999;
		font-size: 14px;
	}
	.articleSortIndex .panel-user-right .panel-user-more {
	    color: #a3a3a3;
	}
	.articleSortIndex .panel-content-text {
	    margin: 0 0 10px;
	}
	.articleSortIndex .panel-flex-button {
	    text-align: center;
	}
	.articleSortIndex .insert .iconfont{
		position: fixed;
		bottom: 0;
		left: 50%;
		margin-left: -18px;
		font-size: 36px !important;
    	color: #09BB07 !important;
	}
	.articleSortIndex .weui-tab__panel{
		padding-bottom: 0 !important;
	}
</style>
<template>
	<div class="index">
		<x-header :left-options="{showBack: false}" slot="header">
			<a slot="overwrite-left" @click="searchEvt">
				<i class="icon iconfont icon-sousuo"></i>
			</a>
			<tab :line-width=2 active-color='#09BB07' v-model="pageData.headerIndex">
	        	<tab-item class="vux-center" :selected="pageData.selected === item" v-for="(item, index) in pageData.headerNav" @click="pageData.selected = item" :key="index">{{item}}</tab-item>
	      	</tab>
	    </x-header>
	    <swiper v-model="pageData.headerIndex" :height="pageData.swiperHeight" :show-dots="false">
	        <swiper-item>
				swiper1
	        </swiper-item>
	        <swiper-item>
	        	<scroller lock-x scrollbar-y use-pullup use-pulldown :height="pageData.swiperHeight" :pulldown-config="{content:'下拉刷新...',downContent:'下拉刷新...',upContent:'释放刷新...',loadingContent:'正在加载...'}" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
			      <div>
			      	<div class="panel" v-for="item in queryObj.list" :key="item.article_id">
						<div class="panel-user">
							<div class="panel-user-photo">
								<img :src="item.user_image_url" />
							</div>
							<div class="panel-user-right">
								<div class="panel-user-name">
									{{item.user_name}}
								</div>
								<div class="panel-user-more">
									<span @click="sortArticleEvt(item.sort_article_id)">{{item.sort_article_name}}吧</span> | 
									<span>{{item.article_time}}</span>
								</div>	
							</div>
						</div>
						<div class="panel-content" @click="detailEvt(item.article_id)">
							<p class="panel-content-text">{{item.article_name?item.article_name:item.article_content}}</p>
							<flexbox :gutter="0" class="mb10" v-if="item.images.length>0">
						      	<flexbox-item v-for="(img, index) in item.images" :key="index" v-if="index<3">
						      		<x-img :src="img.article_image_url" default-src="./static/images/tieba.jpg" style="width:100%;height:8rem;"></x-img>
						      	</flexbox-item>
						    </flexbox>
						</div>
						<div class="panel-button">
							<flexbox :gutter="0">
						        <flexbox-item><div class="panel-flex-button">
						        	<i class="icon iconfont icon-fenxiang"></i>
						        	<countup :start-val="0" :end-val="0" :duration="2"></countup>
						        </div></flexbox-item>
						      	<flexbox-item><div class="panel-flex-button">
						      		<i class="icon iconfont icon-bianji"></i>
						      		<countup :start-val="0" :end-val="0" :duration="2"></countup>
						      	</div></flexbox-item>
						      	<flexbox-item><div class="panel-flex-button">
						      		<i class="icon iconfont icon-buxing"></i>
						      		<countup :start-val="0" :end-val="item.article_click" :duration="2"></countup>
						      	</div></flexbox-item>
						    </flexbox>
						</div>
					</div>
			      </div>
			      <!--pullup slot-->
			      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
			      	<load-more tip="正在加载" v-show="status.pullupStatus === 'loading'"></load-more>
				    <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
			        <!--<span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner>正在加载....</span>-->
			      </div>
			    </scroller>
	        </swiper-item>
	        <swiper-item>
	        	swiper3
	        </swiper-item>
      	</swiper>
	</div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem,Countup,LoadMore } from 'vux'
import { Spinner,Scroller,Flexbox, FlexboxItem,Panel,Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,XImg } from 'vux'

export default {
  	directives: {
    	TransferDom
  	},
  	components: {
  		LoadMore,
  		XImg,
  		Countup,
	  	Spinner,
	  	Scroller,
	  	Flexbox,
	    FlexboxItem,
	    XHeader,
	    Actionsheet,
	    ButtonTab,
	    ButtonTabItem,
	    Tab,
	    TabItem,
	    Sticky,
	    Divider,
	    XButton,
	    Swiper,
	    Panel,
	    SwiperItem
  	},
  	data () {
	    return {
	    	queryObj:{
	    		currentPage:1,
	    		pageSize:10,
	    		count:0,
	    		pageCount:0,
	    		list:[]
	    	},
	      	pullupEnabled: true,
	      	status: {
		        pullupStatus: 'default',
		        pulldownStatus: 'default'
	      	},
	    	pageData:{
				headerNav: ['关注','首页','视频'],
		      	headerIndex: 1,
		      	selected:{},
		      	swiperHeight:'0'
	    	},
	    	
	    }
  	},
  	created() {
		this.pageData.swiperHeight = (document.documentElement.clientHeight-46-50)+"px"
		this.queryEvt()
	},
	methods:{
		searchEvt(){
			this.$router.push({
				name:'searchsLink'
			})
		},
		loadMore () {
	      setTimeout(() => {
	        this.queryObj.currentPage++
	        if(this.queryObj.currentPage<this.queryObj.pageCount){
	        	this.queryEvt()
	        }
	        setTimeout(() => {
	          this.$refs.scroller.donePullup()
	        }, 10)
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
	    queryEvt(){
	    	let params = {
	    		currentPage:this.queryObj.currentPage,
    			pageSize:this.queryObj.pageSize
	    	}
    		this.$Axios.post(this.$Urls.POST_ARTICLE_INDEX,params).then(res=>res.data).then((res)=>{
	  			if(res.code === '0000'){
	  				res.data.list.forEach(el=>{
	  					el.article_time = this.$Apis.dateFormat("MM-dd",new Date(el.article_time).getTime())
	  					this.queryObj.list.push(el)	
	  				})
	  				this.queryObj.currentPage = res.data.currentPage
					this.queryObj.pageSize = res.data.pageSize
					this.queryObj.count = res.data.count
					this.queryObj.pageCount = res.data.pageCount
	  			}else{
	  				this.$vux.toast.text('系统错误', 'bottom')
	  			}
	  		}).catch(err=>console.log("系统错误："+err))
	    },
	    detailEvt(id){
	    	this.$router.push({
	    		name:'articleIndexLink',
	    		query:{
		    		article_id:id
		    	}
	    	})
	    },
	    sortArticleEvt(sort_article_id){
	    	this.$router.push({ 
	    		name: 'articleSortIndexLink',
	    		query: {
	    			sort_article_id: sort_article_id
	    		}
	    	})
	    }
	
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
	.vux-tab-wrap{
		padding-top: 41px !important;
	}
	.vux-tab-container {
    	height: 41px !important;
    }
    .vux-tab{
    	height: 41px !important;
    }
    .vux-slider{
    	margin-top: 46px;
    }
    .weui-tabbar{
    	position: fixed !important;
    	left: 0;
    }
    .panel{
    	background: #fff;
    	margin-bottom: 10px;
    	padding: 10px;
    }
    .panel-user{
    	margin-bottom: 10px;
    }
    .panel-user:after{
    	display: block;
    	height: 0;
    	width: 0;
    	clear: both;
    }
    .panel-user-photo{
    	float: left;
    	border-radius: 50px;
    	border: 1px solid #A3A3A3;
    	overflow: hidden;
    	width: 50px;
    	height: 50px;
    	box-sizing: border-box;
    }
    .panel-user-photo img{
    	display: block;
    	width: 50px;
    	height: 50px;
    }
    .panel-user-right{
    	height: 50px;
    	padding-left: 60px;
    }
    .panel-user-name{
    	color: #333;
    	line-height: 22px;
    	margin-bottom: 6px;
    }
    .panel-user-right .panel-user-more{
    	color: #a3a3a3;
    }
    .panel-content-text{
    	margin: 0 0 10px;
    }
    .panel-flex-button{
    	text-align: center;
    }
</style>
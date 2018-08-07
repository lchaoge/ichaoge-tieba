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
	        	<div v-if="!followIndexObj.user_id" class="p30 tc">
	        		<p class="mb20">登录查看吧友最新帖子~</p>
					<x-button type="primary" action-type="button" :link="{name:'loginLink'}">登录</x-button>        		
	        	</div>
				<scroller v-if="followIndexObj.user_id" lock-x :scrollbar-y=false use-pullup use-pulldown height="-96" @on-pullup-loading="followIndexLoadMore" @on-pulldown-loading="followIndexRefresh" v-model="followIndexObj.status" ref="followIndexScroller">
			      	<div class="">
			      		<div class="panel" v-for="item in followIndexObj.list" :key="item.article_id">
							<div class="panel-user">
								<div class="panel-user-photo">
									<img :src="item.user_image_url" />
								</div>
								<div class="panel-user-right">
									<div class="panel-user-name">{{item.user_name}}</div>
									<div class="panel-user-more">
										<span @click="sortArticleEvt(item.sort_article_id)">{{item.sort_article_name}}吧</span>
										<span class="vux-1px-r mr10"></span>
										<span>{{item.article_time}}</span>
									</div>	
								</div>
							</div>
							<div class="panel-content" @click="detailEvt(item.article_id)">
								<p class="panel-content-text">{{item.article_name?item.article_name:item.article_content}}</p>
								<flexbox class="mb10" v-if="item.images.length>0">
							      	<flexbox-item v-for="(img, index) in item.images" :key="index" v-if="index<3 && item.image_type_id==1">
							      		<div style="width:100%;" :style="{paddingTop:item.images.length==1?'56.25%':'100%',background:'url(' + img.article_image_url + ') no-repeat center center',backgroundSize:'auto auto'}"></div>
							      	</flexbox-item>
							      	<flexbox-item v-if="item.images.length==2 && item.image_type_id==1">
							      		<div style="width:100%;padding-top: 100%;"></div>
							      	</flexbox-item>
							      	<flexbox-item v-for="(img, index) in item.images" :key="index" v-if="item.image_type_id==0">
							      		<player :video-url="img.article_image_url" :state="false"></player>
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
							      		<i class="icon iconfont icon-tubiao-"></i>
							      		<countup :start-val="0" :end-val="item.article_click" :duration="2"></countup>
							      	</div></flexbox-item>
							    </flexbox>
							</div>
						</div>
			      		<load-more v-show="followIndexObj.status.pullupStatus === 'disabled'" :show-loading="false" tip="您已经碰到我的底线了" background-color="#fbf9fe"></load-more>
			      	</div>
			      	<div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-loading" style="position: absolute; width: 100%; height: 40px;line-height: 40px; top: -40px; text-align: center;">
				      	<p v-show="followIndexObj.status.pulldownStatus === 'loading'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;正在加载...</span></p>
				      	<p v-show="followIndexObj.status.pulldownStatus === 'down'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;下拉刷新...</span></p>
				      	<p v-show="followIndexObj.status.pulldownStatus === 'up'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;释放刷新...</span></p>
			      	</div>
			      	<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px;line-height: 40px; bottom: -40px; text-align: center;">
				      	<p v-show="followIndexObj.status.pullupStatus === 'up'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;上拉刷新...</span></p>
				      	<p v-show="followIndexObj.status.pullupStatus === 'down'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;释放刷新...</span></p>
				      	<p v-show="followIndexObj.status.pullupStatus === 'loading'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;正在加载...</span></p>
			      	</div>
			    </scroller>
	        </swiper-item>
	        <swiper-item>
	        	<scroller lock-x :scrollbar-y=false use-pullup use-pulldown height="-96" @on-pullup-loading="indexLoadMore" @on-pulldown-loading="indexRefresh" v-model="indexObj.status" ref="scroller">
			      	<div class="">
			      		<div class="panel" v-for="item in indexObj.list" :key="item.article_id">
							<div class="panel-user">
								<div class="panel-user-photo">
									<img :src="item.user_image_url" />
								</div>
								<div class="panel-user-right">
									<div class="panel-user-name">{{item.user_name}}</div>
									<div class="panel-user-more">
										<span @click="sortArticleEvt(item.sort_article_id)">{{item.sort_article_name}}吧</span>
										<span class="vux-1px-r mr10"></span>
										<span>{{item.article_time}}</span>
									</div>	
								</div>
							</div>
							<div class="panel-content" @click="detailEvt(item.article_id)">
								<p class="panel-content-text">{{item.article_name?item.article_name:item.article_content}}</p>
								<flexbox class="mb10" v-if="item.images.length>0">
							      	<flexbox-item v-for="(img, index) in item.images" :key="index" v-if="index<3 && item.image_type_id==1">
							      		<div style="width:100%;" :style="{paddingTop:item.images.length==1?'56.25%':'100%',background:'url(' + img.article_image_url + ') no-repeat center center',backgroundSize:'auto auto'}"></div>
							      	</flexbox-item>
							      	<flexbox-item v-if="item.images.length==2 && item.image_type_id==1">
							      		<div style="width:100%;padding-top: 100%;"></div>
							      	</flexbox-item>
							      	<flexbox-item v-for="(img, index) in item.images" :key="index" v-else-if="item.image_type_id==0">
							      		<player :video-url="img.article_image_url" :state="false"></player>
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
							      		<i class="icon iconfont icon-tubiao-"></i>
							      		<countup :start-val="0" :end-val="item.article_click" :duration="2"></countup>
							      	</div></flexbox-item>
							    </flexbox>
							</div>
						</div>
			      		<load-more v-show="indexObj.status.pullupStatus === 'disabled'" :show-loading="false" tip="您已经碰到我的底线了" background-color="#fbf9fe"></load-more>
			      	</div>
			      	<div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-loading" style="position: absolute; width: 100%; height: 40px;line-height: 40px; top: -40px; text-align: center;">
				      	<p v-show="indexObj.status.pulldownStatus === 'loading'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;正在加载...</span></p>
				      	<p v-show="indexObj.status.pulldownStatus === 'down'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;下拉刷新...</span></p>
				      	<p v-show="indexObj.status.pulldownStatus === 'up'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;释放刷新...</span></p>
			      	</div>
			      	<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px;line-height: 40px; bottom: -40px; text-align: center;">
				      	<p v-show="indexObj.status.pullupStatus === 'up'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;上拉刷新...</span></p>
				      	<p v-show="indexObj.status.pullupStatus === 'down'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;释放刷新...</span></p>
				      	<p v-show="indexObj.status.pullupStatus === 'loading'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;正在加载...</span></p>
			      	</div>
			    </scroller>
	        </swiper-item>
	        <swiper-item>
	        	<div class="p30 tc">
	        		<p class="mb20">暂未开放~</p>
	        	</div>
	        </swiper-item>
      	</swiper>
	</div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem,Countup,LoadMore,InlineLoading } from 'vux'
import { Spinner,Scroller,Flexbox, FlexboxItem,Panel,Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,XImg } from 'vux'
import player from '../../common/Player';
export default {
  	directives: {
    	TransferDom
  	},
  	components: {
  		player,
  		InlineLoading,
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
	    	indexObj:{
	    		status: {
			        pullupStatus: 'default',
			        pulldownStatus: 'default'
		      	},
	    		currentPage:1,
	    		pageSize:20,
	    		count:0,
	    		pageCount:0,
	    		list:[]
	    	},
	    	followIndexObj:{
	    		status: {
			        pullupStatus: 'default',
			        pulldownStatus: 'default'
		      	},
		      	user_id:'',
	    		currentPage:1,
	    		pageSize:20,
	    		count:0,
	    		pageCount:0,
	    		list:[]
	    	},
	    	videoObj:{
	    		status: {
			        pullupStatus: 'default',
			        pulldownStatus: 'default'
		      	},
	    		currentPage:1,
	    		pageSize:20,
	    		count:0,
	    		pageCount:0,
	    		list:[]
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
  		this.$Apis.inserttabbarSelected(1)
		this.pageData.swiperHeight = (document.documentElement.clientHeight-46-50)+"px"
		this.indexEvt()
		if(this.$store.getters.isLogin){
			this.followIndexObj.user_id = this.$store.getters.currentUser.user_id
			this.followIndexEvt()
		}
	},
	methods:{
		searchEvt(){
			this.$router.push({
				name:'searchsLink'
			})
		},
		indexLoadMore () {
		    this.indexObj.currentPage++
		    this.indexEvt()
	    },
	    indexRefresh () {
	    	setTimeout(() => {
		        this.indexObj.currentPage = 1
		        this.indexObj.list = []
		        this.indexEvt()
		        this.$nextTick(() => {
		          setTimeout(() => {
		            this.$refs.scroller.donePulldown()
		            this.$refs.scroller.enablePullup()
		          }, 10)
		        })
	      	}, 2000)
	    },
	    indexEvt(){
	    	let params = {
	    		currentPage:this.indexObj.currentPage,
    			pageSize:this.indexObj.pageSize
	    	}
    		this.$Axios.post(this.$Urls.POST_ARTICLE_INDEX,params).then(res=>res.data).then((res)=>{
	  			if(res.code === '0000'){
	  				if(res.data.list.length>0){
	  					res.data.list.forEach(el=>{
		  					el.article_time = this.$Apis.getDateDiff(new Date(el.article_time).getTime())
		  					this.indexObj.list.push(el)	
		  				})
						this.indexObj.list = res.data.list
		  				this.indexObj.currentPage = res.data.currentPage
						this.indexObj.pageSize = res.data.pageSize
						this.indexObj.count = res.data.count
						this.indexObj.pageCount = res.data.pageCount	
						
						this.indexObj.status.pullupStatus = 'default'
						this.indexObj.status.pulldownStatus = 'default'
					    this.$refs.scroller.reset()
						if(this.indexObj.currentPage >= this.indexObj.pageCount){
							this.indexObj.status.pullupStatus = 'disabled' // 禁用下拉
						}
	  				}else{
	  					this.indexObj.status.pulldownStatus = 'default'
	  					this.indexObj.status.pullupStatus = 'disabled' // 禁用下拉
	  				}
	  			}else{
	  				this.indexObj.status.pullupStatus = 'default'
					this.indexObj.status.pulldownStatus = 'default'
	  				this.$vux.toast.text('系统错误', 'bottom')
	  			}
	  		}).catch(err=>{
	  			this.indexObj.status.pullupStatus = 'default'
				this.indexObj.status.pulldownStatus = 'default'
	  			this.$vux.toast.text('系统错误', 'bottom')
	  			console.log("系统错误："+err)
	  			
	  		})
	    },
	    followIndexLoadMore () {
		    this.followIndexObj.currentPage++
		    this.followIndexEvt()
	    },
	    followIndexRefresh () {
	    	setTimeout(() => {
		        this.followIndexObj.currentPage = 1
		        this.followIndexObj.list = []
		        this.followIndexEvt()
		        this.$nextTick(() => {
		          setTimeout(() => {
		            this.$refs.followIndexScroller.donePulldown()
		            this.$refs.followIndexScroller.enablePullup()
		          }, 10)
		        })
	      	}, 2000)
	    },
	    followIndexEvt(){
	    	if(!this.$store.getters.isLogin){
	  			return false
	  		}
	    	let params = {
	    		user_id:this.followIndexObj.user_id,
	    		currentPage:this.followIndexObj.currentPage,
    			pageSize:this.followIndexObj.pageSize
	    	}
    		this.$Axios.post(this.$Urls.POST_ARTICLE_FOLLOWINDEX,params).then(res=>res.data).then((res)=>{
	  			if(res.code === '0000'){
	  				if(res.data.list.length>0){
	  					res.data.list.forEach(el=>{
		  					el.article_time = this.$Apis.getDateDiff(new Date(el.article_time).getTime())
		  					this.followIndexObj.list.push(el)	
		  				})
		  				this.followIndexObj.currentPage = res.data.currentPage
						this.followIndexObj.pageSize = res.data.pageSize
						this.followIndexObj.count = res.data.count
						this.followIndexObj.pageCount = res.data.pageCount	
						
						this.followIndexObj.status.pullupStatus = 'default'
						this.followIndexObj.status.pulldownStatus = 'default'
					    this.$refs.followIndexScroller.reset()
						if(this.followIndexObj.currentPage >= this.followIndexObj.pageCount){
							this.followIndexObj.status.pullupStatus = 'disabled' // 禁用下拉
						}
	  				}else{
	  					this.followIndexObj.status.pulldownStatus = 'default'
	  					this.followIndexObj.status.pullupStatus = 'disabled' // 禁用下拉
	  				}
	  			}else{
	  				this.followIndexObj.status.pullupStatus = 'default'
					this.followIndexObj.status.pulldownStatus = 'default'
	  				this.$vux.toast.text('系统错误', 'bottom')
	  			}
	  		}).catch(err=>{
	  			this.followIndexObj.status.pullupStatus = 'default'
				this.followIndexObj.status.pulldownStatus = 'default'
	  			this.$vux.toast.text('系统错误', 'bottom')
	  			console.log("系统错误："+err)
	  			
	  		})
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
	.index .vux-header .vux-header-title{
		margin: 0 100px !important;
	}
	.index .vux-tab-wrap{
		padding-top: 41px !important;
	}
	.index .vux-tab-container {
    	height: 41px !important;
    }
    .index .vux-tab{
    	height: 41px !important;
    }
    .index .vux-slider{
    	margin-top: 46px;
    }
    .index .weui-tabbar{
    	position: fixed !important;
    	left: 0;
    }
    .index .panel{
    	background: #fff;
    	margin-bottom: 10px;
    	padding: 10px;
    }
    .index .panel-user{
    	margin-bottom: 10px;
    }
    .index .panel-user:after{
    	display: block;
    	height: 0;
    	width: 0;
    	clear: both;
    }
    .index .panel-user-photo{
    	float: left;
    	border-radius: 50px;
    	border: 1px solid #dddddd;
    	overflow: hidden;
    	width: 50px;
    	height: 50px;
    	box-sizing: border-box;
    }
    .index .panel-user-photo img{
    	display: block;
    	width: 50px;
    	height: 50px;
    }
    .index .panel-user-right{
    	height: 50px;
    	padding-left: 60px;
    }
    .index .panel-user-name{
    	color: #2d2d2d;
    	line-height: 22px;
    	height: 22px;
    	margin-bottom: 6px;
    }
    .index .panel-user-right .panel-user-more{
    	color: #979797;
    	font-size: 14px;
    }
    .index .panel-user-right .panel-user-more .vux-1px-r{
    	padding-right: 10px;
    	margin-right: 10px;
    }
    .index .panel-content-text{
    	margin: 0 0 10px;
    	color: #060606;
    }
    .index .panel-flex-button{
    	text-align: center;
    	color: #606060;
    }
</style>
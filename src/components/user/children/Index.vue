<template>
	<div class="userIndex">
		<x-header :left-options="{backText: ''}" slot="header" :style="{backgroundColor:headerColor}">我的主页</x-header>
		<scroller lock-x :scrollbar-y=false use-pullup @on-pullup-loading="loadMore" @on-scroll="scrollEvt" v-model="queryObj.status" ref="scroller">
				<div class="">
					<blur :blur-amount=40 :url="currentUser.user_image_url"></blur>
					<div class="userbox">
						<div class="btn-group">
							<x-button mini type="primary">编辑资料</x-button>
						</div>
						<img class="u-photo" :src="currentUser.user_image_url">
		      	<h1 class="u-name">{{currentUser.user_name}}</h1>
		      	<div class="u-more">
			      	<span class="vux-1px-r">
			      		<countup :start-val="0" :end-val="pageData.fansList[0].count" :duration="2"></countup>
			      		<span style="color: #666;">粉丝</span>
			      	</span>
			      	<span class="vux-1px-r">
			      		<countup :start-val="0" :end-val="pageData.userFollow[0].count" :duration="2"></countup>
			      		<span style="color: #666;">关注</span>
			      	</span>
			      	<span>
			      		<countup :start-val="0" :end-val="pageData.followList.length" :duration="2"></countup>
			      		<span style="color: #666;">关注的吧</span>
			      	</span>
		      	</div>
		      	<div class="u-more">
		      		<span>
		      			吧龄：{{user_register_time}}年
		      		</span>
		      	</div>
		      	<div class="u-more">
		      		<p class="u-desc">简介：{{currentUser.user_description?currentUser.user_description:'签名是一种态度，我想我可以更酷...'}}</p>
		      	</div>
					</div>
					<div class="userArticle">
						<div class="panel" v-for="item in queryObj.list" :key="item.article_id">
							<div class="panel-time">
								<em>{{item.date}}</em>
								<span>{{item.month}}月</span>
							</div>
							<div class="panel-box">
								<div class="panel-sort-box">
									<h4 class="panel-sort" v-if="item.type_id==0">{{item.sort_article_name}}吧</h4>
									<h4 class="panel-sort" v-else-if="item.type_id==1">个人主页</h4>
									<a class="panel-sort-btn">
										<i class="icon iconfont icon-qita"></i>
									</a>
								</div>
								<div class="panel-content" @click="detailEvt(item.article_id)">
									<p class="panel-content-text">{{item.article_name?item.article_name:item.article_content}}</p>
									<flexbox class="mb10" v-if="item.images.length>0">
								      	<flexbox-item v-for="(img, index) in item.images" :key="index" v-if="index<3">
								      		<div style="width:100%;height:8rem;" :style="{background:'url(' + img.article_image_url + ') no-repeat center center',backgroundSize:'100% auto'}"></div>
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
	      		<load-more v-show="queryObj.status.pullupStatus === 'disabled'" :show-loading="false" tip="您已经碰到我的底线了" background-color="#fbf9fe"></load-more>	      		
					</div>
				</div>
				<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px;line-height: 40px; bottom: -40px; text-align: center;">
	      	<p v-show="queryObj.status.pullupStatus === 'up'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;上拉刷新...</span></p>
	      	<p v-show="queryObj.status.pullupStatus === 'down'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;释放刷新...</span></p>
	      	<p v-show="queryObj.status.pullupStatus === 'loading'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;正在加载...</span></p>
		     </div>
		</scroller>
	</div>
</template>

<script>
import {LoadMore,InlineLoading,FlexboxItem,Flexbox,TransferDom,Scroller,Blur,Group,Cell,XButton,XHeader,Countup} from 'vux'

export default {
		directives: {
	    TransferDom
		},
  	components: {
  		LoadMore,
  		InlineLoading,
  		FlexboxItem,
  		Flexbox,
			Countup,
			XHeader,
			Scroller,
			Blur,
    	Group,
    	Cell,
    	XButton
  	},
  	data () {
    	return {
    		pageData:{
    			followList:[],
    			userFollow:[{count:0}],
    			fansList:[{count:0}]
    		},
    		headerColor:0,
    		currentUser:{},
	      queryObj:{
	      	status: {
		        pullupStatus: 'default',
		        pulldownStatus: 'default'
	      	},
	      	currentPage:1,
	    		pageSize:20,
	    		count:0,
	    		pageCount:0,
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
			if(this.$store.getters.isLogin){
				this.currentUser = this.$store.getters.currentUser
				this.user_register_time = this.$Apis.getUserRegDay(this.currentUser.user_register_time)
				this.queryEvt()	
				// @todo 关注
				this.queryUserFollowEvt()
				// @todo 粉丝
				this.queryFansEvt()
				// 关注的吧
				this.queryFollowEvt()
			}
		},
		mounted(){
		},
		methods:{
			scrollEvt(e){
				this.$nextTick(() => {
					let a = e.top/200
					this.headerColor = 'rgba(255,255,255,'+a+')'
        })
			},
			loadMore () {
        this.queryObj.currentPage++
        this.queryEvt()
	    },
	    // 查询帖子
			queryEvt(){
				let params = {
					user_id:this.$store.getters.currentUser.user_id,
					currentPage:this.queryObj.currentPage,
		    	pageSize:this.queryObj.pageSize
				}
				this.$Axios.post(this.$Urls.POST_ARTICLE_ARTICLEPAGEBYUSERID,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						if(res.data.list.length>0){
							res.data.list.forEach(el=>{
								let myDate = new Date(el.article_time)								
								el.month = myDate.getMonth()+1
								el.date = myDate.getDate()
								this.queryObj.list.push(el)
		  				})
		  				this.queryObj.currentPage = res.data.currentPage
							this.queryObj.pageSize = res.data.pageSize
							this.queryObj.count = res.data.count
							this.queryObj.pageCount = res.data.pageCount
							
							this.queryObj.status.pullupStatus = 'default'
						    this.$refs.scroller.reset()
							if(this.queryObj.currentPage>=this.queryObj.pageCount){
								this.queryObj.status.pullupStatus = 'disabled' // 禁用下拉
							}
						}else{
							this.queryObj.status.pullupStatus = 'disabled' // 禁用下拉
						}
					}else{
						this.$vux.toast.text('帖子查询失败', 'bottom')
					}
				}).catch(err=>{
					this.$vux.toast.text('系统错误：'+err, 'bottom')
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
	    // 用户粉丝
			queryFansEvt(){
				let params = {
					user_id:this.$store.getters.currentUser.user_id
				}
				this.$Axios.post(this.$Urls.POST_USERATTENTION_FANSCOUNT,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						if(res.data.length>0){
							this.pageData.fansList = res.data
						}
					}else{
						this.$vux.toast.text('系统错误', 'bottom')
					}
				}).catch(err=>{
					this.$vux.toast.text('系统错误：'+err, 'bottom')
				})
			},
			// 用户关注
			queryUserFollowEvt(){
				let params = {
					user_id:this.$store.getters.currentUser.user_id
				}
				this.$Axios.post(this.$Urls.POST_USERATTENTION_FOLLOWCOUNT,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						if(res.data.length>0){
							this.pageData.userFollow = res.data
						}
					}else{
						this.$vux.toast.text('系统错误', 'bottom')
					}
				}).catch(err=>{
					this.$vux.toast.text('系统错误：'+err, 'bottom')
				})
			},
			// 关注的吧
			queryFollowEvt(){
				let params = {
					user_id:this.$store.getters.currentUser.user_id
				}
				this.$Axios.post(this.$Urls.POST_ARTICLESORT_FOLLOW,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						if(res.data.length>0){
							this.pageData.followList = res.data
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

<style scoped>
	#app .userIndex .vux-header{
		background-color: rgba(255,255,255,0);
	}
	.userIndex .vux-header:after{
		border: 0px none;
	}
	.userIndex .vux-header .vux-header-title{
		color: #fff !important;
	}
	.userIndex .vux-header .vux-header-left .left-arrow:before{
		border: 1px solid #fff !important;
	}
	.userIndex .userbox{
		position: relative;
		padding: 10px;
		background: #fff;
		margin-bottom: 10px;
	}
	.userIndex .btn-group{
		text-align: right;
		margin-bottom: 10px;
	}
	.userIndex .u-photo{
		position: absolute;
		top: -43px;
		left: 10px;
		width: 80px;
		height: 80px;
		border-radius: 50%;
  	border: 3px solid #fff;
	}
	.userIndex .u-name{
		font-size: 18px;
		font-weight: 500;
		line-height: 25px;
		margin-bottom: 10px;
	}
	.userIndex .u-more{
		margin-bottom: 8px;
	}
	.userIndex .u-desc{
		color: #999999;
	}
	.userIndex .vux-1px-r{
		padding-right: 10px;
		margin-right: 5px;
	}
	.userIndex .weui-btn_primary{
		border-radius: 3px;
		width: 70px;
		padding: 0;
		background: #55b5e5;	
	}
	.userIndex .userArticle{
		position: relative;
	}
	.userIndex .panel{
		position: relative;
		overflow: hidden;
		background: #fff;
		padding: 10px;
		margin-bottom: 10px;
	}
	.userIndex .panel-time{
		position: absolute;
		top: 10px;
		left: 10px;
		width: 40px;
    text-align: center;
    margin-right: 10px;
	}
	.userIndex .panel-time em{
		font-size: 25px;
	}
	.userIndex .panel-time span{
		font-size: 12px;
		color: #666;
	}
	.panel-box{
		margin-left: 50px;
	}
	.panel-sort-box{
		line-height: 20px;
		height: 20px;
		overflow: hidden;
		margin-bottom: 8px;
	}
	.panel-sort-box .panel-sort{
		font-size: 12px;
		color: #666;
		float: left;
	}
	.panel-sort-box .panel-sort-btn{
		float: right;
		color: #666;
	}
	.panel-content{
		margin-bottom: 8px;
	}
	.panel-content-text{
		margin-bottom: 8px;
	}
	.panel-button{
	}
	.panel-flex-button{
		text-align: center;
	}
</style>
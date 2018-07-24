<template>
	<view-box ref="viewBox" class="FollowArticleSort">
		<x-header :left-options="{backText: ''}" slot="header">我关注的吧</x-header>
		<div style="margin-top: 46px;">
			<scroller lock-x :scrollbar-y=false use-pullup height="-46" @on-pullup-loading="loadMore" v-model="queryObj.status" ref="scroller">
		    	<div class="panel">
		    		<div class="panel-user" v-for="item in queryObj.list" :key="item.sort_article_id" @click="detailEvt(item)">
						<div class="panel-user-photo">
							<x-img :src="item.image_url" default-src="../static/images/tieba.jpg"></x-img>
						</div>
						<div class="panel-user-content">
							<div class="panel-user-name">{{item.sort_article_name}}</div>
							<div class="panel-user-desc">{{item.desc?item.desc:'暂无签名'}}</div>
						</div>
					</div>
					<load-more v-show="queryObj.status.pullupStatus === 'disabled'" :show-loading="false" tip="您已经碰到我的底线了" background-color="#fbf9fe"></load-more>
		    	</div>
		    	<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px;line-height: 40px; bottom: -40px; text-align: center;">
			      	<p v-show="queryObj.status.pullupStatus === 'up'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;上拉刷新...</span></p>
			      	<p v-show="queryObj.status.pullupStatus === 'down'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;释放刷新...</span></p>
			      	<p v-show="queryObj.status.pullupStatus === 'loading'"><inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;正在加载...</span></p>
		      	</div>
		    </scroller>	
		</div>
	</view-box>
</template>

<script>
	import {XButton,Scroller,ViewBox,XHeader,XImg,TransferDom,Divider,LoadMore,InlineLoading} from 'vux'
	export default{
		name: 'userFollow',
		directives: {
		    TransferDom
		},
	  	components:{
	  		InlineLoading,
	  		LoadMore,
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
			
		},
		mounted(){
			this.queryEvt()
		},
		methods:{
			loadMore () {
		        this.queryObj.currentPage++
		        this.queryEvt()
		    },
			// 关注的吧
			queryEvt(){
				let params = {
					user_id:this.$store.getters.currentUser.user_id,
					currentPage:this.queryObj.currentPage,
		    		pageSize:this.queryObj.pageSize
				}
				this.$Axios.post(this.$Urls.POST_ARTICLESORT_FOLLOWPAGE,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						if(res.data.list.length>0){
							res.data.list.forEach(el=>{
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
						this.$vux.toast.text('系统错误', 'bottom')
					}
				}).catch(err=>{
					this.$vux.toast.text('系统错误：'+err, 'bottom')
				})
			},
			detailEvt(item){
				this.$router.push({
					name: 'articleSortIndexLink', 
					query: {
						sort_article_id: item.sort_article_id 
					}
				})
			}
		}
	}
</script>

<style>
	.FollowArticleSort .panel{
		overflow: hidden;
		padding: 10px;
		background: #fff;
	}
	.FollowArticleSort .panel-user{
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
	.FollowArticleSort .panel-user:after{
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
	.FollowArticleSort .panel-user:last-of-type{
		margin-bottom: 0;
		padding-bottom: 0;
	}
	.FollowArticleSort .panel-user:last-of-type:after{
		border-top: 0px none;
	}
	.FollowArticleSort .panel-user .panel-user-photo {
	    margin-right: .8em;
	    width: 40px;
	    height: 40px;
	    line-height: 40px;
	    text-align: center;
	    overflow: hidden;
	}
	.FollowArticleSort .panel-user .panel-user-content {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    min-width: 0;
	    height: 40px;
	}
	.FollowArticleSort .panel-user .panel-user-content .panel-user-name {
		margin-bottom: 6px;
	    font-weight: 400;
	    font-size: 17px;
	    width: auto;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    word-wrap: normal;
	    word-wrap: break-word;
	    word-break: break-all;
	}
	.FollowArticleSort .panel-user .panel-user-content .panel-user-desc {
	    color: #999999;
	    font-size: 13px;
	    line-height: 1.2;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 2;
	}
	.FollowArticleSort .panel-user .panel-user-right{
		display: flex;
    	text-align: center;
	}
	.FollowArticleSort .panel-user .panel-user-right .btn{
		line-height: 30px;
		height: 30px;
		background: #fff;
		border: 1px solid #09BB07;
		color: #09BB07;
	}
	.FollowArticleSort .panel-user .panel-user-right .btn.active{
		color: #999;
		border: 1px solid #999;
	}
	.FollowArticleSort .panel-user .panel-user-right .btn .icon{
		font-size: 12px;
	}
</style>
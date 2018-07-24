<template>
	<view-box ref="viewBox" class="userFollow">
		<x-header :left-options="{backText: ''}" slot="header">我关注的人</x-header>
		<div style="margin-top: 46px;">
			<scroller lock-x :scrollbar-y=false use-pullup height="-46" @on-pullup-loading="loadMore" v-model="queryObj.status" ref="scroller">
		    	<div class="panel">
		    		<div class="panel-user" v-for="item in queryObj.list">
						<div class="panel-user-photo">
							<img :src="item.user_image_url" />
						</div>
						<div class="panel-user-content">
							<div class="panel-user-name">{{item.user_name}}</div>
							<div class="panel-user-desc">{{item.user_description?item.user_description:'暂无签名'}}</div>
						</div>
						<div class="panel-user-right">
							<x-button mini plain type="primary" class="btn active" v-if="item.show" @click.native="deleteEvt(item)">{{item.attention_type==1?'互相关注':'已关注'}}</x-button>
							<x-button mini plain type="primary" class="btn"  v-if="!item.show" @click.native="addEvt(item)"><i class="icon iconfont icon-zengjia"></i>关注</x-button>
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
		<actionsheet v-model="actionsheet.show" :menus="actionsheet.menus" @on-click-menu-delete="actionsheetDelete" show-cancel></actionsheet>
	</view-box>
</template>

<script>
	import {XButton,Scroller,ViewBox,XHeader,XImg,TransferDom,Divider,LoadMore,InlineLoading,Actionsheet} from 'vux'
	export default{
		name: 'userFollow',
		directives: {
		    TransferDom
		},
	  	components:{
	  		Actionsheet,
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
				actionsheet:{
					menus: {
			        	'title.noop': '<span style="color:#666;font-size:12px;">确定不在关注此人？</span>',
				        delete: '<span>确定</span>'
				    },
				    show:false,	
				    form:{}
				},
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
			this.queryEvt()
		},
		mounted(){
			
		},
		methods:{
			actionsheetDelete () {
				let params = {
					user_id : this.$store.getters.currentUser.user_id,
					attention_id : this.actionsheet.form.user_id
				}
				this.$Axios.post(this.$Urls.POST_USERATTENTION_DELETE,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						this.$vux.toast.text('取消关注成功', 'bottom')
						this.actionsheet.form.show = !this.actionsheet.form.show
					}else{
						this.$vux.toast.text('取消关注失败', 'bottom')
					}
				}).catch(err=>{
					this.$vux.toast.text('系统错误：'+err, 'bottom')
				})
		    },
			loadMore () {
		        this.queryObj.currentPage++
		        this.queryEvt()
		    },
			// 用户关注
			queryEvt(){
				let params = {
					user_id:this.$store.getters.currentUser.user_id,
					currentPage:this.queryObj.currentPage,
		    		pageSize:this.queryObj.pageSize
				}
				this.$Axios.post(this.$Urls.POST_USERATTENTION_FOLLOW,params).then(res=>res.data).then((res)=>{
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
					console.log('系统错误：'+err, 'bottom')
					this.$vux.toast.text('系统错误：'+err, 'bottom')
				})
			},
			deleteEvt(item){
				this.actionsheet.show = true
				this.actionsheet.form = item
			},
			addEvt(item){
				let params = {
					user_id : this.$store.getters.currentUser.user_id,
					attention_id : item.user_id
				}
				this.$Axios.post(this.$Urls.POST_USERATTENTION_INSERT,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						this.$vux.toast.text('关注成功', 'bottom')
						item.show = !item.show
					}else{
						this.$vux.toast.text('关注失败', 'bottom')
					}
				}).catch(err=>{
					this.$vux.toast.text('系统错误：'+err, 'bottom')
				})
			}
		}
	}
</script>

<style>
	.userFollow .panel{
		overflow: hidden;
		padding: 10px;
		background: #fff;
	}
	.userFollow .panel-user{
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
	.userFollow .panel-user:after{
		content: " ";
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    height: 1px;
	    border-top: 1px solid #ededed;
	    color: #ededed;
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    -webkit-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	}
	.userFollow .panel-user:last-of-type{
		margin-bottom: 0;
		padding-bottom: 0;
	}
	.userFollow .panel-user:last-of-type:after{
		border-top: 0px none;
	}
	.userFollow .panel-user .panel-user-photo {
	    margin-right: .8em;
	    width: 40px;
	    height: 40px;
	    line-height: 40px;
	    text-align: center;
	    border-radius: 50%;
	    overflow: hidden;
	}
	.userFollow .panel-user .panel-user-photo img{
		width: 100%;
		height: 100%;
	}
	.userFollow .panel-user .panel-user-content {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    min-width: 0;
	}
	.userFollow .panel-user .panel-user-content .panel-user-name {
	    font-weight: 400;
	    font-size: 17px;
	    width: auto;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    word-wrap: normal;
	    word-wrap: break-word;
	    word-break: break-all;
	    color: #090909;
	    margin-bottom: 6px;
	}
	.userFollow .panel-user .panel-user-content .panel-user-desc {
	    color: #999999;
	    font-size: 13px;
	    line-height: 1.2;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 2;
	}
	.userFollow .panel-user .panel-user-right{
		display: flex;
    	text-align: center;
	}
	.userFollow .panel-user .panel-user-right .btn{
		width: 70px;
		padding: 0;
		line-height: 30px;
		height: 30px;
		background: #fff;
		border: 1px solid #55b5e5;
		color: #55b5e5;
		border-radius: 3px;
	}
	.userFollow .panel-user .panel-user-right .btn.active{
		color: #999;
		border: 1px solid #999;
	}
	.userFollow .panel-user .panel-user-right .btn .icon{
		font-size: 12px;
	}
</style>
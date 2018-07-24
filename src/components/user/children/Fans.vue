<template>
	<view-box ref="viewBox" class="userFans">
		<x-header :left-options="{backText: ''}" slot="header">我的粉丝</x-header>
		<div style="margin-top: 46px;">
			<scroller lock-x :scrollbar-y=false use-pullup height="-46" @on-pullup-loading="loadMore" v-model="queryObj.status" ref="scroller">
		    	<div class="panel">
		    		<div class="panel-user" v-for="item in queryObj.list">
						<div class="panel-user-photo">
							<img :src="item.user_image_url" />
						</div>
						<div class="panel-user-content">
							<div class="panel-user-name">{{item.user_name}}</div>
						</div>
						<div class="panel-user-right">
							<x-button mini plain type="primary" class="btn active" v-if="item.attention_type == 1" @click.native="deleteEvt(item)">{{item.attention_type==1?'互相关注':'已关注'}}</x-button>
							<x-button mini plain type="primary" class="btn"  v-else-if="item.attention_type==0" @click.native="addEvt(item)"><i class="icon iconfont icon-zengjia"></i>关注</x-button>
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
		name: 'userFans',
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
			// 用户粉丝
			queryEvt(){
				let params = {
					user_id:this.$store.getters.currentUser.user_id,
					currentPage:this.queryObj.currentPage,
		    		pageSize:this.queryObj.pageSize
				}
				this.$Axios.post(this.$Urls.POST_USERATTENTION_FANS,params).then(res=>res.data).then((res)=>{
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
			deleteEvt(item){
				let params = {
					user_id : item.user_id,
					attention_id : this.$store.getters.currentUser.user_id
				}
				this.$Axios.post(this.$Urls.POST_USERATTENTION_DELETE,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						this.$vux.toast.text('取消关注成功', 'bottom')
						item.attention_type = 0
					}else{
						this.$vux.toast.text('取消关注失败', 'bottom')
					}
				}).catch(err=>{
					this.$vux.toast.text('系统错误：'+err, 'bottom')
				})
			},
			addEvt(item){
				let params = {
					user_id : item.user_id,
					attention_id : this.$store.getters.currentUser.user_id
				}
				this.$Axios.post(this.$Urls.POST_USERATTENTION_INSERT,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						this.$vux.toast.text('关注成功', 'bottom')
						item.attention_type = 1
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
	.userFans .panel{
		overflow: hidden;
		padding: 10px;
		background: #fff;
	}
	.userFans .panel-user{
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
	.userFans .panel-user:after{
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
	.userFans .panel-user:last-of-type{
		margin-bottom: 0;
		padding-bottom: 0;
	}
	.userFans .panel-user:last-of-type:after{
		border-top: 0px none;
	}
	.userFans .panel-user .panel-user-photo {
	    margin-right: .8em;
	    width: 40px;
	    height: 40px;
	    line-height: 40px;
	    text-align: center;
	    border-radius: 50%;
	    overflow: hidden;
	}
	.userFans .panel-user .panel-user-photo img{
		width: 100%;
		height: 100%;
	}
	.userFans .panel-user .panel-user-content {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    min-width: 0;
	}
	.userFans .panel-user .panel-user-right{
		display: flex;
    	text-align: center;
	}
	.userFans .panel-user .panel-user-right .btn{
		padding: 0;
		width: 70px;
		line-height: 30px;
		height: 30px;
		background: #fff;
		border: 1px solid #55b5e5;
		color: #55b5e5;
	}
	.userFans .panel-user .panel-user-right .btn.active{
		color: #999;
		border: 1px solid #999;
	}
	.userFans .panel-user .panel-user-right .btn .icon{
		font-size: 12px;
	}
</style>
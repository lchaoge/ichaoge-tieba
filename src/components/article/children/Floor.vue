<template>
	<view-box ref="viewBox" class="articleFloor">
		<x-header :left-options="{backText: ''}" slot="header">第{{queryObj.floor}}楼</x-header>
		<div style="margin-top: 46px;">
			<scroller lock-x :scrollbar-y=false use-pullup height="-46" @on-pullup-loading="loadMore" v-model="queryObj.status" ref="scroller">
		    	<div class="">
		    		<div class="stayMessage">
				      	<div class="m-cell">
					        <div class="m-img">
					        	<a @click="userInfoEvt(oneFloorObj.stay_user_id)"><img :src="oneFloorObj.user_image_url" /></a>
					        </div>
					        <div class="m-box">
					        	<div>
					        		<h3 @click.stop="userInfoEvt(oneFloorObj.stay_user_id)">{{oneFloorObj.user_name}}</h3>
					          		<time class="m-desc">{{oneFloorObj.message_stay_time}}</time>	
					        	</div>
					          	<div class="m-content" @click.stop="replyEvt(oneFloorObj,true)">{{oneFloorObj.message_content}}</div>
					        </div>
				      	</div>
				    </div>
				    <cell-box v-if="queryObj.list.length>0">
			        	<div class="item" v-for="(el,index) in queryObj.list" :key="el.stay_id">
			        		<a @click.stop="userInfoEvt(el.stay_user_id)">{{el.user_name}}:</a>
			        		<span v-if="oneFloorObj.user_id != el.user_id">回复</span>
			        		<a @click.stop="userInfoEvt(el.stay_user_id)" v-if="oneFloorObj.user_id != el.user_id">{{el.stay_user_name}}:</a>
			        		<span  @click="replyEvt(el,false)">{{el.message_content}}</span>
			        		<time>{{el.message_stay_time}}</time>
						</div>
			        </cell-box>
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
	import {XButton,Scroller,ViewBox,XHeader,TransferDom,LoadMore,InlineLoading,CellBox} from 'vux'
	export default{
		name: 'userFollow',
		directives: {
		    TransferDom
		},
	  	components:{
	  		InlineLoading,
	  		LoadMore,
	  		XButton,
	  		Scroller,
	  		ViewBox,
		  	XHeader,
		  	CellBox
	  	},
	  	data(){
			return {
				oneFloorObj:{},
				queryObj:{
					status: {
				        pullupStatus: 'default',
				        pulldownStatus: 'default'
			      	},
			      	floor:'',
			      	article_id:'',
			      	currentPage:1,
		    		pageSize:20,
		    		count:0,
		    		pageCount:0,
					list:[]
				}
			}
		},
		created() {
			this.queryObj.floor = this.$route.query.floor
			this.queryObj.article_id = this.$route.query.article_id
			this.queryOneFloor()
			this.queryEvt()
		},
		mounted(){
		},
		methods:{
			queryOneFloor(){
				let params = {
					floor : this.queryObj.floor,
					article_id : this.queryObj.article_id
				}
				this.$Axios.post(this.$Urls.POST_STAYMESSAGE_QUERYONEFLOOR,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						this.oneFloorObj = res.data[0]
						this.oneFloorObj.message_stay_time = this.$Apis.getDateDiff(new Date(this.oneFloorObj.message_stay_time).getTime())
					}else{
						this.$vux.toast.text('查询单个楼层失败', 'bottom')
					}
				}).catch(err=>{
					this.$vux.toast.text('系统错误：'+err, 'bottom')
				})
			},
			userInfoEvt(user_id){
				this.$router.push({
					name:'userIndexLink',
					query:{
						isCurrentUser:false,
						user_id:user_id
					}
				})
			},
			loadMore () {
		        this.queryObj.currentPage++
		        this.queryEvt()
		    },
			queryEvt(){
				let params = {
					floor : this.queryObj.floor,
					article_id : this.queryObj.article_id,
					currentPage:this.queryObj.currentPage,
		    		pageSize:this.queryObj.pageSize
				}
				this.$Axios.post(this.$Urls.POST_STAYMESSAGE_QUERYONEFLOORLIST,params).then(res=>res.data).then((res)=>{
					if(res.code === "0000"){
						if(res.data.list.length>0){
							res.data.list.forEach(el=>{
								el.message_stay_time = this.$Apis.getDateDiff(new Date(el.message_stay_time).getTime())
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
						this.$vux.toast.text('查看单个楼层的子评论失败', 'bottom')
					}
				}).catch(err=>{
					console.log('系统错误：'+err, 'bottom')
					this.$vux.toast.text('系统错误：'+err, 'bottom')
				})
			},
			
		}
	}
</script>

<style>
	.articleFloor .stayMessage {
	    background: #fff;
	    overflow: hidden;
	}
	.articleFloor .m-cell {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-pack: justify;
	    -ms-flex-pack: justify;
	    justify-content: space-between;
	    padding: 10px;
	    position: relative;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -ms-flex-direction: row;
	    flex-direction: row;
	}
	.articleFloor .m-cell:after {
	    content: " ";
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    height: 0px;
	    border-top: 1px solid #D9D9D9;
	    color: #D9D9D9;
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    -webkit-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	}
	.articleFloor .m-cell .m-img {
	    text-align: center;
	    width: 30px;
	    margin-right: 10px;
	}
	.articleFloor .m-cell .m-img img {
	    border-radius: 50%;
	    overflow: hidden;
	    width: 30px;
	    height: 30px;
	}
	.articleFloor .m-cell .m-box {
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    width: 100%;
	}
	.articleFloor .m-cell .m-box h3 {
	    color: #000;
	    margin-bottom: 8px;
	    display: inline-block;
	}
	.articleFloor .m-cell .m-box .m-desc {
	    margin-bottom: 8px;
	    color: #999;
	    font-size: 14px;
	}
	.articleFloor .m-cell .m-box .m-content {
	    font-weight: 500;
	    word-wrap: break-word;
	}
	.articleFloor .weui-cell {
	    background: #fff;
	    display: block;
	}
	.articleFloor .weui-cell:before{
		left: 0;
	    height: 0;
	    border-top: 0 none;
	}
	.articleFloor .weui-cell .item {
	    margin-bottom: 6px;
	    line-height: 17px;
	}
	.articleFloor .weui-cell .item a {
	    color: #0366d6;
	}
	.articleFloor .weui-cell .item time{
		color: #999;
	}











</style>
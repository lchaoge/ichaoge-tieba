<template>
	<view-box ref="viewBox" class="articleIndex">
		<x-header :left-options="{backText: ''}" slot="header">
	    	<a slot="right" @click="moreEvt">
	    		<i class="icon iconfont icon-xitongcaidan"></i>
	    	</a>
	    </x-header>
	    <div class="content">
	    	<div class="panel">
	    		<h1 class="panel-content-title" v-if="queryObj.detail.article_name">{{queryObj.detail.article_name}}</h1>
	    		<div class="panel-user">
					<div class="panel-user-photo">
						<img :src="queryObj.detail.user_image_url" />
					</div>
					<div class="panel-user-right">
						<div class="panel-user-name">
							{{queryObj.detail.user_name}}
						</div>
						<div class="panel-user-more">
							<span @click="sortArticleEvt(queryObj.detail.sort_article_id)">{{queryObj.detail.sort_article_name}}吧</span> | 
							<span>{{queryObj.detail.article_time}}</span>
						</div>	
					</div>
				</div>
				<div class="panel-content">
					<p class="panel-content-text">{{queryObj.detail.article_content}}</p>
					<div style="text-align:center;">
				      	<img class="previewer-demo-img" v-for="(item, index) in queryObj.detail.images" :src="item.article_image_url" width="100%" @click="show(index)">
				    </div>
				    <div v-transfer-dom>
				      	<previewer :list="queryObj.detail.images" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
				    </div>
				</div>
	    	</div>
	    </div>
		<sticky scroll-box="vux_view_box_body" ref="sticky" :offset="46" :check-sticky-support="false" :disabled="stickyDisabled">
	        <tab :line-width="1">
	          	<tab-item selected>全部回复</tab-item>
	          	<tab-item>只看楼主</tab-item>
	        </tab>
      	</sticky>
	    <!--<scroller lock-x :scrollbar-y=false use-pullup use-pulldown height="-90" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">-->
    	<div class="stayMessage">
	      	<div class="m-cell" v-for="item in stayMessageList">
		        <div class="m-img">
		        	<router-link :to="{name:'userIndexLink'}"><img :src="item.user_image_url" /></router-link>
		        </div>
		        <div class="m-box">
		          	<h3>{{item.user_name}}</h3>
		          	<div class="m-desc">
		          		<span class="m-floor">第{{item.floor}}楼</span>|
		          		<span class="m-time">{{item.message_stay_time}}</span>
		          	</div>
		          	<p class="m-content">{{item.message_content}}</p>
		          	<template v-if="item.children.length>0">
				        <cell-box v-for="el in item.children" :key="el.stay_id" v-if="item.children.length<2">
				        	<div class="item">
				        		<a>{{el.user_name}}:</a>
				        		<span v-if="item.user_id != el.user_id">回复</span>
				        		<a v-if="item.user_id != el.user_id">{{el.user_id}}:</a>
				        		<span>{{el.message_content}}</span>
							</div>	
				        </cell-box>
				    </template>	
		        </div>
	      	</div>
	      	<div v-if="stayMessageList.length<=0">
	      		<load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
	      	</div>
	    </div>
		    <!--<div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-loading" style="position: absolute; width: 100%; height: 40px;line-height: 40px; top: -40px; text-align: center;">
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
    	</scroller>-->
	    <div class="footer" slot="bottom">
	    	<group>
	    		<x-textarea placeholder="说说你的看法..." @on-focus="textareaFocus" :readonly="true" :show-counter="false" :rows="1" autosize :max="200"></x-textarea>
	    	</group>
	    </div>
	    <div v-transfer-dom>
	      	<popup v-model="stayMessage.show" position="bottom" max-height="50%">
      			<group>
      				<div class="flexDiv">
			          	<x-textarea placeholder="说说你的看法..." ref="messageContent" v-model="stayMessage.form.message_content" :show-counter="false" :rows="1" autosize :max="200"></x-textarea>
			          	<a @click="insertStayMessageEvt">发表</a>
		          	</div>
		        </group>
	      	</popup>
	    </div>
	</view-box>
</template>

<script>
	import {LoadMore,Masker,CellBox,Cell,Popup,InlineLoading,Scroller,Badge,ViewBox,XHeader,XTextarea,XInput,Group,XImg,Previewer,Sticky,Tab,TabItem,TransferDom } from 'vux'
	export default{
		name: 'articleIndex',
		directives: {
		    TransferDom
		},
	  	components:{
	  		LoadMore,
	  		Masker,
	  		CellBox,
	  		Cell,
	  		Popup,
	  		InlineLoading,
	  		Scroller,
	  		XImg,
	  		Previewer,
		  	ViewBox,
		  	XHeader,
		  	XTextarea,
		  	XInput,
		  	Group,
		  	Badge,
		  	Sticky,
		  	Tab,
		  	TabItem
	  	},
		data(){
			return {
				stickyDisabled:typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
				currentUser:{},
				stayMessage:{
					show:false,
					form:{
						message_content:''
					}
				},
				stayMessageList:[],
				pullupEnabled: true,
		      	status: {
			        pullupStatus: 'default',
			        pulldownStatus: 'default'
		      	},
				queryObj:{
					article_id:'',
					detail:{
						images:[]
					},
					currentPage:1,
		    		pageSize:10,
		    		count:0,
		    		pageCount:0,
					list:[]
				},
				options: {
			        getThumbBoundsFn (index) {
			          // find thumbnail element
			          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
			          // get window scroll Y
			          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
			          // optionally get horizontal scroll
			          // get position of element relative to viewport
			          let rect = thumbnail.getBoundingClientRect()
			          // w = width
			          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
			          // Good guide on how to get element coordinates:
			          // http://javascript.info/tutorial/coordinates
			        }
			    }
			}
		},
		created(){
			this.queryObj.article_id = this.$route.query.article_id
			this.updateClick()
			this.$Apis.getIntnetIP()
			this.currentUser = this.$store.getters.currentUser
		},
		methods:{
			queryFloorAll(){
				let params = {
					article_id:this.queryObj.detail.article_id
				}
				this.$Axios.post(this.$Urls.POST_STAYMESSAGE_QUERYFLOORALL,params).then(res=>res.data).then((res)=>{
		  			if(res.code === '0000'){
	  					this.stayMessageList = res.data
		  			}else{
		  				this.$vux.toast.text('查询评论失败', 'bottom')
		  			}
		  		}).catch(err=>console.log("系统错误："+err))
			},
			insertStayMessageEvt(){
				this.stayMessage.show = false
				let params = {
					user_id:this.queryObj.detail.user_id,
					article_id:this.queryObj.detail.article_id,
					stay_user_id:this.currentUser.user_id,
					stay_user_ip:returnCitySN.cip,
					message_content:this.stayMessage.form.message_content
				}
				
				this.$Axios.post(this.$Urls.POST_STAYMESSAGE_INSERT,params).then(res=>res.data).then((res)=>{
		  			if(res.code === '0000'){
	  					// 显示
	  					this.$vux.toast.show({
						 	text: '发送成功',
						 	time: '1000'
						})
	  					this.stayMessage.form.message_content = ""		  		
						this.queryFloorAll()
		  			}else{
		  				this.$vux.toast.text('发送失败', 'bottom')
		  			}
		  		}).catch(err=>console.log("系统错误："+err))
			},
			textareaFocus(){
				let isLogin = this.$store.getters.isLogin
				if(!isLogin){
					this.$router.push({
						name:'loginLink',
						query:{
							article_id:this.queryObj.article_id
						}
					})
				}else{
					this.stayMessage.show = true
					this.$refs.messageContent.focus()
					this.currentUser = this.$store.getters.currentUser
				}
			},
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
			updateClick(){
				let params = {
					article_id:this.queryObj.article_id
				}
				this.$Axios.post(this.$Urls.POST_ARTICLE_UPDATECLICK,params).then(res=>res.data).then((res)=>{
		  			if(res.code === '0000'){
						this.queryEvt()  				
		  			}else{
		  				this.$vux.toast.text('系统修改查看人数错误', 'bottom')
		  			}
		  		}).catch(err=>console.log("系统修改查看人数错误："+err))
			},
			queryEvt(){
				let params = {
					article_id:this.queryObj.article_id
				}
				this.$Axios.post(this.$Urls.POST_ARTICLE_DETAIL,params).then(res=>res.data).then((res)=>{
		  			if(res.code === '0000'){
		  				let obj = res.data[0]
		  				obj.article_time = this.$Apis.dateFormat("MM-dd",new Date(obj.article_time).getTime())
		  				let images = []
		  				obj.images.forEach(el=>{
		  					images.push({
		  						article_id : el.article_id,
		  						article_image_id : el.article_image_id,
		  						article_image_url : el.article_image_url,
		  						src : el.article_image_url	
		  					})
		  				})
		  				obj.images = images
		  				this.queryObj.detail = obj 
		  				this.queryFloorAll()
		  				this.$Apis.insertLatelys(this.queryObj.detail.sort_article_id)
		  				
		  			}else{
		  				this.$vux.toast.text('系统错误', 'bottom')
		  			}
		  		}).catch(err=>console.log("系统错误："+err))
			},
			moreEvt(){
				
			},
			logIndexChange (arg) {
		      	console.log(arg)
		    },
		    show (index) {
		     	this.$refs.previewer.show(index)
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
	.articleIndex .panel {
	    background: #fff;
	    margin-bottom: 10px;
	    padding: 10px;
	}
	.articleIndex .panel-user {
	    margin-bottom: 10px;
	}
	.articleIndex .panel-user-photo {
	    float: left;
	    border-radius: 50px;
	    border: 1px solid #A3A3A3;
	    overflow: hidden;
	    width: 50px;
	    height: 50px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	}
	.articleIndex .panel-user-photo img {
	    display: block;
	    width: 50px;
	    height: 50px;
	    background-color: white;
	}
	.articleIndex .panel-user-right {
	    height: 50px;
	    padding-left: 60px;
	}
	.articleIndex .panel-user-name {
	    color: #333;
	    line-height: 22px;
	    margin-bottom: 6px;
	}
	.articleIndex .panel-user-right .panel-user-more {
	    color: #a3a3a3;
	}
	.articleIndex .panel-content-title{
		font-size: 20px;
		margin: 0 0 10px;
	}
	.articleIndex .panel-content-text {
	    margin: 0 0 10px;
	}
	.articleIndex .content{
		margin-top: 46px;
	}
	.articleIndex .footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 40px;
		overflow: hidden;
	}
	.articleIndex .footer .vux-no-group-title,.vux-popup-dialog .vux-no-group-title{
		margin-top: 0;
	}
	.articleIndex .footer .weui-cell,.flexDiv .weui-cell{
		padding: 6px 10px;
	}
	.flexDiv{
		display: -webkit-flex; /* Safari */
  		display: flex;
  		justify-content:center;
	}
	.flexDiv a{
		flex: 1;
		text-align: center;
		line-height: 40px;
	}
	.stayMessage{
		background: #fff;
		overflow: hidden;
	}
	.articleIndex .m-cell{
		display: flex;
		display: -webkit-flex; /* Safari */
		align-items: stretch;
		align-content:stretch;
		padding:10px;
		position: relative;
	}
	.articleIndex .m-cell:after{
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
	.articleIndex .m-cell .m-img{
		text-align: center;
		margin-right: 10px;
	}
	.articleIndex .m-cell .m-img img{
		border-radius: 50%;
		overflow: hidden;
		width: 30px;
		height: 30px;
	}
	.articleIndex .m-cell .m-box{
		flex: 1;
		width:100%;
		flex-shrink:0;
	}
	.articleIndex .m-cell .m-box h3{
		color: #000;
		margin-bottom: 8px;
	}
	.articleIndex .m-cell .m-box .m-desc{
		margin-bottom: 8px;
		color: #999;
		font-size: 14px;
	}
	.articleIndex .m-cell .m-box .m-content{
		margin-bottom: 8px;
		font-weight: 500;		
	}
	.articleIndex .m-cell .m-box .weui-cell{
		background: #efeff4;
	}
	.articleIndex .m-cell .m-box .weui-cell:before{
		border-top: 0px none;
		height: 0;
		color: inherit;
	}
	.articleIndex .m-cell .m-box .weui-cell a{
		color: #0366d6;
	}
</style>
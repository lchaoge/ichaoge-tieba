<template>
	<div class="userinfo">
		<x-header :left-options="{showBack: false}" slot="header" style="background-color:#fff;">
			<a slot="left">
				<i class="icon iconfont icon-saoyisao"></i>
			</a>
			<a slot="right">
				<i class="icon iconfont icon-liwu"></i>
			</a>
			<a slot="right">
				<i class="icon iconfont icon-shezhi"></i>
			</a>
			<span style="color: #666;">我的</span>
	    </x-header>
	    <scroller lock-x :scrollbar-y=false height="-96" class="vux-scroller">
	    	<cell-box is-link class="user">
	    		<div class="user-img">
	    			<img :src="pageData.currentUser.user_image_url" />
	    		</div>
	    		<div class="user-right">
	    			<h4>{{pageData.currentUser.user_name}}</h4>
	    			<p>查看个人主页或编辑资料</p>
	    		</div>
    		</cell-box>
	    	<card>
		      <div slot="content" class="card-demo-flex card-demo-content01">
		        <div class="vux-1px-r">
		          	<countup :start-val="0" :end-val="9876" :duration="2"></countup>
		          	<br/>关注
		        </div>
		        <div class="vux-1px-r">
		          	<countup :start-val="0" :end-val="42342" :duration="2"></countup>
		          	<br/>粉丝
		        </div>
		        <div class="vux-1px-r">
		        	<countup :start-val="0" :end-val="pageData.followList.length" :duration="2"></countup>
		          	<br/>关注的吧
		        </div>
		        <div>
		        	<countup :start-val="0" :end-val="pageData.articleList.length" :duration="2"></countup>
		          	<br/>帖子
		        </div>
		      </div>
		    </card>
		    <group style="margin-top: 10px;">
	    		<cell-box is-link>
	    			<i class="icon iconfont icon-shoucang"></i>
	    			<span class="ml10">我的收藏</span>
	    		</cell-box>
	    		<cell-box is-link>
	    			<i class="icon iconfont icon-shijian"></i>
	    			<span class="ml10">浏览历史</span>
	    		</cell-box>
	    		<cell-box is-link>
	    			<i class="icon iconfont icon-renwen"></i>
	    			<span class="ml10">我的群组</span>
	    		</cell-box>
		    </group>
		    <group style="margin-top: 10px;">
	    		<cell-box is-link>
	    			<i class="icon iconfont icon-jincou"></i>
	    			<span class="ml10">直播</span>
	    		</cell-box>
	    		<cell-box is-link>
	    			<i class="icon iconfont icon-kanguos"></i>
	    			<span class="ml10">话题</span>
	    		</cell-box>
		    </group>
		    <group style="margin-top: 10px;">
	    		<cell-box is-link>
	    			<i class="icon iconfont icon-qinzi"></i>
	    			<span class="ml10">服务中心</span>
	    		</cell-box>
		    </group>
	    </scroller>
	</div>
</template>

<script>
import { Countup,CellBox ,Card,Group,XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import { Spinner,Scroller,Flexbox, FlexboxItem,Panel,Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'

export default {
	components: {
		Countup,
	  	CellBox,
	  	Group,
	    Card,
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
	    	pageData:{
		      	currentUser:{},
		      	followList:[],
		      	articleList:[]
	    	},
	    	
	    }
	},
	beforeRouteEnter:(to,from ,next)=>{
		next((vm)=>{
			let isLogin = vm.$store.getters.isLogin
			if(!isLogin){
				vm.$router.push({name:'loginLink'})
			}else{
				vm.pageData.currentUser = vm.$store.getters.currentUser
			}
		})
	},
	created() {
		// @todo 关注
		
		// @todo 粉丝
		
		// 关注的吧
		this.queryFollowEvt()
		// 帖子
		this.queryArticleByUserId()
	},
	mounted(){
		
	},
	computed:{
		
	},
	methods:{
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
		// 关注的贴子
		queryArticleByUserId(){
			let params = {
				user_id:this.$store.getters.currentUser.user_id
			}
			this.$Axios.post(this.$Urls.POST_ARTICLE_QUERYBYUSERID,params).then(res=>res.data).then((res)=>{
				if(res.code === "0000"){
					if(res.data.length>0){
						this.pageData.articleList = res.data
					}
				}else{
					this.$vux.toast.text('系统错误', 'bottom')
				}
			}).catch(err=>{
				this.$vux.toast.text('系统错误：'+err, 'bottom')
			})
		}
	}
	
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
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
.vux-scroller{
	margin-top: 46px;
}
.user{
	background: #fff;
	position: relative;
}
.user:after{
	display: block;
	clear: both;
	height: 0;
	width: 0;
	overflow: hidden;
}
.user-img{
	height: 60px;
	width: 60px;
	overflow: hidden;
	box-sizing: border-box;
	border: 1px solid #D0CDD1;
	border-radius: 100%;
}
.user-img img{
	display: block;
	width: 100%;
	height: 100%;
}
.user-right{
	position: absolute;
	top: 10px;
	left: 75px;
	right: 15px;
}
.user-right h4{
	padding-left: 15px;
	margin: 9px 0 10px;
	font-size: 18px;
}
.user-right p{
	color: #999;
	padding-left: 15px;
}
.weui-panel{
	margin-top: 0 !important;	
}
.card-demo-flex > div{
	font-size: 14px !important;
	line-height: 20px;
}
.weui-cell_access.vux-cell-box .ml10{
	font-size: 14px !important;
}
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.userinfo .weui-cells{
	margin-top: 0 !important;
}
</style>
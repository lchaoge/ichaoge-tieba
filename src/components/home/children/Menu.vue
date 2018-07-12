<template>
	<div class="search">
		<x-header :left-options="{showBack: false}" slot="header" style="background-color:#fff;">
			<a slot="right">
				<i class="icon iconfont icon-shezhi"></i>
			</a>
			<span style="color: #666;">进吧</span>
	    </x-header>
	    <scroller lock-x scrollbar-y :height="pageData.swiperHeight" class="vux-scroller">
	    	<div class="group">
				<x-input placeholder="大家都在搜：孙兴民还是虎">
			        <i slot="label" style="padding-right:10px;display:block;" class="icon iconfont icon-sousuo"></i>
			    </x-input>
			</div>	
			<div class="lately">
				<div class="title">
					<h2>最近逛的吧</h2>
				</div>
				<div class="content" v-if="latelyList.length>0">
					<scroller lock-y :scrollbar-x=false >
						<div class="box" :style="'width:' + boxWidth + 'px'">
							<router-link class="item" v-for="item in latelyList" :key="item.sort_article_id" :to="{ name: 'articleSortIndexLink', query: { sort_article_id: item.sort_article_id }}">
								<x-img :src="item.image_url" default-src="./static/images/tieba.jpg"></x-img>
								<h3>{{item.sort_article_name}}</h3>
							</router-link>	
						</div>
				    </scroller>
				</div>
			</div>
			<grid :cols="2" :show-lr-borders="false" v-if="isLogin">
				<h2>我关注的吧</h2>
				  <grid-item v-for="item in followList" :key="item.sort_article_id" :link="{ name: 'articleSortIndexLink', query: { sort_article_id: item.sort_article_id }}">
				  	<div class="grid-center">
				  		<span>{{item.sort_article_name}}</span>
				  		<badge text="8"></badge>
				  	</div>
				  </grid-item>
			</grid>
	    </scroller>
		
	      
	</div>
</template>

<script>
import {Scroller, Badge,Grid, GridItem,XHeader,XInput,Search, Group, Cell, XButton,XImg } from 'vux'

export default {
	components: {
		XImg,
	  	Scroller,
	  	Badge,
	  	Grid,
	    GridItem,
	  	XHeader,
	  	XInput,
	    Search,
	    Group,
	    Cell,
	    XButton
	},
	data () {
	    return {
	    	pageData:{
		      	headerIndex: 1,
		      	selected:{},
		      	swiperHeight:'0'
	    	},
	      	results: [],
	      	value: '',
	      	followList:[],
	      	latelyList:[],
	      	isLogin:false,
	      	boxWidth:''
	    }
	},
	created() {
		this.isLogin = this.$store.getters.isLogin
		this.pageData.swiperHeight = (document.documentElement.clientHeight-46-50)+"px"
		if(this.isLogin){
			this.queryAllByUserIdEvt()	
		}
		this.queryLatelys()
	},
	methods: {
		// 关注的吧
		queryAllByUserIdEvt(){
			let user = this.$store.getters.currentUser
			let params = {
				user_id:user.user_id
			}
			this.$Axios.post(this.$Urls.POST_ARTICLESORT_FOLLOW,params).then(res=>res.data).then((res)=>{
				if(res.code === "0000"){
					if(res.data.length>0){
						this.followList = res.data
					}else{
						this.$vux.toast.text('暂无数据', 'bottom')
					}
				}else{
					this.$vux.toast.text('系统错误', 'bottom')
				}
			}).catch(err=>{
				this.$vux.toast.text('系统错误：'+err, 'bottom')
			})
		},
		queryLatelys(){
			let params = {
				latelys:window.localStorage.getItem("lately")
			}
			this.$Axios.post(this.$Urls.POST_ARTICLESORT_LATELYS,params).then(res=>res.data).then((res)=>{
				if(res.code === "0000"){
					if(res.data.length>0){
						this.latelyList = res.data
						this.boxWidth = res.data.length*90
					}else{
						this.$vux.toast.text('暂无数据', 'bottom')
					}
				}else{
					this.$vux.toast.text('系统错误', 'bottom')
				}
			}).catch(err=>{
				this.$vux.toast.text('系统错误：'+err, 'bottom')
			})
		}
		
	},
	
}

</script>

<style>
	.search .lately{
		background: #fff;
		margin-bottom: 10px;
	}
	.search .lately .title h2 {
	    padding: 10px;
	    color: #999;
	    position: relative;
	}
	.search .lately .content {
		padding: 10px;
		height: 100px;
		overflow: hidden;
	}
	.search .lately .content .box{
	    height: 100%;
	    position: relative;
	    /*width: 9999px;*/
	}
	.search .lately .content .item{
		text-decoration: none;
		width: 80px;
		margin-right: 10px;
		float: left;
		position: relative;
		display: inline-block;
	}
	.search .lately .content .item img{
		width: 80px;
		height: 80px;
	}
	.search .lately .content .item h3{
		text-align: center;
		line-height: 18px;
		color: #333333;
		font-size: 14px;
	}
	.search .lately .content:after{
		height: 0;
		width: 0;
		clear: both;
		overflow: hidden;
		content: ' ';		
	}
	.search .weui-search-bar__label{
		top: 5px !important;
	}
	.search .vux-scroller{
		margin-top: 46px;
	}
	.search .weui-grids{
		background: #fff;
	}
	.search .weui-grids h2{
		padding: 10px;
		color: #999;
		position: relative;
	}
	.search .weui-grids h2:after{
		content: " ";
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    height: 1px;
	    border-bottom: 1px solid #D9D9D9;
	    color: #D9D9D9;
	    -webkit-transform-origin: 0 100%;
	    transform-origin: 0 100%;
	    -webkit-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	}
	.search .weui-grid{
		padding: 10px !important;
		text-decoration: none;
		color: #000;	
	}
	.search .weui-grid .grid-center .vux-badge{
		float: right;
	}
</style>
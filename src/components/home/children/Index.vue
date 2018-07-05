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
	        	<scroller lock-x scrollbar-y use-pullup use-pulldown :height="pageData.swiperHeight" :pulldown-config="{content:'下拉刷新...',downContent:'下拉刷新...',upContent:'释放刷新...',loadingContent:'正在加载...'}" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
			      <div>
			      	<div class="panel" v-for="item in n" :key="item">
					<div class="panel-user">
						<div class="panel-user-photo">
							<img src="../../../assets/images/logo.png" />
						</div>
						<div class="panel-user-right">
							<div class="panel-user-name">
								落叶在风中起舞
							</div>
							<div class="panel-user-more">
								<span>孔雀鱼</span> | 
								<span>06-11</span>
							</div>	
						</div>
					</div>
					<div class="panel-content">
						<p class="panel-content-text">他按了内部对讲机上的一个按钮。“有什么事吗？”一个声音问道。</p>
						<img style="width: 100%; height: 100px;" src="../../../assets/images/logo.png"/>
					</div>
					<div class="panel-button">
						<flexbox :gutter="0">
					        <flexbox-item><div class="panel-flex-button">
					        	<i class="icon iconfont icon-fenxiang"></i>
					        	<span>11</span>
					        </div></flexbox-item>
					      	<flexbox-item><div class="panel-flex-button">
					      		<i class="icon iconfont icon-bianji"></i>
					        	<span>29</span>
					      	</div></flexbox-item>
					      	<flexbox-item><div class="panel-flex-button">
					      		<i class="icon iconfont icon-buxing"></i>
					        	<span>3245</span>
					      	</div></flexbox-item>
					    </flexbox>
					</div>
				</div>
			      </div>
			      <!--pullup slot-->
			      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
			        <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner>正在加载....</span>
			      </div>
			    </scroller>
	        </swiper-item>
	        <!--<swiper-item>
				swiper2
	        </swiper-item>
	        <swiper-item>
	        	swiper3
	        </swiper-item>-->
      	</swiper>
	</div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import { Spinner,Scroller,Flexbox, FlexboxItem,Panel,Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
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
      n: 10,
      n1: 10,
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
    	pageData:{
			headerNav: ['首页'],
	      	headerIndex: 0,
	      	selected:{},
	      	swiperHeight:'0'
    	},
    	
    }
  },
  created() {
		this.pageData.swiperHeight = (document.documentElement.clientHeight-46-50)+"px"
	},
	methods:{
		searchEvt(){
			this.$router.push({
				name:'searchLink'
			})
		},
		loadMore () {
	      setTimeout(() => {
	        this.n += 10
	        setTimeout(() => {
	          this.$refs.scroller.donePullup()
	        }, 10)
	      }, 2000)
	    },
	    refresh () {
	      setTimeout(() => {
	        this.n = 10
	        this.$nextTick(() => {
	          setTimeout(() => {
	            this.$refs.scroller.donePulldown()
	            this.pullupEnabled && this.$refs.scroller.enablePullup()
	          }, 10)
	        })
	      }, 2000)
	    },
	
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
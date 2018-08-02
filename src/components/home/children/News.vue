<template>
	<div class="news">
		<x-header :left-options="{showBack: false}" slot="header">
			<a slot="right">
				<i class="icon iconfont icon-duihuaxinxi"></i>
			</a>
			<tab :line-width=2 active-color='#09BB07' v-model="pageData.headerIndex">
	        	<tab-item class="vux-center" :selected="pageData.selected === item" v-for="(item, index) in pageData.headerNav" @click="pageData.selected = item" :key="index">{{item}}</tab-item>
	      	</tab>
	    </x-header>
	    <swiper v-model="pageData.headerIndex" :height="pageData.swiperHeight" :show-dots="false">
	        <swiper-item>
	        	<div class="p30 tc">
	        		<p class="mb20">暂未开放~</p>
	        	</div>
	        </swiper-item>
	        <swiper-item>
	        	<div class="p30 tc">
	        		<p class="mb20">暂未开放~</p>
	        	</div>
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
	export default{
		directives: {
	    	TransferDom
	  	},
	  	components: {
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
	  	data(){
	  		return{
	  			pageData:{
					headerNav: ['消息','聊天','通知'],
			      	headerIndex: 0,
			      	selected:{},
			      	swiperHeight:'0'
		    	},
	  		}
	  	},
		created(){
			this.pageData.swiperHeight = (document.documentElement.clientHeight-46-50)+"px"
			this.$Apis.inserttabbarSelected(3)
		}
	}
</script>

<style>
	.news .vux-header .vux-header-title {
	    margin: 0 100px !important;
	}
	.news .vux-tab-wrap {
	    padding-top: 41px !important;
	}
	.news .vux-tab-container {
	    height: 41px !important;
	}
	.news .vux-tab {
	    height: 41px !important;
	}
	.news .vux-slider {
	    margin-top: 46px;
	}
</style>
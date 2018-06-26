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
				<div class="content">
					<scroller lock-y :scrollbar-x=false>
						<div class="box">
							<div class="item" v-for="item in 10" :key="item">
								<img src="../../../build/logo.png" />
								<h3>漫画bar</h3>
							</div>	
						</div>
				    </scroller>
					
				</div>
			</div>
			<grid :cols="2" :show-lr-borders="false">
				<h2>我关注的吧</h2>
				  <grid-item v-for="i in 9" :key="i">
				  	<div class="grid-center">
				  		<span>贴吧名称--{{i}}</span>
				  		<badge :text="i"></badge>
				  	</div>
				  </grid-item>
			</grid>
	    </scroller>
		
	      
	</div>
</template>

<script>
import {Scroller, Badge,Grid, GridItem,XHeader,XInput,Search, Group, Cell, XButton } from 'vux'

export default {
  components: {
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
  created() {
		this.pageData.swiperHeight = (document.documentElement.clientHeight-46-50)+"px"
	},
  methods: {
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
    	this.$router.go(-1)
    }
  },
  data () {
    return {
    	pageData:{
	      	headerIndex: 1,
	      	selected:{},
	      	swiperHeight:'0'
    	},
      results: [],
      value: ''
    }
  }
}

</script>

<style>
	.lately{
		background: #fff;
		margin-bottom: 10px;
	}
	.lately .title h2 {
	    padding: 10px;
	    color: #999;
	    position: relative;
	}
	.lately .content {
		padding: 10px;
		height: 100px;
		overflow: hidden;
	}
	.lately .content .box{
	    height: 100%;
	    position: relative;
	    width: 9999px;
	}
	.lately .content .item{
		width: 80px;
		margin-right: 10px;
		float: left;
		position: relative;
		display: inline-block;
	}
	.lately .content .item img{
		width: 80px;
		height: 80px;
	}
	.lately .content .item h3{
		text-align: center;
		font-size: 14px;
	}
	.lately .content:after{
		height: 0;
		width: 0;
		clear: both;
		overflow: hidden;
		content: ' ';		
	}
	.weui-search-bar__label{
		top: 5px !important;
	}
	.vux-scroller{
		margin-top: 46px;
	}
	.weui-grids{
		background: #fff;
	}
	.weui-grids h2{
		padding: 10px;
		color: #999;
		position: relative;
	}
	.weui-grids h2:after{
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
	.weui-grid{
		padding: 10px !important;
		text-decoration: none;
		color: #000;	
	}
	.weui-grid .grid-center .vux-badge{
		float: right;
	}
</style>
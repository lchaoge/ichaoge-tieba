<template>
  <div id="app">
  	<router-view></router-view>
  	<!--<loading v-model="isLoading"></loading>-->
  </div>
</template>

<script>
//	import { Loading } from 'vux'
//import { mapState } from 'vuex'
export default {
  	name: 'App',
//	omponents: {
//	    Loading
//	  },
//	  computed: {
//	    ...mapState({
//	      isLoading: state => state.vux.isLoading
//	    })
//	  },
//	created(){
//		if(this.$store.getters.isLoading){
//			// 显示
//				this.$vux.loading.show({
//				 text: 'Loading'
//				})	
//		}else{
//				// 隐藏
//				this.$vux.loading.hide()  			
//		}
//	}
}
</script>
<style>
	@import 'reset-css';
	@import url("./assets/css/iconfont.css");
	@import url("./assets/css/base.css");
	body{
		background-color: #f5f5f5;
	}
	.vux-1px,.vux-1px-t,.vux-1px-b,.vux-1px-tb,.vux-1px-l,.vux-1px-r{
    position: relative;
	}
	.vux-1px:before{
		content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    border: 1px solid #C7C7C7;
    color: #C7C7C7;
    height: 200%;
    -webkit-transform-origin: left top;
    transform-origin: left top;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
	}
	.vux-1px-l:before{
		content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-left: 1px solid #C7C7C7;
    color: #C7C7C7;
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
	}
	.vux-1px-r:after{
		content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid #C7C7C7;
    color: #C7C7C7;
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
  }
	.vux-1px-t:before{
		content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #C7C7C7;
    color: #C7C7C7;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
	}
	.vux-1px-b:after{
		content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #C7C7C7;
    color: #C7C7C7;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
	}
	.vux-1px-tb:before{
		content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #C7C7C7;
    color: #C7C7C7;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
	}
	.vux-1px-tb:after{
		content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #C7C7C7;
    color: #C7C7C7;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
	}
	@media screen and (-webkit-min-device-pixel-ratio: 2) {
    
	}
	@media screen and (-webkit-min-device-pixel-ratio: 3) {
    
	}
	#app .vux-header{
		background-color: #fff;
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
    height: 0;
    border-top: 1px solid #f3f3f3;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
	}
	.vux-header .vux-header-title{
		color: #000000 !important;
	}
</style>
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
		background-color: #efeff4;
	}
</style>
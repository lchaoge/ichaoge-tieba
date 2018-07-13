<template>
	<div class="">
		<tab :line-width="1" :custom-bar-width="getBarWidth">
	      	<tab-item selected>AA</tab-item>
	      	<tab-item>AAAA</tab-item>
	      	<tab-item>AAAAAAA</tab-item>
	    </tab>
	    <tab :animate="false" :line-width="1" :custom-bar-width="getBarWidth">
	      <tab-item active-class="active-6-1">已发货</tab-item>
	      <tab-item active-class="active-6-2" selected>未发货</tab-item>
	      <tab-item active-class="active-6-3">全部订单</tab-item>
	    </tab>
	</div>
</template>

<script>
	import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
	export default {
	  components: {
	    Tab,
	    TabItem,
	    Sticky,
	    Divider,
	    XButton,
	    Swiper,
	    SwiperItem
	  },
	  data () {
	    return {
	      index01: 0,
	      list2: list(),
	      demo2: '美食',
	      list3: ['收到的消息', '发出的消息'],
	      demo3: '收到的消息',
	      list4: ['正在放映', '即将上映'],
	      demo4: '即将上映',
	      demoDisabled: 'A',
	      index: 0,
	      getBarWidth: function (index) {
	        return (index + 1) * 22 + 'px'
	      }
	    }
	  },
	}
</script>

<style>
	.active-6-1 {
	  color: rgb(252, 55, 140) !important;
	  border-color: rgb(252, 55, 140) !important;
	}
	.active-6-2 {
	  color: #04be02 !important;
	  border-color: #04be02 !important;
	}
	.active-6-3 {
	  color: rgb(55, 174, 252) !important;
	  border-color: rgb(55, 174, 252) !important;
	}
</style>
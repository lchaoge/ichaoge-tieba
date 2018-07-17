<template>
	<tabbar slot="bottom">
		<tabbar-item link='/index' selected>
			<i slot="icon" class="icon iconfont icon-shouye"></i>
	        <span slot="label">首页</span>
	    </tabbar-item>
	    <tabbar-item link='/menu'>
			<i slot="icon" class="icon iconfont icon-zonghe"></i>
	        <span slot="label">进吧</span>
	    </tabbar-item>
	    <tabbar-item :link="{path: '/article/insert',query:{type_id:1,sort_article_id:-1,sort_article_name:''}}" class="tabbar-add">
			<i slot="icon" class="icon iconfont icon-roundadd"></i>
	    </tabbar-item>
	    <tabbar-item link='/news'>
	    	<i slot="icon" class="icon iconfont icon-tixing"></i>
	        <span slot="label">消息</span>
	    </tabbar-item>
	    <tabbar-item link='/userinfo'>
	    	<i slot="icon" class="icon iconfont icon-geren"></i>
	        <span slot="label">我的</span>
	    </tabbar-item>
    </tabbar>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
}
</script>

<style>
	.weui-tabbar__item{
		text-decoration: none;
	}
	.weui-tabbar__label{
		margin-top: 0;
	}
	.tabbar-add{
		padding-top: 10px !important;
	}
	.tabbar-add .weui-tabbar__icon > i{
		font-size: 36px !important;
		color: #09BB07 !important;
	}
	.tabbar-add .weui-tabbar__icon{
		width: auto !important;
		height: auto !important;	
	}
</style>
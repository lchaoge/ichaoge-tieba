<template>
	<tabbar slot="bottom">
		<tabbar-item link='/index'>
			<i slot="icon" class="icon iconfont icon-shouye"></i>
	        <span slot="label">首页</span>
	    </tabbar-item>
	    <tabbar-item link='/menu'>
			<i slot="icon" class="icon iconfont icon-zonghe"></i>
	        <span slot="label">进吧</span>
	    </tabbar-item>
	    <tabbar-item link='/news' badge="2">
	    	<i slot="icon" class="icon iconfont icon-tixing"></i>
	        <span slot="label">消息</span>
	    </tabbar-item>
	    <tabbar-item link='/userinfo' show-dot>
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
</style>
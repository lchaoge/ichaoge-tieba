<template>
		<div v-if="pageData.isFocus">
			<group class="cells">
	        	<cell title="Title11">
	        		<i slot="icon" class="icon iconfont icon-shijian" style="display:block;margin-right:5px;"></i>
	        		<i class="icon iconfont icon-guanbi" style="font-size: 12px;"></i>
			    </cell>
			    <cell title="Title11">
	        		<i slot="icon" class="icon iconfont icon-shijian" style="display:block;margin-right:5px;"></i>
	        		<i class="icon iconfont icon-guanbi" style="font-size: 12px;"></i>
			    </cell>
			    <cell title="Title11">
	        		<i slot="icon" class="icon iconfont icon-shijian" style="display:block;margin-right:5px;"></i>
	        		<i class="icon iconfont icon-guanbi" style="font-size: 12px;"></i>
			    </cell>
	        </group>
	        <div class="tc empty">清空搜索记录</div>	
		</div>
        <div v-else="!pageData.isFocus">
        	<group class="cells">
				<cell title="搜索列表"></cell>
				<cell title="搜索列表"></cell>
				<cell title="搜索列表"></cell>
				<cell title="搜索列表"></cell>
			</group>
        </div>
</template>

<script>
import {Group, Cell ,Scroller} from 'vux'

export default {
  	components: {
	    Group,
	    Cell,
	    Scroller
  	},
  	data () {
	    return {
	      	pageData:{
	      		isFocus:false,
	      	}
	    }
  	},
}  	
</script>

<style>
</style>
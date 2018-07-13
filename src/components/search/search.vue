<template>
	<view-box ref="viewBox" class="search">
	    <search placeholder="大家都在搜" name="search" @result-click="resultClick" @on-change="getResult"
	      :results="results" v-model="value" position="absolute" auto-scroll-to-top
	      @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" ref="search"></search>
	    <scroller lock-x scrollbar-y ref="scroller">
	      	<router-view></router-view>	    
	    </scroller>
	</view-box>
</template>

<script>
import { Search, Group, Cell ,Scroller,ViewBox  } from 'vux'

export default {
  	components: {
	    Search,
	    Group,
	    Cell,
	    Scroller,
	    ViewBox
  	},
  	data () {
	    return {
	      	results: [],
	      	value: '',
	      	pageData:{
	      		isFocus:false,
	      	}
	    }
  	},
  	created(){
  		
  	},
  	mounted(){
  		this.setFocus()
  	},
  	methods: {
	    setFocus() {
	      	this.$refs.search.setFocus()
	    },
	    resultClick(item) {
	     	window.alert('you click the result item: ' + JSON.stringify(item))
	    },
	    getResult(val) {
	      	console.log('on-change', val)
	      	this.results = val ? getResult(this.value) : []
	    },
	    onSubmit() {
	      	this.$refs.search.setBlur()
	      	this.$vux.toast.show({
		        type: 'text',
		        position: 'top',
		        text: 'on submit'
	      	})
	    },
	    onFocus() {
	      	console.log('on focus')
	    },
	    onCancel() {
	    	this.$router.go(-1)
	    }
  	},
  
}

</script>

<style>
	.weui-search-bar__label{
		top: 5px !important;
	}
	.search .weui-search-bar{
		background: #fff !important;	
	}
	.search .content{
		margin-top: 44px;
	}
	.weui-cells{
		margin-top: 0 !important;
	}
	.empty{
		background: #fff;
		padding: 10px 15px;
		color: #999;
	}
</style>
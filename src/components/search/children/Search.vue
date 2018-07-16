<template>
	<view-box ref="viewBox" class="search">
	    <search placeholder="大家都在搜" name="search" @result-click="resultClick" @on-change="getResult"
	      :results="results" v-model="pageData.search.value" position="absolute" auto-scroll-to-top
	      @on-focus="onFocus" @on-cancel="onCancel" @on-clear="onClear" @on-submit="onSubmit" ref="search"></search>
	    <div class="content">
		    <scroller lock-x :scrollbar-y=false ref="scroller" height="-44">
		    	<div v-if="pageData.search.isFocus">
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
		        <div v-else="!pageData.search.isFocus">
		        	<group class="cells">
						<cell v-for="item in pageData.search.list" :title="item.sort_article_name" :key="item.sort_article_name" @click.native="searchNameEvt(item)"></cell>
					</group>
		        </div>
		    </scroller>	
	    </div>
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
	      		search:{
	      			isFocus:true,
	      			value:'',
	      			list:[]
	      		}
	      		
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
	    	this.pageData.search.list = []
	    	let params = {
	    		name:this.pageData.search.value
	    	}
	      	console.log('on-change', val)
	      	if(this.pageData.search.value !=''){
	    		// @todo记录本地缓存
	    		
	    		// ajax
	    		this.$Axios.post(this.$Urls.POST_ARTICLESORT_LIKEARTSNAME,params).then(res=>res.data).then((res)=>{
		  			if(res.code === '0000'){
		  				if(res.data.length>0){
		  					this.pageData.search.list = res.data	
		  				}else{
		  					this.pageData.search.list.push({
		  						sort_article_name:this.pageData.search.value
		  					})
		  				}
		  				this.pageData.search.isFocus = false;
		  			}else{
		  				this.$vux.toast.text('系统错误', 'bottom')
		  			}
		  		}).catch(err=>console.log("系统错误："+err))
	    		
	    	}
	    },
	    searchNameEvt(item){
	    	this.$router.push({
	    		name:'SearchIndexLink',
	    		query:{
	    			name:item.sort_article_name
	    		}
	    	})
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
	    },
	    onClear(){
	    	this.pageData.search.isFocus = true;
	    },
	    onCancel() {
	    	this.$router.push({
	    		name:'homeLink'
	    	})
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
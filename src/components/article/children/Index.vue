<template>
	<view-box ref="viewBox" class="articleIndex">
		<x-header :left-options="{backText: ''}" slot="header">
	    	<a slot="right" @click="moreEvt">
	    		<i class="icon iconfont icon-xitongcaidan"></i>
	    	</a>
	    </x-header>
	    <div class="content">
	    	<div class="panel">
	    		<div class="panel-user">
					<div class="panel-user-photo">
						<img :src="queryObj.detail.user_image_url" />
					</div>
					<div class="panel-user-right">
						<div class="panel-user-name">
							{{queryObj.detail.user_name}}
						</div>
						<div class="panel-user-more">
							<span>{{queryObj.detail.sort_article_id}}吧</span> | 
							<span>{{queryObj.detail.article_time}}</span>
						</div>	
					</div>
				</div>
				<div class="panel-content" @click="detailEvt(item.article_id)">
					<p class="panel-content-text">{{item.article_name}}</p>
					<div v-for="item in queryObj.detail.images" style="text-align:center;">
				      	<span style="font-size:20px;">Loading</span>
				      	<x-img :src="item.article_image_url" :webp-src="`${item.article_image_url}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
				    </div>
				</div>
	    	</div>
	    </div>
	</view-box>
</template>

<script>
	import {Badge,ViewBox,XHeader,XTextarea,XInput,Group,Alert,Toast,XImg,Previewer} from 'vux'
	export default{
		name: 'articleIndex',
	  	components:{
	  		XImg,
	  		Previewer,
		  	ViewBox,
		  	XHeader,
		  	XTextarea,
		  	XInput,
		  	Group,
		  	Badge,
		  	Alert,
		  	Toast
	  	},
		data(){
			return {
				queryObj:{
					article_id:'',
					detail:{}
				}
			}
		},
		created(){
			this.queryObj.article_id = this.$route.query.article_id
			this.queryEvt()
		},
		methods:{
			queryEvt(){
				let params = {
					article_id:this.queryObj.article_id
				}
				this.$Axios.post(this.$Urls.POST_ARTICLE_DETAIL,params).then(res=>res.data).then((res)=>{
		  			if(res.code === '0000'){
		  				console.log(res)
		  			}else{
		  				this.$vux.toast.text('系统错误', 'bottom')
		  			}
		  		}).catch(err=>console.log("系统错误："+err))
			},
			moreEvt(){
				
			}
		}
	}
</script>

<style>
</style>
<template>
  <div class="home">
   <view-box ref="viewBox">
   		<router-view></router-view>
			<tabbar></tabbar>
   </view-box>
  </div>
</template>

<script>
import { ViewBox } from 'vux'
import tabbar from './tabbar/tabbar'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  components:{
  	ViewBox,
  	tabbar
  }
}
</script>

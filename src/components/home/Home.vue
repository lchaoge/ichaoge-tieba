<template>
  <view-box ref="viewBox" class="home">
		<router-view></router-view>
		<tabbar></tabbar>
  </view-box>
</template>

<script>
import { ViewBox } from 'vux'
import tabbar from '../common/tabbar'
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

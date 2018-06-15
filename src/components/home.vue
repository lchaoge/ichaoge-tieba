<template>
  <div class="home">
  	<router-view></router-view>
		<tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from './tabbar/tabbar'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  components:{
  	tabbar
  }
}
</script>

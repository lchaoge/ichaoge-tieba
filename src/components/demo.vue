<template>
  <div>
    <divider>下拉刷新和上拉加载更多组合</divider>
    <scroller lock-x scrollbar-y use-pullup use-pulldown height="hei" :pulldown-config="{content:'下拉刷新...',downContent:'下拉刷新...',upContent:'释放刷新...',loadingContent:'正在加载...'}" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
      <div class="box2">
        <p v-for="i in n">placeholder {{i}}</p>
      </div>
      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner>正在加载....</span>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Scroller, Divider, XSwitch, Group, Spinner } from 'vux'
export default {
  components: {
    Scroller,
    Divider,
    XSwitch,
    Group,
    Spinner
  },
   data () {
    return {
    	hei:'0',
      n: 10,
      n1: 10,
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  },
  created(){
  	this.hei = document.documentElement.clientHeight
  },
  methods: {
    loadMore () {
      setTimeout(() => {
        this.n += 10
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 10)
      }, 2000)
    },
    refresh () {
      setTimeout(() => {
        this.n = 10
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
            this.pullupEnabled && this.$refs.scroller.enablePullup()
          }, 10)
        })
      }, 2000)
    }
    
  },
 
}
</script>
<style lang="less" scoped>
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
.rotate {
  display: inline-block;
  transform: rotate(-180deg);
}
.pullup-arrow {
  transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
}
</style>
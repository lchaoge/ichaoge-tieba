<template>
	<div class="search">
	    <search placeholder="大家都在搜：孙兴民还是虎" @result-click="resultClick" @on-change="getResult"
	      :results="results" v-model="value" position="absolute" auto-scroll-to-top
	      @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" ref="search"></search>
	</div>
</template>

<script>
import { Search, Group, Cell, XButton } from 'vux'

export default {
  components: {
    Search,
    Group,
    Cell,
    XButton
  },
  methods: {
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
    	this.$router.go(-1)
    }
  },
  data () {
    return {
      results: [],
      value: ''
    }
  }
}

</script>

<style>
	.weui-search-bar__label{
		top: 5px !important;
	}
</style>
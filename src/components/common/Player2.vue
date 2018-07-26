<template>
  	<div class="container">
    	<player :video-url="videoUrl" :state="state"></player>
  	</div>
</template>

<script>
import player from './Player';
export default {
  	data () {
    	return {
			videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
			state:false
    	}
  	},
  	components: {
   	 	player
  	},
  	methods: {
  	}
}
</script>

<style>

</style>
<template>
  <div>
    <br/>
    <br/>
    <div class="space-btn" @click="spaceChange">显示间隔</div>
    <div class="space" v-if="showSpace">间隔</div>
    <div style="height:44px;">
      <sticky scroll-box="vux_view_box_body" ref="sticky" :offset="46" :check-sticky-support="false" :disabled="disabled">
        <tab :line-width="1">
          <tab-item selected>正在正映</tab-item>
          <tab-item>即将上映</tab-item>
        </tab>
      </sticky>
    </div>
    <div v-for="item in list" class="vux-center-h">
      <emotion>{{item}}</emotion>
      <emotion is-gif>{{item}}</emotion>
    </div>

  </div>
</template>

<script>
	import { WechatEmotion as Emotion, Divider } from 'vux'
import { Tab, TabItem, Sticky } from 'vux'

export default {
  components: {
  	Emotion,
    Tab,
    TabItem,
    Sticky
  },
  data () {
    return {
    	 list: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'],
      showSpace: false,
      disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent)
    }
  },
  methods: {
    spaceChange () {
      this.showSpace = !this.showSpace
      this.$nextTick(() => {
        this.$refs.sticky.bindSticky()
      })
    }
  }
}
</script>
<style scoped>
  .space-btn {
    padding: 5px 0;
    margin: 10px;
    text-align: center;
    border: 1px red solid;
  }

  .space {
    padding: 30px 0;
    margin: 10px;
    text-align: center;
    border: 1px green solid;
  }
</style>
<template>
<!-- 满意度调查 -->
  <div class="satisfaction">
    <div class="center_box">
      <Scontent />
      <div class="bottom">
        <van-button
          round
          color="#6f38d4"
          block
          :disabled="disabled"
          @click="next"
        >
          {{statusText}}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';
import Scontent from './content';

export default {
  name: "Home",
  components: {
    vanButton: Button,
    Scontent,
  },
  data() {
    return {
      active: 0,
      statusText: '下一步',
      disabled: true
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    // 题目一
    selectQ1(val) {
      console.log('题目1', val);
      this.disabled = false;
    },
    // 题目二
    selectQ2(val) {
      console.log('题目2', val);
    },
    selectSub(val){
      console.log('题目2多选项', val);
      if(val.length) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    // 下一步/提交
    next() {
      if(this.active < 1) {
        this.active++;
        this.disabled = true;
        this.statusText = '提交';
      }else {
        console.log('到提交页面');
      }
      
    }
  },
};
</script>

<style lang="scss" scoped>
.satisfaction {
  .bottom {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 30px * $scale 50px * $scale;
    background: #fff;
  }
}
</style>
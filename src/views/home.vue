<template>
  <div class="home">
    <van-steps :active="active">
      <van-step>问题1</van-step>
      <van-step>问题2</van-step>
      <van-step>完成</van-step>
    </van-steps>
    <div class="q-content">
      <div class="q-require">*必须填写</div>
      <div class="q-box">
        <div class="q-tip">Q1</div>
        <div class="q-slot-content">
          <q-one v-show="active === 0" @selectQ1="selectQ1" />
          <q-two v-show="active === 1" />
        </div>
      </div>
    </div>
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
</template>

<script>
import { Step, Steps, Button } from 'vant';
import QOne from './question.vue/Q-one';
import QTwo from './question.vue/Q-two';

export default {
  name: "Home",
  components: {
    vanStep: Step,
    vanSteps: Steps,
    vanButton: Button,
    QOne,
    QTwo
  },
  data() {
    return {
      active: 0,
      statusText: '下一步',
      disabled: true
    };
  },
  computed: {
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
    // 下一步
    next() {
      this.active++;
      this.disabled = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: #fff3ff;
  position: relative;
  min-height: 100vh;
  .q-content {
    padding: 20px * $scale 50px * $scale;
    .q-require {
      margin: 20px * $scale 0;
      font-size: 18px * $scale;
      color: red;
      font-weight: bold;
    }
    .q-box {
      position: relative;
      background: #fff;
      border-radius: 12px * $scale;
      border: 2px solid #6f38d4;
      .q-tip {
        position: absolute;
        top: -20px * $scale;
        left: 50%;
        font-size: 22px * $scale;
        padding: 10px * $scale 20px * $scale;
        background: #6f38d4;
        color: #fff;
        border-radius: 10px * $scale;
      }
      .q-slot-content {
        padding: 40px * $scale 20px * $scale;
      }
    }
  }
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
<template>
<!-- 满意度调查 -->
  <div class="satisfaction">
    <div class="q-content">
      <div class="q-require">*必须填写</div>
      <div class="q-box">
        <div class="q-slot-content">
          <q-one v-if="active === 0" @selectQ1="selectQ1" />
          <q-two v-if="active === 1" @selectQ2="selectQ2" @selectSub="selectSub" />
        </div>
      </div>
    </div>
    <div class="rule">
      规则
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
import { Button } from 'vant';
import QOne from './question.vue/Q-one';
import QTwo from './question.vue/Q-two';

export default {
  name: "Home",
  components: {
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
    // 题目二
    selectQ2(val) {
      console.log('题目2', val);
    },
    selectSub(val){
      console.log('题目2多选项', val);
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
.satisfaction {
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
      .q-slot-content {
        padding: 40px * $scale 20px * $scale;
      }
    }
  }
  .rule {
    font-size: 22px * $scale;
    padding: 20px * $scale 50px * $scale;
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
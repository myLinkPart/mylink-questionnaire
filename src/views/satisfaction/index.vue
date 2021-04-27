<template>
<!-- 满意度调查 -->
  <div class="satisfaction">
    <Layout :showContent="!toResult">
      <img :src="$t('satisfaction.头部banner')" alt="" slot="banner">
      <q-one slot="middle" v-if="active === 0" @selectQ1="selectQ1" />
      <q-two slot="middle" v-if="active === 1" @selectQ2="selectQ2" @selectSub="selectSub" />
      <com-status slot="other" />
      <div slot="bottom">
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
    </Layout>
  </div>
</template>

<script>
import { Button } from 'vant';
import QOne from './question/Q-one';
import QTwo from './question/Q-two';
import Layout from '@c/layout.vue';
import ComStatus from '@c/status.vue';

export default {
  name: "Home",
  components: {
    vanButton: Button,
    QOne,
    QTwo,
    Layout,
    ComStatus
  },
  data() {
    return {
      active: 0,
      statusText: '下一步',
      disabled: true,
      toResult: false
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
        this.toResult = true;
      }
      
    }
  },
};
</script>

<style lang="scss" scoped>
.satisfaction {
  position: relative;
  .q-content {
    padding: 0 50px * $scale;
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
      border: 1px solid rgba(241, 23, 231, 0.2);
      .q-slot-content {
        padding: 34px * $scale 20px * $scale;
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
<template>
<!-- 满意度调查 -->
  <div class="satisfaction">
    <Layout :showContent="!toResult">
      <img :src="$t('satisfaction.头部banner')" alt="" slot="banner">
      <q-one slot="middle" v-if="active === 0" @selectQ1="selectQ1" />
      <q-two
        slot="middle" 
        v-if="active === 1"
        @selectQ2="selectQ2"
        @selectSub="selectSub"
        @changeOther="changeOther"
      />
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
      toResult: false,
      submitParam: {
        content: "", // 多选内容
        other: "", // 其他内容
        score: 0, // 满意度
        type: "" // 类别：界面、体验、功能
      }
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    // 题目一
    selectQ1(val) {
      this.submitParam.score = val;
      this.disabled = false;
    },
    // 题目二
    selectQ2(val) {
      this.submitParam.type = val;
    },
    // 多选
    selectSub(val){
      if(val.length) {
        this.submitParam.content = val.filter(item => item !== 'input').join(',');
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    changeOther(val) {
      this.submitParam.other = val;
    },
    // 下一步
    next() {
      if(this.active < 1) {
        this.active++;
        this.disabled = true;
        this.statusText = '提交';
      }else {
        this.toResult = true;
        this.submit();
      } 
    },
    // 提交
    submit() {
      console.log('提交内容', this.submitParam);
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
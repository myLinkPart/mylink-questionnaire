<template>
  <!-- 偏好问卷 -->
  <div class="preference">
    <Layout :showContent="!toResult">
      <img :src="$t('preference.头部banner')" alt="" slot="banner">
      <q-one slot="middle" @selectQ1="selectQ1" />
      <com-status
        slot="other"
        :status="status"
        :msg="msg"
      />
      <div slot="bottom">
        <van-button
          v-if="!toResult"
          round
          color="#6f38d4"
          block
          :disabled="disabled"
          @click="submit"
        >
          {{statusText}}
        </van-button>
        <van-button
          v-else
          round
          color="#6f38d4"
          block
          @click="statusClick"
        >
          {{statusText}}
        </van-button>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '@c/layout.vue';
import QOne from './question/Q-one';
import { Button } from 'vant';
import ComStatus from '@c/status.vue';
import index from '@/mixin/index.js';
import { isApp, callMylinkApp } from "@common/handle.js";

export default {
  name: "Preference",
  mixins: [index],
  data() {
    return {
      statusText: '提交',
      disabled: false,
      toResult: false,
      submitParam: {
        content: ''
      },
      status: '',
      msg: ''
    };
  },
  components: {
    Layout,
    QOne,
    vanButton: Button,
    ComStatus
  },
  created() {
  },
  mounted() {
  },
  methods: {
    selectQ1(val) {
      this.submitParam.content = val;
    },
    // 提交
    submit() {
      if(!isApp()) {
        callMylinkApp();
        return;
      }
      console.log('提交的数据', this.submitParam);
      this.$post("/survey/bias/add", this.submitParam).then(res => {
        console.log(res);
        if(+res.code === 0) {
          this.status  = 'success';
          this.statusText = '我的积分';
          this.msg = '100積分已送到閣下賬戶，您可以到積分明細查看。';
        } else {
          this.status  = 'fail';
          this.statusText = '返回';
          this.msg = res.msg;
        }
        this.toResult = true;
      })
    },
    // 提交结果页按钮点击
    statusClick() {
      if(this.status === 'fail') {
        this.toResult = false;
      } else {
        this.toMyPoints();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.preference {
}
</style>

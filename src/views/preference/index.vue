<template>
  <!-- 偏好问卷 -->
  <div class="preference">
    <Layout :showContent="!toResult" type="prefer">
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
          v-prevent-re-click
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
      statusText: this.$t('提交'),
      disabled: true,
      toResult: false,
      submitParam: {
        content: ''
      },
      status: '',
      msg: '',
      isRepeat: false,
    };
  },
  components: {
    Layout,
    QOne,
    vanButton: Button,
    ComStatus
  },
  created() {},
  mounted() {
    window.setWebViewFlag = () => {};
  },
  methods: {
    selectQ1(val) {
      if(val) {
        this.submitParam.content = val;
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    // 提交
    submit() {
      if(!isApp()) {
        callMylinkApp(window.location.href);
        return;
      }
      console.log('提交的数据', this.submitParam);
      this.$post("/survey/bias/add", this.submitParam).then(res => {
        console.log(res);
        if(+res.code === 0) {
          this.status  = 'success';
          this.statusText = this.$t('我的积分');
          this.msg = `200 ${this.$t('发送积分')}`;
        } else {
          this.status  = 'fail';
          this.msg = this.languageType === 'sc' ? res.msg :
          this.languageType === 'tc' ? res.msgTw : res.msgEn;
          if(+res.code === 1081) {
            this.isRepeat = true;
            this.statusText = this.$t('我的积分');
          } else {
            this.statusText = this.$t('重新填写');
          }
        }
        this.toResult = true;
      })
    },
    // 提交结果页按钮点击
    statusClick() {
      if(this.status === 'fail') {
        if(this.isRepeat) {
          this.toMyPoints();
          return;
        }
        // 失败时，返回答题页
        this.toResult = false;
        this.statusText = this.$t('提交');
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

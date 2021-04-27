<template>
  <!-- 偏好问卷 -->
  <div class="preference">
    <Layout :showContent="!toResult">
      <img :src="$t('preference.头部banner')" alt="" slot="banner">
      <q-one slot="middle" />
      <div slot="bottom">
        <van-button
          round
          color="#6f38d4"
          block
          :disabled="disabled"
          @click="submit"
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

export default {
  name: "Preference",
  data() {
    return {
      statusText: '提交',
      disabled: false,
      toResult: false
    };
  },
  components: {
    Layout,
    QOne,
    vanButton: Button,
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 提交
    submit() {

    }
  },
};
</script>

<style lang="scss" scoped>
.preference {
}
</style>

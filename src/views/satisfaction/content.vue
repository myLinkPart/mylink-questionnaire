<template>
  <div class="s-content">
    <div class="q-banner">
      <img :src="$t('satisfaction.头部banner')" alt="">
    </div>
    <div class="middle_box">
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
        <div class="title">條款及細則</div>
        <p>1、广东建设规划分局工会党纪国法</p>
        <p>1、广东建设规划分局工会党纪国法</p>
        <p>1、广东建设规划分局工会党纪国法</p>
        <p>1、广东建设规划分局工会党纪国法</p>
      </div>
    </div>
  </div>
</template>

<script>
import QOne from './question.vue/Q-one';
import QTwo from './question.vue/Q-two';
export default {
  name: 'Scontent',
  components: {
    QOne,
    QTwo
  },
  data() {
    return {
      active: 0,
      disabled: false
    }
  },
  methods: {
    selectQ1(val) {
      console.log('题目1', val);
    },
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
  }
}
</script>

<style lang="scss" scoped>
.s-content {
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
}
</style>
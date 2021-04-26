<template>
  <div class="Q-one-p">
    <div class="q-title">
      <div class="q-tip">Q1</div>
      <span>請選擇用量進度條顯示更能讓你理解的（單選）*</span>
    </div>
    <div class="q-sub-content">
      <van-radio-group
        v-model="Q1"
        class="horRadio"
        checked-color="#6f38d4"
        @change="selectQ1"
      >
        <van-radio
          v-for="item of radioArr"
          :key="item.value"
          :name="item.value"
        >
          {{ item.name }}
          <img :src="item.img" alt="">
        </van-radio>
      </van-radio-group>
    </div>
  </div>
</template>

<script>
import { RadioGroup, Radio } from 'vant';

export default {
  name: 'QOne',
  components: {
    vanRadioGroup: RadioGroup,
    vanRadio: Radio
  },
  data() {
    return {
      Q1: '',
      radioArr: [{
        name: '顯示剩餘的用量',
        value: 1,
        img: this.$t('preference.选项1')
      }, {
        name: '顯示已使用的用量',
        value: 2,
        img: this.$t('preference.选项2')
      }]
    }
  },
  methods: {
    selectQ1() {
      this.$emit('selectQ1', this.Q1);
    }
  }
}
</script>
<style lang="scss" scoped>
.Q-one-p {
  .van-radio {
    margin-bottom:40px * $scale;
    align-items: end;
    img {
      margin-top: 20px * $scale;
    }
  }
}
</style>
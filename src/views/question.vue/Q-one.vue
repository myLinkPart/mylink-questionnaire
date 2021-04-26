<template>
  <div class="Q-one">
    <div class="q-title">
      <div class="q-tip">Q1</div>
        您是否满意Mylink体验？*
      </div>
    <div class="q-sub-content">
      <van-radio-group
        v-model="Q1"
        class="verRadio"
        direction="horizontal"
        checked-color="#6f38d4"
        @change="selectQ1"
      >
        <van-radio
          v-for="item of radioArr"
          :key="item"
          :name="item"
        >
          {{item}}分
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
  computed: {
    radioArr() {
      return Array.from({length: 5}, (v,k) => k+1);
    }
  },
  data() {
    return {
      Q1: ''
    }
  },
  methods: {
    selectQ1() {
      this.$emit('selectQ1', this.Q1);
    }
  }
}
</script>
<template>
  <div class="Q-one">
    <div class="q-title">
      <div class="q-tip">Q1</div>
        {{ $t('satisfaction.题目1') }}
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
          {{item}}
        </van-radio>
      </van-radio-group>
      <div class="q-status">
        <span v-for="(item, index) in radioTextArr" :key="index">
          {{ item }}
        </span>
      </div>
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
      Q1: '',
      radioTextArr: [
        this.$t('satisfaction.非常不满意'),
        this.$t('satisfaction.不满意'),
        this.$t('satisfaction.一般满意'),
        this.$t('satisfaction.满意'),
        this.$t('satisfaction.非常满意')]
    }
  },
  methods: {
    selectQ1() {
      this.$bus.Q1Select = this.Q1;
      this.$emit('selectQ1', this.Q1);
    }
  }
}
</script>
<style lang="scss" scoped>
.Q-one {
  .q-status {
    display: flex;
    font-size: 20px * $scale;
    color: rgba(0, 0, 0, 0.4);
    margin-top: 20px * $scale;
    align-items: center;
    span {
      flex: 1;
      text-align: center;
      margin-right: 12px * $scale;
    }
  }
}
</style>
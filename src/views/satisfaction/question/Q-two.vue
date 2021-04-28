<template>
  <div class="Q-two">
    <div class="q-title">
      <div class="q-tip">Q2</div>
      {{ title }}
    </div>
    <div class="q-sub-content">
      <van-radio-group
        v-model="Q2"
        class="verRadio"
        direction="horizontal"
        checked-color="#6f38d4"
        @change="selectQ2"
      >
        <van-radio
          v-for="(item, index) of radioArr"
          :key="index"
          :name="item.value"
        >{{item.name}}</van-radio>
      </van-radio-group>
      <div class="q-other" v-if="Q2">
        <div class="q-title sub-title">{{ subTitle }}</div>
        <van-checkbox-group
          v-model="Q2More"
          checked-color="#6f38d4"
          @change="selectSub"
        >
          <van-checkbox
            v-for="(item, index) in index.questions"
            :name="`选项${index+1}`"
            :key="index"
          >{{ item }}</van-checkbox>
          <van-checkbox name="input">
            <van-field
              v-model="custom"
              name="其他"
              :label="$t('satisfaction.其他')"
              placeholder="请输入其他内容"
              @change="changeOther"
            />
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import { RadioGroup, Radio, Checkbox, CheckboxGroup, Field } from 'vant';

export default {
  name: 'QTwo',
  components: {
    vanRadioGroup: RadioGroup,
    vanRadio: Radio,
    vanCheckbox: Checkbox,
    vanCheckboxGroup: CheckboxGroup,
    vanField: Field
  },
  data() {
    return {
      Q2: '',
      Q2More: [],
      custom: '',
    };
  },
  computed: {
    index() {
      return this.radioArr.find(item => item.value === this.Q2);
    },
    title() {
      return this.$t(`satisfaction.${this.$bus.satisfy? '' : '不'}满意_题目2`);
    },
    subTitle() {
      return this.$t(`satisfaction.${this.$bus.satisfy? '' : '不'}满意_多选标题`);
    },
    radioArr() {
      return [
        {
          name: this.$t('satisfaction.界面设计'),
          value: '界面',
          questions: this.$t(`satisfaction.${this.$bus.satisfy? '' : '不'}满意多选项.界面`)
        },
        {
          name: this.$t('satisfaction.用户体验'),
          value: '体验',
          questions: this.$t(`satisfaction.${this.$bus.satisfy? '' : '不'}满意多选项.体验`)
        },
         {
          name: this.$t('satisfaction.功能服务'),
          value: '功能',
          questions: this.$t(`satisfaction.${this.$bus.satisfy? '' : '不'}满意多选项.功能`)
        }
      ];
    }
  },
  methods: {
    selectQ2() {
      this.Q2More = [];
      this.custom = '';
      this.$emit('selectQ2', this.Q2);
    },
    selectSub() {
      this.$emit('selectSub', this.Q2More)
    },
    changeOther() {
      if(this.custom && !this.custom.includes('input')) {
        this.Q2More.splice(this.custom.length, 0, 'input');
      }
      this.$emit('changeOther', this.custom)
    }
  }
}
</script>

<style lang="scss" scoped>
.Q-two {
  .sub-title.sub-title {
    margin-top: 40px * $scale;
    text-align: center;
    border-bottom: 0;
    border-top: 1px dashed rgba(106, 67, 209, .7);
    padding-top: 60px * $scale;
    justify-content: center;
  }
  .q-other {
    font-size: 28px * $scale;
  }
  .van-checkbox{
    margin: 30px * $scale 0 30px * $scale 20px * $scale;
  }
  .van-field {
    padding: 0;
    /deep/.van-field__label {
      width: auto;
      color: #333;
      font-size: 24px * $scale;
    }
    /deep/.van-field__body {
      border-bottom: 1px solid;
    }
    /deep/.van-field__control {
      color: #6A43D1;
    }
  }
}
</style>
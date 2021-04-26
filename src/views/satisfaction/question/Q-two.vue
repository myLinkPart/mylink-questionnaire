<template>
  <div class="Q-two">
    <div class="q-title">
      <div class="q-tip">Q2</div>
      您最满意的内容？*
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
          v-for="item of radioArr"
          :key="item.value"
          :name="item.value"
        >{{item.name}}</van-radio>
      </van-radio-group>
      <div class="q-other" v-if="Q2">
        <div class="q-title sub-title">{{ radioArr[+Q2-1].child.title }}</div>
        <van-checkbox-group
          v-model="Q2More"
          checked-color="#6f38d4"
          @change="selectSub"
        >
          <van-checkbox
            v-for="item in radioArr[+Q2-1].child.questions"
            :name="item.value"
            :key="item.value"
          >{{  item.name }}</van-checkbox>
          <van-checkbox name="input">
            <van-field
              v-model="custom"
              name="其他"
              label="其他"
              placeholder="请输入其他满意内容"
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
      radioArr: [{
        name: '界面设计',
        value: 1,
        child: {
          title: '您最满意界面的内容（多选）*',
          questions: [{
            name: '界面设计清晰',
            value: '1-1'
          }, {
            name: '界面设计够简洁',
            value: '1-2'
          }, {
            name: '排榜整齐',
            value: '1-3'
          }, {
            name: '很时尚',
            value: '1-4'
          }]
        }
      }, {
        name: '用户体验',
        value: 2,
        child: {
          title: '您最满意体验的内容（多选）*', 
          questions: []
        }
      }, {
        name: '栏目功能',
        value: 3,
        child: {
          title: '您最满意栏目的内容（多选）*',
          questions: []
        }
      }],
    };
  },
  methods: {
    selectQ2() {
      this.Q2More = [];
      this.custom = '';
      this.$emit('selectQ2', this.Q2);
    },
    selectSub() {
      this.$emit('selectSub', this.Q2More)
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
  }
  .q-other {
    font-size: 28px * $scale;
  }
  .van-checkbox{
    margin: 30px * $scale 0 30px * $scale 65px * $scale;
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
<template>
  <div class="q-layout">
    <div class="center_box">
      <div v-show="showContent">
        <div class="q-banner">
          <slot name="banner"></slot>
        </div>
        <div class="middle_box">
          <div class="q-content">
            <div class="q-require">{{ $t('必须填写') }}</div>
            <div class="q-box">
              <div class="q-slot-content">
                <slot name="middle"></slot>
              </div>
            </div>
          </div>
          <div class="rule" v-if="type === 'satisfy'">
            <div class="title">{{ $t('规则') }}</div>
            <div v-html="$t('satisfaction.规则内容')"></div>
          </div>
          <div class="rule" v-else>
            <div class="title">{{ $t('规则') }}</div>
            <div v-html="$t('preference.规则内容')"></div>
          </div>
        </div>
      </div>
      <div class="other" v-show="!showContent">
        <slot name="other"></slot>
      </div>
      <div class="bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Qlayout',
  props: {
    showContent: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'satisfy'
    }
  }
}
</script>

<style lang="scss" scoped>
.q-layout {
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
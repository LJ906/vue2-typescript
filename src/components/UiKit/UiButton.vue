<template>
  <!-- <button class="ui-btn" v-on="$listeners">Button</button> -->
  <button
    class="ui-btn"
    :class="{
      'ui-btn-large': size === 'large',
      'ui-btn-medium': size === 'medium',
      'ui-btn-small': size === 'small',
      'ui-btn-mini': size === 'mini'
    }"
    @click="onClickBtn"
  >
    <slot>Button</slot>
  </button>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'

@Component
export default class ClassName extends Vue {
  // 事件装饰器对应一个事件函数
  @Emit('click') private emitClickEvent() {
    return true
  }

  // 属性
  @Prop({ type: String, default: 'medium' }) private size?: string
  @Prop(Boolean) circle?: boolean
  @Prop(Boolean) round?: boolean

  private onClickBtn() {
    this.emitClickEvent()
    // this.$emit('click', event)
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';

@mixin resize-btn($padding, $fontSize, $borderRadius) {
  padding: $padding;
  font-size: $fontSize;
  border-radius: $borderRadius;
}
.ui-btn {
  line-height: 1;
  border: 0 solid black;
  outline: none;
  font-weight: 500;
  letter-spacing: 0.009em;
  background-color: $primary;
  color: $fff;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: $light-primary;
  }
  &.ui-btn-large {
    @include resize-btn((12px 20px), 14px, 4px);
  }
  &.ui-btn-medium {
    @include resize-btn((10px 20px), 14px, 4px);
  }
  &.ui-btn-small {
    @include resize-btn((9px 15px), 12px, 3px);
  }
  &.ui-btn-mini {
    @include resize-btn((4px 10px), 12px, 3px);
  }
  + button {
    margin-left: 8px;
  }
}
</style>

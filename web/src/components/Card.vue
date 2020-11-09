<template>
  <div class="card bg-white mt-3 p-3">
    <div class="card-header flex ai-center mb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl pl-1 flex-1">{{title}}</div>
      <i class="iconfont icon-menu fs-xxl"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type: String,
      required: true
    },
    icon:{
      type: String,
      required: true
    },
  }
};
</script>

<style lang="scss">
@import 'assets/scss/_vars.scss';
.card{
  border-bottom: 1px solid $border-color;
}
.card-body{
  border-top: 1px solid $border-color;
}
</style>
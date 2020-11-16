<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div class="nav-item" :class="{active: active === index}" @click="$refs.list.$swiper.slideTo(index)" v-for="(item,index) in categories" :key="index">
        <div class="nav-link">{{item.name}}</div>
      </div>
    </div>
    <swiper class="mt-2" ref="list" :options="{autoHeight: true}" @transitionStart="()=> active = this.$refs.list.$swiper.activeIndex">
      <swiper-slide v-for="(item,index) in categories" :key="index">
        <slot name="items" :category="item"></slot>
      </swiper-slide>
    </swiper>
  </m-card>
</template>

<script>
export default {
  props:{
    icon:{ type: String, required: true },
    title:{ type: String, required: true },
    categories:{type:Array,required:true}
  },
  data(){
    return{
      active: 0
    }
  }
};
</script>

<style>
</style>
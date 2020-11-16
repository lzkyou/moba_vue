<template>
  <div>
    <!-- 轮播 -->
    <swiper :options="swiperOption">
      <swiper-slide
        ><img class="w-100" src="~assets/images/banner/banner1.jpeg"
      /></swiper-slide>
      <swiper-slide
        ><img class="w-100" src="~assets/images/banner/banner2.jpeg"
      /></swiper-slide>
      <swiper-slide
        ><img class="w-100" src="~assets/images/banner/banner3.jpeg"
      /></swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right pr-3"
        slot="pagination"
      ></div>
    </swiper>
    <!-- 图标导航  -->
    <div class="icon-nav bg-white mt-3 text-center py-3 pb-0 text-light-dark">
      <div class="flex flex-wrap">
        <div class="icon-nav-item mb-3" v-for="item in 10" :key="item">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light-grey py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- 卡片 -->
    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCates">
      <template #items="{ category }">
        <router-link tag="div" :to="`/articles/${item._id}`" class="py-2 flex fs-lg" v-for="(item,index) in category.newsList" :key="index">
          <span class="text-grey">[{{item.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="flex-1 pr-1 text-ellipsis">{{item.title}}</span>
          <span class="text-grey">{{item.createdAt | dateShortCut}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="1590151135_1_" title="英雄列表" :categories="heroCates">
      <template #items="{ category }">
        <div class="flex flex-wrap" style="margin: 0 -.5rem">
          <div class="p-2 text-center" style="width: 20%;" v-for="(item,index) in category.heroList" :key="index">
            <img :src="item.avatar" class="w-100">
            <div>{{item.name}}</div>
         </div>
        </div>
      </template>
    </m-list-card>

    <m-card icon="cc-menu-circle" title="精选视频"></m-card>
    <m-card icon="cc-menu-circle" title="图文攻略"></m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  filters:{
    dateShortCut(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        pagination: {
          el: ".pagination-home",
        },
      },
      newsCates: [],
      heroCates: [],
      // iconItems:{
      //   name: ['爆料站','故事站','周边商城','体验服','新人专区'],
      //   class: ['']
      // }
    };
  },
  methods:{
    async fetchNewsCates(){
      const res = await this.$http.get('news/list')
      this.newsCates = res.data
    },
    async fetchHeroCates(){
      const res = await this.$http.get('heroes/list')
      this.heroCates = res.data
    }
  },
  created(){
    this.fetchNewsCates()
    this.fetchHeroCates()
  }
};
</script>

<style lang="scss">
@import "assets/scss/style.scss";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 0.9;
    border-radius: 0.1538rem;
    background-color: map-get($colors, "white");

    &.swiper-pagination-bullet-active {
      background: map-get($colors, "dot");
    }
  }
}
.icon-nav {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .icon-nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
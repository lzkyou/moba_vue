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
        <div class="py-2 flex" v-for="(item,index) in category.newsList" :key="index">
          <span>[{{item.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="flex-1">{{item.title}}</span>
          <span>{{item.date}}</span>
        </div>
      </template>
    </m-list-card>

    <m-card icon="cc-menu-circle" title="英雄列表"></m-card>
    <m-card icon="cc-menu-circle" title="精选视频"></m-card>
    <m-card icon="cc-menu-circle" title="图文攻略"></m-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        autoplay: true,
        pagination: {
          el: ".pagination-home",
        },
      },
      newsCates: [
        {
          name: "热门",
          newsList: new Array(5).fill({}).map((val) => ({
            categoryName: "公告",
            title: "11月9日体验服专区维护公告",
            date: "11/09",
          })),
        },
        {
          name: "新闻",
          newsList: new Array(5).fill({}).map((val) => ({
            categoryName: "新闻",
            title: "11月9日体验服专区维护公告",
            date: "11/09",
          })),
        },
        {
          name: "公告",
          newsList: new Array(5).fill({}).map((val) => ({
            categoryName: "公告",
            title: "11月9日体验服专区维护公告",
            date: "11/09",
          })),
        },
        {
          name: "活动",
          newsList: new Array(5).fill({}).map((val) => ({
            categoryName: "活动",
            title: "11月9日体验服专区维护公告",
            date: "11/09",
          })),
        },
        {
          name: "赛事",
          newsList: new Array(5).fill({}).map((val) => ({
            categoryName: "赛事",
            title: "11月9日体验服专区维护公告",
            date: "11/09",
          })),
        },
      ],
      // iconItems:{
      //   name: ['爆料站','故事站','周边商城','体验服','新人专区'],
      //   class: ['']
      // }
    };
  },
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
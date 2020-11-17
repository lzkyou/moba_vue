<template>
  <div v-if="model">
    <!-- 头部 -->
    <div class="top-bar bg-black py-2 px-4 flex ai-center text-white">
      <img src="~assets/logo.png" alt="logo" height="30px" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link tag="div" to="/">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white p-3 flex flex-column h-100 jc-end">
        <div>{{ model.title }}</div>
        <h1 class="my-3">{{ model.name }}</h1>
        <div>{{ model.categories.map((v) => v.name).join("/") }}</div>
        <div class="flex jc-between">
          <div class="scores flex ai-center pt-2" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-dot">{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark-grey">{{ model.scores.survive }}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey"
            >皮肤 &gt;</router-link
          >
        </div>
      </div>
    </div>
    <!-- 主题内容 -->
    <div>
      <div class="px-3 bg-white">
        <div class="nav py-3 bd-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper ref="list">
        <swiper-slide>
          <div>
            <div class="bg-white p-3 bd-bottom">
              <div class="flex">
                <router-link to="/" tag="button" class="btn btn-lg flex-1">
                  <i class="iconfont icon-cc-menu-circle"></i>
                  英雄介绍视频
                </router-link>
                <router-link to="/" tag="button" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-1590151135_1_"></i>
                  一图识英雄
                </router-link>
              </div>
              <div class="skills bg-white mt-4">
                <div class="flex jc-around">
                  <img
                    class="icon"
                    @click="currentSkillIndex = i"
                    :class="{ active: currentSkillIndex === i }"
                    :src="item.icon"
                    v-for="(item, i) in model.skills"
                    :key="item.name"
                  />
                </div>
                <div v-if="currentSkill" class="p-2 mt-3">
                  <div class="flex">
                    <h2 class="fs-xl m-0">{{ currentSkill.name }}</h2>
                    <span class="text-grey ml-4"
                      >(冷却值：{{ currentSkill.cd }} 消耗：{{
                        currentSkill.mana
                      }})</span
                    >
                  </div>
                </div>
                <p class="px-1">{{ currentSkill.description }}</p>
              </div>
            </div>
            <m-card plain icon="1590151135_1_" title="出装推荐" class="hero-items">
              <div class="fs-xl">顺风出装</div>
              <div class="flex jc-around mt-3 text-center bd-bottom pb-3">
                <div v-for="item in model.goodItems" :key="item.name">
                  <img :src="item.icon" class="icon">
                  <div class="fs-sm mt-1">{{item.name}}</div>
                </div>
              </div>
              <div class="fs-xl mt-3">逆风出装</div>
              <div class="flex jc-around mt-3 text-center">
                <div v-for="item in model.badItems" :key="item.name">
                  <img :src="item.icon" class="icon">
                  <div class="fs-sm mt-1">{{item.name}}</div>
                </div>
              </div>
            </m-card>
            <m-card plain icon="1590151135_1_" title="使用技巧">
              <p class="m-0">{{model.usageTips}}</p>
            </m-card>
            <m-card plain icon="1590151135_1_" title="对抗技巧">
              <p class="m-0">{{model.battleTips}}</p>
            </m-card>
            <m-card plain icon="1590151135_1_" title="团战思路">
              <p class="m-0">{{model.teamTips}}</p>
            </m-card>
            <m-card plain icon="1590151135_1_" title="英雄关系">
              <div class="fs-xl">最佳搭档</div>
              <div class="flex pt-3" v-for="item in model.partners" :key="item.name">
                <img :src="item.hero.avatar" height="50">
                <p class="flex-1 m-0 ml-3 fs-lg">{{item.description}}</p>
                <div class="bd-bottom mt-3"></div>
              </div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: "",
      currentSkillIndex: 0,
      active: 0
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    },
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
@import '~assets/scss/_vars';
.top {
  height: 50vw;
  background: top center no-repeat;
  background-size: auto 100%;

  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        display: inline-block;
        margin: 0 0.25rem;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
}
.skills {
  img.icon {
    width: 60px;
    height: 60px;
    border: 3px solid map-get($colors, "white");
    border-radius: 50%;
    &.active {
      border-color: map-get($colors, "primary");
    }
  }
}
.hero-items{
  img.icon{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>
<template>
  <div>
    <div class="top-bar bg-black py-2 px-4 flex ai-center">
      <img src="~assets/logo.png" alt="logo" height="30px">
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-dark-grey fs-xxs">团队成就更多</div>
      </div>
      <button class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-reverse pb-1">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.top-bar{
  position: sticky;
  top: 0;
  z-index: 99;
}
</style>
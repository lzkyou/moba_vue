<template>
  <div>
    <div class="flex py-3 px-2 bd-bottom">
      <div class="iconfont icon-back text-dot"></div>
      <strong class="flex-1 fs-lg text-dot">
        {{ model.title }}
      </strong>
      <div class="text-grey">2020-11-13</div>
    </div>
    <div v-html="model.body" class="px-3 article-body fs-xl"></div>
    <div class="px-3 bd-top py-4">
      <div class="flex ai-center">
        <i class="iconfont icon-menu"></i>
        <strong class="text-dot fs-lg ml-2">相关资讯</strong>
      </div>
      <router-link tag="div" :to="`/articles/${item._id}`" class="mt-1 py-2" v-for="item in model.related" :key="item">
        {{item.title}}
      </router-link>
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
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },
  },
  watch:{
    id: 'fetch'
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.article-body{
  img{
    width: 100%;
    height: auto;
  }
}
</style>
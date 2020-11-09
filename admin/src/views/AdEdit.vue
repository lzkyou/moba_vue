<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="saveData">
      <el-form-item label="广告位名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告项">
        <el-button type="text" size="mini" @click="model.items.push({})">
          <i class="el-icon-plus">添加项</i>
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, index) in model.items" :key="index">
            <el-form-item label="广告跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 15px">
              <!-- on-success事件触发后后端send回前端resolve -->
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="(url) => $set(item, 'image', url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item align="right" style="margin-bottom: 20px">
              <el-button size="mini" type="danger" @click="removeItem(index)">
                删除项
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {
        items: [],
      },
    };
  },
  methods: {
    async saveData() {
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }

      this.$router.push("/ads/list");
      this.$message.success("保存成功！");
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    removeItem(index) {
      this.$confirm("是否删除该项广告?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.model.items.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style scoped>
</style>
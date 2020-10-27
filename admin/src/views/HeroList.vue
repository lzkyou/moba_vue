<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="avatar" label="英雄头像">
        <!-- 当使用elementUI的template时 可以往里面自定义很多东西 例如下方的图片 如果直接在el-table-column修改prop属性并不能显示图片，只会显示图片地址 -->
        <template v-slot="rowData">
          <img :src="rowData.row.avatar" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="英雄称号"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template v-slot="rowData">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/heros/edit/${rowData.row._id}`)"
            >编辑</el-button>
          <el-button type="danger" size="small" @click="remove(rowData.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/heros");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.$http.delete(`rest/heros/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style scoped>
</style>
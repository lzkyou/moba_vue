<template>
  <div class="login-wrap">
    <el-card header="登录">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      localStorage.token = res.data.token;
      this.$router.push("/");
      this.$message({ type: 'success', message: "登录成功" });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.el-card {
  width: 25rem;
  margin-top: -5rem;
}
</style>
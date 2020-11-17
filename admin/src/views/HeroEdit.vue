<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="saveData">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-tabs type="border-card" value="info">
        <el-tab-pane label="基础信息" name="info">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(url) => $set(model, 'avatar', url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="背景图">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(url) => $set(model, 'banner', url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.7rem"
              :max="9"
              show-score
              v-model="model.scores.difficult"
              multiple
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.7rem"
              :max="9"
              show-score
              v-model="model.scores.skills"
              multiple
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.7rem"
              :max="9"
              show-score
              v-model="model.scores.attack"
              multiple
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.7rem"
              :max="9"
              show-score
              v-model="model.scores.survive"
              multiple
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.goodItems" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.badItems" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能信息" name="skills">
          <!-- 在skills中push一个空对象 -->
          <el-button type="text" size="mini" @click="model.skills.push({})">
            <i class="el-icon-plus">添加技能</i>
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="(url) => $set(item, 'icon', url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.cd"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.mana"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item class="delete-btn">
                <el-button type="danger" @click="delSkill(index)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="英雄关系" name="partner">
          <!-- 在skills中push一个空对象 -->
          <el-button type="text" size="mini" @click="model.partners.push({})">
            <i class="el-icon-plus">添加英雄</i>
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, index) in model.partners" :key="index">
              <el-form-item label="英雄">
                <el-select filterable  v-model="item.hero">
                  <el-option v-for="hero in heros" :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item class="delete-btn">
                <el-button type="danger" @click="delSkill(index)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
export default {
  //接收来自列表页需要编辑的数据id（点击编辑按钮后通过ES6 `` 模板字符串拼接url传递参数）
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      categories: [],
      heros: [],
      model: {
        //预先声明字面量
        name: "",
        avatar: "",
        banner: "",
        scores: {
          difficult: 0,
        },
        skills: "",
        partners: []
      },
      items: [],
    };
  },
  methods: {
    //   afterUpload(url) {
    //     // 当声明变量后则不需要使用this.$set添加变量
    //     // this.$set(this.model, 'icon', url)
    //     this.model.avatar = url;
    //   },
    async saveData() {
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`rest/heros/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heros", this.model);
      }

      this.$router.push("/heros/list");
      this.$message.success("保存成功！");
    },
    //获取hero模型数据并在VMDOM创建时调用此方法
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data); //使用Object.assign()创建一个空对象(target)后，将this.model和res.data(...sources)相同的键会被覆盖。
    },
    //获取categories模型数据并在VMDOM创建时调用此方法
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    //获取item模型数据并在VMDOM创建时调用此方法
    async fetchItems() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },
    async fetchHeros() {
      const res = await this.$http.get("rest/heroes");
      this.heros = res.data;
    },
    delSkill(index) {
      this.$confirm("确认删除此项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.model.skills.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.fetchItems();
    this.fetchHeros();
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.avatar {
  width: 10rem;
  object-fit: contain;
}
.delete-btn {
  text-align: right;
}
</style>
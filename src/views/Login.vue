<template>
  <div class="login">
    <div class="content">
      <h1>Management BackGround</h1>
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            auto-complete="off"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit", this.form.username, this.form.password);
        } else {
          console.log("error Submit!!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    h1 {
      padding-bottom: 30px;
    }
    .login-form {
      width: 300px;
      height: 200px;
    }
  }
}
</style>

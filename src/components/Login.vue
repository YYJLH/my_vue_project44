<template>
    <div class="login-container">
        <!-- logo区-->
        <div class="logo">
            <img src="../assets/logo.png" alt="">
        </div>
        <!-- 登录的表单 -->
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="loginform_style">
            <!-- 登录名 -->
            <el-form-item prop="username">
                <el-input v-model="loginForm.username">
                    <!-- 使用slot为输入框设置登录名图标 -->
                    <i slot="prefix" class="iconfont icon-user"></i>
                </el-input>
            </el-form-item>
            <!-- 登录密码 -->
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password">
                    <!-- 使用slot为输入框设置密码图标 -->
                    <i slot="prefix" class="iconfont icon-3702mima"></i>
                </el-input>
            </el-form-item>
            <!-- 登录和重置 -->
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      // 登录的表单绑定的数据对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 登录表单的验证规则
      loginFormRules: {
        // 登录名的校验规则
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        // 登录密码的校验规则
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮,重置表单项
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 点击按钮登录
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        // 验证失败，立即return
        if (!valid) return
        // 发起登录的请求
        const { data: res } = await this.$http.post('login', this.loginForm)
        // 登录失败
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        // 登录成功
        this.$message.success('登录成功')
        // console.log(res)
        // 把登录成功后的令牌保存到sessionStorage,供后续接口使用
        window.sessionStorage.setItem('token', res.data.token)
        // 使用JS API实现登录跳转 this.$router
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  width: 450px;
  height: 304px;
  background-color: #fff;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  .logo {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    padding: 8px;
    border-radius: 50%;
    box-shadow: 0 0 10px #eee;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-60px);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .loginform_style {
    padding: 0 20px;
    margin-top: 110px;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

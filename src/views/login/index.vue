<template>
  <div class="container">
    <el-card>
      <div class="logo">
        <img src="../../assets/images/logo_index.png" alt />
      </div>
      <el-form :model="loginData" :rules="rules" ref="loginForm" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginData.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            style="width:230px;margin-right:16px"
            v-model="loginData.code"
            placeholder="请输入验证码"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login" :plain="true">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}/.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      }
      callback()
    }
    return {
      checked: true,
      loginData: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (loginForm) {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const {
              data: { data }
            } = await this.$http.post('authorizations', this.loginData)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  position: absolute;
  height: 100%;
  width: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .el-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    width: 400px;
    height: 350px;
    background-color: #fff;
    .logo {
      img {
        display: block;
        width: 200px;
        margin: 0 auto 30px;
      }
    }
  }
}
</style>

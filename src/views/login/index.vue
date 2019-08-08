<template>
  <div class="container">
    <el-card>
      <div class="logo">
        <img src="../../assets/images/logo_index.png" alt="">
      </div>
      <el-form>
        <el-form-item>
          <el-input v-model="loginData.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width:230px;margin-right:16px" v-model="loginData.code"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true,
      loginData: {
        mobile: '13911111111',
        code: '246810'
      }
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

<template>
  <el-container class="box">
    <el-aside width="200px">
      <div class="bglogo"></div>
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        style="border:none"
        :collapse-transition="false"
      >
        <el-menu-item index="/">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/article">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>内容管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/image">
          <template slot="title">
            <i class="el-icon-picture"></i>
            <span>素材管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/publish">
          <template slot="title">
            <i class="el-icon-s-promotion"></i>
            <span>发布文章</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/comment">
          <template slot="title">
            <i class="el-icon-chat-dot-round"></i>
            <span>评论管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/fans">
          <template slot="title">
            <i class="el-icon-present"></i>
            <span>粉丝管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/setting">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>个人设置</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold"></span>
        <span>江苏传智播客科技教育有限公司</span>
        <el-dropdown style="float:right" @command="toggle">
          <span class="el-dropdown-link">
            <img :src="userInfo.photo" alt="" class="avatar">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = store.getUser()
  },
  methods: {
    setting () {
      this.$router.push('/setting')
    },
    exit () {
      store.removeUser()
      this.$router.push('/login')
    },
    toggle (command) {
      this[command]()
    }
  }
}
</script>

<style scoped lang="less">
.box {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .el-aside {
    height: 100%;
    background-color: #002033;
    .bglogo {
      height: 60px;
      width: 100%;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat
        center / 130px auto;
    }
  }
  .el-header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    span {
      vertical-align: middle;
    }
    .el-icon-s-fold {
      vertical-align: middle;
      font-size: 24px;
      margin-right: 10px;
    }
    .avatar {
      vertical-align: middle;
      height: 30px;
      width: 30px;
    }
  }
  .el-main {
    height: 100%;
    width: 100%;
  }
}
</style>

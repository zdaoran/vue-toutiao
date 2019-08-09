<template>
  <el-container class="box">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="bglogo" :class="{small:isCollapse}"></div>
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        style="border:none"
        :collapse-transition="false"
        :collapse="isCollapse"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="collapse"></span>
        <span>江苏传智播客科技教育有限公司</span>
        <el-dropdown style="float:right" @command="toggle">
          <span class="el-dropdown-link">
            <img :src="userInfo.photo" alt class="avatar" />
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
      userInfo: {},
      isCollapse: false
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
    },
    collapse () {
      this.isCollapse = !this.isCollapse
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
    .small {
      background: #002244 url(../../assets/images/logo_admin_01.png) no-repeat
        center / 36px auto;
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

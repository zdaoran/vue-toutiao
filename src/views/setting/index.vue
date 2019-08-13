<template>
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form label-width="120px">
          <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
          <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
          <el-form-item label="媒体名称：">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍：">
            <el-input type="textarea" :rows="3" v-model="userInfo.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUser">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" style="text-align:center;">
        <el-upload
          class="avatar-uploader"
          action
          :http-request="myUpload"
          :show-file-list="false"
          style="margin-top:20px;"
        >
          <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p style="font-size:14px;">修改用户头像</p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus.js'
export default {
  data () {
    return {
      userInfo: {
        id: null,
        mobile: null,
        name: null,
        intro: null,
        email: null,
        photo: null
      },
      reqHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  methods: {
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userInfo = data
    },
    async updateUser () {
      const {
        data: { data }
      } = await this.$http.patch('user/profile', {
        name: this.userInfo.name,
        intro: this.userInfo.intro,
        email: this.userInfo.email
      })
      store.setUser(data)
      eventBus.$emit('updateUser', data.name)
      this.$message.success('修改用户信息成功')
    },
    myUpload (result) {
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http.patch('user/photo', formData).then(res => {
        this.$message.success('修改头像成功')
        this.userInfo.photo = res.data.data.photo
        store.setUser({ photo: this.userInfo.photo })
        eventBus.$emit('updatePhoto', this.userInfo.photo)
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
</style>

<template>
  <div class="container" style="display:inline-block;margin-right:20px;">
    <div class="pic" @click="toggleDialog">
      <img :src="value || defaultImage" alt style="width:160px;height:160px" object-fit="cotain" />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="800px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <div class="btn">
            <el-radio-group v-model="reqParams.collect" size="mini" @change="toggleCollect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <ul class="box">
            <li
              class="img-item"
              v-for="item in images"
              :key="item.id"
              @click="selected(item.url)"
              :class="{select:selectedImageUrl===item.url}"
            >
              <img :src="item.url" alt object-fit="contain" />
            </li>
          </ul>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            v-if="total>reqParams.per_page"
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="updateImage" style="text-align:center">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="reqHeader"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer" style="display:block;text-align:center;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '@/assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      activeName: 'image',
      total: 0,
      // imageUrl: null,
      reqHeader: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      selectedImageUrl: null,
      uploadImageUrl: null,
      defaultImage
    }
  },
  methods: {
    toggleDialog () {
      this.selectedImageUrl = null
      this.imageUrl = null
      this.getImages()
      this.dialogVisible = !this.dialogVisible
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    handleAvatarSuccess (res) {
      console.log(res)
      this.uploadImageUrl = res.data.url
    },
    selected (url) {
      this.selectedImageUrl = url
    },
    update () {
      if (this.activeName === 'image') {
        this.$emit('input', this.selectedImageUrl)
      } else {
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">
.pic {
  height: 160px;
  width: 160px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  background: url(../assets/images/default.png) no-repeat center / cover;
  cursor: pointer;
}
.box {
  padding: 0;
  width: 100%;
  margin-top: 20px;
  .img-item {
    position: relative;
    display: inline-block;
    height: 120px;
    width: 160px;
    border: 1px dashed #ddd;
    margin-right: 26px;
    &.select {
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4) url(../assets/images/selected.png)
          no-repeat center / 60px 60px;
      }
    }
    img {
      height: 120px;
      width: 160px;
    }
  }
}
</style>

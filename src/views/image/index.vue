<template>
  <el-card class="img-container">
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <div class="btn">
      <el-radio-group v-model="reqParams.collect" size="small" @change="toggleCollect">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" size="small" style="float:right" @click="addImage">添加素材</el-button>
    </div>
    <ul class="image">
      <li v-for="item in images" :key="item.id">
        <img :src="item.url" alt object-fit="contain" />
        <div>
          <span
            class="el-icon-star-off"
            @click="collect(item)"
            :class="{selected:item.is_collected}"
          ></span>
          <span class="el-icon-delete" @click="del(item.id)"></span>
        </div>
      </li>
    </ul>
    <el-pagination
      v-if="total>reqParams.per_page"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="reqParams.page"
      :page-size="reqParams.per_page"
      @current-change="chngePager"
    ></el-pagination>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px" style="text-align:center;">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        name="image"
        :headers="reqHeaders"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary">取 消</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import store from '@/store'
import { setTimeout } from 'timers'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      reqHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  methods: {
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    chngePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    async collect (item) {
      const {
        data: { data }
      } = await this.$http.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      item.is_collected = data.collect
    },
    del (id) {
      this.$confirm('此操作将永久删除该素材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getImages()
        })
        .catch(() => {})
    },
    addImage () {
      this.imageUrl = null
      this.dialogVisible = true
    },
    handleAvatarSuccess (result) {
      this.imageUrl = result.data.url
      this.reqParams.page = 1
      setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
        this.$message.success('上传素材成功')
      }, 2000)
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style scoped lang="less">
.btn {
  height: 56px;
}
.image {
  margin: 0;
  padding: 0 30px;
  width: 100%;
  height: 100%;
  li {
    position: relative;
    display: inline-block;
    height: 160px;
    width: 160px;
    border: 1px dashed #ddd;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      height: 160px;
      width: 160px;
    }
    div {
      position: absolute;
      width: 100%;
      height: 30px;
      left: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      text-align: center;
      span {
        line-height: 30px;
        padding: 0 10px;
        color: #fff;
      }
      .selected {
        color: red;
      }
    }
  }
}
</style>

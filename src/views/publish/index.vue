<template>
  <el-card>
    <div slot="header">
      <my-bread>{{articleId?'修改文章':'发布文章'}}</my-bread>
    </div>
    <el-form label-width="100px">
      <el-form-item label="标题：">
        <el-input style="width:40%" v-model="reqParams.title"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <quill-editor :options="toolbarOptions" v-model="reqParams.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面：">
        <el-radio-group v-model="reqParams.cover.type" @change="clearImage">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <div v-if="reqParams.cover.type===1">
          <my-image v-model="reqParams.cover.images[0]"></my-image>
        </div>
        <div v-if="reqParams.cover.type===3">
          <my-image v-model="reqParams.cover.images[0]"></my-image>
          <my-image v-model="reqParams.cover.images[1]"></my-image>
          <my-image v-model="reqParams.cover.images[2]"></my-image>
        </div>
      </el-form-item>
      <el-form-item label="频道：">
        <my-channel v-model="reqParams.channel_id"></my-channel>
      </el-form-item>
      <el-form-item v-if="!articleId">
        <el-button type="success" @click="submit(false)">发表</el-button>
        <el-button @click="submit(true)">存入草稿</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" @click="update(false)">发表</el-button>
        <el-button @click="update(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      toolbarOptions: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      reqParams: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      articleId: null
    }
  },
  methods: {
    async submit (draft) {
      await this.$http.post('articles?draft=' + draft, this.reqParams)
      this.$message.success(draft ? '文章存入草稿成功' : '文章发表成功')
      this.$router.push('/article')
    },
    async update (draft) {
      await this.$http.post('articles?draft=' + draft, this.reqParams)
      this.$message.success(draft ? '文章存入草稿成功' : '修改文章成功')
      this.$router.push('/article')
    },
    clearImage () {
      this.reqParams.cover.images = []
    },
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('articles/' + this.articleId)
      this.reqParams = data
    }
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) this.getArticle()
  },
  watch: {
    $route () {
      if (this.$route.query.id) {
        this.articleId = null
        this.reqParams = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>

<template>
  <el-card>
    <div slot="header">
      <my-bread>评论管理</my-bread>
    </div>
    <el-table :data="comments" style="width: 100%">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
      </el-table-column>
      <el-table-column label="操作" width="160px">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.comment_status===true"
            type="danger"
            size="small"
            @click="toggle(scope.row)"
          >关闭评论</el-button>
          <el-button v-else type="success" size="small" @click="toggle(scope.row)">打开评论</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      comments: [],
      total: 0
    }
  },
  methods: {
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
    },
    async toggle (row) {
      const {
        data: { data }
      } = await this.$http.put('comments/status?article_id=' + row.id, {
        allow_comment: !row.comment_status
      })
      row.comment_status = data.allow_comment
      this.$message.success(
        data.allow_comment ? '打开评论成功' : '关闭评论成功'
      )
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style scoped lang="less">
</style>

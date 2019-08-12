<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="articleForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核成功</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateList"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="changeDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <el-table :data="articlesList" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <img
              :src="scope.row.cover.images[0]"
              alt
              style="width:120px;height:80px;"
              object-fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
            <el-tag type="primary" v-if="scope.row.status===1">审核通过</el-tag>
            <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status===4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="total>articleForm.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="articleForm.per_page"
        :current-page="articleForm.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleForm: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      articlesList: [],
      dateList: [],
      total: 0
    }
  },
  created () {
    this.getArticlesList()
  },
  methods: {
    async getArticlesList () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.articleForm })
      this.articlesList = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.articleForm.page = newPage
      this.getArticlesList()
    },
    changeDate (dateList) {
      if (!dateList) {
        this.articleForm.begin_pubdate = null
        this.articleForm.end_pubdate = null
      } else {
        this.articleForm.begin_pubdate = this.dateList[0]
        this.articleForm.end_pubdate = this.dateList[1]
      }
    },
    search () {
      this.articleForm.page = 1
      this.getArticlesList()
    },
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    del (id) {
      this.$confirm('老铁, 此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete('articles/' + id)
          this.$message.success('文章删除成功')
          this.getArticlesList()
        }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="less">
</style>

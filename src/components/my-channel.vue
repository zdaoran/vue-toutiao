<template>
  <el-select :value="value" placeholder="请选择" @change="fn" clearable>
    <el-option
      v-for="item in channelOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  methods: {
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    }
  },
  created () {
    this.getChannelOptions()
  }
}
</script>

<style scoped lang="less">
</style>

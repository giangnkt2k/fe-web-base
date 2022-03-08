<template>
  <div>
    <h1>profile {{ hi }}</h1>
    <el-button type="success" @click="getMess">
      Success
    </el-button>
    <div>
      <div>01</div>
      <div>02</div>
      <div>03</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data () {
    return {
      hi: 'Hello world'
    }
  },
  // created () {
  //   this.getMess()
  // },
  methods: {
    getMess () {
      this.$message.success('xin chao')
    }
  }
}
</script>

<style>

</style>

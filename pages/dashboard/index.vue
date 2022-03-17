<template>
  <div>
    <div class="md:container md:mx-auto pt-6 px-6 md:px-2">
      <div class="block mb-8 grid grid-cols-3 gap-4 items-center">
        <el-card shadow="hover" class="col-start-1 col-end-3 md:col-end-2">
          <div class="flex flex-row items-center">
            <div class="icon-div mr-2">
              <i class="el-icon-s-opportunity text-3xl text-yellow-400" />
            </div>
            <div class="content-card">
              <span>Number of idesa: 10</span>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="col-start-1 col-end-3 md:col-start-2 col-end-3">
          <div class="flex flex-row items-center">
            <div class="icon-div mr-2">
              <i class="el-icon-s-custom text-3xl text-purple-500" />
            </div>
            <div class="content-card">
              <span>Number of users: 10</span>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="col-start-1 col-end-3 md:col-start-3">
          <div class="flex flex-row items-center">
            <div class="icon-div mr-2">
              <i class="el-icon-s-comment text-3xl text-blue-500" />
            </div>
            <div class="content-card">
              <span>Number of interactives: 10</span>
            </div>
          </div>
        </el-card>
      </div>
      <div>
        <el-card shadow="hover">
          chart
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage'
}
</script>

<style>

</style>

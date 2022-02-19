<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo sidebar-container"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location" />
          <span slot="title">Navigator One</span>
        </template>
        <el-menu-item-group>
          <span slot="title">Group One</span>
          <el-menu-item index="1-1">
            item one
          </el-menu-item>
          <el-menu-item index="1-2">
            item two
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">
            item three
          </el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">item four</span>
          <el-menu-item index="1-4-1">
            item one
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu" />
        <span slot="title">Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document" />
        <span slot="title">Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting" />
        <span slot="title">Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    propsCollapse: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    isCollapse () {
      return this.propsCollapse
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // eslint-disable-next-line no-console
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // eslint-disable-next-line no-console
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 100%;
  }

  .sidebar-container {
    transition: width 0.28s;
    max-width: 210px !important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    transition: margin-left 0.25s;
  }
</style>

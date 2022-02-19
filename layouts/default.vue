<template>
  <div class="app-main">
    <right-bar :props-collapse="isCollapse" />
    <div
      :class="{marginOff: isCollapse}"
      class="main-content-container"
    >
      <top-bar @handle-change-type-menu="handleChangeTypeMenu" />
      <nuxt />
    </div>
  </div>
</template>

<script>
import RightBar from '@/components/layouts/RightBar.vue'
import TopBar from '@/components/layouts/TopBar.vue'
export default {
  name: 'DefaultLayoutTemplate',
  components: {
    RightBar,
    TopBar
  },
  middleware: ['initAuth', 'auth'],
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleChangeTypeMenu (value) {
      this.isCollapse = value
    }
  }
}
</script>
<style scoped>
.marginOn {
  margin-left: 210px;
  transition: margin-left 0.5s;
}

.marginOff {
  margin-left: 65px !important;
  transition: margin-left 0.25s;
}
.main-content-container {
  transition: margin-left 0.25s;
  margin-left: 210px;
}
</style>

<template>
  <div class="top-bar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <span class="icon-nav">
        <el-switch v-model="isCollapse" active-color="#304156" />
      </span>

      <el-submenu index="1" class="icon-nav-mobile">
        <template slot="title">
          Menu
        </template>
        <el-menu-item v-for="(item,index) in menus" :key="index+0.1" @click="routing(item)">
          {{ item.title }}
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          {{ currentUser.full_name }}
        </template>
        <el-menu-item index="2-1" @click="profile">
          Profile
        </el-menu-item>
        <el-menu-item index="2-3" @click="logout">
          Logout
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import menuMixin from '~/mixins/menu.js'

export default {
  mixins: [menuMixin],
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      isCollapse: false
    }
  },
  propsCollapse: {
    type: Boolean,
    required: true,
    default: false
  },
  computed: {
    currentUser () {
      return this.$store.getters['user/getCurrentUser']
    }
  },
  watch: {
    isCollapse () {
      // eslint-disable-next-line no-console
      this.changeTypeMenu()
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // eslint-disable-next-line no-console
      console.log(key, keyPath)
    },
    changeTypeMenu () {
      this.$emit('handle-change-type-menu', this.isCollapse)
    },
    profile () {
      this.$router.push('/profile')
    },
    routing (item) {
      this.$router.push(item.link)
    },
    logout () {
      // eslint-disable-next-line no-console
      try {
        this.$store.commit('user/setCurrentUser', {})
        this.$store.commit('auth/logout')
      } catch (e) {
        const message = e.response.data.message || ''
        this.$toast.error(message)
      }
    }
  }
}
</script>

<style scoped>
ul.el-menu-demo.el-menu--horizontal.el-menu {
  padding-bottom: 5px;
}
.el-menu--horizontal>.el-submenu {
  float: right;
}
.icon-nav {
  top: 17px;
  left: 17px;
  position: absolute;
}
.icon-nav-mobile {
    display: none;
    float: left !important;

  }
.logo-nav {
    top: 5px;
    left: 75px;
    font-size: 36px;
    position: absolute;
    color: #304156;
    font-family: auto;
    font-weight: 600;
}
@media only screen and (max-width: 500px) {
  .icon-nav {
    display: none;
  }

  .icon-nav-mobile {
    display: inline;
    float: left;
  }
}
</style>

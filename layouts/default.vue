<template>
  <div class="app-main">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <right-bar class="right-bar" :props-collapse="isCollapse" />
    <div
      :class="{marginOff: isCollapse}"
      class="main-content-container"
    >
      <top-bar @handle-change-type-menu="handleChangeTypeMenu" />
      <nuxt class="min-h-screen bg-gray-100" />
      <loading :props-is-loading="isLoading" />
    </div>
  </div>
</template>

<script>
import RightBar from '@/components/layouts/RightBar.vue'
import TopBar from '@/components/layouts/TopBar.vue'
import loading from '@/components/elements/loading/index.vue'
import { currentUser } from '@/api/user'
import menuMixin from '~/mixins/menu.js'
export default {
  name: 'DefaultLayoutTemplate',
  components: {
    RightBar,
    TopBar,
    loading
  },
  mixins: [menuMixin],
  middleware: ['initAuth', 'auth'],
  data () {
    return {
      isCollapse: false,
      route: '',
      windowWidth: '',
      mobileSize: false
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters['pages/getLoading']
    },
    currentPath () {
      return this.$nuxt.$route.fullPath
    }
  },
  watch: {
    currentPath () {
      this.middlewareRouter()
    },
    windowWidth () {
      if (this.windowWidth < 500) {
        this.mobileSize = true
      }
    }
  },
  mounted () {
    this.fetchCurrentUser()
    this.middlewareRouter()
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
      // eslint-disable-next-line no-console
      console.log('windowWidth: ' + window.innerWidth)
    })
  },
  methods: {
    async fetchCurrentUser () {
      // eslint-disable-next-line no-console
      this.$store.commit('pages/setLoading', true)
      try {
        const res = await currentUser()
        const user = res.data.data || {}
        this.$store.commit('user/setCurrentUser', user)
        this.$store.commit('pages/setLoading', false)
      } catch (e) {
        this.$this.commit('pages/setLoading', false)
      }
    },
    handleChangeTypeMenu (value) {
      this.isCollapse = value
    },
    middlewareRouter () {
      for (let index = 0; index < this.menus.length; index++) {
        const element = this.menus[index]
        if (element.link === this.$nuxt.$route.fullPath) {
          this.route = element
        }
      }
      if (this.route.role !== this.$store.getters['user/getCurrentUser'].role) {
        if (this.$store.getters['user/getCurrentUser'].role === 'STAFF' && this.route.role === '') {
          this.$router.push('/404')
        }
      }
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

@media only screen and (max-width: 500px) {
    .right-bar {
      display: none;
    }
    .main-content-container {
      transition: margin-left 0.25s;
      margin-left: 0px;
    }
    .marginOff {
      margin-left: 0px !important;
      transition: margin-left 0.5s;
    }
}

</style>

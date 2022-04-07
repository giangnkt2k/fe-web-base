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
      <el-submenu v-if="currentUser.role !== 'ADMIN' && currentUser.role !== 'QAM'" index="4">
        <template slot="title">
          <el-badge :value="newest" :hidden="newest === 0" class="item-badge">
            <i class="el-icon-bell" />
          </el-badge>
        </template>
        <el-menu-item v-for="(item, index) in listNotifications" :key="index" :index="'noti'+index" @click="goingToIdea(item.id_idea, item.id)">
          <nuxt-link
            :to="'/idea/view-idea/'+ item.id_idea "
            exact
            class="menu-item-link"
          >
            <div v-if="item.type === 'NEW_LIKE_IDEA_NOTIFICATION'">
              <span class="text-green-500">
                <i class="el-icon-caret-top" style="color: green" />
              </span>
              <span :class="{'text-black': !item.is_read}"> {{ item.whom }} liked idea {{ item.idea_title }}</span>
              <span class="text-slate-400">{{ item.time }}</span>
            </div>
            <div v-if="item.type === 'NEW_IDEA_NOTIFICATION'">
              <span class="text-indigo-500">
                <i class="el-icon-postcard" style="color: pink" />
              </span>
              <span :class="{'text-black': !item.is_read}"> {{ item.whom }} posted idea {{ item.idea_title }}</span>
              <span class="text-slate-400">{{ item.time }}</span>
            </div>
            <div v-if="item.type === 'NEW_COMMENT_NOTIFICATION'">
              <span class="text-sky-500">
                <i class="el-icon-chat-dot-round" style="color: blue" />
              </span>
              <span :class="{'text-black': !item.is_read}"> {{ item.whom }} commented idea {{ item.idea_title }}</span>
              <span class="text-slate-400">{{ item.time }}</span>
            </div>
            <div v-if="item.type === 'NEW_DISLIKE_IDEA_NOTIFICATION'">
              <span class="text-rose-500">
                <i class="el-icon-caret-top" style="color: red" />
              </span>
              <span :class="{'text-black': !item.is_read}"> {{ item.whom }} disliked idea {{ item.idea_title }}</span>
              <span class="text-slate-400">{{ item.time }}</span>
            </div>
          </nuxt-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import moment from 'moment'
import menuMixin from '~/mixins/menu.js'
import * as noti from '@/api/noti.js'
export default {
  mixins: [menuMixin],
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      isCollapse: false,
      listNotifications: ['hahaha'],
      newest: ''
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
      this.changeTypeMenu()
    }
  },
  mounted () {
    this.getNoti()
  },
  methods: {
    async getNoti () {
      try {
        const res = await noti.list()
        this.newest = res.data.filter.newest
        const data = res.data.data
        const noties = []
        data.length > 0 && data.map((item) => {
          const noti = {
            time: moment(item.created_at).fromNow(),
            type: item.type_noti,
            whom: item.user.full_name,
            is_read: item.is_read,
            id_idea: item.idea_id,
            idea_title: item.idea.title,
            id: item.id
          }
          noties.push(noti)
          return noties
        })
        this.listNotifications = noties
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
      }
    },
    handleSelect (key, keyPath) {
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
    async goingToIdea (item, ideaId) {
      try {
        await noti.update({ id: ideaId })
        this.getNoti()
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
      }
    },
    logout () {
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
::v-deep .el-badge__content.is-fixed {
  top: 20px !important;
  right: 20px !important;
}
.item-badge {
  margin-right: 10px
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

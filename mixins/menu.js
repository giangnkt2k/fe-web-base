import AdminMenu from '~/utils/menu.js'
// import QAMMenu from '~/utils/menuQAM.js'
export default {
  computed: {
    menus () {
      const defaultMenu = AdminMenu
      const roleNames = this.$store.getters['user/getCurrentUserRoleNames']
      return defaultMenu.filter(e => e.role.includes(roleNames))
    }
  }
}

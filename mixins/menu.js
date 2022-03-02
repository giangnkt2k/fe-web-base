import AdminMenu from '~/utils/menu.js'
// import QAMMenu from '~/utils/menuQAM.js'
export default {
  computed: {
    menus () {
      const defaultMenu = AdminMenu
      const roleNames = this.$store.getters['user/getCurrentUserRoleNames']
      if (roleNames === 'STAFF') {
        return defaultMenu.filter((e) => {
          return e.role === 'STAFF'
        })
      } else {
        return defaultMenu.filter((e) => {
          return (roleNames === e.role || e.role === '')
        })
      }
    }
  }
}

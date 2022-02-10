import axios from '@/utils/axios'
export default {
  methods: {
    initToken () {
      const token = this.$store.getters['auth/getToken']
      if (token) {
        axios.defaults.headers.common.Authorization = 'Bearer ' + token
      }
    }
  }
}

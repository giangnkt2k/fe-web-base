import { Line } from 'vue-chartjs'
import * as dashboard from '@/api/dashboard.js'

export default {
  extends: Line,
  props: {
    department: {
      require: true,
      type: Number
    }
  },
  mounted () {
    this.fetchData()
  },
  watch: {
    department () {
      this.fetchData()
    }
  },
  methods: {
    async fetchData () {
      try {
        if (this.department !== '') {
          this.$store.commit('pages/setLoading', true)
          const res = await dashboard.statsUser({
            department_id: this.department
          })
          const data = res.data.data
          const lineChartData = {
            labels: data.users_name,
            datasets: [
              {
                label: 'Interactive',
                data: data.users_interactive,
                backgroundColor: '#294fc2',
                borderColor: '#3cba9f',
                tension: 0.1,
                fill: false
              }
            ]
          }
          this.renderChart(lineChartData, this.options)

          // eslint-disable-next-line no-console
          this.$store.commit('pages/setLoading', false)
        }
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    }
  }
}

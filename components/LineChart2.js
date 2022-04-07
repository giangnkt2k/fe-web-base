import { Line } from 'vue-chartjs'
import * as dashboard from '@/api/dashboard.js'

export default {
  extends: Line,
  props: {
    aca_year_id: {
      require: true,
      type: Number
    }
  },
  mounted () {
    this.fetchData()
  },
  watch: {
    aca_year_id () {
      this.fetchData()
    }
  },
  methods: {
    async fetchData () {
      try {
        if (this.aca_year_id !== '') {
          this.$store.commit('pages/setLoading', true)
          const res = await dashboard.ideaByDay({
            aca_year_id: this.aca_year_id
          })
          const data = res.data.data
          const lineChartData = {
            labels: data.days,
            datasets: [
              {
                label: 'ideas',
                data: data.count_idea,
                backgroundColor: '#4287f5',
                borderColor: '#4287f5',
                tension: 0.1,
                fill: false,
                pointStyle: 'circle',
                pointRadius: 10,
                pointHoverRadius: 15
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

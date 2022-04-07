import { Bar } from 'vue-chartjs'
import * as dashboard from '@/api/dashboard.js'

export default {
  extends: Bar,
  props: ['data', 'options'],
  async mounted () {
    try {
      this.$store.commit('pages/setLoading', true)
      const res = await dashboard.statsIdea()
      const data = res.data.data
      const newTitle = []
      data.title.length > 0 && data.title.map((tt) => {
        const newT = tt.slice(0, 8)
        return newTitle.push(newT)
      })
      const barChartData = {
        labels: newTitle,
        datasets: [
          {
            label: 'Like',
            data: data.like_count,
            backgroundColor: '#294fc2',
            borderColor: '#294fc2',
            borderWidth: 2
          },
          {
            label: 'Dislike',
            data: data.dislike_count,
            backgroundColor: '#c28729',
            borderColor: '#c28729',
            borderWidth: 2
          },
          {
            label: 'View',
            data: data.view_count,
            backgroundColor: 'rgba(20, 255, 0, 0.3)',
            borderColor: 'rgba(100, 255, 0, 1)',
            borderWidth: 2
          },
          {
            label: 'Comment',
            data: data.comment_count,
            backgroundColor: '#b829c2',
            borderColor: '#b829c2',
            borderWidth: 2
          }
        ]
      }
      this.renderChart(barChartData, this.options)

      // eslint-disable-next-line no-console
      this.$store.commit('pages/setLoading', false)
    } catch (e) {
      this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
      this.$store.commit('pages/setLoading', false)
    }
  }
}

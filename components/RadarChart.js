import { Radar } from 'vue-chartjs'
import * as dashboard from '@/api/dashboard.js'

export default {
  extends: Radar,
  props: {
    user: {
      require: true,
      type: Number
    }
  },
  mounted () {
    this.fetchData()
  },
  watch: {
    user () {
      this.fetchData()
    }
  },
  methods: {
    async fetchData () {
      try {
        if (this.department !== '') {
          this.$store.commit('pages/setLoading', true)
          const res = await dashboard.statsStatisicUser({
            id: this.user
          })
          const data = res.data.data

          const power = [data.like_count, data.dislike_count, data.comment_count, data.post_idea_count, data.view_count]

          const lineChartData = {
            labels: ['Like', 'Dislike', 'Comment', 'Post idea', 'View idea'],
            datasets: [
              {
                label: 'count',
                data: power,
                backgroundColor: '#cf03fc',
                borderWidth: 2
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

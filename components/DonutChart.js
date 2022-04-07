import { Pie } from 'vue-chartjs'
import * as dashboard from '@/api/dashboard.js'

export default {
  extends: Pie,
  props: ['data', 'options'],
  async mounted () {
    try {
      this.$store.commit('pages/setLoading', true)
      const res = await dashboard.statsIdeaByCategory()
      const data = res.data.data
      const newTitle = []
      const listDataSet = []
      const listColor = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index]
        // const dataSet = {
        //   label: element.category_name,
        //   data: element.number_idea,
        //   backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        //   borderWidth: 2
        // }
        newTitle.push(element.category_name)
        listDataSet.push(element.number_idea)
        listColor.push('#' + Math.floor(Math.random() * 16777215).toString(16))
      }
      const barChartData = {
        labels: newTitle,
        datasets: [{
          label: 'newTitle',
          data: listDataSet,
          backgroundColor: listColor,
          borderWidth: 2
        }
        ]
      }
      // eslint-disable-next-line no-console
      console.log('barChartData', barChartData)
      this.renderChart(barChartData, this.options)

      // eslint-disable-next-line no-console
      this.$store.commit('pages/setLoading', false)
    } catch (e) {
      this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
      this.$store.commit('pages/setLoading', false)
    }
  }
}

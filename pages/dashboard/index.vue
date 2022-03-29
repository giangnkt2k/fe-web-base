<template>
  <div>
    <div class="md:container md:mx-auto pt-6 px-6 md:px-2">
      <div class="block mb-8 grid grid-cols-3 gap-4 items-center">
        <el-card shadow="hover" class="col-start-1 col-end-4 md:col-end-2">
          <div class="flex flex-row items-center">
            <div class="icon-div mr-2">
              <i class="el-icon-s-opportunity text-3xl text-yellow-400" />
            </div>
            <div class="content-card">
              <span>Number of idesa: {{ overview.total_idea }}</span>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="col-start-1 col-end-4 md:col-start-2 md:col-end-3">
          <div class="flex flex-row items-center">
            <div class="icon-div mr-2">
              <i class="el-icon-s-custom text-3xl text-purple-500" />
            </div>
            <div class="content-card">
              <span>Number of users: {{ overview.total_user }}</span>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="col-start-1 col-end-4 md:col-start-3">
          <div class="flex flex-row items-center">
            <div class="icon-div mr-2">
              <i class="el-icon-s-comment text-3xl text-blue-500" />
            </div>
            <div class="content-card">
              <span>Number of interactives: {{ overview.total_interactive }}</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="block mb-8 grid grid-cols-2 gap-4 items-center items-baseline">
        <div class="col-start-1 md:col-end-1 col-end-3">
          <el-card shadow="hover">
            <div class="block my-5">
              <el-select v-model="user_id" placeholder="Select user">
                <el-option
                  v-for="item in userList"
                  :key="item.id"
                  :label="item.full_name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div class="text-current text-2xl text-center font-medium">
              Statistic of users
            </div>
            <RadarChart :user="user_id" :options="lineChartOptions" :height="400" />
          </el-card>
        </div>
        <div class="md:col-start-2 md:col-end-2 col-start-1 col-end-3">
          <el-card shadow="hover">
            <div class="block my-5">
              <el-select v-model="department_id" placeholder="Select department">
                <el-option
                  v-for="item in departmentList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div class="text-current text-2xl text-center font-medium">
              Interactive of users
            </div>
            <LineChart :department="department_id" :options="lineChartOptions" :height="400" />
          </el-card>
        </div>
      </div>
      <div class="block mb-8 grid grid-cols-2 gap-4 items-center items-baseline">
        <div class="col-start-1 md:col-end-1 col-end-3">
          <el-card shadow="hover">
            <div />
            <DonutChart v-if="barChartData !== {}" :data="barChartData" :options="pieOprions" :height="400" />
          </el-card>
        </div>
        <div class="md:col-start-2 md:col-end-2 col-start-1 col-end-3">
          <el-card shadow="hover">
            <BarChart v-if="barChartData !== {}" :data="barChartData" :options="barChartOptions" :height="400" />
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.js'
import LineChart from '@/components/LineChart.js'
import RadarChart from '@/components/RadarChart.js'
import DonutChart from '@/components/DonutChart.js'
import * as dashboard from '@/api/dashboard.js'

export default {
  name: 'DashBoard',
  components: {
    BarChart,
    LineChart,
    DonutChart,
    RadarChart
  },
  data () {
    return {
      barChartData: {},
      barChartOptions: {
        responsive: true,
        legend: {
          display: 'top'
        },
        title: {
          display: true,
          text: 'All idea',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 7,
                min: 0,
                stepSize: 1
              },
              gridLines: {
                display: true
              }
            }
          ]
        }
      },
      pieOprions: {
        responsive: true,
        legend: {
          display: 'top'
        },
        title: {
          display: true,
          text: 'Ideas in Category',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        }
      },
      lineChartOptions: {
        responsive: true,
        legend: {
          display: 'top'
        },
        title: {
          display: true,
          text: 'Interactive of users',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 7,
                min: 0,
                stepSize: 1
              },
              gridLines: {
                display: true
              }
            }
          ]
        }
      },
      departmentList: [],
      userList: [],
      department_id: '',
      user_id: '',
      overview: {
        total_user: '',
        total_idea: '',
        total_interactive: ''
      }
    }
  },
  created () {
    this.getDepartment()
    this.getCurrent()
    this.getUserList()
  },
  methods: {
    async getUserList () {
      try {
        const users = await dashboard.userList()
        // eslint-disable-next-line no-console
        this.userList = users.data.data
        // eslint-disable-next-line no-console
        console.log('users', this.departmentList)
      } catch (e) {
        this.$notify({
          title: 'Error',
          message: e.response.data.status_code + ' ' + e.response.data.message,
          type: 'error'
        })
      }
    },
    async getDepartment () {
      try {
        const department = await dashboard.departmentList()
        // eslint-disable-next-line no-console
        this.departmentList = department.data.data
        // eslint-disable-next-line no-console
        console.log('depart', this.departmentList)
      } catch (e) {
        this.$notify({
          title: 'Error',
          message: e.response.data.status_code + ' ' + e.response.data.message,
          type: 'error'
        })
      }
    },
    async getCurrent () {
      try {
        const res = await dashboard.statsOverview()
        const data = res.data.data
        this.overview.total_user = data.total_user
        this.overview.total_idea = data.total_idea
        this.overview.total_interactive = data.total_interactive
      } catch (e) {
        this.$notify({
          title: 'Error',
          message: e.response.data.status_code + ' ' + e.response.data.message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 100px;
  color: #2E495E;
  letter-spacing: 1px;
  font-size: 6em;
}
.green {
  color: #00C48D;
}

.subtitle {
  font-weight: 300;
  font-size: 1em;
  color: #2E495E;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

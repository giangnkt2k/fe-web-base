<template>
  <div>
    <div class="md:container md:mx-auto pt-6 px-6 md:px-2">
      <div class="block mb-8 grid grid-cols-6 gap-4">
        <div class="col-start-1 col-end-9  md:col-end-3  flex flex-col">
          <!-- filter  -->
          <div class="block-item">
            <el-carousel height="300px">
              <el-carousel-item v-for="item in slides" :key="item">
                <img :src="item">
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- timeLine -->
          <div class="block-item">
            <el-card class="box-card">
              <div class="block my-3">
                <div class="block mb-2 " style="color: #304156">
                  {{ aca_name }}
                </div>
                <el-timeline>
                  <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :icon="activity.icon"
                    :type="activity.type"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.timestamp"
                  >
                    {{ activity.content }}
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-card>
          </div>
        </div>
        <!-- main content -->
        <div class="main-content col-start-1 md:col-start-3 col-end-9">
          <el-card v-if="$store.getters['user/getCurrentUser'].role === 'QAM'" shadow="always" class="mb-5">
            <div class="grid grid-cols-3 gap-4 items-center">
              <el-select v-model="academic_year" style="width: 100%;" class="mr-5 col-start-1 col-end-4  md:col-end-2" clearable placeholder="Select academic year">
                <el-option
                  v-for="(item, index) in optionsAcademicYear"
                  :key="index"
                  :label="item.title"
                  :value="item.id"
                />
              </el-select>
              <el-button :disabled="academic_year === ''" type="success" icon="el-icon-receiving" class="col-start-1 col-end-3 md:col-start-2 col-end-2" @click="downloadCSV">
                Export CSV
              </el-button>
              <el-button :disabled="academic_year === ''" type="success" icon="el-icon-s-management" class="col-start-1 col-end-3 md:col-start-3 col-end-3" @click="downloadZip">
                Export Zip
              </el-button>
            </div>
          </el-card>
          <el-card shadow="always" class="mb-5">
            <div class="grid grid-cols-3 gap-4 items-center">
              <el-select v-model="searchKey" style="width: 100%;" class="mr-5 col-start-1 col-end-4  md:col-end-2" clearable placeholder="Select key to sort">
                <el-option
                  v-for="(item, index) in optionsSearchKey"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-radio-group v-model="radio_choice" :disabled="searchKey === ''" class="col-start-1 col-end-3 md:col-start-2 col-end-3">
                <el-radio label="_desc">
                  Decrease
                </el-radio>
                <el-radio label="_asc">
                  Ascending
                </el-radio>
              </el-radio-group>
            </div>
          </el-card>
          <el-card v-for="(item, index) in listData" :key="index" shadow="always" class="item-idea flex flex-row">
            <a href="#" class="flex mr-5">
              <el-image
                style="width: 100px; height: 100px;"
                :src="item.thumbnail_url"
                fit="fit"
                class="avatar"
              />
            </a>
            <div class="post-feed-item__info">
              <div class="post-meta--inline">
                <div class="mr-5">
                  <p class="text-cyan-500" style="color: green">
                    {{ item.user }}
                  </p>
                </div>
                <div class="post-meta d-inline-flex align-items-center flex-wrap">
                  <div class="text-muted mr-0">
                    <span> {{ item.created_at }}</span>
                  </div>
                </div>
              </div>
              <div class="post-title--inline">
                <span @click="viewIdea(item.id)"><h3 class="word-break mr-5 font-semibold">
                  {{ item.title }}
                </h3></span>
                <div class="tags">
                  <el-tag type="info" size="mini">
                    {{ item.category.name }}
                  </el-tag>
                </div>
              </div>
              <div class="d-flex footer-post-item">
                <div class="starts">
                  <span class="stats-item text-muted mr-2">
                    <i class="el-icon-view" />
                    <span>{{ item.views_count }}</span>
                  </span>
                  <span class="stats-item text-muted mr-2">
                    <!-- <font-awesome-icon icon="fa-solid fa-thumbs-up" /> -->
                    <i class="el-icon-caret-top" />
                    <span>{{ item.likes_count }}</span>
                  </span>
                  <span class="stats-item text-muted mr-2">
                    <!-- <font-awesome-icon icon="fa-solid fa-thumbs-down" /> -->
                    <i class="el-icon-caret-bottom" />
                    <span>{{ item.dislikes_count }}</span>
                  </span>
                  <span class="stats-item text-muted mr-2">
                    <i
                      class="el-icon-chat-line-square"
                    />
                    <span>{{ item.comments_count }}</span>
                  </span>
                </div>
              </div>
            </div>
          </el-card>
          <div>
            <el-pagination
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next"
              :total="totalItems"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import * as idea from '@/api/idea.js'

export default {
  name: 'IndexPage',
  data () {
    return {
      slides: ['https://greenwich.edu.vn/wp-content/uploads/2021/01/banner-2.jpg',
        'https://vtv1.mediacdn.vn/thumb_w/500/2021/7/25/da-nang-2-1627212353368273813312.jpg',
        'https://greenwich.edu.vn/wp-content/uploads/2020/06/xet-tuyen-dai-hoc-fpt-greenwich.jpg'],
      activities: [{
        content: 'Start date',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: 'First closure date',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: 'Final closure date',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: 'End date',
        timestamp: '2018-04-03 20:46'
      }],
      aca_name: '',
      radio_choice: '',
      searchKey: '',
      academic_year: '',
      optionsSearchKey: [
        {
          value: 'like',
          label: 'Like'
        }, {
          value: 'dislike',
          label: 'Dislike'
        }, {
          value: 'view',
          label: 'View'
        }, {
          value: 'created',
          label: 'Created'
        }
      ],
      optionsAcademicYear: [],
      currentPage: 1,
      pageSizes: [10, 50, 100],
      pageSize: 10,
      totalItems: 1,
      valueSort: '',
      listData: [],
      res: {},
      currentUser: {}
    }
  },
  watch: {
    searchKey () {
      if (this.searchKey === '') {
        this.radio_choice = ''
      } else {
        this.valueSort = this.searchKey + this.radio_choice
        // eslint-disable-next-line no-console
        this.fetchData(this.valueSort)
      }
    },
    radio_choice () {
      this.valueSort = this.searchKey + this.radio_choice
      // eslint-disable-next-line no-console
      this.fetchData(this.valueSort, this.academic_year)
    },
    academic_year () {
      this.fetchData(this.valueSort, this.academic_year)
    }
  },
  created () {
    this.fetchData()
    this.fetchAcadeicYear()
    this.getCurrnetAcadeicYear()
  },
  methods: {
    fetchData (order, academicYear) {
      setTimeout(async () => {
        try {
          const query = {
            page: this.currentPage,
            limit: this.pageSize,
            order_by: order,
            aca_year_id: academicYear
          }
          if (query.order_by === '') {
            delete query.order_by
          }
          if (query.limit === '') {
            delete query.limit
          }
          if (query.page === '') {
            delete query.page
          }
          if (query.aca_year_id === '') {
            delete query.aca_year_id
          }
          this.$store.commit('pages/setLoading', true)

          const role = this.$store.getters['user/getCurrentUser'].role

          if (role === 'STAFF') {
            this.res = await idea.getAll(query)
          } else {
            this.res = await idea.advGetAll(query)
          }
          const formatData = []
          this.res.data.data.length > 0 && this.res.data.data.map((item) => {
            const rowData = {
              ...item,
              created_at: moment(item.created_at).fromNow(),
              user: item.user === null ? 'Anonymous' : item.user.full_name
            }
            return formatData.push(rowData)
          })
          this.listData.user = this.listData.user === null ? 'Anonymous' : this.listData.user
          this.listData = formatData
          this.currentPage = this.res.data.paging.page
          this.pageSize = this.res.data.paging.limit
          this.totalItems = this.res.data.paging.total
          this.$store.commit('pages/setLoading', false)
        } catch (e) {
          this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
          this.$store.commit('pages/setLoading', false)
        }
      }, 500)
    },
    fetchAcadeicYear () {
      setTimeout(async () => {
        try {
          if (this.$store.getters['user/getCurrentUser'].role === 'QAM') {
            const res = await idea.listQamAcademic()
            this.optionsAcademicYear = res.data.data
          }
        } catch (e) {
        // eslint-disable-next-line no-console
          console.log(e)
        }
      }, 500)
    },
    async getCurrnetAcadeicYear () {
      try {
        const res = await idea.getCurrentAca()
        const data = res.data.data
        // eslint-disable-next-line no-console
        console.log('acaca', data)
        this.aca_name = data.title
        this.activities = [{
          content: 'Start date',
          timestamp: data.start_date.moment().format('MMM Do YY'),
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: 'First closure date',
          timestamp: data.first_closure_date.moment().format('MMM Do YY'),
          color: '#0bbd87'
        }, {
          content: 'Final closure date',
          timestamp: data.final_closure_date.moment().format('MMM Do YY'),
          size: 'large'
        }, {
          content: 'End date',
          timestamp: data.end_date.moment().format('MMM Do YY')
        }]
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.fetchData()
    },
    viewIdea (id) {
      this.$router.push('/idea/view-idea/' + id)
    },
    downloadCSV () {
      try {
        window.open('https://groupbar.me/api/v1/qam/export-ideas?aca_year_id=' + this.academic_year)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    downloadZip () {
      try {
        window.open('https://groupbar.me/api/v1/qam/export-docs?aca_year_id=' + this.academic_year)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
.item-idea {
  margin-bottom: 10px;
}
::v-deep .el-card__body {
  display: flex !important;
  align-items: flex-start;
  padding: 0.5rem;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.block-item {
  margin-bottom: 20px;
}
.post-meta--inline {
  display: flex;
  flex-wrap: wrap;
  font-size: .8rem;
  margin-bottom: 0.25rem;
  align-items: center;
}
.font-semibold:hover {
  color: rgb(25, 28, 218);
}
.text-muted {
  color: #9b9b9b!important;
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.6;
}
</style>

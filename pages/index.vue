<template>
  <div>
    <div class="md:container md:mx-auto pt-6 px-6 md:px-2">
      <div class="block mb-8 grid grid-cols-6 gap-4 items-cente">
        <div class="col-start-1 col-end-9  md:col-end-2  flex flex-col">
          <!-- filter  -->
          <div class="block-item">
            <el-card class="box-card">
              <el-carousel height="150px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3 class="small">
                    {{ item }}
                  </h3>
                </el-carousel-item>
              </el-carousel>
            </el-card>
          </div>
          <!-- timeLine -->
          <div class="block-item">
            <el-card class="box-card">
              <div class="block">
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
        <div class="main-content col-start-1 md:col-start-2 col-end-9">
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
          <el-card shadow="always" class="item-idea flex flex-row">
            <a href="#" class="flex mr-5">
              <el-image
                style="width: 100px; height: 100px;"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fit"
                class="avatar"
              />
            </a>
            <div class="post-feed-item__info">
              <div class="post-meta--inline">
                <div class="mr-5">
                  <span>GiangNKT</span>
                </div>
                <div class="post-meta d-inline-flex align-items-center flex-wrap">
                  <div class="text-muted mr-0">
                    <span> 5mins ago</span>
                  </div>
                </div>
              </div>
              <div class="post-title--inline">
                <a href="#"><h3 class="word-break mr-5 font-semibold">
                  Day la title
                </h3></a>
                <div class="tags">
                  <el-tag type="info" size="mini">
                    Đẹp trai
                  </el-tag>
                  <el-tag type="info" size="mini">
                    Hay ho
                  </el-tag>
                  <el-tag type="info" size="mini">
                    Kì cục
                  </el-tag>
                </div>
              </div>
              <div class="d-flex footer-post-item">
                <div class="starts">
                  <span class="stats-item text-muted">
                    <i class="el-icon-view" />
                    <span>2</span>
                  </span>
                  <span class="stats-item text-muted">
                    <font-awesome-icon icon="fa-solid fa-thumbs-up" />
                    <span>2</span>
                  </span>
                  <span class="stats-item text-muted">
                    <font-awesome-icon icon="fa-solid fa-thumbs-down" />
                    <span>2</span>
                  </span>
                  <span class="stats-item text-muted">
                    <i
                      class="el-icon-chat-line-square"
                    />
                    <span>2</span>
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
export default {
  name: 'IndexPage',
  data () {
    return {
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
      radio_choice: '',
      searchKey: '',
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
      currentPage: 1,
      pageSizes: [10, 50, 100],
      pageSize: 10,
      totalItems: 1
    }
  },
  watch: {
    searchKey () {
      if (this.searchKey === '') {
        this.radio_choice = ''
      }
    },
    radio_choice () {
      const valueSort = this.searchKey + this.radio_choice
      // eslint-disable-next-line no-console
      console.log('calue', valueSort)
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

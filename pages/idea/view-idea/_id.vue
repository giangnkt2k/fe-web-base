<template>
  <div>
    <div class="md:container md:mx-auto pt-6 px-6 md:px-2">
      <div class="block mb-8 grid grid-cols-6 gap-4">
        <!-- main content -->
        <div class="main-content col-start-1 md:col-end-6 col-end-9">
          <el-card shadow="always" class="item-idea">
            <div class="header">
              <span class="text-md text-muted mr-5">Author: <span class="italic ml-1">{{ formData.user }}</span></span>
              <span class="text-md text-muted mr-5">{{ formData.created_at }}</span>
              <span class="stats-item text-muted mr-2">
                <i class="el-icon-view" />
                <span>{{ formData.views_count }}</span>
              </span>
            </div>
            <div class="title my-8 text-xl antialiased font-semibold">
              {{ formData.title }}
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="content" />
            <div class="btn-rate flex flex-row mt-8">
              <div class="like-zone mr-2">
                <el-button
                  v-if="clicked_like"
                  size="mini"
                  type="success"
                  icon="el-icon-caret-top"
                  circle
                  class="mr-1"
                  @click="handleClickLike"
                />
                <el-button
                  v-else
                  size="mini"
                  type="infor"
                  icon="el-icon-caret-top"
                  class="mr-1"
                  circle
                  @click="handleClickLike"
                />
                {{ formData.likes_count }}
              </div>
              <div class="dislike-zone">
                <el-button
                  v-if="clicked_dislike"
                  size="mini"
                  type="danger"
                  class="mr-1 ml-2"
                  icon="el-icon-caret-bottom"
                  circle
                  @click="handleClickDislike"
                />

                <el-button
                  v-else
                  size="mini"
                  type="infor"
                  class="mr-1 ml-2"
                  icon="el-icon-caret-bottom"
                  circle
                  @click="handleClickDislike"
                />
                {{ formData.dislikes_count }}
              </div>
            </div>
          </el-card>
          <el-card shadow="always" class="item-idea">
            <div slot="header" class="clearfix">
              <span class="text-xs">Comment({{ formData.comments_count }})</span>
            </div>
            <el-input
              v-model="comment"
              type="textarea"
              :rows="2"
              placeholder="Please comment"
            />
            <el-switch
              v-model="is_anonymous_cmt"
              class="mt-6"
              style="float: left;"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Anonymous"
            />
            <el-button
              :disabled="comment === ''"
              class="my-5 mr-2"
              type="primary"
              icon="el-icon-message"
              size="mini"
              style="float: right;"
              @click="handleSendComment"
            />
            <div class="list-comment">
              <div v-for="(item, index) in commentList" :key="index">
                <div class="item-comment my-3">
                  <div class="item-comment-infor text-muted">
                    <span v-if="item.is_anonymous !== true" class="text-md mr-2 text-sky-600"> {{ item.user.full_name }}</span>
                    <span v-if="item.is_anonymous === true" class="text-md mr-2 text-sky-900">Anonymous</span>
                    <span class="tex-xs"> {{ item.created_at }} </span>
                    <el-button v-if="item.user.id === currentUser_id" type="mini" style="float: right;" icon="el-icon-delete" circle />
                  </div>
                  <div class="item-comment-content" style="border-bottom: 1px solid #b6b4b4;">
                    <span class="text-base"> {{ item.content }} </span>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div class="col-start-1 col-end-9  md:col-start-6  flex flex-col">
          <!-- filter  -->
          <div class="block-item mb-5">
            <el-carousel height="150px">
              <el-carousel-item v-for="item in slides" :key="item">
                <img :src="item">
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- timeLine -->
          <div class="block-item">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="text-xs">List idea same category</span>
              </div>
              <div v-for="(item, index) in listData" :key="index" class="item-idea flex flex-row" style="border-bottom: 1px solid #e5e7eb">
                <div class="post-feed-item__info">
                  <div class="post-meta--inline">
                    <div class="mr-5 text-xs">
                      <span>{{ item.user }}</span>
                    </div>
                    <div class="post-meta d-inline-flex align-items-center flex-wrap">
                      <div class="text-muted mr-0 text-xs">
                        <span> {{ item.created_at }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="post-title--inline">
                    <a href="#" @click="viewIdea(item.id)"><h3 class="word-break mr-5 font-semibold text-sm">
                      {{ item.title }}
                    </h3></a>
                    <div class="tags">
                      <el-tag type="info" size="mini text-xs">
                        {{ item.category.name }}
                      </el-tag>
                    </div>
                  </div>
                  <div class="d-flex footer-post-item">
                    <div class="starts">
                      <span class="stats-item text-muted mr-2">
                        <i class="el-icon-view" />
                        <span class="text-xs">{{ item.views_count }}</span>
                      </span>
                      <span class="stats-item text-muted mr-2">
                        <!-- <font-awesome-icon icon="fa-solid fa-thumbs-up" /> -->
                        <i class="el-icon-success" />
                        <span class="text-xs">{{ item.likes_count }}</span>
                      </span>
                      <span class="stats-item text-muted mr-2">
                        <!-- <font-awesome-icon icon="fa-solid fa-thumbs-down" /> -->
                        <i class="el-icon-error" />
                        <span class="text-xs">{{ item.dislikes_count }}</span>
                      </span>
                      <span class="stats-item text-muted mr-2">
                        <i
                          class="el-icon-chat-line-square"
                        />
                        <span class="text-xs">{{ item.comments_count }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
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
  name: 'ViewPage',
  data () {
    return {
      slides: ['https://greenwich.edu.vn/wp-content/uploads/2021/01/banner-2.jpg',
        'https://vtv1.mediacdn.vn/thumb_w/1000/2021/7/25/da-nang-2-1627212353368273813312.jpg',
        'https://greenwich.edu.vn/wp-content/uploads/2020/06/xet-tuyen-dai-hoc-fpt-greenwich.jpg'],
      listData: [],
      content: '',
      formData: {
        title: '',
        created_at: '',
        category: '',
        user: '',
        views_count: '',
        likes_count: '',
        dislikes_count: ''
      },
      clicked_like: false,
      clicked_dislike: false,
      comment: '',
      commentList: [],
      statusRegression: 0,
      currentUser_id: '',
      is_anonymous_cmt: false
    }
  },
  created () {
    this.getDetail()
    // eslint-disable-next-line no-console
    console.log('Created', this.$route.params.id)
  },
  methods: {
    async getDetail () {
      try {
        this.$store.commit('pages/setLoading', true)
        let res = {}
        const role = this.$store.getters['user/getCurrentUser'].role

        if (role === 'STAFF') {
          res = await idea.details(this.$route.params.id)
        } else {
          res = await idea.advDetails(this.$route.params.id)
        }
        const dataDetail = res.data.data
        this.formData.created_at = moment(dataDetail.created_at).fromNow()
        this.formData.user = dataDetail.user === null ? 'Anonymous' : dataDetail.user.full_name
        this.formData.title = dataDetail.title
        this.formData.views_count = dataDetail.views_count
        this.formData.likes_count = dataDetail.likes_count
        this.formData.dislikes_count = dataDetail.dislikes_count
        this.formData.comments_count = dataDetail.comments_count
        this.content = dataDetail.content
        this.currentUser_id = this.$store.getters['user/getCurrentUser'].id
        this.getListByCategory(res.data.data.category_id)
        this.getComment()
        this.handleUserAction()
        this.$store.commit('pages/setLoading', false)
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    async handleUserAction () {
      try {
        const currentUser = this.currentUser_id
        const res = await idea.getUserLikeIdea(this.$route.params.id)
        // eslint-disable-next-line no-console
        console.log('res', res.data.data) // eslint-disable-next-line no-console
        console.log('currentUser', this.$store.getters['user/getCurrentUser'])
        const haveLike = res.data.data.filter(e => e.userId === currentUser)
        if (haveLike.length > 0) {
          this.clicked_like = true
        } else {
          try {
            const res = await idea.getUserDisLikeIdea(this.$route.params.id)
            const haveDisLike = res.data.data.filter(e => e.userId === currentUser)
            if (haveDisLike.length > 0) {
              this.clicked_dislike = true
            }
          } catch (e) {
            this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
            this.$store.commit('pages/setLoading', false)
          }
        }
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    async getListByCategory (category) {
      try {
        let res = {}
        const role = this.$store.getters['user/getCurrentUser'].role

        if (role === 'STAFF') {
          res = await idea.getAll({
            category_id: category
          })
        } else {
          res = await idea.advGetAll({
            category_id: category
          })
        }
        const formatData = []
        res.data.data.length > 0 && res.data.data.map((item) => {
          const rowData = {
            ...item,
            created_at: moment(item.created_at).fromNow(),
            user: item.user === null ? 'Anonymous' : item.user.full_name
          }
          return formatData.push(rowData)
        })
        this.listData = formatData
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    viewIdea (id) {
      this.$router.push('/idea/view-idea/' + id)
    },
    async  handleClickLike () {
      if (this.clicked_dislike === true) {
        this.clicked_dislike = false
        this.formData.dislikes_count -= 1
      }
      if (this.clicked_like === false) {
        try {
          await idea.likeIdea(this.$route.params.id)
          this.formData.likes_count += 1
        } catch (e) {
          this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        }
      } else {
        try {
          await idea.returnLikeIdea(this.$route.params.id)
          this.formData.likes_count -= 1
        } catch (e) {
          this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        }
      }
      this.clicked_like = !this.clicked_like
    },
    async handleClickDislike () {
      if (this.clicked_like === true) {
        this.clicked_like = false
        this.formData.likes_count -= 1
      }
      if (this.clicked_dislike === false) {
        try {
          await idea.disLikeIdea(this.$route.params.id)
          this.formData.dislikes_count += 1
        } catch (e) {
          this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        }
      } else {
        try {
          await idea.returnDislikeIdea(this.$route.params.id)
          this.formData.dislikes_count -= 1
        } catch (e) {
          this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        }
      }
      this.clicked_dislike = !this.clicked_dislike
    },
    async getComment () {
      try {
        let res = {}
        const role = this.$store.getters['user/getCurrentUser'].role

        if (role === 'STAFF') {
          res = await idea.getListComment(this.$route.params.id)
        } else {
          res = await idea.advGetListComment(this.$route.params.id)
        }
        const formatData = []
        res.data.data.length > 0 && res.data.data.map((item) => {
          const rowData = {
            ...item,
            created_at: moment(item.created_at).fromNow(),
            user: item.user === null ? 'Anonymous' : item.user
          }
          return formatData.push(rowData)
        })
        this.commentList = formatData
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    async handleSendComment () {
      try {
        await idea.addComment({
          idea_id: parseInt(this.$route.params.id),
          content: this.comment,
          is_anonymous: this.is_anonymous_cmt
        })
        await this.getComment()
        this.comment = ''
        this.formData.comments_count += 1
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    async handleDeleteComment (id) {
      try {
        await idea.deleteComment(id)
        await this.getComment()
        this.formData.comments_count -= 1
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    }
  }
}
</script>

<style>
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
.list-comment {
  margin-top: 80px;
}
</style>

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
            <div class="mt-5">
              <div class="inforLike mb-1">
                <div class="flex flex-row">
                  <span class="icon mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-4" viewBox="0 0 20 20" fill="#b0b3b7">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                  </span>
                  <span class="mr-2 text-slate-500">{{ formData.likes_count }}</span>
                  <span class="icon mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-4" viewBox="0 0 20 20" fill="#b0b3b7">
                      <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                    </svg>
                  </span>
                  <span class="mr-2 text-slate-500">
                    {{ formData.dislikes_count }}
                  </span>
                </div>
              </div>
              <div class="btn-rate flex flex-row">
                <div class="like-zone mr-2">
                  <el-button
                    v-if="clicked_like"
                    type="success"
                    size="mini"
                    class="mr-1 btn-icon"
                    @click="handleClickLike"
                  >
                    <div class="flex flex-row">
                      <span class="icon mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                      </span>
                      <span>Like</span>
                    </div>
                  </el-button>
                  <el-button
                    v-else
                    type="infor"
                    size="mini"
                    class="mr-1 btn-icon"
                    @click="handleClickLike"
                  >
                    <div class="flex flex-row">
                      <span class="icon mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                      </span>
                      <span> Like </span>
                    </div>
                  </el-button>
                </div>
                <div class="dislike-zone">
                  <el-button
                    v-if="clicked_dislike"
                    type="danger"
                    size="mini"
                    class="mr-1 ml-2 btn-icon"
                    @click="handleClickDislike"
                  >
                    <div class="flex flex-row">
                      <span class="icon mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                        </svg>
                      </span>
                      <span> Dislike </span>
                    </div>
                  </el-button>
                  <el-button
                    v-else
                    type="infor"
                    size="mini"
                    class="mr-1 ml-2 btn-icon"
                    @click="handleClickDislike"
                  >
                    <div class="flex flex-row">
                      <span class="icon mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                        </svg>
                      </span>
                      <span> Dislike </span>
                    </div>
                  </el-button>
                </div>
              </div>
            </div>
          </el-card>
          <el-card v-if="listFile.length > 0" shadow="always" class="item-idea">
            <div slot="header" class="clearfix">
              <span class="text-xs">Files</span>
            </div>
            <el-tag
              v-for="(item, index) in listFile"
              :key="index"
              type=""
              effect="light"
              class="mr-1"
            >
              <el-link :href="item.url">
                {{ item.name }}
              </el-link>
            </el-tag>
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
              :disabled="!can_comment || currentUser.role !=='STAFF'"
            />
            <el-switch
              v-model="is_anonymous_cmt"
              class="mt-6"
              style="float: left;"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Anonymous"
              :disabled="!can_comment || currentUser.role !=='STAFF'"
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
                    <span v-if="item.user_id !== 0" class="text-md mr-2 text-sky-600"> {{ item.user.full_name }}</span>
                    <span v-else-if="item.user_id === 0" class="text-md mr-2 text-sky-900">Anonymous</span>
                    <span class="tex-xs"> {{ item.created_at }} </span>
                    <el-button
                      v-if="item.user.id === currentUser_id"
                      type="mini"
                      style="float: right;"
                      icon="el-icon-delete"
                      circle
                      @click="handleDeleteComment(item.id)"
                    />
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
        'https://vtv1.mediacdn.vn/thumb_w/500/2021/7/25/da-nang-2-1627212353368273813312.jpg',
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
      listFile: [],
      clicked_like: false,
      clicked_dislike: false,
      comment: '',
      commentList: [],
      statusRegression: 0,
      currentUser_id: '',
      currentUser: {},
      is_anonymous_cmt: false,
      is_like: '',
      is_dislike: '',
      can_comment: true
    }
  },
  created () {
    this.getDetail()
    this.getStatusAcaYear()
  },
  methods: {
    getDetail () {
      setTimeout(async () => {
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
          this.clicked_like = dataDetail.is_like
          this.clicked_dislike = dataDetail.is_dislike
          this.listFile = dataDetail.files
          this.content = dataDetail.content
          this.currentUser_id = this.$store.getters['user/getCurrentUser'].id
          this.currentUser = this.$store.getters['user/getCurrentUser']
          this.getListByCategory(res.data.data.category_id)
          this.getComment()
          this.$store.commit('pages/setLoading', false)
        } catch (e) {
          this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
          this.$store.commit('pages/setLoading', false)
        }
      }, 500)
    },
    async getStatusAcaYear () {
      try {
        const res = await idea.checkCurrentAca()
        const data = res.data.data
        this.can_comment = data.can_post_comment
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
      }
    },
    handleUserAction () {
      setTimeout(async () => {
        try {
          const currentUser = this.currentUser_id
          const res = await idea.getUserLikeIdea(this.$route.params.id)
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
      }, 500)
    },
    getListByCategory (category) {
      setTimeout(async () => {
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
      }, 500)
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
    getComment () {
      setTimeout(async () => {
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
      }, 500)
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
.el-button {
  list-style: initial !important;
}
.btn-icon {
  line-height: initial;
}
</style>

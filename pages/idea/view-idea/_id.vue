<template>
  <div>
    <div class="md:container md:mx-auto pt-6 px-6 md:px-2">
      <div class="block mb-8 grid grid-cols-6 gap-4 items-cente">
        <div class="col-start-1 col-end-9  md:col-end-2  flex flex-col">
          <!-- filter  -->
          <div class="block-item">
            <el-carousel height="150px">
              <el-carousel-item v-for="item in slides" :key="item">
                <img :src="item">
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- timeLine -->
          <div class="block-item">
            <el-card class="box-card">
              <div class="block">
                <p>List theo category</p>
              </div>
            </el-card>
          </div>
        </div>
        <!-- main content -->
        <div class="main-content col-start-1 md:col-start-2 col-end-9">
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
                  <span>{{ item.user }}</span>
                </div>
                <div class="post-meta d-inline-flex align-items-center flex-wrap">
                  <div class="text-muted mr-0">
                    <span> {{ item.created_at }}</span>
                  </div>
                </div>
              </div>
              <div class="post-title--inline">
                <a href="#" @click="viewIdea(item.id)"><h3 class="word-break mr-5 font-semibold">
                  {{ item.title }}
                </h3></a>
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
                    <font-awesome-icon icon="fa-solid fa-thumbs-up" />
                    <span>{{ item.likes_count }}</span>
                  </span>
                  <span class="stats-item text-muted mr-2">
                    <font-awesome-icon icon="fa-solid fa-thumbs-down" />
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewPage',
  data () {
    return {
      slides: ['https://greenwich.edu.vn/wp-content/uploads/2021/01/banner-2.jpg',
        'https://vtv1.mediacdn.vn/thumb_w/1000/2021/7/25/da-nang-2-1627212353368273813312.jpg',
        'https://greenwich.edu.vn/wp-content/uploads/2020/06/xet-tuyen-dai-hoc-fpt-greenwich.jpg']
    }
  }
}
</script>

<style>

</style>

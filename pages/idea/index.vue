<template>
  <div>
    <div class="md:container md:mx-auto pt-6 px-6 px-6 md:px-2">
      <div class="block mb-8 grid grid-cols-6 gap-4 items-center">
        <div class="w-100 search-div col-start-1 col-end-9  md:col-end-4 flex flex-row">
          <el-select v-model="searchKey" clearable placeholder="Select key to search" style="margin-right: 5px;">
            <el-option
              v-for="(item, index) in optionsSearchKey"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            v-model="search"
            :disabled="searchKey === ''"
            placeholder="Type to search"
          />
          <el-button icon="el-icon-search" style="margin-left: 5px;" @click="handleSearch" />
        </div>
        <div class="create-div col-start-1 md:col-start-8 col-end-8">
          <el-button type="success" @click="openDialog">
            Create Idea
          </el-button>
        </div>
      </div>
      <components-table
        :props-table-data="tableData"
        :props-table-header="tableHeader"
        :props-current-page="currentPage"
        :props-page-sizes="pageSizes"
        :props-page-size="pageSize"
        :props-total-items="totalItems"
        :props-hidden-delete="false"
        @handle-edit="handleEdit"
        @handle-delete="handleDelete"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      />
    </div>
    <create
      :props-dialog-visible="dialogPop"
      @handle-submit="handleCreate"
      @handle-import-image="handleImportImage"
      @handle-import="handleImport"
    />
    <edit
      :props-dialog-visible="dialogPopEdit"
      @handle-submit="handleSubmitEdit"
      @handle-import-image="handleImportImage"
      @handle-import="handleImport"
      @handle-remove="handleRemove"
    />
    <dialogs-delete
      :props-dialog-visible="dialogPopDelete"
      @handle-submit="handleSubmitDelete"
    />
  </div>
</template>

<script>
import * as idea from '@/api/idea.js'
import ComponentsTable from '@/components/tableCURD/index.vue'
import create from '@/components/dialogs/idea/create.vue'
import edit from '@/components/dialogs/idea/edit.vue'
import DialogsDelete from '@/components/dialogs/dialogsDelete.vue'
import EventBus from '@/utils/eventBus'
import initToken from '~/mixins/auth.js'

export default {
  name: 'IdeaForPersonIndex',
  components: {
    ComponentsTable,
    create,
    edit,
    DialogsDelete
  },
  mixins: [initToken],

  data () {
    return {
      dialogPop: false,
      dialogPopDelete: false,
      tableData: [],
      tableHeader: [{
        field: 'id',
        title: 'ID'
      },
      {
        field: 'title',
        title: 'Title'
      },
      {
        field: 'thumbnail_url',
        title: 'Picture'
      },
      {
        field: 'category_id',
        title: 'Category'
      },
      {
        field: 'created_at',
        title: 'Created At'
      }
      ],
      optionsSearchKey: [{
        value: 'title',
        label: 'Title'
      }, {
        value: 'category',
        label: 'Category'
      }],
      // pagination default
      currentPage: 1,
      pageSizes: [10, 50, 100],
      pageSize: 50,
      totalItems: 1,
      search: '',
      dialogPopEdit: false,
      listCategory: [],
      listFileUpload: [],
      thumbnailUrl: '',
      singleIdea: {},
      searchKey: ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    handleSearch () {
      if (this.search !== '') {
        this.fetchData()
      }
    },
    openDialog () {
      EventBus.$emit('OpenCreateAY', true, this.listCategory)
    },
    async  handleCreate (params) {
      try {
        this.$store.commit('pages/setLoading', true)
        params.files = this.listFileUpload
        params.thumbnail_url = this.thumbnailUrl
        await idea.add(params)
        this.fetchData()
        this.listFileUpload = []
        this.$store.commit('pages/setLoading', false)
        this.$message.success('Create user successfully')
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    async handleImportImage (file) {
      this.initToken()
      try {
        const formData = new FormData()
        formData.append('upload', file)
        const image = await idea.uploadCommon(formData)
        this.thumbnailUrl = image.data.data.url
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('e', e)
      }
    },
    async handleImport (file) {
      this.initToken()
      try {
        const formData = new FormData()
        formData.append('upload', file)
        const image = await idea.upload(formData)
        this.listFileUpload.push(image.data.data)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('e', e)
      }
    },
    handleRemove (fileRemove) {
      // eslint-disable-next-line no-console
      console.log('remove đê', fileRemove)
      this.listFileUpload = this.listFileUpload.filter(file => file.name !== fileRemove.name)
      // eslint-disable-next-line no-console
      console.log('remove luôn', this.listFileUpload)
    },
    async handleEdit (index, value) {
      const data = await this.getDetailIdea(value.id)
      // eslint-disable-next-line no-console
      console.log('data==>', data)
      EventBus.$emit('OpenEditIdea', true, data, this.listCategory)
    },
    async getDetailIdea (id) {
      try {
        const res = await idea.details(id)
        this.$store.commit('pages/setLoading', false)
        const data = res.data.data
        this.listFileUpload = data.files
        return data
      } catch (e) {
        this.$router.push('/404')
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    async handleSubmitEdit (params, id) {
      try {
      // eslint-disable-next-line no-console
        this.$store.commit('pages/setLoading', true)
        params.thumbnail_url = this.thumbnailUrl
        params.files = this.listFileUpload
        await idea.update(params)
        this.fetchData()
        this.listFileUpload = []
        this.$store.commit('pages/setLoading', false)
        this.$message.success('Edit user successfully')
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    async fetchData () {
      try {
        const query = {
          page: this.currentPage,
          limit: this.pageSize
        }
        query[this.searchKey] = this.search
        if (query[this.searchKey] === '') {
          delete query[this.searchKey]
        }
        if (query.limit === '') {
          delete query.limit
        }
        if (query.page === '') {
          delete query.page
        }
        this.$store.commit('pages/setLoading', true)
        const res = await idea.list(query)
        const formatData = []
        res.data.data.length > 0 && res.data.data.map((item) => {
          const rowData = {
            ...item,
            category_id: item.category.name
          }
          return formatData.push(rowData)
        })
        this.tableData = formatData
        this.currentPage = res.data.paging.page
        this.pageSize = res.data.paging.limit
        this.totalItems = res.data.paging.total
        this.getListCategory()
        this.$store.commit('pages/setLoading', false)
      } catch (e) {
        this.$router.push('/404')
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    async getListCategory () {
      try {
        const res = await idea.getListCategory()
        this.listCategory = res.data.data
        // eslint-disable-next-line no-console
        console.log('listCategory', this.listCategory)
        this.$store.commit('pages/setLoading', false)
      } catch (e) {
        this.$router.push('/404')
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    handleDelete (index, value) {
      // eslint-disable-next-line no-console
      EventBus.$emit('OpenDelete', true, value.id)
    },
    async handleSubmitDelete (params) {
      try {
      // eslint-disable-next-line no-console
        this.$store.commit('pages/setLoading', true)
        await idea.destroy(params)

        this.fetchData()
        this.$store.commit('pages/setLoading', false)
        this.$message.success('Delete successfully')
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.fetchData()
    }

  }
}
</script>

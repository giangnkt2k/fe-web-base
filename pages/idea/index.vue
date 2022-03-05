<template>
  <div>
    <div class="md:container md:mx-auto pt-6">
      <div class="block mb-8 grid grid-cols-6 gap-4 items-center">
        <div class="w-80 search-div col-start-1 col-end-3 flex flex-row">
          <el-input
            v-model="search"
            placeholder="Type to search"
          />
          <el-button icon="el-icon-search" style="margin-left: 5px;" />
        </div>
        <div class="create-div col-end-8">
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
        @handle-edit="handleEdit"
        @handle-delete="handleDelete"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      />
    </div>
    <create
      :props-dialog-visible="dialogPop"
      @handle-submit="handleCreate"
    />
    <edit
      :props-dialog-visible="dialogPopEdit"
      @handle-submit="handleSubmitEdit"
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

export default {
  name: 'IdeaForPersonIndex',
  components: {
    ComponentsTable,
    create,
    edit,
    DialogsDelete
  },
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
        field: 'picture',
        title: 'Picture'
      },
      {
        field: 'file',
        title: 'File'
      },
      {
        field: 'department',
        title: 'Department'
      },
      {
        field: 'academic_year',
        title: 'Academic Year'
      },
      {
        field: 'created_at',
        title: 'Created At'
      }
      ],
      // pagination default
      currentPage: 1,
      pageSizes: [10, 50, 100],
      pageSize: 50,
      totalItems: 1,
      search: '',
      dialogPopEdit: false
    }
  },
  created () {
    // this.fetchData()
  },
  methods: {
    handleClick () {
      // eslint-disable-next-line no-console
      console.log('click')
    },
    openDialog () {
      EventBus.$emit('OpenCreateAY', true)
    },
    async  handleCreate (params) {
      try {
        this.$store.commit('pages/setLoading', true)
        await idea.add(params)
        this.fetchData()
        this.$store.commit('pages/setLoading', false)
        this.$message.success('Create user successfully')
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    handleEdit (index, value) {
      EventBus.$emit('OpenEditAd', true, value)
    },
    async handleSubmitEdit (params, id) {
      try {
      // eslint-disable-next-line no-console
        this.$store.commit('pages/setLoading', true)
        await idea.update(params)
        this.fetchData()
        this.$store.commit('pages/setLoading', false)
        this.$message.success('Edit user successfully')
      } catch (e) {
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
    async fetchData () {
      try {
        const query = {
          page: this.currentPage,
          limit: this.pageSize,
          search: this.search
        }
        if (query.search === '') {
          delete query.search
        }
        if (query.limit === '') {
          delete query.limit
        }
        if (query.page === '') {
          delete query.page
        }
        this.$store.commit('pages/setLoading', true)
        const res = await idea.list({ query })
        this.tableData = res.data.data
        this.currentPage = res.data.paging.page
        this.pageSize = res.data.paging.limit
        this.totalItems = res.data.paging.total
        this.$store.commit('pages/setLoading', false)
      } catch (e) {
        this.$router.push('/404')
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

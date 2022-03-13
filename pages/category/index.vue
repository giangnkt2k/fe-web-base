<template>
  <div>
    <div class="md:container md:mx-auto pt-6 px-6" style="margin:margin:0 10px 0 10px;">
      <div class="block mb-8 grid grid-cols-6 gap-4 items-center">
        <div class="search-div col-start-1 col-end-8 md:col-end-4 flex flex-row">
          <el-select v-model="searchKey" clearable placeholder="Select key to search">
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
            style="margin-left: 5px;"
            placeholder="Type to search"
          />
          <el-button icon="el-icon-search" style="margin-left: 5px;" @click="handleSearch" />
        </div>
        <div class="create-div md:col-start-8 col-end-8">
          <el-button type="success" @click="openDialog">
            Create Category
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
        :props-hidden-delete="true"
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
import * as category from '@/api/category'
import ComponentsTable from '@/components/tableCURD/index.vue'
import create from '@/components/dialogs/category/create.vue'
import edit from '@/components/dialogs/category/edit.vue'
import DialogsDelete from '@/components/dialogs/dialogsDelete.vue'
import EventBus from '@/utils/eventBus'

export default {
  name: 'BuildingIndex',
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
        field: 'name',
        title: 'Category name'
      },
      {
        field: 'status',
        title: 'Status'
      }],
      // pagination default
      currentPage: '',
      pageSizes: [10, 50, 100],
      pageSize: '',
      totalItems: '',
      search: '',
      optionsSearchKey: [{
        value: 'name',
        label: 'Name'
      }, {
        value: 'leader',
        label: 'Leader'
      }],
      searchKey: '',
      dialogPopEdit: false
    }
  },
  watch: {
    searchKey () {
      this.search = ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    handleClick () {
      // eslint-disable-next-line no-console
      console.log('click')
    },
    handleSearch () {
      if (this.search !== '') {
        this.fetchData()
      }
    },
    openDialog () {
      EventBus.$emit('OpenCreateCategory', true)
    },
    async  handleCreate (params) {
      try {
        this.$store.commit('pages/setLoading', true)
        await category.add(params)
        this.fetchData()
        this.$store.commit('pages/setLoading', false)
        this.$message.success('Create category successfully')
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    handleEdit (index, value) {
      // eslint-disable-next-line no-console
      console.log('param', value)
      EventBus.$emit('OpenEditCategory', true, value)
    },
    async handleSubmitEdit (params, id) {
      try {
      // eslint-disable-next-line no-console
        this.$store.commit('pages/setLoading', true)
        await category.update(params)
        this.fetchData()
        this.$store.commit('pages/setLoading', false)
        this.$message.success('Edit category successfully')
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    handleDelete (index, value) {
      EventBus.$emit('OpenDelete', true, value.id)
    },
    async  handleSubmitDelete (params) {
      try {
      // eslint-disable-next-line no-console
        this.$store.commit('pages/setLoading', true)
        await category.destroy(params)

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
        const res = await category.list(query)
        const formatData = []
        res.data.data.length > 0 && res.data.data.map((item) => {
          const rowData = {
            ...item,
            status: (item.status === true) ? 'ACTIVE' : 'INACTIVE'
          }
          return formatData.push(rowData)
        })
        this.tableData = formatData
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

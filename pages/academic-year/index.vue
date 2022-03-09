<template>
  <div>
    <div class="md:container md:mx-auto pt-6">
      <div class="block mb-8 grid grid-cols-6 gap-4 items-center">
        <div class="search-div col-start-1 col-end-4 flex flex-row">
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
        <div class="create-div col-end-8">
          <el-button type="success" @click="openDialog">
            Create Academic Year
          </el-button>
        </div>
      </div>
      <components-table
        :props-table-data="tableData"
        :props-table-header="tableHeader"
        :props-current-page="currentPage"
        :props-page-sizes="pageSizes"
        :props-hidden-delete="true"
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
import * as academicYear from '@/api/academicYear'
import ComponentsTable from '@/components/tableCURD/index.vue'
import create from '@/components/dialogs/academinYear/create.vue'
import edit from '@/components/dialogs/academinYear/edit.vue'
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
        field: 'title',
        title: 'Name of term'
      },
      {
        field: 'start_date',
        title: 'Start date'
      },
      {
        field: 'end_date',
        title: 'End date'
      },
      {
        field: 'first_closure_date',
        title: 'First closure date'
      },
      {
        field: 'final_closure_date',
        title: 'Final closure date'
      },
      {
        field: 'status',
        title: 'Status'
      }
      ],
      // pagination default
      currentPage: 1,
      pageSizes: [10, 50, 100],
      pageSize: 50,
      totalItems: 1,
      optionsSearchKey: [{
        value: 'name',
        label: 'Name'
      }, {
        value: 'status',
        label: 'Status'
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
      EventBus.$emit('OpenCreateAY', true)
    },
    async  handleCreate (params) {
      try {
        this.$store.commit('pages/setLoading', true)
        await academicYear.add(params)
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
        await academicYear.update(params)
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
        await academicYear.destroy(params)

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
        const res = await academicYear.list(query)
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

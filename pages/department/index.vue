<template>
  <div>
    <div class="md:container md:mx-auto pt-6 px-6 md:px-2">
      <el-card class="mb-8">
        <div class="block grid grid-cols-6 gap-4 items-center">
          <div class="search-div col-start-1 col-end-8  md:col-end-4 flex flex-row">
            <el-input
              v-model="search"
              style="margin-left: 5px;"
              placeholder="Type to search"
            />
            <el-button icon="el-icon-search" style="margin-left: 5px;" @click="handleSearch" />
          </div>
          <div class="create-div col-start-1 md:col-start-8 col-end-8">
            <el-button type="success" @click="openDialog">
              Create Department
            </el-button>
          </div>
        </div>
      </el-card>
      <components-table
        :props-table-data="tableData"
        :props-table-header="tableHeader"
        :props-current-page="currentPage"
        :props-page-sizes="pageSizes"
        :props-page-size="pageSize"
        :props-hidden-delete="true"
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
import * as department from '@/api/department'
import * as user from '@/api/user'

import ComponentsTable from '@/components/tableCURD/index.vue'
import create from '@/components/dialogs/department/create.vue'
import edit from '@/components/dialogs/department/edit.vue'
import DialogsDelete from '@/components/dialogs/dialogsDelete.vue'
import EventBus from '@/utils/eventBus'

export default {
  name: 'DepartmentIndex',
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
      tableHeader: [
        {
          field: 'id',
          title: 'ID'
        },
        {
          field: 'name',
          title: 'Name'
        },
        {
          field: 'leader_id',
          title: 'Leader'
        },
        {
          field: 'status',
          title: 'Status'
        }
      ],
      // pagination default
      currentPage: 1,
      pageSizes: [10, 50, 100],
      pageSize: 10,
      totalItems: 1,
      search: '',
      dialogPopEdit: false,
      optionsSearchKey: [{
        value: 'name',
        label: 'Name'
      }, {
        value: 'leader',
        label: 'Leader'
      }],
      searchKey: '',
      listLeader: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    handleSearch () {
      this.fetchData()
    },
    openDialog () {
      EventBus.$emit('OpenCreateAY', true)
      EventBus.$emit('listLeader', this.listLeader)
    },
    async  handleCreate (params) {
      try {
        this.$store.commit('pages/setLoading', true)
        await department.add(params)
        this.fetchData()
        this.$store.commit('pages/setLoading', false)
        this.$notify({
          title: 'Success',
          message: 'Create department successfully',
          type: 'success'
        })
      } catch (e) {
        this.$notify({
          title: 'Error',
          message: e.response.data.status_code + ' ' + e.response.data.message,
          type: 'error'
        })
        this.$store.commit('pages/setLoading', false)
      }
    },
    handleEdit (index, value) {
      const lead = this.listLeader.filter(e => e.full_name === value.leader_id)
      value.leader_id = lead[0].id
      EventBus.$emit('OpenEditAd', true, value)
      EventBus.$emit('listLeader', this.listLeader)
    },
    async handleSubmitEdit (params, id) {
      try {
      // eslint-disable-next-line no-console
        this.$store.commit('pages/setLoading', true)
        await department.update(params)
        this.fetchData()
        this.$store.commit('pages/setLoading', false)
        this.$notify({
          title: 'Success',
          message: 'Edit department successfully',
          type: 'success'
        })
      } catch (e) {
        this.$notify({
          title: 'Error',
          message: e.response.data.status_code + ' ' + e.response.data.message,
          type: 'error'
        })
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
        await department.destroy(params)

        this.fetchData()
        this.$store.commit('pages/setLoading', false)
        this.$notify({
          title: 'Success',
          message: 'Delete successfully',
          type: 'success'
        })
      } catch (e) {
        this.$notify({
          title: 'Error',
          message: e.response.data.status_code + ' ' + e.response.data.message,
          type: 'error'
        })
        this.$store.commit('pages/setLoading', false)
      }
    },
    async getListLeader () {
      try {
        const query = {
          role: 'QAC',
          limit: 1000
        }
        const listLeader = await user.list(query)
        // eslint-disable-next-line no-console
        this.listLeader = listLeader.data.data
      } catch (e) {
        this.$notify({
          title: 'Error',
          message: e.response.data.status_code + ' ' + e.response.data.message,
          type: 'error'
        })
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
        if (this.search === '') {
          delete query.search
        }
        if (query.limit === '') {
          delete query.limit
        }
        if (query.page === '') {
          delete query.page
        }
        this.$store.commit('pages/setLoading', true)
        const res = await department.listAdmin(query)
        const formatData = []
        res.data.data.length > 0 && res.data.data.map((item) => {
          const rowData = {
            ...item,
            status: (item.status === true) ? 'ACTIVE' : 'INACTIVE',
            leader_id: (item.leader_id) ? item.leader.full_name : ''
          }
          return formatData.push(rowData)
        })
        this.tableData = formatData
        this.currentPage = res.data.paging.page
        this.pageSize = res.data.paging.limit
        this.totalItems = res.data.paging.total
        this.getListLeader()
        this.$store.commit('pages/setLoading', false)
      } catch (e) {
        this.$router.push('/404')
        this.$notify({
          title: 'Error',
          message: e.response.data.status_code + ' ' + e.response.data.message,
          type: 'error'
        })
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

<template>
  <div>
    <div class="md:container md:mx-auto pt-6 px-6 md:px-2">
      <el-card class="mb-8">
        <div class="block grid grid-cols-6 gap-4 items-center">
          <div class="search-div col-start-1 col-end-8  md:col-end-4 flex flex-row">
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

          <div class="create-div col-start-1 md:col-start-8 col-end-8">
            <el-button type="success" @click="openDialog">
              Create User
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
        :props-total-items="totalItems"
        :props-hidden-delete="true"
        @handle-edit="handleEdit"
        @handle-delete="handleDelete"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      />
    </div>
    <dialogs-create-user
      :props-dialog-visible="dialogPop"
      @handle-submit="handleCreate"
    />
    <dialogs-edit-user
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
import * as user from '@/api/user'
import { list } from '@/api/department'
import ComponentsTable from '@/components/tableCURD/index.vue'
import DialogsCreateUser from '~/components/dialogs/user/dialogsCreateUser.vue'
import DialogsEditUser from '~/components/dialogs/user/dialogsEditUser.vue'
import DialogsDelete from '@/components/dialogs/dialogsDelete.vue'
import EventBus from '@/utils/eventBus'

export default {
  name: 'BuildingIndex',
  components: {
    ComponentsTable,
    DialogsCreateUser,
    DialogsEditUser,
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
        field: 'full_name',
        title: 'Full Name'
      },
      {
        field: 'email',
        title: 'Email'
      },
      {
        field: 'department',
        title: 'Department'
      },
      {
        field: 'status',
        title: 'Status'
      },
      {
        field: 'role',
        title: 'Role'
      }],
      // pagination default
      currentPage: 1,
      pageSizes: [10, 50, 100],
      pageSize: 10,
      totalItems: 1,
      search: '',
      dialogPopEdit: false,
      optionsSearchKey: [{
        value: 'role',
        label: 'Role'
      }, {
        value: 'department',
        label: 'Department'
      }, {
        value: 'email',
        label: 'Email'
      }, {
        value: 'full_name',
        label: 'Full Name'
      }, {
        value: 'status',
        label: 'Status'
      }],
      searchKey: '',
      listDepartment: []
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
        const res = await user.list(query)
        const formatData = []
        res.data.data.length > 0 && res.data.data.map((item) => {
          const rowData = {
            ...item,
            status: (item.status === true) ? 'ACTIVE' : 'INACTIVE',
            department: item.department ? item.department.name : ''
          }
          return formatData.push(rowData)
        })
        this.tableData = formatData
        this.currentPage = res.data.paging.page
        this.pageSize = res.data.paging.limit
        this.totalItems = res.data.paging.total
        this.getListDepartment()
        this.$store.commit('pages/setLoading', false)
      } catch (e) {
        this.$router.push('/404')
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    async getListDepartment () {
      try {
        const listDepartment = await list()
        this.listDepartment = listDepartment.data.data
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    openDialog () {
      EventBus.$emit('OpenCreateUser', true, this.listDepartment)
    },
    async  handleCreate (params) {
      try {
        this.$store.commit('pages/setLoading', true)
        params.full_name = params.full_name.trim()
        await user.add(params)
        this.fetchData()
        this.$store.commit('pages/setLoading', false)
        this.$message.success('Create user successfully')
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    handleEdit (index, value) {
      EventBus.$emit('OpenEditUser', true, value, this.listDepartment)
    },
    async handleSubmitEdit (params, id) {
      try {
        this.$store.commit('pages/setLoading', true)
        await user.update(params)
        this.fetchData()
        this.$store.commit('pages/setLoading', false)
        this.$message.success('Edit user successfully')
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    },
    handleDelete (index, value) {
      EventBus.$emit('OpenDelete', true)
    },
    handleSubmitDelete () {
      this.$message.success('Delete successfully')
    },
    handleSearch () {
      if (this.search !== '') {
        this.fetchData()
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      // eslint-disable-next-line no-console
      console.log('pageSize', this.pageSize)
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.fetchData()
    }

  }
}
</script>

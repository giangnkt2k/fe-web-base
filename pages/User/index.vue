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
            Create User
          </el-button>
        </div>
      </div>
      <components-table
        :props-table-data="tableData"
        :props-table-header="tableHeader"
        :props-current-page="currentPage1"
        :props-page-sizes="pageSizes"
        :props-page-size="pageSize"
        :props-total-items="totalItems"
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
import ComponentsTable from '@/components/tableCURD/index.vue'
import DialogsCreateUser from '@/components/dialogs/dialogsCreateUser.vue'
import DialogsEditUser from '@/components/dialogs/dialogsEditUser.vue'
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
      pageSize: 5,
      totalItems: 100
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
    openDialog () {
      EventBus.$emit('OpenCreateUser', true)
    },
    async  handleCreate (params) {
      try {
      // eslint-disable-next-line no-console
        this.$store.commit('pages/setLoading', true)
        await user.add(params)
        this.fetchData()
        this.$store.commit('pages/setLoading', false)
        this.$message.success('Create user successfully')
      } catch (e) {
        this.$message.error('Create user unsuccessfully')
      }
    },
    handleEdit (index, value) {
      // eslint-disable-next-line no-console
      console.log('param', value)
      EventBus.$emit('OpenEditUser', true, value)
    },
    async handleSubmitEdit (params, id) {
      try {
      // eslint-disable-next-line no-console
        this.$store.commit('pages/setLoading', true)
        await user.update(params)
        this.fetchData()
        this.$store.commit('pages/setLoading', false)
        this.$message.success('Edit user successfully')
      } catch (e) {
        this.$message.error('Edit user unsuccessfully')
      }
    },
    handleDelete () {
      EventBus.$emit('OpenDelete', true)
    },
    handleSubmitDelete () {
      this.$message.success('Delete successfully')
    },
    async fetchData () {
      this.$store.commit('pages/setLoading', true)
      const res = await user.list({})
      this.tableData = res.data.data
      this.currentPage = res.data.paging.page
      this.pageSize = res.data.paging.limit
      this.totalItems = res.data.paging.total
      // eslint-disable-next-line no-console
      console.log('data', res.data)
      this.$store.commit('pages/setLoading', false)
    },
    handleSizeChange (val) {
      // eslint-disable-next-line no-console
      console.log(`${val} items per page`)
    },
    handleCurrentChange (val) {
      // eslint-disable-next-line no-console
      console.log(`current page: ${val}`)
    }

  }
}
</script>

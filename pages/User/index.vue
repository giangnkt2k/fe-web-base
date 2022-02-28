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
  </div>
</template>

<script>
// import * as user from '@/api/user'
import ComponentsTable from '@/components/tableCURD/index.vue'
import DialogsCreateUser from '@/components/dialogs/dialogsCreateUser.vue'
import EventBus from '@/utils/eventBus'

export default {
  name: 'BuildingIndex',
  components: {
    ComponentsTable,
    DialogsCreateUser
  },
  data () {
    return {
      dialogPop: false,
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
    // this.fetchData()
  },
  methods: {
    handleClick () {
      // eslint-disable-next-line no-console
      console.log('click')
    },
    openDialog () {
      EventBus.$emit('OpenCreateUser', true)
    },
    handleCreate () {
      this.dialogPop = false
    },
    // async fetchData () {
    // this.$store.commit('pages/setLoading', true)
    // const res = await user.list({})
    // this.tableData = res.data.data.result
    // this.$store.commit('pages/setLoading', false)
    // },
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

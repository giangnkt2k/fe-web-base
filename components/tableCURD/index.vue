<template>
  <div class="md:container md:mx-auto pt-6 justify-center">
    <el-table
      :data="propsTableData"
      border
      :default-sort="{prop: 'id', order: 'descending'}"
    >
      <template v-for="(col, index) in propsTableHeader">
        <el-table-column
          v-if="col.title !== 'Status'"
          :key="index"
          :label="col.title"
        >
          <template slot-scope="scope">
            <span class="rowSpan">{{ scope.row[col.field] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="col.title== 'Status'"
          :key="index"
          :label="col.title"
        >
          <template slot-scope="scope">
            <span class="rowSpan">
              <el-tag v-if="scope.row[col.field] =='ACTIVE'" type="success"> {{ scope.row[col.field] }}</el-tag>
              <el-tag v-if="scope.row[col.field] !=='ACTIVE'" type="danger"> {{ scope.row[col.field] }}</el-tag>
            </span>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        width="180"
        label="Actions"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >
            Edit
          </el-button>
          <el-button
            v-if="propsHiddenDelete == false"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="propsPageSizes"
        :page-size="propsPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="propsTotalItems"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentsTable',
  props: {
    propsTableData: {
      type: [Array, Object],
      required: true,
      default: () => {
        return []
      }
    },
    propsTableHeader: {
      type: [Array, Object],
      required: true,
      default: () => {
        return []
      }
    },
    propsCurrentPage: {
      type: Number,
      default: 1,
      required: true
    },
    propsHiddenDelete: {
      type: Boolean,
      required: true,
      default: true
    },
    propsPageSizes: {
      type: [Array, Object],
      required: true,
      default: () => {
        return [10, 50, 100]
      }
    },
    propsPageSize: {
      type: Number,
      default: null,
      required: 10
    },
    propsTotalItems: {
      type: Number,
      default: 10,
      required: true
    }
  },
  data () {
    return {
      currentPage: null
    }
  },
  watch: {
    propsCurrentPage (page) {
      // eslint-disable-next-line no-console
      this.currentPage = page
    }
  },
  methods: {
    // edit table
    handleEdit (index, row) {
      this.$emit('handle-edit', index, row)
    },
    handleDelete (index, row) {
      this.$emit('handle-delete', index, row)
    },
    // pagination
    handleSizeChange (val) {
      this.$emit('handle-size-change', val)
    },
    handleCurrentChange (val) {
      this.$emit('handle-current-change', val)
    }
  }
}
</script>

<style>
.rowSpan {
  word-break: break-word !important;
}
.cell {
  word-break: break-word !important;
}
</style>

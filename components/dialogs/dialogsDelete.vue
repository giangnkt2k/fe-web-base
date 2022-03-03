<template>
  <div>
    <el-dialog
      title="Warning"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <span>Do you want to delete this??</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="handleSubmit">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  name: 'ComponentDelete',
  props: {
    propsDialogVisible: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      id: '',
      centerDialogVisible: false,
      dialogVisible: false
    }
  },
  watch: {
    dialogVisible (newVal) {
      // eslint-disable-next-line no-console
      console.log(this.propsDialogVisible)
      this.$emit('input', newVal)
    },
    propsDialogVisible (newVal) {
      this.innerValue = newVal
    }
  },
  mounted () {
    EventBus.$on('OpenDelete', (val, param) => {
      this.dialogVisible = val
      this.id = param
    })
    EventBus.$on('hideDeleteConfirmDialog', () => {
      this.dialogVisible = false
    })
  },
  created () {
    this.dialogVisible = this.propsDialogVisible
  },
  methods: {
    handleSubmit () {
      this.$emit('handle-submit', this.id)
      this.dialogVisible = false
    }
  }
}
</script>

<style>
</style>

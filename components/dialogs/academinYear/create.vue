<template>
  <div>
    <el-dialog
      title="Create New Academic Year"
      :visible.sync="dialogVisible"
      append-to-body
      width="50%"
      :close-on-click-modal="false"
    >
      <ValidationObserver
        ref="obsAddAcademicYear"
        tag="div"
      >
        <el-card shadow="always">
          <h2> General information</h2>
          <div class="row-input grid grid-cols-1 gap-4">
            <div class="col-span-1">
              <div class="mams-label">
                Name
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'title'"
                :rules="{ required: true, numeric: false }"
                class="mb-3"
                tag="div"
              >
                <el-input v-model="formData.title" type="text" placeholder="Enter academic year" />
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
          </div>
          <div class="row-input grid grid-cols-1 gap-4">
            <div class="col-span-1">
              <div class="mams-label">
                Start - end date of academic year
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'academic year'"
                :rules="{ required: true }"
                class="mb-3"
                tag="div"
              >
                <el-date-picker
                  v-model="start_end"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                  :picker-options="pickerOptions"
                />
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
          </div>
          <div class="row-input grid grid-cols-1 gap-4">
            <div class="col-span-1">
              <div class="mams-label">
                First - final closure date
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'closure date'"
                :rules="{ required: true }"
                class="mb-3"
                tag="div"
              >
                <el-date-picker
                  v-model="first_final"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                  :picker-options="pickerOptions"
                />
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
          </div>
          <div class="row-input grid grid-cols-1 gap-4">
            <div class="col-span-1">
              <div class="mams-label">
                Status
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'status'"
                :rules="{ required: true }"
                class="mb-3"
                tag="div"
              >
                <el-switch
                  v-model="formData.status"
                  style="display: block"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="Active"
                  inactive-text="Inactive"
                />
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
          </div>
        </el-card>
      </ValidationObserver>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button :disabled="disabledCreate" type="primary" @click="handleSubmit">Create</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import moment from 'moment'
import EventBus from '@/utils/eventBus'

export default {
  name: 'ComponentCreateBuilding',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    propsDialogVisible: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      dialogVisible: false,
      disabledCreate: false,
      formData: {
        title: '',
        start_date: '',
        end_date: '',
        first_closure_date: '',
        final_closure_date: '',
        status: true
      },
      confirmPassword: '',
      pickerOptions: {
        shortcuts: [{
          text: 'Last week',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Last month',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Last 3 months',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      start_end: '',
      first_final: ''
    }
  },
  watch: {
    dialogVisible (newVal) {
      this.$emit('input', newVal)
    },
    propsDialogVisible (newVal) {
      this.innerValue = newVal
    }
  },
  mounted () {
    EventBus.$on('OpenCreateAY', (val) => {
      this.disabledCreate = false
      this.dialogVisible = val
    })
    EventBus.$on('hideDeleteConfirmDialog', () => {
      this.dialogVisible = false
    })
  },
  created () {
    this.dialogVisible = this.propsDialogVisible
  },
  methods: {
    validateDate () {
      const startDate = moment(this.start_end[0]).format()
      const endDate = moment(this.start_end[1]).format()
      const firstClosureDate = moment(this.first_final[0]).format()
      const finalClosureDate = moment(this.first_final[1]).format()
      if (startDate <= firstClosureDate &&
          startDate < finalClosureDate &&
          firstClosureDate < endDate &&
          finalClosureDate <= endDate) {
        return true
      } else {
        return false
      }
    },
    async handleSubmit () {
      this.disabledCreate = true
      const isValid = await this.$refs.obsAddAcademicYear.validate()
      if (!isValid) {
        this.disabledCreate = false
        return
      }
      if (this.validateDate() === false) {
        this.$notify({
          title: 'Warning',
          message: 'Error date: start date <= first closure date < final closure date <= end date',
          type: 'warning'
        })
        return
      }
      this.formData.start_date = this.start_end[0]
      this.formData.end_date = this.start_end[1]
      this.formData.first_closure_date = this.first_final[0]
      this.formData.final_closure_date = this.first_final[1]
      this.$emit('handle-submit', this.formData)
      this.dialogVisible = false
      this.formData = {
        title: '',
        start_date: '',
        end_date: '',
        first_closure_date: '',
        final_closure_date: '',
        status: true
      }
      this.start_end = ''
      this.first_final = ''
      this.$refs.obsAddAcademicYear.reset()
    }
  }
}
</script>

<style>
.el-range-editor.el-input__inner {
  width: 100%;
}
</style>

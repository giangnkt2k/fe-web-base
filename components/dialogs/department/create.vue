<template>
  <div>
    <el-dialog
      title="Create New Department"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <ValidationObserver
        ref="obsAddDepartment"
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
                :rules="{ required: true}"
                class="mb-3"
                tag="div"
              >
                <el-input v-model="formData.name" type="text" placeholder="Enter name category" />
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
          </div>
          <div class="row-input grid grid-cols-1 gap-4">
            <div class="col-span-1">
              <div class="mams-label">
                Leader
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'leader'"
                :rules="{ required: true }"
                class="mb-3"
                tag="div"
              >
                <el-select v-model="formData.leader_id" filterable placeholder="Select leadder">
                  <el-option
                    v-for="(item, index) in optionsLeader"
                    :key="index"
                    :label="item.full_name"
                    :value="item.id"
                  />
                </el-select>
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
                  active-text="On"
                  inactive-text="Off"
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
        <el-button type="primary" @click="handleSubmit">Create</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
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
      formData: {
        name: '',
        leader_id: '',
        status: true
      },
      optionsLeader: []
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
    EventBus.$on('OpenCreateAY', (val) => {
      this.dialogVisible = val
    })
    EventBus.$on('hideDeleteConfirmDialog', () => {
      this.dialogVisible = false
    })
    EventBus.$on('listLeader', (val) => {
      this.optionsLeader = val
    })
  },
  created () {
    this.dialogVisible = this.propsDialogVisible
  },
  methods: {
    getListLeader () {
      this.$emit('handle-list-leader')
    },
    async handleSubmit () {
      const isValid = await this.$refs.obsAddDepartment.validate()
      if (!isValid) {
        return
      }
      this.$emit('handle-submit', this.formData)
      this.dialogVisible = false
      this.formData = {
        name: '',
        leader_id: '',
        status: true
      }
    }
  }
}
</script>

<style>
.el-range-editor.el-input__inner {
  width: 100%;
}
</style>

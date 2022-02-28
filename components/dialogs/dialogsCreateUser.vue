<template>
  <div>
    <el-dialog
      title="Create New Account"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-card shadow="always">
        <h2>Generate Information</h2>
        <div class="row-input grid grid-cols-2 gap-4">
          <div class="col-span-2 md:col-span-1">
            <div class="mams-label">
              Full name
            </div>
            <el-input v-model="formData.name" type="text" placeholder="Enter your full name" />
          </div>
          <div class="col-span-2 mams-label md:col-span-1">
            <div class="mams-label">
              DOB
            </div>
            <el-date-picker
              v-model="formData.dob"
              class="item-input"
              type="day"
              placeholder="Pick a Date"
            />
          </div>
        </div>
        <div>
          <div class="mams-label">
            Gender
          </div>
          <el-radio v-model="formData.gender" label="0">
            Male
          </el-radio>
          <el-radio v-model="formData.gender" label="1">
            Female
          </el-radio>
          <el-radio v-model="formData.gender" label="2">
            Other
          </el-radio>
        </div>
        <br>
        <div class="row-input grid grid-cols-2 gap-4">
          <div class="col-span-2 md:col-span-1">
            <div class="mams-label">
              Department
            </div>
            <el-select v-model="formData.department" class="item-input" placeholder="Select department">
              <el-option
                v-for="item in optionsDepartment"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="col-span-2 mams-label md:col-span-1">
            <div class="mams-label">
              Role
            </div>

            <el-select v-model="formData.role" class="item-input" placeholder="Select role">
              <el-option
                v-for="item in optionsRole"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </el-card>
      <br>
      <el-card shadow="always">
        <h2>Login Information</h2>
        <div class="row-input">
          <div>
            <div class="mams-label">
              Email
            </div>
            <el-input v-model="formData.email" type="email" placeholder="Enter your email" />
          </div>
          <div class="col-span-2 mams-label md:col-span-1">
            <div class="mams-label">
              Password
            </div>
            <el-input v-model="formData.password" type="password" placeholder="Enter your password" />
            <div class="mams-label">
              Confrim Password
            </div>
            <el-input v-model="confrimPassword" type="password" placeholder="Enter your password" />
          </div>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'
export default {
  name: 'ComponentCreateBuilding',
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
        dob: '',
        email: '',
        department: '',
        gender: '',
        password: '123@123'
      },
      confrimPassword: '',
      optionsDepartment: [
        {
          value: 0,
          label: 'Admin'
        },
        {
          value: 1,
          label: 'IT'
        },
        {
          value: 2,
          label: 'Bisiness'
        }
      ],
      optionsRole: [
        {
          value: 0,
          label: 'Admin'
        },
        {
          value: 1,
          label: 'Staff'
        },
        {
          value: 2,
          label: 'something'
        }
      ]
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
    EventBus.$on('OpenCreateUser', (val) => {
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
    handleSubmit () {
      this.$emit('handleSubmit')
    }
  }
}
</script>

<style>
</style>

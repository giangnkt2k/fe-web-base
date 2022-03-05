<template>
  <div>
    <el-dialog
      title="Edit Account"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <ValidationObserver
        ref="obsEditUser"
        tag="div"
      >
        <el-card shadow="always">
          <h2>Generate Information</h2>
          <div class="row-input grid grid-cols-2 gap-4">
            <div class="col-span-2 md:col-span-1">
              <div class="mams-label">
                Full name
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'full name'"
                :rules="{ required: false, numeric: false }"
                class="mb-3"
                tag="div"
              >
                <el-input v-model="formData.full_name" full_name="text" placeholder="Enter your full name" />
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
            <div class="col-span-2 mams-label md:col-span-1">
              <div class="mams-label">
                DOB
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'date of birth'"
                :rules="{ required: false }"
                class="mb-3"
                tag="div"
                format="yyyy/MM/dd"
                value-format="yyyy-MM-dd"
              >
                <el-date-picker
                  v-model="formData.date_of_birth"
                  class="item-input"
                  type="date"
                  placeholder="Pick a Date"
                />
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
          </div>
          <div>
            <div class="mams-label">
              Gender
            </div>
            <validation-provider
              v-slot="{ errors }"
              :name="'gender'"
              :rules="{ required: false }"
              class="mb-3"
              tag="div"
            >
              <el-radio v-model="formData.gender" label="Male">
                Male
              </el-radio>
              <el-radio v-model="formData.gender" label="Female">
                Female
              </el-radio>
              <el-radio v-model="formData.gender" label="Other">
                Other
              </el-radio>
              <div class="text-error">
                {{ errors[0] }}
              </div>
            </validation-provider>
          </div>
          <br>
          <div class="row-input grid grid-cols-2 gap-4">
            <div class="col-span-2 md:col-span-1">
              <div class="mams-label">
                Department
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'department'"
                :rules="{ required: false }"
                class="mb-3"
                tag="div"
              >
                <el-select v-model="formData.department" class="item-input" placeholder="Select department">
                  <el-option
                    v-for="item in optionsDepartment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
            <div class="col-span-2 mams-label md:col-span-1">
              <div class="mams-label">
                Role
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'role'"
                :rules="{ required: false }"
                class="mb-3"
                tag="div"
              >
                <el-select v-model="formData.role" class="item-input" placeholder="Select role">
                  <el-option
                    v-for="item in optionsRole"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
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
              <validation-provider
                v-slot="{ errors }"
                :name="'email'"
                :rules="{ required: false, email: true }"
                class="mb-3"
                tag="div"
              >
                <el-input v-model="formData.email" type="email" placeholder="Enter your email" />
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
            <div class="col-span-2 mams-label md:col-span-1">
              <div class="mams-label">
                Password
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'password'"
                :rules="{ required: false, min:6 }"
                class="mb-3"
                tag="div"
                vid="password"
              >
                <el-input v-model="formData.password" type="password" placeholder="Enter your password" />
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
              <div class="mams-label">
                Confrim Password
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'cf_password'"
                rules="confirmed:password"
                class="mb-3"
                tag="div"
                data-vv-as="password"
              >
                <el-input v-model="confrimPassword" type="password" placeholder="Enter your password" data-vv-as="password" />
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
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'

export default {
  name: 'ComponentEditUser',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    propsDialogVisible: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      dialogVisible: false,
      formData: {
        full_name: '',
        email: '',
        password: '',
        gender: '',
        department: '',
        date_of_birth: '',
        role: '',
        status: true

      },
      confrimPassword: '',
      optionsDepartment: [
        {
          value: 1,
          label: 'Information Technology'
        },
        {
          value: 2,
          label: 'Business'
        },
        {
          value: 3,
          label: 'Graphic and Digital Design'
        },
        {
          value: 4,
          label: 'Marketing'
        },
        {
          value: 5,
          label: 'Event Management'
        }
      ],
      optionsRole: [
        {
          value: 0,
          label: 'ADMIN'
        },
        {
          value: 1,
          label: 'QAM'
        },
        {
          value: 2,
          label: 'QAC'
        },
        {
          value: 3,
          label: 'STAFF'
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
    EventBus.$on('OpenEditUser', (val, newVal) => {
      this.dialogVisible = val
      this.formData.id = newVal.id
      this.formData.full_name = newVal.full_name
      this.formData.department = newVal.department
      this.formData.date_of_birth = newVal.date_of_birth
      this.formData.email = newVal.email
      this.formData.password = ''
      this.formData.status = newVal.status
      this.formData.role = newVal.role
      this.formData.gender = newVal.gender
    })
    EventBus.$on('hideDeleteConfirmDialog', () => {
      this.dialogVisible = false
    })
  },
  created () {
    this.dialogVisible = this.propsDialogVisible
  },
  methods: {
    async handleSubmit () {
      const isValid = await this.$refs.obsEditUser.validate()
      if (!isValid) {
        this.$message.warning('Something went wrong')
        return
      }
      this.$emit('handle-submit', this.formData, this.formData.id)
      this.dialogVisible = false
    }
  }
}
</script>

<style>
</style>

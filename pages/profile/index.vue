<template>
  <div class="md:container md:mx-auto pt-6 px-6 md:px-2">
    <div class="block mb-8 grid grid-cols-6 gap-4">
      <div class="col-start-1 col-end-9 md:col-end-3 flex flex-col">
        <div class="max-w-full mx-11">
          <el-card class="bg-white shadow-xl rounded-lg py-3">
            <div class="photo-wrapper p-2">
              <el-upload
                class="avatar-uploader"
                action="#"
                style="text-align-last: center;"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="formData.avatar" :src="formData.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </div>
            <div class="p-2">
              <h3
                class="text-center text-xl text-gray-900 font-medium leading-8"
              >
                {{ currentUser.full_name }}
              </h3>
              <div class="text-center text-gray-400 text-xs font-semibold">
                <p>{{ currentUser.role }}</p>
              </div>
              <table class="text-xs my-3">
                <tbody>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">
                      <div>Gender</div>
                    </td>
                    <td class="px-2 py-2">
                      <div>{{ currentUser.gender }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">
                      <div>Email</div>
                    </td>
                    <td class="px-2 py-2">
                      <div>{{ currentUser.email }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">
                      <div>Date of birth</div>
                    </td>
                    <td class="px-2 py-2">
                      <div>{{ currentUser.date_of_birth }}</div>
                    </td>
                  </tr>
                  <!-- About me -->
                  <!-- <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">About me</td>
                    <td class="px-2 py-2">{{ currentUser.about_me }}</td>
                  </tr> -->
                </tbody>
              </table>
              <div class="text-center my-3" />
            </div>
          </el-card>
        </div>
      </div>

      <el-card
        class="
          main-content
          col-start-1
          md:col-start-3
          col-end-9
          bg-white
          shadow-xl
          rounded-lg
        "
      >
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Profile" name="first">
            <ValidationObserver ref="obsAddAcademicYear" tag="div">
              <form class="space-y-5">
                <!-- Full name -->
                <div>
                  <label class="block mb-1 font-bold text-gray-500">Full name</label>
                  <validation-provider
                    v-slot="{ errors }"
                    :name="'name'"
                    :rules="{ required: true, numeric: false }"
                    class="mb-3"
                    tag="div"
                  >
                    <el-input v-model="formData.name" type="text" placeholder="Name" />
                    <div class="text-error">
                      {{ errors[0] }}
                    </div>
                  </validation-provider>
                </div>
                <!-- Gender-->
                <div>
                  <label class="block mb-1 font-bold text-gray-500">
                    Gender</label>
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
                <!-- DOB-->
                <div>
                  <label class="block mb-1 font-bold text-gray-500">DOB </label>
                  <div class="block">
                    <el-date-picker
                      v-model="formData.date_of_birth"
                      type="date"
                      class="text-gray-500"
                    />
                  </div>
                </div>

                <!-- Email-->
                <div>
                  <label class="block mb-1 font-bold text-gray-500">
                    Email</label>
                  <validation-provider
                    v-slot="{ errors }"
                    :name="'email'"
                    :rules="{ required: true }"
                    class="mb-3"
                    tag="div"
                  >
                    <el-input v-model="formData.email" type="text" placeholder="Email" />
                    <div class="text-error">
                      {{ errors[0] }}
                    </div>
                  </validation-provider>
                </div>

                <!-- Save -->
                <el-button
                  class="
                    block
                    w-full
                    bg-yellow-400
                    hover:bg-yellow-300
                    p-4
                    rounded
                    text-yellow-900
                    hover:text-yellow-800
                    transition
                    duration-300
                  "
                  @click="saveProfile"
                >
                  Save
                </el-button>
              </form>
            </ValidationObserver>
          </el-tab-pane>

          <el-tab-pane label="Password" name="second">
            <ValidationObserver ref="obsAddAcademicYear" tag="div">
              <form class="space-y-5">
                <!-- New Password-->
                <div>
                  <label class="block mb-1 font-bold text-gray-500">New Password</label>
                  <validation-provider
                    v-slot="{ errors }"
                    :name="'password'"
                    :rules="{ required: true, min:6 }"
                    class="mb-3"
                    tag="div"
                    vid="password"
                  >
                    <el-input v-model="formData.password" type="password" placeholder="Enter your password" />
                    <div class="text-error">
                      {{ errors[0] }}
                    </div>
                  </validation-provider>
                </div>
                <!-- Comfirm Password-->
                <div>
                  <label class="block mb-1 font-bold text-gray-500">Comfirm Password</label>
                  <validation-provider
                    v-slot="{ errors }"
                    :name="'confirm password'"
                    rules="required|confirmed:password"
                    class="mb-3"
                    tag="div"
                    data-vv-as="password"
                  >
                    <el-input v-model="confirmPassword" type="password" placeholder="Enter your password" data-vv-as="password" />
                    <div class="text-error">
                      {{ errors[0] }}
                    </div>
                  </validation-provider>
                </div>
                <!-- Save -->
                <el-button
                  class="
                    block
                    w-full
                    bg-yellow-400
                    hover:bg-yellow-300
                    p-4
                    rounded
                    text-yellow-900
                    hover:text-yellow-800
                    transition
                    duration-300
                  "
                  @click="savePassword"
                >
                  Save
                </el-button>
              </form>
            </ValidationObserver>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import * as profile from '@/api/profile.js'
import initToken from '~/mixins/auth.js'

export default {
  name: 'UserProfile',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [initToken],
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: 'Today',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: 'Yesterday',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: 'A week ago',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      activeName: 'first',
      value1: '',
      value2: '',
      formData: {
        id: '',
        avatar: '',
        name: '',
        email: '',
        gnder: '',
        date_of_birth: '',
        password: ''
      },
      confirmPassword: ''
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters['user/getCurrentUser']
    }
  },
  created () {
    this.handleData()
  },

  methods: {
    handleData () {
      setTimeout(() => {
        this.formData.name = this.$store.getters['user/getCurrentUser'].full_name
        this.formData.id = this.$store.getters['user/getCurrentUser'].id
        this.formData.email = this.$store.getters['user/getCurrentUser'].email
        this.formData.gender = this.$store.getters['user/getCurrentUser'].gender
        this.formData.date_of_birth = this.$store.getters['user/getCurrentUser'].date_of_birth
        this.formData.avatar = this.$store.getters['user/getCurrentUser'].avatar
      }, 500)
    },
    handleClick (tab, event) {
      // eslint-disable-next-line no-console
      console.log(tab, event)
    },
    async saveProfile () {
      try {
        const data = await profile.update({
          full_name: this.formData.full_name,
          avatar: this.formData.avatar,
          gender: this.formData.gender,
          date_of_birth: this.formData.date_of_birth
        })
        // eslint-disable-next-line no-console
        console.log('file image', data)
        this.$notify({
          title: 'Success',
          message: 'Update successfully',
          type: 'success'
        })
      } catch (e) {
        this.$notify({
          title: 'Error',
          message: e.response.data.status_code + ' ' + e.response.data.message,
          type: 'error'
        })
      }
    },
    async savePassword () {
      try {
        const data = await profile.update({
          password: this.formData.password
        })
        // eslint-disable-next-line no-console
        console.log('file image', data)
        this.$notify({
          title: 'Success',
          message: 'Update successfully',
          type: 'success'
        })
      } catch (e) {
        this.$notify({
          title: 'Error',
          message: e.response.data.status_code + ' ' + e.response.data.message,
          type: 'error'
        })
      }
    },
    async beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 2048 / 2048 < 2

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      this.initToken()
      try {
        const formData = new FormData()
        formData.append('upload', file)
        const image = await profile.upload(formData)
        this.formData.avatar = image.data.data.url
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('e', e)
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess (res, file) {
      this.formData.avatar = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style>
</style>

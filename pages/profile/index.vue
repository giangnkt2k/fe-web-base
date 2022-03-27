<template>
  <div class="md:container md:mx-auto pt-6 px-6 md:px-2">
    <div class="block mb-8 grid grid-cols-6 gap-4">
      <div class="col-start-1 col-end-9 md:col-end-3 flex flex-col">
        <div class="max-w-full mx-11">
          <el-card class="bg-white shadow-xl rounded-lg py-3">
            <div class="photo-wrapper p-2">
              <img
                class="w-32 h-32 rounded-full mx-auto"
                :src="currentUser.avatar"
                alt="avatar null"
              >
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
                      <div>Phone</div>
                    </td>
                    <!-- get phone number -->
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
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2 flex justify-center">
            <div>Edit Profile</div>
          </div>
          <form class="space-y-5">
            <!-- Full name -->
            <div>
              <label class="block mb-1 font-bold text-gray-500">Full name</label>
              <input
                v-model="currentUser.full_name"
                type="text"
                class="
                  w-full
                  border-2 border-gray-200
                  p-3
                  rounded
                  outline-none
                  focus:border-blue-500
                "
              >
            </div>
            <!-- Gender-->
            <div>
              <label class="block mb-1 font-bold text-gray-500"> Gender</label>
              <div class="mt-2">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="accountType"
                    value="personal"
                  >
                  <span class="ml-2">Male</span>
                </label>

                <label class="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    class="form-radio"
                    name="accountType"
                    value="busines"
                  >
                  <span class="ml-2">Female</span>
                </label>

                <label class="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    class="form-radio"
                    name="accountType"
                    value="busines"
                  >
                  <span class="ml-2">Other</span>
                </label>
              </div>
            </div>
            <!-- DOB-->
            <div>
              <label class="block mb-1 font-bold text-gray-500">DOB </label>
              <div class="block">
                <el-date-picker
                  v-model="currentUser.date_of_birth"
                  type="date"
                  class="text-gray-500"
                />
              </div>
            </div>
            <div>
              <label class="block mb-1 font-bold text-gray-500">Phone Number</label>
              <input
                v-model="currentUser.gender"
                type="text"
                class="
                  w-full
                  border-2 border-gray-200
                  p-3
                  rounded
                  outline-none
                  focus:border-blue-500
                "
              >
            </div>
            <!-- Email-->
            <div>
              <label class="block mb-1 font-bold text-gray-500"> Email</label>
              <input
                v-model="currentUser.email"
                type="email"
                class="
                  w-full
                  border-2 border-gray-200
                  p-3
                  rounded
                  outline-none
                  focus:border-blue-500
                "
              >
            </div>
            <!-- Current Password-->
            <div>
              <label class="block mb-1 font-bold text-gray-500">Current Password</label>
              <input
                type="password"
                class="
                  w-full
                  border-2 border-gray-200
                  p-3
                  rounded
                  outline-none
                  focus:border-blue-500
                "
              >
            </div>
            <!-- New Password-->
            <div>
              <label class="block mb-1 font-bold text-gray-500">New Password</label>
              <input
                type="password"
                class="
                  w-full
                  border-2 border-gray-200
                  p-3
                  rounded
                  outline-none
                  focus:border-blue-500
                "
              >
            </div>
            <!-- Comfirm Password-->
            <div>
              <label class="block mb-1 font-bold text-gray-500">Comfirm Password</label>
              <input
                type="password"
                class="
                  w-full
                  border-2 border-gray-200
                  p-3
                  rounded
                  outline-none
                  focus:border-blue-500
                "
              >
            </div>
            <!-- About me -->
            <div>
              <div>
                <label class="block mb-1 font-bold text-gray-500">About me</label>
                <textarea
                  class="rounded-md border-2 w-full h-48 p-2"
                />
              </div>
            </div>
            <!-- Save -->
            <button
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
            >
              Save
            </button>
          </form>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserProfile',

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
      value1: '',
      value2: ''
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters['user/getCurrentUser']
    }
  }
}
</script>

<style>
</style>

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
                  <label class="block mb-1 font-bold text-gray-500"
                    >Full name</label
                  >
                  <validation-provider
                    v-slot="{ errors }"
                    :name="'name'"
                    :rules="{ required: true, numeric: false }"
                    class="mb-3"
                    tag="div"
                  >
                    <el-input v-model="name" type="text" placeholder="Name" />
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
              <el-radio v-model="gender" label="Male">
                Male
              </el-radio>
              <el-radio v-model="gender" label="Female">
                Female
              </el-radio>
              <el-radio v-model="gender" label="Other">
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
                      v-model="currentUser.date_of_birth"
                      type="date"
                      class="text-gray-500"
                    >
                    </el-date-picker>
                  </div>
                </div>

                <!-- Email-->
                <div>
                  <label class="block mb-1 font-bold text-gray-500">
                    Email</label
                  >
                  <validation-provider
                    v-slot="{ errors }"
                    :name="'email'"
                    :rules="{ required: true }"
                    class="mb-3"
                    tag="div"
                  >
                    <el-input v-model="email" type="text" placeholder="Email" />
                    <div class="text-error">
                      {{ errors[0] }}
                    </div>
                  </validation-provider>
                </div>
                <!-- About me -->
                <div>
                  <div>
                    <label class="block mb-1 font-bold text-gray-500"
                      >About me</label
                    >
                    <textarea
                      class="rounded-md border-2 w-full h-48 p-2"
                    ></textarea>
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
            </ValidationObserver>
          </el-tab-pane>

          <el-tab-pane label="Password" name="second">
            <ValidationObserver ref="obsAddAcademicYear" tag="div">
              <form class="space-y-5">
                <!-- New Password-->
                <div>
                  <label class="block mb-1 font-bold text-gray-500"
                    >New Password</label
                  >
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
                  />
                </div>
                <!-- Comfirm Password-->
                <div>
                  <label class="block mb-1 font-bold text-gray-500"
                    >Comfirm Password</label
                  >
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
                  />
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
            </ValidationObserver>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "UserProfile",
  components: {
    ValidationObserver,
    ValidationProvider,
  },

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
      activeName: "first",
      value1: "",
      value2: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["user/getCurrentUser"];
    },
  },
  created() {
    this.handleData();
  },



  methods: {
    handleData() {
      setTimeout(() => {
        this.name = this.$store.getters["user/getCurrentUser"].full_name;
        this.email = this.$store.getters["user/getCurrentUser"].email;
        this.gender = this.$store.getters["user/getCurrentUser"].gender;
      }, 500);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style>
</style>

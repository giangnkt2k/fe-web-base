<template>
  <div>
    <el-dialog
      title="Create New Academic Year"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <ValidationObserver
        ref="obsAddAcademicYear"
        tag="div"
      >
        <el-card shadow="always">
          <h2>Generate Information</h2>
          <div class="row-input grid grid-cols-1 gap-4">
            <div class="col-span-1">
              <div class="mams-label">
                Title
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
          <div class="row-input grid grid-cols-2 gap-4">
            <div class="col-span-2 md:col-span-1">
              <div class="mams-label">
                Category
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'category'"
                :rules="{ required: true }"
                class="mb-3"
                tag="div"
              >
                <el-select v-model="formData.category" class="item-input" placeholder="Select category">
                  <el-option
                    v-for="item in optionsCategory"
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
            <div class="col-span-2 md:col-span-1">
              <div class="mams-label">
                Academic Year
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'academic year'"
                :rules="{ required: true }"
                class="mb-3"
                tag="div"
              >
                <el-select v-model="formData.academicYear" class="item-input" placeholder="Select Academic Year">
                  <el-option
                    v-for="item in optionsAcademicYear"
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
          <div class="row-input grid grid-cols-1 gap-4">
            <div class="col-span-1">
              <div class="mams-label">
                Pictures Header
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'picture'"
                :rules="{ required: true }"
                class="mb-3"
                tag="div"
              >
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="formData.picture" :src="formData.picture" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
          </div>
          <div class="row-input grid grid-cols-1 gap-4">
            <div class="col-span-1">
              <div class="mams-label">
                File Upload
              </div>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="formData.fileList"
              >
                <el-button size="small" type="primary">
                  Click to upload
                </el-button>
                <div slot="tip" class="el-upload__tip">
                  jpg/png files with a size less than 500kb
                </div>
              </el-upload>
            </div>
          </div>
          <div class="row-input grid grid-cols-1 gap-4">
            <div class="col-span-1">
              <div class="mams-label">
                Content
              </div>
              <ckeditor-nuxt v-model="contentHolder" :config="editorConfig" />
              <validation-provider
                v-slot="{ errors }"
                :name="'content'"
                :rules="{ required: true }"
                class="mb-3"
                tag="div"
              >
                <!-- <ckeditor v-model="formData.content" /> -->
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
// import ckeditor from '@/components/ckeditor/index.vue'

export default {
  name: 'ComponentCreateBuilding',
  components: {
    ValidationObserver,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } }
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
        title: '',
        category: '',
        picture: '',
        academicYear: '',
        content: '',
        fileList: []
      },
      editorConfig: {
        simpleUpload: {
          uploadUrl: 'assets/ck',
          headers: {
            Authorization: 'optional_token'
          }
        }
      },
      contentHolder: ''
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
  },
  created () {
    this.dialogVisible = this.propsDialogVisible
  },
  methods: {
    async handleSubmit () {
      const isValid = await this.$refs.obsAddAcademicYear.validate()
      if (!isValid) {
        this.$message.warning('Something went wrong')
        return
      }
      // eslint-disable-next-line no-console
      console.log('fdata', this.formData)
      this.$emit('handle-submit', this.formData)
      this.dialogVisible = false
    },
    // file
    handleRemove (file, fileList) {
      // eslint-disable-next-line no-console
      console.log(file, fileList)
    },
    handlePreview (file) {
      // eslint-disable-next-line no-console
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`)
    },
    // picture
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
.el-range-editor.el-input__inner {
  width: 100%;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-blurred {
    height: 600px;
  }
  .ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-focused {
    height: 600px;
  }
</style>

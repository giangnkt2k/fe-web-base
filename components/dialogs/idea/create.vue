<template>
  <div>
    <el-dialog
      title="Create New Idea"
      :visible.sync="dialogVisible"
      append-to-body
      width="80%"
      :close-on-click-modal="false"
    >
      <ValidationObserver ref="obsAddIdea" tag="div">
        <el-card shadow="always">
          <h2>General information</h2>
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
                <el-input
                  v-model="formData.title"
                  type="text"
                  placeholder="Enter title"
                />
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
          </div>
          <div class="row-input grid grid-cols-2 gap-4">
            <div class="col-span-2">
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
                <el-select
                  v-model="formData.category_id"
                  class="item-input"
                  placeholder="Select category"
                >
                  <el-option
                    v-for="item in optionsCategory"
                    :key="item.value"
                    :label="item.name"
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
                Pictures Header
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'picture'"
                class="mb-3"
                tag="div"
              >
                <el-upload
                  action="#"
                  :before-upload="beforeUploadThumbnail"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus" />
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
                action="#"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
              >
                <el-button size="small" type="primary">
                  Click to upload
                </el-button>
              </el-upload>
            </div>
          </div>
          <div class="row-input grid grid-cols-1 gap-4">
            <div class="col-span-1">
              <div class="mams-label">
                Content
              </div>
              <ckeditor-nuxt
                v-model="formData.content"
                :config="editorConfig"
              />
              <validation-provider
                v-slot="{ errors }"
                :name="'content'"
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
          <div class="row-input grid grid-cols-1 gap-4">
            <div class="col-span-1">
              <div class="mams-label">
                Anonymous
              </div>
              <validation-provider
                v-slot="{ errors }"
                :name="'status'"
                :rules="{ required: true }"
                class="mb-3"
                tag="div"
              >
                <el-switch
                  v-model="formData.is_anonymous"
                  style="display: block"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="Anonymous"
                  inactive-text="Public"
                />
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
          </div>
        </el-card>
      </ValidationObserver>
      <div slot="footer" class="dialog-footer">
        <div>
          <div style="float: left;">
            <el-checkbox v-model="checkedPosting">
              Do you agree to post in {{ aca_year }} ?
            </el-checkbox>
          </div>
          <div>
            <el-button @click="dialogVisible = false">
              Cancel
            </el-button>
            <el-button
              :disabled="!checkedPosting"
              type="primary"
              @click="handleSubmitPosting"
            >
              Confirm
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- <el-dialog
      title="Posting conditions"
      :visible.sync="dialogVisibleAccept"
      append-to-body
      width="30%"
      :close-on-click-modal="false"
    >
      <div class="my-3 text-bold">
        Do you agree to post in {{ aca_year }} ?
      </div>
      <el-checkbox v-model="checkedPosting">
        Agree
      </el-checkbox>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAccept = false">Cancel</el-button>
        <el-button :disabled="!checkedPosting" type="primary" @click="handleSubmitPosting">Confirm</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import * as idea from '@/api/idea.js'
import EventBus from '@/utils/eventBus'
// import ckeditor from '@/components/ckeditor/index.vue'

export default {
  name: 'ComponentCreateBuilding',
  components: {
    ValidationObserver,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    }
  },
  props: {
    propsDialogVisible: {
      type: Boolean,
      default: false,
      required: true
    },
    propsDialogVisibleAccept: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      dialogVisible: false,
      dialogVisibleAccept: false,
      formData: {
        title: '',
        category_id: '',
        content: '',
        files: [],
        thumbnail_url: '',
        is_anonymous: true
      },
      checkedPosting: false,
      optionsCategory: [],
      optionsAcademicYear: [],
      editorConfig: {
        simpleUpload: {
          uploadUrl: 'https://groupbar.me/api/v1/upload',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOjgsInJvbGUiOiJRQU0ifSwiZXhwIjoxNjQ5MTAyMDU2LCJpYXQiOjE2NDY1MTAwNTZ9.PY_4uTLRt1ics1F9xjq2rgrtPjW0XXLuZGGeH6EMxwE'
          }
        }
      },
      contentHolder: '',
      submit: false,
      aca_year: ''
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
    EventBus.$on('OpenCreateAY', (val, categories) => {
      this.dialogVisible = val
      this.optionsCategory = categories
    })
    EventBus.$on('hideDeleteConfirmDialog', () => {
      this.dialogVisible = false
    })
  },
  created () {
    this.dialogVisible = this.propsDialogVisible
    this.getCurrnetAcadeicYear()
  },
  methods: {
    handleContract () {
      this.dialogVisibleAccept = true
    },
    handleSubmitPosting () {
      this.dialogVisibleAccept = false
      this.send()
    },
    handleSubmit () {
      this.handleContract()
    },

    async send () {
      const isValid = await this.$refs.obsAddIdea.validate()
      if (!isValid) {
        return
      }
      this.$emit('handle-submit', this.formData)
      this.dialogVisible = false
      this.$refs.obsAddIdea.reset()
    },

    async getCurrnetAcadeicYear () {
      try {
        const res = await idea.getCurrentAca()
        const data = res.data.data
        // eslint-disable-next-line no-console
        console.log('acaca', data)
        this.aca_year = data.title
        // eslint-disable-next-line no-console
        console.log('this data', this.activities)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    beforeUploadThumbnail (file, fileList) {
      // eslint-disable-next-line no-console
      this.$emit('handle-import-image', file)
    },
    beforeUpload (file, fileList) {
      // eslint-disable-next-line no-console
      this.$emit('handle-import', file)
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
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      )
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
  border-color: #409eff;
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
.container_footer{
  padding: 20px 25px;
}
.checkbox-left {
  display: inline-block;
  padding: 12px 20px;
}
</style>

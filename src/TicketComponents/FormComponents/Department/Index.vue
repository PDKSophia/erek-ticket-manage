<template>
  <div>
    <Modal
      v-model="showDialog"
      :width="width"
      :title="title"
      :mask-closable="false"
      :closable="false"
    >
      <Form
        class="departform-container"
        ref="departform"
        :model="departform"
        :rules="depRuleValidate"
        :label-width="80"
      >
        <FormItem label="部门名称" class="form-item-container" prop="depart_name">
          <Input type="text" v-model="departform.depart_name" placeholder="部门名称"/>
        </FormItem>
        <FormItem label="部门人数" class="form-item-container" prop="depart_count">
          <Input type="text" v-model="departform.depart_count" placeholder="部门人数"/>
        </FormItem>
        <FormItem label="部门简介" class="form-item-container" prop="depart_content">
          <Input
            v-model="departform.depart_content"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20 }"
            placeholder="部门简介..."
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="onHandleCallback">算了吧</Button>
        <Button type="primary" @click="onHandleClickSubmit('departform')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'DepsForm',
  data() {
    return {
      showDialog: false,
      title: '',
      width: 500,
      departform: {
        depart_name: '',
        depart_content: '',
        depart_count: '',
      },
      depRuleValidate: {
        depart_name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        depart_count: [
          { required: true, message: '请输入部门人数', trigger: 'blur' }
        ],
        depart_content: [
          { required: true, message: '请输入部门简介', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    clearData() {
      Object.keys(this.departform).forEach(key => {
        this.departform[key] = ''
      })
    },
    onHandleClickSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let emitOptions = { ...this.departform }
          this.$emit('onCallbackForm', emitOptions, 'submit')
          this.clearData()
        }
      })
    },
    onHandleCallback() {
      let emitOptions = {}
      this.$emit('onCallbackForm', emitOptions, 'cancle')
      this.clearData()
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formType: {
      type: String,
      default: 's'
    },
    formTitle: {
      type: String,
      default: 'new '
    },
    formWidth: {
      type: Number,
      default: 520
    }
  },
  watch: {
    visible(newVal, oldVal) {
      this.$nextTick(() => {
        this.showDialog = newVal
      })
    },
    formTitle(newVal, oldVal) {
      this.$nextTick(() => {
        this.title = newVal
      })
    },
    formWidth(newVal, oldVal) {
      this.$nextTick(() => {
        this.width = newVal
      })
    },
    formData: {
      handler(newVal) {
        if (newVal === null) {
          this.departform = {
            depart_name: '',
            depart_content: '',
            depart_count: '',
          }
        } else {
          this.$nextTick(() => {
            this.departform = { ...this.departform, ...newVal }
          })
        }
      },
      deep: true
    }
  },
  mounted() {
  },
}
</script>

<style>
</style>

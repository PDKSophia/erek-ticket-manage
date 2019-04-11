<template>
  <div>
    <Modal
      v-model="showDialog"
      :width="width"
      :title="title"
      :mask-closable="false"
      :closable="false"
    >
      <Form ref="tickForm" :model="tickForm" :rules="airPosValidate" :label-width="80">
        <FormItem label="坐席" prop="text">
          <Input v-model="tickForm.text" placeholder="坐席..."/>
        </FormItem>
        <FormItem label="价格" prop="price">
          <InputNumber style="width: 100%" v-model="tickForm.price" placeholder="价格..."/>
        </FormItem>
        <FormItem label="总票数" prop="count">
          <InputNumber style="width: 100%" v-model="tickForm.count" placeholder="总票数..."/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="onHandleCallback">算了吧</Button>
        <Button type="primary" @click="onHandleClickSubmit('tickForm')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>

export default {
  name: 'AirPositionForm',
  data() {
    return {
      showDialog: false,
      title: '',
      width: 500,
      tickForm: {
        text: '',
        price: 0,
        count: 0,
      },
      airPosValidate: {
        text: [{ required: true, message: '坐席不能为空', tigger: 'blur' }],
        price: [{ required: true, type: 'number', message: '价格不能为空', tigger: 'blur' }],
        count: [{ required: true, type: 'number', message: '数量不能为空', tigger: 'blur' }]
      }
    }
  },
  methods: {
    clearData() {
      Object.keys(this.tickForm).forEach(key => {
        if (key === 'price' || key === 'count') {
          this.tickForm[key] = 0
        } else {
          this.tickForm[key] = ''
        }
      })
    },
    onHandleClickSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let emitOptions = { ...this.tickForm }
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
      default: 'create'
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
          this.tickForm = {
            text: '',
            price: 0,
            count: 0,
          }
        } else {
          this.$nextTick(() => {
            this.tickForm = { ...this.tickForm, ...newVal }
          })
        }
      },
      deep: true
    }
  },
}
</script>

<style>
</style>

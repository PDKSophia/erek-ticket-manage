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
        class="city_form-container"
        ref="city_form"
        :model="city_form"
        :rules="cityRuleValidate"
        :label-width="80"
      >
        <FormItem label="城市名称" class="form-item-container" prop="city_name">
          <Input type="text" v-model="city_form.city_name" placeholder="城市名"/>
        </FormItem>
        <FormItem label="城市状态" prop="city_status">
          <RadioGroup v-model="city_form.city_status">
            <Radio label="1">省会</Radio>
            <Radio label="0">其他</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="城市标签" prop="city_type">
          <Select v-model="city_form.city_type">
            <Option v-for="(item, index) in typeList" :value="item.key" :key="index">{{ item.text }}</Option>
          </Select>
        </FormItem>
        <FormItem label="城市简介" prop="city_desc">
          <Input
            v-model="city_form.city_desc"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10 }"
            placeholder="简介..."
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="onHandleCallback">算了吧</Button>
        <Button type="primary" @click="onHandleClickSubmit('city_form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { retrieveDepsList } from 'service/api'
import { cityType } from 'js/app/global-config'

export default {
  name: 'StaffForm',
  data() {
    return {
      showDialog: false,
      title: '',
      width: 500,
      typeList: [],
      city_form: {
        city_name: '',
        city_status: '',
        city_desc: '',
        city_type: ''
      },
      cityRuleValidate: {
        city_name: [{ required: true, message: '城市名称不能为空', tigger: 'blur' }],
        city_status: [{ required: true, message: '城市状态必选', tigger: 'change' }],
        city_desc: [
          { required: true, message: '请输入城市简介', trigger: 'blur' },
          {
            type: 'string',
            min: 10,
            message: '不能少于10个字符串',
            trigger: 'blur'
          }
        ],
        city_type: [{ required: true, message: '需选择城市标签' }]
      }
    }
  },
  methods: {
    clearData() {
      Object.keys(this.city_form).forEach(key => {
        this.city_form[key] = ''
      })
    },
    onHandleClickSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let emitOptions = { ...this.city_form }
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
          this.city_form = {
            city_name: '',
            city_status: '',
            city_desc: ''
          }
        } else {
          this.$nextTick(() => {
            this.city_form = { ...this.city_form, ...newVal }
          })
        }
      },
      deep: true
    }
  },
  mounted() {
    this.typeList = [...cityType]
  }
}
</script>

<style>
</style>

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
        class="bus_pos-container"
        ref="air_pos_form"
        :model="air_pos_form"
        :rules="airPosValidate"
        :label-width="80"
      >
        <FormItem label="车站名称" prop="air_name">
          <Input v-model="air_pos_form.air_name" placeholder="车站名称..."/>
        </FormItem>
        <FormItem label="所属城市" prop="cityId">
          <Select v-model="air_pos_form.cityId">
            <Option
              v-for="(city, index) in cityList"
              :value="city.id"
              :key="index"
            >{{ city.city_name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="车站简介" prop="desc">
          <Input
            v-model="air_pos_form.desc"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10 }"
            placeholder="简介..."
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="onHandleCallback">算了吧</Button>
        <Button type="primary" @click="onHandleClickSubmit('air_pos_form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { retrieveCityList } from 'service/api'

export default {
  name: 'AirPositionForm',
  data() {
    return {
      showDialog: false,
      title: '',
      width: 500,
      cityList: [], // 城市列表
      air_pos_form: {
        air_name: '',
        desc: '',
        cityId: '',
      },
      airPosValidate: {
        air_name: [{ required: true, message: '车站名称不能为空', tigger: 'blur' }],
        cityId: [{ required: true, message: '必须勾选城市', }],
        desc: [
          { required: true, message: '请输入车站简介', trigger: 'blur' },
          {
            type: 'string',
            min: 10,
            message: '不能少于10个字符串',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    clearData() {
      Object.keys(this.air_pos_form).forEach(key => {
        this.air_pos_form[key] = ''
      })
    },
    onHandleClickSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let emitOptions = { ...this.air_pos_form }
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
          this.air_pos_form = {
            air_name: '',
            desc: '',
            cityId: '',
          }
        } else {
          this.$nextTick(() => {
            this.air_pos_form = { ...this.air_pos_form, ...newVal }
          })
        }
      },
      deep: true
    }
  },
  async mounted() {
    await retrieveCityList({
      pageNum: 1,
      pageSize: 100
    }).then(res => {
      this.cityList = [...res.list]
    })
  }
}
</script>

<style>
</style>

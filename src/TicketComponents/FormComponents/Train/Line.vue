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
        ref="busLineForm"
        :model="busLineForm"
        :rules="busLineValidate"
        :label-width="80"
      >
        <FormItem label="班次名称" prop="name">
          <Input v-model="busLineForm.name" placeholder="班次名称..."/>
        </FormItem>
        <FormItem label="班次价格" prop="price">
          <InputNumber style="width: 100%" v-model="busLineForm.price" placeholder="班次价格..."/>
        </FormItem>
        <FormItem label="总票数" prop="count">
          <InputNumber style="width: 100%" v-model="busLineForm.count"/>
        </FormItem>
        <FormItem label="起始城市" prop="fromCityId">
          <Select v-model="busLineForm.fromCityId">
            <Option
              v-for="(city, index) in citys"
              :value="city.id"
              :key="index"
            >{{ city.city_name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="目的城市" prop="toCityId">
          <Select v-model="busLineForm.toCityId">
            <Option
              v-for="(city, index) in citys"
              :value="city.id"
              :key="index"
            >{{ city.city_name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="起始站点" prop="fromPosId">
          <Select v-model="busLineForm.fromPosId">
            <Option
              v-for="(pos, index) in positions"
              :value="pos.id"
              :key="index"
            >{{ pos.bus_name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="目的站点" prop="toPosId">
          <Select v-model="busLineForm.toPosId">
            <Option
              v-for="(pos, index) in positions"
              :value="pos.id"
              :key="index"
            >{{ pos.bus_name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="发车时间" prop="startTime">
          <DatePicker
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择发车时间"
            v-model="busLineForm.startTime"
            style="width: 100%"
          ></DatePicker>
        </FormItem>
        <FormItem label="到达时间" prop="arriveTime">
          <DatePicker
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择发车时间"
            v-model="busLineForm.arriveTime"
            style="width: 100%"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="onHandleCallback">算了吧</Button>
        <Button type="primary" @click="onHandleClickSubmit('busLineForm')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { retrieveCityList, retrieveBusPostionList } from 'service/api'

export default {
  name: 'TrainLineForm',
  computed: mapState({
    isFetch: state => state.app.isFetch,
    cityList: state => state.app.cityList,
    busPosList: state => state.app.busPosList
  }),
  data() {
    return {
      showDialog: false,
      title: '',
      width: 500,
      citys: [],
      positions: [],
      busLineForm: {
        name: '',
        price: 0,
        count: 0,
        fromCityId: '',
        toCityId: '',
        fromPosId: '',
        toPosId: '',
        startTime: '',
        arriveTime: '',
      },
      busLineValidate: {
        name: [{ required: true, message: '名称不能为空', tigger: 'blur' }],
        price: [{ required: true, type: 'number', message: '价格不能为空', tigger: 'blur' }],
        count: [{ required: true, type: 'number', message: '数量不能为空', tigger: 'blur' }],
        fromCityId: [{ required: true, message: '起始城市不能为空' }],
        toCityId: [{ required: true, message: '终点城市不能为空' }],
        fromPosId: [{ required: true, message: '起始站点不能为空' }],
        toPosId: [{ required: true, message: '目的站点不能为空' }],
        startTime: [{ required: true, type: 'date', message: '开始时间不能为空', tigger: 'change' }],
        arriveTime: [{ required: true, type: 'date', message: '到达时间不能为空', tigger: 'change' }],
      }
    }
  },
  methods: {
    clearData() {
      Object.keys(this.busLineForm).forEach(key => {
        if (key === 'price' || key === 'count') {
          this.busLineForm[key] = 0
        } else {
          this.busLineForm[key] = ''
        }
      })
    },
    onHandleClickSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fromCityName = this.$utils.filterArray(this.cityList, 'id', this.busLineForm.fromCityId)
          let toCityName = this.$utils.filterArray(this.cityList, 'id', this.busLineForm.toCityId)
          let fromPosName = this.$utils.filterArray(this.busPosList, 'id', this.busLineForm.fromPosId)
          let toPosName = this.$utils.filterArray(this.busPosList, 'id', this.busLineForm.toPosId)
          let prefix = {
            fromCityName: fromCityName[0].city_name,
            toCityName: toCityName[0].city_name,
            fromPosName: fromPosName[0].bus_name,
            toPosName: toPosName[0].bus_name,
          }
          let options = {
            ...this.busLineForm,
            prefix: JSON.stringify(prefix),
          }
          this.$emit('onCallbackForm', options, 'submit')
          // this.clearData()
          setTimeout(() => {
            this.clearData()
          }, 100)
        }
      })

    },
    onHandleCallback() {
      let options = {}
      this.$emit('onCallbackForm', options, 'cancle')
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
          this.busLineForm = {
            name: '',
            price: 0,
            count: 0,
            fromCityId: '',
            toCityId: '',
            fromPosId: '',
            toPosId: '',
            startTime: '',
            arriveTime: '',
          }
        } else {
          this.$nextTick(() => {
            this.busLineForm = { ...this.busLineForm, ...newVal }
          })
        }
      },
      deep: true
    }
  },
  async mounted() {
    const payloads = {
      pageNum: 1,
      pageSize: 100
    }

    if (this.isFetch) {
      this.citys = [...this.cityList]
      this.positions = [...this.busPosList]
    } else {
      Promise.all([retrieveCityList(payloads), retrieveBusPostionList(payloads)]).then(res => {
        this.citys = [...res[0].list]
        this.positions = [...res[1].posList]
      })
    }
  }
}
</script>

<style>
</style>

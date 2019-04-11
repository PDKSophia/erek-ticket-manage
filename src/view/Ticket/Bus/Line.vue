<template>
  <div class="city-container">
    <div class="time-container">
      <Row style="width: 50%" :gutter="32">
        <i-col span="24">
          <Form ref="busLineForm" :model="busLineForm" :rules="ruleValidate" :label-width="80">
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
            <FormItem>
              <Button type="primary" @click="handleSubmit('busLineForm')">新建</Button>
              <Button @click="handleReset('busLineForm')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { retrieveCityList, retrieveBusPostionList } from 'service/api'

export default {
  name: 'BusTime',
  computed: mapState({
    isFetch: state => state.app.isFetch,
    cityList: state => state.app.cityList,
    busPosList: state => state.app.busPosList
  }),
  data() {
    return {
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
      initDataLoading: true,
      ruleValidate: {
        name: [{ required: true, message: '名称不能为空', tigger: 'blur' }],
        price: [{ required: true, type: 'number', message: '价格不能为空', tigger: 'blur' }],
        count: [{ required: true, type: 'number', message: '数量不能为空', tigger: 'blur' }],
        fromCityId: [{ required: true, message: '起始城市不能为空' }],
        toCityId: [{ required: true, message: '终点城市不能为空' }],
        fromPosId: [{ required: true, message: '起始站点不能为空' }],
        toPosId: [{ required: true, message: '目的站点不能为空' }],
        startTime: [{ required: true, type: 'date', message: '发车时间不能为空', tigger: 'change' }],
        arriveTime: [{ required: true, type: 'date', message: '到达时间不能为空', tigger: 'change' }],
      }
    };
  },
  methods: {
    async handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          let fromCityName = this.$utils.filterArray(this.citys, 'id', this.busLineForm.fromCityId)
          let toCityName = this.$utils.filterArray(this.citys, 'id', this.busLineForm.toCityId)
          let fromPosName = this.$utils.filterArray(this.positions, 'id', this.busLineForm.fromPosId)
          let toPosName = this.$utils.filterArray(this.positions, 'id', this.busLineForm.toPosId)
          let prefix = {
            fromCityName: fromCityName[0].city_name,
            toCityName: toCityName[0].city_name,
            fromPosName: fromPosName[0].bus_name,
            toPosName: toPosName[0].bus_name
          }
          let options = {
            ...this.busLineForm,
            prefix: JSON.stringify(prefix),
          }
          await this.$store.dispatch('createBusLineAsync', options)
          setTimeout(() => {
            this.handleReset('busLineForm')
          }, 100)
        } else {
          this.$utils.toastTips('error', '请确认是否已完成表单的填写!', 1.5);
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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
};
</script>

<style scoped lang="scss">
.city-container {
  width: 100%;
  background-color: #fff;
  padding: 4rem 2rem;
}
.time-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

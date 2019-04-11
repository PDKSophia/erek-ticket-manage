<template>
  <div class="city-container">
    <div class="time-container">
      <Row style="width: 50%" :gutter="32">
        <i-col span="24">
          <Form ref="airLineForm" :model="airLineForm" :rules="ruleValidate" :label-width="80">
            <FormItem label="航班名称" prop="name">
              <Input v-model="airLineForm.name" placeholder="航班名称..."/>
            </FormItem>
            <FormItem label="航空公司" prop="air_company">
              <Select v-model="airLineForm.air_company">
                <Option
                  v-for="(item, index) in airCompany"
                  :value="item.text"
                  :key="index"
                >{{ item.text }}</Option>
              </Select>
            </FormItem>
            <FormItem label="起飞城市" prop="fromCityId">
              <Select v-model="airLineForm.fromCityId">
                <Option
                  v-for="(city, index) in citys"
                  :value="city.id"
                  :key="index"
                >{{ city.city_name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="抵达城市" prop="toCityId">
              <Select v-model="airLineForm.toCityId">
                <Option
                  v-for="(city, index) in citys"
                  :value="city.id"
                  :key="index"
                >{{ city.city_name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="起飞机场" prop="fromPosId">
              <Select v-model="airLineForm.fromPosId">
                <Option
                  v-for="(pos, index) in positions"
                  :value="pos.id"
                  :key="index"
                >{{ pos.air_name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="目的机场" prop="toPosId">
              <Select v-model="airLineForm.toPosId">
                <Option
                  v-for="(pos, index) in positions"
                  :value="pos.id"
                  :key="index"
                >{{ pos.air_name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="起飞时间" prop="startTime">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择起飞时间"
                v-model="airLineForm.startTime"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
            <FormItem label="抵达时间" prop="arriveTime">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择抵达时间"
                v-model="airLineForm.arriveTime"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
            <FormItem label="票价信息">
              <div class="ticket-table">
                <Button
                  class="btn-toggle-data"
                  type="dashed"
                  size="small"
                  icon="ios-add"
                  @click="toggleDialog"
                >新增票价</Button>
                <Table :columns="ticketCols" :data="ticketList"></Table>
              </div>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('airLineForm')">新建</Button>
              <Button @click="handleReset('airLineForm')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </i-col>
      </Row>
    </div>
    <ticket-form
      @onCallbackForm="handleFetchForm"
      :visible="dialog.visible"
      :formData="dialog.formData"
      :formType="dialog.formType"
      :formTitle="dialog.formTitle"
      :formWidth="dialog.formWidth"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { retrieveCityList, retrieveAirPostionList } from 'service/api'
import TicketForm from 'tkcomponents/FormComponents/Air/Ticket.vue'
import { airCompany } from 'js/app/global-config'

export default {
  name: 'AirLine',
  components: {
    TicketForm
  },
  computed: mapState({
    isFetch: state => state.app.isFetch,
    cityList: state => state.app.cityList,
    airPosList: state => state.app.airPosList
  }),
  data() {
    return {
      citys: [],
      positions: [],
      airCompany: [],
      dialog: {
        visible: false,
        formData: null,
        formType: 'create',
        formTitle: '',
        formWidth: 500
      },
      airLineForm: {
        name: '',
        air_company: '',
        fromCityId: '',
        toCityId: '',
        fromPosId: '',
        toPosId: '',
        startTime: '',
        arriveTime: '',
      },
      initDataLoading: true,
      ruleValidate: {
        name: [{ required: true, message: '航班名称不能为空', tigger: 'blur' }],
        air_company: [{ required: true, message: '航班名称不能为空' }],
        fromCityId: [{ required: true, message: '起飞城市不能为空' }],
        toCityId: [{ required: true, message: '抵达城市不能为空' }],
        fromPosId: [{ required: true, message: '起飞机场不能为空' }],
        toPosId: [{ required: true, message: '目的机场不能为空' }],
        startTime: [{ required: true, type: 'date', message: '发车时间不能为空', tigger: 'change' }],
        arriveTime: [{ required: true, type: 'date', message: '到达时间不能为空', tigger: 'change' }],
      },
      ticketList: [],
      ticketCols: [
        {
          title: '坐席',
          align: 'center',
          key: 'text'
        },
        {
          title: '价格',
          align: 'center',
          key: 'price'
        },
        {
          title: '总票数',
          align: 'center',
          key: 'count'
        },
        {
          title: '操作',
          align: 'center',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      var index = params.index;
                      this.deleteTickClick(index)
                    }
                  }
                },
                '删除'
              ),
            ]);
          }
        }
      ],
    };
  },
  methods: {
    async handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          if (this.ticketList.length !== 0) {
            let fromCityName = this.$utils.filterArray(this.citys, 'id', this.airLineForm.fromCityId)
            let toCityName = this.$utils.filterArray(this.citys, 'id', this.airLineForm.toCityId)
            let fromPosName = this.$utils.filterArray(this.positions, 'id', this.airLineForm.fromPosId)
            let toPosName = this.$utils.filterArray(this.positions, 'id', this.airLineForm.toPosId)
            let prefix = {
              fromCityName: fromCityName[0].city_name,
              toCityName: toCityName[0].city_name,
              fromPosName: fromPosName[0].air_name,
              toPosName: toPosName[0].air_name,
            }
            let options = {
              ...this.airLineForm,
              prefix: JSON.stringify(prefix),
              record: JSON.stringify(this.ticketList)
            }
            console.log('@@@', options)
            await this.$store.dispatch('createAirLineAsync', options)
            setTimeout(() => {
              this.handleReset('airLineForm')
            }, 100)
          } else {
            this.$utils.toastTips('error', '务必填写票价!', 1.5)
          }
        } else {
          this.$utils.toastTips('error', '请确认是否已完成表单的填写!', 1.5)
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
      this.ticketList = []
    },
    toggleDialog() {
      this.dialog = {
        visible: true,
        formWidth: 480,
        formType: 'create',
        formData: null,
        formTitle: '新增票价'
      }
    },
    async handleFetchForm(data, type) {
      if (type === 'submit') {
        data.id = this.ticketList.length
        data.sell = 0
        data.surplus = data.count
        this.ticketList.push(data)
      }
      let initailOptions = this.$utils.processInitailDialog()
      this.dialog = { ...initailOptions }
    },
    deleteTickClick(index) {
      this.ticketList.splice(index, 1)
    }
  },
  async mounted() {
    const payloads = {
      pageNum: 1,
      pageSize: 100
    }

    if (this.isFetch) {
      this.citys = [...this.cityList]
      this.positions = [...this.airPosList]
    } else {
      Promise.all([retrieveCityList(payloads), retrieveAirPostionList(payloads)]).then(res => {
        this.citys = [...res[0].list]
        this.positions = [...res[1].posList]
      })
    }
    this.airCompany = [...airCompany]
  }
}
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
.btn-toggle-data {
  width: 100%;
  margin-bottom: 10px;
}
</style>

<template>
  <div class="city-container">
    <div class="time-container">
      <Row style="width: 50%" :gutter="32">
        <i-col span="24">
          <Form ref="trainLineForm" :model="trainLineForm" :rules="ruleValidate" :label-width="80">
            <FormItem label="班次名称" prop="name">
              <Input v-model="trainLineForm.name" placeholder="班次名称..."/>
            </FormItem>
            <FormItem label="起始城市" prop="fromCityId">
              <Select v-model="trainLineForm.fromCityId">
                <Option
                  v-for="(city, index) in citys"
                  :value="city.id"
                  :key="index"
                >{{ city.city_name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="目的城市" prop="toCityId">
              <Select v-model="trainLineForm.toCityId">
                <Option
                  v-for="(city, index) in citys"
                  :value="city.id"
                  :key="index"
                >{{ city.city_name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="起始站点" prop="fromPosId">
              <Select v-model="trainLineForm.fromPosId">
                <Option
                  v-for="(pos, index) in positions"
                  :value="pos.id"
                  :key="index"
                >{{ pos.train_name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="目的站点" prop="toPosId">
              <Select v-model="trainLineForm.toPosId">
                <Option
                  v-for="(pos, index) in positions"
                  :value="pos.id"
                  :key="index"
                >{{ pos.train_name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="发车时间" prop="startTime">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择发车时间"
                v-model="trainLineForm.startTime"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
            <FormItem label="到达时间" prop="arriveTime">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择到达时间"
                v-model="trainLineForm.arriveTime"
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
              <Button type="primary" @click="handleSubmit('trainLineForm')">新建</Button>
              <Button @click="handleReset('trainLineForm')" style="margin-left: 8px">重置</Button>
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
import { retrieveCityList, retrieveTrainPostionList } from 'service/api'
import TicketForm from 'tkcomponents/FormComponents/Train/Ticket.vue'

export default {
  name: 'TrainLine',
  components: {
    TicketForm
  },
  computed: mapState({
    isFetch: state => state.app.isFetch,
    cityList: state => state.app.cityList,
    trainPosList: state => state.app.trainPosList
  }),
  data() {
    return {
      citys: [],
      positions: [],
      dialog: {
        visible: false,
        formData: null,
        formType: 'create',
        formTitle: '',
        formWidth: 500
      },
      trainLineForm: {
        name: '',
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
        fromCityId: [{ required: true, message: '起始城市不能为空' }],
        toCityId: [{ required: true, message: '终点城市不能为空' }],
        fromPosId: [{ required: true, message: '起始站点不能为空' }],
        toPosId: [{ required: true, message: '目的站点不能为空' }],
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
            let fromCityName = this.$utils.filterArray(this.citys, 'id', this.trainLineForm.fromCityId)
            let toCityName = this.$utils.filterArray(this.citys, 'id', this.trainLineForm.toCityId)
            let fromPosName = this.$utils.filterArray(this.positions, 'id', this.trainLineForm.fromPosId)
            let toPosName = this.$utils.filterArray(this.positions, 'id', this.trainLineForm.toPosId)
            let prefix = {
              fromCityName: fromCityName[0].city_name,
              toCityName: toCityName[0].city_name,
              fromPosName: fromPosName[0].train_name,
              toPosName: toPosName[0].train_name,
              ticket: this.ticketList
            }
            let options = {
              ...this.trainLineForm,
              prefix: JSON.stringify(prefix),
            }
            await this.$store.dispatch('createTrainLineAsync', options)
            setTimeout(() => {
              this.handleReset('trainLineForm')
            }, 100)
          }
          else {
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
      this.positions = [...this.trainPosList]
    } else {
      Promise.all([retrieveCityList(payloads), retrieveTrainPostionList(payloads)]).then(res => {
        this.citys = [...res[0].list]
        this.positions = [...res[1].posList]
      })
    }
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

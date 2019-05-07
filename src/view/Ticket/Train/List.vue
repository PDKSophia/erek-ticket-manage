<template>
  <div class="vue-erek-person-setting-container">
    <Tabs size="small">
      <TabPane label="所有火车站点">
        <position-table
          :border="posProps.border"
          :stripe="posProps.stripe"
          :size="posProps.size"
          :data="posProps.data"
          :pagination="posProps.pagination"
          @onHandlePosClick="handlePosClick"
          @onHandlePageNum="handlePositionChangeNum"
          @onHandlePageSize="handlePositionChangeSize"
        />
        <train-pos-form
          @onCallbackForm="handleFetchPosForm"
          :visible="posDialog.visible"
          :formData="posDialog.formData"
          :formType="posDialog.formType"
          :formTitle="posDialog.formTitle"
          :formWidth="posDialog.formWidth"
        />
      </TabPane>
      <TabPane label="所有火车班次">
        <line-table
          :border="lineProps.border"
          :stripe="lineProps.stripe"
          :size="lineProps.size"
          :data="lineProps.data"
          :pagination="lineProps.pagination"
          @onHandleLineClick="handleLineClick"
          @onHandlePageNum="handleLineChangeNum"
          @onHandlePageSize="handleLineChangeSize"
        />
        <train-line-form
          @onCallbackForm="handleFetchLineForm"
          :visible="lineDialog.visible"
          :formData="lineDialog.formData"
          :formType="lineDialog.formType"
          :formTitle="lineDialog.formTitle"
          :formWidth="lineDialog.formWidth"
        />
        <Modal v-model="showView.visible" title="查看票价" @on-ok="toggleShowView">
          <p
            class="text-label"
            v-for="(item, index) in showView.formData.ticket"
          >坐席: {{ item.text }} ; 价格: {{ item.price }} ; 总票数: {{ item.count }} ; 剩余票数: {{ item.surplus }} ; 已卖出: {{ item.sell }}</p>
        </Modal>
      </TabPane>
      <delete-confirm
        @onHandleClickDelete="handleDelete"
        :visible="delDialog.visible"
        :deleteName="delDialog.deleteName"
      />
    </Tabs>
  </div>
</template>

<script>
import PositionTable from 'tkcomponents/FrameComponents/List/Train/Position.vue'
import LineTable from 'tkcomponents/FrameComponents/List/Train/Line.vue'
import TrainPosForm from 'tkcomponents/FormComponents/Train/Position.vue'
import TrainLineForm from 'tkcomponents/FormComponents/Train/Line.vue'
import DeleteConfirm from 'tkcomponents/CommonComponents/DeleteConfirm/Index.vue'
import { retrieveCityList } from 'service/api'
import { mapState } from 'vuex'

export default {
  name: 'TrainList',
  components: {
    PositionTable,
    LineTable,
    TrainPosForm,
    TrainLineForm,
    DeleteConfirm
  },
  computed: mapState({
    posList: state => state.train.posList,
    posPageNum: state => state.train.posPageNum,
    posPageSize: state => state.train.posPageSize,
    posTotal: state => state.train.posTotal,
    lineList: state => state.train.lineList,
    linePageNum: state => state.train.linePageNum,
    linePageSize: state => state.train.linePageSize,
    lineTotal: state => state.train.lineTotal
  }),
  data() {
    return {
      cityList: [],
      posProps: {
        border: true,
        stripe: false,
        size: 'large',
        data: [],
        pagination: {
          hasPage: true,
          pageNum: 0,
          pageSize: 0,
          total: 0
        }
      },
      posDialog: {
        visible: false,
        formData: null,
        formType: 'create',
        formTitle: '',
        formWidth: 500
      },
      lineProps: {
        border: false,
        stripe: true,
        size: 'small',
        data: [],
        pagination: {
          hasPage: true,
          pageNum: 0,
          pageSize: 0,
          total: 0
        }
      },
      lineDialog: {
        visible: false,
        formData: null,
        formType: 'create',
        formTitle: '',
        formWidth: 500
      },
      delDialog: {
        tabPane: 'position',
        visible: false,
        deleteName: '',
        formData: null
      },
      showView: {
        visible: false,
        formData: {}
      }
    };
  },
  methods: {
    async handlePosClick(index, type) {
      let formdata = JSON.parse(JSON.stringify(this.posList[index]))
      switch (type) {
        case 'view':
          console.log(data)
          break
        case 'update':
          let prefix = JSON.parse(formdata.prefix)
          try {
            Object.keys(prefix).map(key => {
              formdata[key] = prefix[key]
            })
          } catch (err) {
            console.log('err')
          }
          delete formdata.prefix
          this.posDialog = {
            visible: true,
            formWidth: 480,
            formType: 'update',
            formData: formdata,
            formTitle: '👉 编辑火车站点'
          }
          break
        case 'delete':
          this.delDialog = {
            tabPane: 'position',
            visible: true,
            deleteName: `火车站点 : ${formdata.train_name}`,
            formData: formdata
          }
          break
        default:
          console.log('no action')
      }
    },
    async handleDelete(type) {
      if (type) {
        if (this.delDialog.tabPane === 'position') {
          await this.$store.dispatch('deleteTrainPosAsync', this.delDialog.formData)
        } else {
          await this.$store.dispatch('deleteTrainLineAsync', this.delDialog.formData)
        }
        await this.upNextTick()
      }
      this.delDialog = {
        tabPane: 'position',
        visible: false,
        deleteName: '',
        formData: null
      }
    },
    toggleShowView() {
      console.log('123')
    },
    async handleLineClick(index, type) {
      let formdata = JSON.parse(JSON.stringify(this.lineList[index]))
      switch (type) {
        case 'view':
          // 将 prefix 解析
          formdata.ticket = (JSON.parse(formdata.prefix)).ticket
          this.showView = {
            visible: true,
            formData: formdata
          }
          break
        case 'update':
          this.lineDialog = {
            visible: true,
            formWidth: 480,
            formType: 'update',
            formData: formdata,
            formTitle: '👉 编辑火车班次信息'
          }
          break
        case 'delete':
          this.delDialog = {
            tabPane: 'line',
            visible: true,
            deleteName: `班次名称 : ${formdata.name}`,
            formData: formdata
          }
          break
        default:
          console.log('no action')
      }
    },
    async handleFetchPosForm(data, type) {
      if (type === 'submit') {
        let citys = this.$utils.filterArray(this.cityList, 'id', data.cityId)
        let prefix = {
          desc: data.desc,
          cityName: citys[0].city_name
        }
        let options = {
          id: data.id,
          train_name: data.train_name,
          cityId: data.cityId,
          prefix: JSON.stringify(prefix)
        }
        await this.$store.dispatch('updateTrainPosAsync', options)
        await this.upNextTick()
      }
      let initailOptions = this.$utils.processInitailDialog()
      this.posDialog = { ...initailOptions }
    },
    async handleFetchLineForm(data, type) {
      if (type === 'submit') {
        console.log(data)
        await this.$store.dispatch('updateTrainLineAsync', data)
        await this.upNextTick()
      }
      let initailOptions = this.$utils.processInitailDialog()
      this.lineDialog = { ...initailOptions }
    },
    async handlePositionChangeNum(current) {
      this.$store.dispatch('setTrainPosPageNum', current)
      await this.$store.dispatch('retrieveTrainPosListAsync', { pageNum: this.posPageNum, pageSize: this.posPageSize })
      await this.upNextTick()
    },
    async handlePositionChangeSize(size) {
      this.$store.dispatch('setTrainPosPageSize', size)
      await this.$store.dispatch('retrieveTrainPosListAsync', { pageNum: this.posPageNum, pageSize: this.posPageSize })
      await this.upNextTick()
    },
    async handleLineChangeNum(current) {
      this.$store.dispatch('setTrainLinePageNum', current)
      await this.$store.dispatch('retrieveTrainLineAsync', { pageNum: this.linePageNum, pageSize: this.linePageSize })
      await this.upNextTick()
    },
    async handleLineChangeSize(size) {
      this.$store.dispatch('setTrainLinePageSize', size)
      await this.$store.dispatch('retrieveTrainLineAsync', { pageNum: this.linePageNum, pageSize: this.linePageSize })
      await this.upNextTick()
    },
    upNextTick() {
      // 将 prefix 的解析
      const list = this.posList.map(item => {
        let prefix = JSON.parse(item.prefix)
        return {
          id: item.id,
          train_name: item.train_name,
          city_name: prefix.cityName,
          desc: prefix.desc
        }
      })
      this.posProps.data = [...list]
      this.posProps.pagination = {
        hasPage: true,
        pageNum: this.posPageNum,
        pageSize: this.posPageSize,
        total: this.posTotal
      }
      // 将 prefix 解析
      const lineList = this.lineList.map(item => {
        let prefix = JSON.parse(item.prefix)
        return {
          ...item,
          fromName: `${prefix.fromCityName}-${prefix.fromPosName}`,
          toName: `${prefix.toCityName}-${prefix.toPosName}`,
          startTime: this.$utils.processToDate(item.startTime),
          arriveTime: this.$utils.processToDate(item.arriveTime)
        }
      })
      this.lineProps.data = [...lineList]
      this.lineProps.pagination = {
        hasPage: true,
        pageNum: this.linePageNum,
        pageSize: this.linePageSize,
        total: this.lineTotal
      }
    },
  },
  async mounted() {
    // get train-positions-list
    this.$store.dispatch('setTrainPosPageNum', 1)
    this.$store.dispatch('setTrainPosPageSize', 20)
    await this.$store.dispatch('retrieveTrainPosListAsync', { pageNum: this.posPageNum, pageSize: this.posPageSize })
    // get train-line-list
    this.$store.dispatch('setTrainLinePageNum', 1)
    this.$store.dispatch('setTrainLinePageSize', 20)
    await this.$store.dispatch('retrieveTrainLineAsync', { pageNum: this.linePageNum, pageSize: this.linePageSize })
    await retrieveCityList({
      pageNum: 1,
      pageSize: 100
    }).then(res => {
      this.cityList = [...res.list]
    })
    await this.upNextTick()
  }
};
</script>

<style scoped lang="scss">
.vue-erek-person-setting-container {
  padding: 16px 22px;
  background-color: #fff;
  height: 100%;
  width: 100%;
}
.text-label {
  line-height: 32px;
  font-size: 14px;
}
</style>

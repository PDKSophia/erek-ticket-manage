<template>
  <div class="vue-erek-person-setting-container">
    <Tabs size="small">
      <TabPane label="所有车站">
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
        <bus-pos-form
          @onCallbackForm="handleFetchPosForm"
          :visible="posDialog.visible"
          :formData="posDialog.formData"
          :formType="posDialog.formType"
          :formTitle="posDialog.formTitle"
          :formWidth="posDialog.formWidth"
        />
      </TabPane>
      <TabPane label="所有班次">
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
        <bus-line-form
          @onCallbackForm="handleFetchLineForm"
          :visible="lineDialog.visible"
          :formData="lineDialog.formData"
          :formType="lineDialog.formType"
          :formTitle="lineDialog.formTitle"
          :formWidth="lineDialog.formWidth"
        />
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
import PositionTable from 'tkcomponents/FrameComponents/List/Bus/Position.vue'
import LineTable from 'tkcomponents/FrameComponents/List/Bus/Line.vue'
import BusPosForm from 'tkcomponents/FormComponents/Bus/Position.vue'
import BusLineForm from 'tkcomponents/FormComponents/Bus/Line.vue'
import DeleteConfirm from 'tkcomponents/CommonComponents/DeleteConfirm/Index.vue'
import { retrieveCityList } from 'service/api'
import { mapState } from 'vuex'

export default {
  name: 'BusList',
  components: {
    PositionTable,
    LineTable,
    BusPosForm,
    BusLineForm,
    DeleteConfirm
  },
  computed: mapState({
    posList: state => state.bus.posList,
    posPageNum: state => state.bus.posPageNum,
    posPageSize: state => state.bus.posPageSize,
    posTotal: state => state.bus.posTotal,
    lineList: state => state.bus.lineList,
    linePageNum: state => state.bus.linePageNum,
    linePageSize: state => state.bus.linePageSize,
    lineTotal: state => state.bus.lineTotal
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
            formTitle: '👉 编辑汽车站点'
          }
          break
        case 'delete':
          this.delDialog = {
            tabPane: 'position',
            visible: true,
            deleteName: `汽车站点 : ${formdata.bus_name}`,
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
          await this.$store.dispatch('deleteBusPosAsync', this.delDialog.formData)
        } else {
          await this.$store.dispatch('deleteBusLineAsync', this.delDialog.formData)
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
    async handleLineClick(index, type) {
      let formdata = JSON.parse(JSON.stringify(this.lineList[index]))
      switch (type) {
        case 'update':
          this.lineDialog = {
            visible: true,
            formWidth: 480,
            formType: 'update',
            formData: formdata,
            formTitle: '👉 编辑汽车班次信息'
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
          bus_name: data.bus_name,
          cityId: data.cityId,
          prefix: JSON.stringify(prefix)
        }
        await this.$store.dispatch('updateBusPosAsync', options)
        await this.upNextTick()
      }
      let initailOptions = this.$utils.processInitailDialog()
      this.posDialog = { ...initailOptions }
    },
    async handleFetchLineForm(data, type) {
      if (type === 'submit') {
        console.log(data)
        await this.$store.dispatch('updateBusLineAsync', data)
        await this.upNextTick()
      }
      let initailOptions = this.$utils.processInitailDialog()
      this.lineDialog = { ...initailOptions }
    },
    async handlePositionChangeNum(current) {
      this.$store.dispatch('setBusPosPageNum', current)
      await this.$store.dispatch('retrieveCityListAsync', { pageNum: this.posPageNum, pageSize: this.posPageSize })
      await this.upNextTick()
    },
    async handlePositionChangeSize(size) {
      this.$store.dispatch('setBusPosPageSize', size)
      await this.$store.dispatch('retrieveCityListAsync', { pageNum: this.posPageNum, pageSize: this.posPageSize })
      await this.upNextTick()
    },
    async handleLineChangeNum(current) {
      this.$store.dispatch('setBusLinePageNum', current)
      await this.$store.dispatch('retrieveBusLineAsync', { pageNum: this.linePageNum, pageSize: this.linePageSize })
      await this.upNextTick()
    },
    async handleLineChangeSize(size) {
      this.$store.dispatch('setBusLinePageSize', size)
      await this.$store.dispatch('retrieveBusLineAsync', { pageNum: this.linePageNum, pageSize: this.linePageSize })
      await this.upNextTick()
    },
    upNextTick() {
      // 将 prefix 的解析
      const list = this.posList.map(item => {
        let prefix = JSON.parse(item.prefix)
        return {
          id: item.id,
          bus_name: item.bus_name,
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
          fromCityName: prefix.fromCityName,
          toCityName: prefix.toCityName,
          fromPosName: prefix.fromPosName,
          toPosName: prefix.toPosName,
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
    // get bus-positions-list
    this.$store.dispatch('setBusPosPageNum', 1)
    this.$store.dispatch('setBusPosPageSize', 5)
    await this.$store.dispatch('retrieveBusPosListAsync', { pageNum: this.posPageNum, pageSize: this.posPageSize })
    // get bus-line-list
    this.$store.dispatch('setBusLinePageNum', 1)
    this.$store.dispatch('setBusLinePageSize', 5)
    await this.$store.dispatch('retrieveBusLineAsync', { pageNum: this.linePageNum, pageSize: this.linePageSize })
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
</style>

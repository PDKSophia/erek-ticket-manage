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
          @onCallbackForm="handleFetchForm"
          :visible="posDialog.visible"
          :formData="posDialog.formData"
          :formType="posDialog.formType"
          :formTitle="posDialog.formTitle"
          :formWidth="posDialog.formWidth"
        />
      </TabPane>
      <TabPane label="所有班次">
        <!-- <line-table
          :border="lineProps.border"
          :stripe="lineProps.stripe"
          :size="lineProps.size"
          :data="lineProps.data"
          :pagination="lineProps.pagination"
          @onHandleClickItem="handleEmitTableValue"
        />-->
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
import DeleteConfirm from 'tkcomponents/CommonComponents/DeleteConfirm/Index.vue'
import { retrieveCityList } from 'service/api'
import { mapState } from 'vuex'

export default {
  name: 'BusList',
  components: {
    PositionTable,
    LineTable,
    BusPosForm,
    DeleteConfirm
  },
  computed: mapState({
    posList: state => state.bus.posList,
    posPageNum: state => state.bus.posPageNum,
    posPageSize: state => state.bus.posPageSize,
    posTotal: state => state.bus.posTotal
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
            formTitle: '👉 编辑城市站点'
          }
          break
        case 'delete':
          this.delDialog = {
            tabPane: 'position',
            visible: true,
            deleteName: `城市站点 : ${formdata.bus_name}`,
            formData: formdata
          }
          break
        default:
          console.log('no action')
      }
    },
    async handleDelete(type) {
      if (type) {
        await this.$store.dispatch('deleteBusPosAsync', this.delDialog.formData)
        await this.upNextTick()
      }
      this.delDialog = {
        tabPane: 'position',
        visible: false,
        deleteName: '',
        formData: null
      }
    },
    async handleFetchForm(data, type) {
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
    },
  },
  async mounted() {
    this.$store.dispatch('setBusPosPageNum', 1)
    this.$store.dispatch('setBusPosPageSize', 5)
    await this.$store.dispatch('retrieveBusPosListAsync', { pageNum: this.posPageNum, pageSize: this.posPageSize })
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

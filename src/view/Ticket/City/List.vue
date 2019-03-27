<template>
  <div class="erek-standard-container">
    <vue-stand-card :taskList="statusList"/>
    <vue-divider :bgColor="divider.bgColor" :height="divider.height"/>
    <div class="erek-standard-list">
      <h3>所有城市列表</h3>
      <Button type="dashed" long icon="ios-add" @click="handleToAddClick">新增</Button>
      <erek-stand-list
        :data="city.data"
        :pagination="city.pagination"
        @onHandleActions="handleActions"
        v-if="city.data.length !== 0"
        @onHandlePageNum="handleChangeNum"
        @onHandlePageSize="handleChangeSize"
      ></erek-stand-list>
      <no-content v-else/>
      <city-form
        @onCallbackForm="handleFetchForm"
        :visible="dialog.visible"
        :formData="dialog.formData"
        :formType="dialog.formType"
        :formTitle="dialog.formTitle"
        :formWidth="dialog.formWidth"
      />
      <delete-confirm
        @onHandleClickDelete="handleDelete"
        :visible="delDialog.visible"
        :deleteName="delDialog.deleteName"
      />
    </div>
  </div>
</template>

<script>
import VueStandCard from 'tkcomponents/CommonComponents/StandCard/Index.vue'
import VueDivider from 'components/CommonComponents/Divider/Index.vue'
import ErekStandList from 'tkcomponents/FrameComponents/List/City.vue'
import NoContent from 'components/CommonComponents/NoContent/Index.vue'
import CityForm from 'tkcomponents/FormComponents/City/Index.vue'
import DeleteConfirm from 'tkcomponents/CommonComponents/DeleteConfirm/Index.vue'
import { mapState } from 'vuex'

export default {
  name: 'CityListComponents',
  components: {
    VueStandCard,
    VueDivider,
    ErekStandList,
    NoContent,
    CityForm,
    DeleteConfirm
  },
  computed: mapState({
    statusList: state => state.city.statusList,
    list: state => state.city.list,
    taskStatusList: state => state.city.taskStatusList,
    pageNum: state => state.city.pageNum,
    pageSize: state => state.city.pageSize,
    total: state => state.city.total
  }),
  data() {
    return {
      taskList: [],
      divider: {
        bgColor: '#f5f7f9',
        height: '30px'
      },
      city: {
        data: [],
        pagination: {
          hasPage: true,
          pageNum: 0,
          pageSize: 0,
          total: 0
        }
      },
      dialog: {
        visible: false,
        formData: null,
        formType: 'create',
        formTitle: '',
        formWidth: 500
      },
      delDialog: {
        visible: false,
        deleteName: '',
        formData: null
      }
    }
  },
  methods: {
    handleToAddClick() {
      this.$router.push({ path: '/erek-manage/erek-city/add-city' })
    },
    async handleChangeNum(current) {
      this.$store.dispatch('setCityPageNum', current)
      await this.$store.dispatch('retrieveCityListAsync', { pageNum: this.pageNum, pageSize: this.pageSize })
      await this.upNextTick()
    },
    async handleChangeSize(size) {
      this.$store.dispatch('setCityPageSize', size)
      await this.$store.dispatch('retrieveCityListAsync', { pageNum: this.pageNum, pageSize: this.pageSize })
      await this.upNextTick()
    },
    upNextTick() {
      this.city.data = [...this.list]
      this.city.pagination = {
        hasPage: true,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        total: this.total
      }
    },
    async handleFetchForm(data, type) {
      if (type === 'submit') {
        if (this.dialog.formType === 'create') {
          await this.$store.dispatch('createCityAsync', data)
          await this.upNextTick()
        } else {
          await this.$store.dispatch('updateCityAsync', data)
          await this.upNextTick()
        }
      }
      let initailOptions = this.$utils.processInitailDialog()
      this.dialog = { ...initailOptions }
    },
    async handleDelete(type) {
      if (type) {
        await this.$store.dispatch('deleteCityAsync', this.delDialog.formData)
        await this.upNextTick()
      }
      this.delDialog = {
        visible: false,
        deleteName: '',
        formData: null
      }
    },
    async handleActions(type, data) {
      switch (type) {
        case 'update':
          let formdata = JSON.parse(JSON.stringify(data))
          this.dialog = {
            visible: true,
            formWidth: 480,
            formType: 'update',
            formData: formdata,
            formTitle: '🏠 编辑城市'
          }
          break
        case 'delete':
          this.delDialog = {
            visible: true,
            deleteName: `城市 : ${data.city_name}`,
            formData: data
          }
          break
        default:
          console.log('no action')
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('retrieveCityStatusAsync')
    this.$store.dispatch('setCityPageNum', 1)
    this.$store.dispatch('setCityPageSize', 5)
    await this.$store.dispatch('retrieveCityListAsync', { pageNum: this.pageNum, pageSize: this.pageSize })
    await this.upNextTick()
  }
}
</script>

<style scoped lang="scss">
.erek-standard-container {
  // height: 100%
  width: 100%;
  background-color: #fff;

  > .erek-standard-list {
    padding: 12px 24px;
    line-height: 40px;
  }
}
</style>

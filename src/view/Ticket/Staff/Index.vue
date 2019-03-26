<template>
  <div class="erek-card-container">
    <div class="erek-depart-add">
      <Button type="dashed" long icon="ios-add" @click="handleToAddCity">新增</Button>
    </div>
    <vue-divider :bg-color="divider.bgColor" :height="divider.height"/>
    <div class="erek-card-list">
      <staff-list
        @onHandleActions="handleActions"
        :data="staff.data"
        :pagination="staff.pagination"
        @onHandlePageNum="handleChangeNum"
        @onHandlePageSize="handleChangeSize"
      />
    </div>
    <staff-form
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
</template>

<script>
import StaffList from 'tkcomponents/FrameComponents/List/Staff.vue'
import VueDivider from 'components/CommonComponents/Divider/Index.vue'
import StaffForm from 'tkcomponents/FormComponents/Staff/Index.vue'
import DeleteConfirm from 'tkcomponents/CommonComponents/DeleteConfirm/Index.vue'
import { mapState } from 'vuex'

export default {
  name: 'TicketStaff',
  components: {
    StaffList,
    VueDivider,
    StaffForm,
    DeleteConfirm
  },
  data() {
    return {
      divider: {
        bgColor: '#f5f7f9',
        height: '20px'
      },
      staff: {
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
    };
  },
  computed: mapState({
    isFetch: state => state.staff.isFetch,
    list: state => state.staff.list,
    pageNum: state => state.staff.pageNum,
    pageSize: state => state.staff.pageSize,
    total: state => state.staff.total
  }),
  methods: {
    handleToAddCity() {
      this.dialog.visible = true
      this.dialog.formWidth = 480
      this.dialog.formTitle = '❤️ 新增员工'
    },
    async handleChangeNum(current) {
      this.$store.dispatch('setStaffPageNum', current)
      await this.$store.dispatch('retrieveStaffListAsync', { pageNum: this.pageNum, pageSize: this.pageSize })
      await this.upNextTick()
    },
    async handleChangeSize(size) {
      this.$store.dispatch('setStaffPageSize', size)
      await this.$store.dispatch('retrieveStaffListAsync', { pageNum: this.pageNum, pageSize: this.pageSize })
      await this.upNextTick()
    },
    upNextTick() {
      this.staff.data = [...this.list]
      this.staff.pagination = {
        hasPage: true,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        total: this.total
      }
    },
    async handleFetchForm(data, type) {
      if (type === 'submit') {
        if (this.dialog.formType === 'create') {
          await this.$store.dispatch('createStaffsAsync', data)
          await this.upNextTick()
        } else {
          await this.$store.dispatch('updateStaffAsync', data)
          await this.upNextTick()
        }
      }
      let initailOptions = this.$utils.processInitailDialog()
      this.dialog = { ...initailOptions }
    },
    async handleDelete(type) {
      if (type) {
        await this.$store.dispatch('deleteStaffsAsync', this.delDialog.formData)
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
        case 'view':
          console.log(data)
          break
        case 'update':
          let formdata = JSON.parse(JSON.stringify(data))
          this.dialog = {
            visible: true,
            formWidth: 480,
            formType: 'update',
            formData: formdata,
            formTitle: '👉 编辑员工'
          }
          break
        case 'delete':
          this.delDialog = {
            visible: true,
            deleteName: `员工 : ${data.username}`,
            formData: data
          }
          break
        default:
          console.log('no action')
      }
    }
  },
  async mounted() {
    this.$store.dispatch('setStaffPageNum', 1)
    this.$store.dispatch('setStaffPageSize', 10)
    await this.$store.dispatch('retrieveStaffListAsync', { pageNum: this.pageNum, pageSize: this.pageSize })
    await this.upNextTick()
  }
};
</script>

<style scoped lang="scss">
.erek-card-container {
  height: 100%;
  width: 100%;
  background-color: #f5f7f9;
}
.erek-depart-add {
  background: #fff;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
}
</style>

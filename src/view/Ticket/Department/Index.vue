<template>
  <div class="erek-card-container">
    <div class="erek-depart-add">
      <Button type="dashed" long icon="ios-add" @click="handleToAddClick">新增</Button>
    </div>
    <vue-divider :bg-color="divider.bgColor" :height="divider.height"/>
    <div class="erek-card-list">
      <department-list
        @onHandleActions="handleActions"
        :data="deps.data"
        :pagination="deps.pagination"
        @onHandlePageNum="handleChangeNum"
        @onHandlePageSize="handleChangeSize"
      />
    </div>
    <depart-form
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
import DepartmentList from 'tkcomponents/FrameComponents/List/Department.vue'
import VueDivider from 'components/CommonComponents/Divider/Index.vue'
import DepartForm from 'tkcomponents/FormComponents/Department/Index.vue'
import DeleteConfirm from 'tkcomponents/CommonComponents/DeleteConfirm/Index.vue'
import { mapState } from 'vuex'

export default {
  name: 'TicketDepartment',
  components: {
    DepartmentList,
    VueDivider,
    DepartForm,
    DeleteConfirm
  },
  data() {
    return {
      divider: {
        bgColor: '#f5f7f9',
        height: '20px'
      },
      deps: {
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
    isFetch: state => state.department.isFetch,
    list: state => state.department.list,
    pageNum: state => state.department.pageNum,
    pageSize: state => state.department.pageSize,
    total: state => state.department.total
  }),
  methods: {
    handleToAddClick() {
      this.dialog.visible = true
      this.dialog.formWidth = 480
      this.dialog.formTitle = '❤️ 新增部门'
    },
    async handleChangeNum(current) {
      this.$store.dispatch('setDepsPageNum', current)
      await this.$store.dispatch('retrieveDepsListAsync', { pageNum: this.pageNum, pageSize: this.pageSize })
      await this.upNextTick()
    },
    async handleChangeSize(size) {
      this.$store.dispatch('setDepsPageSize', size)
      await this.$store.dispatch('retrieveDepsListAsync', { pageNum: this.pageNum, pageSize: this.pageSize })
      await this.upNextTick()
    },
    upNextTick() {
      this.deps.data = [...this.list]
      this.deps.pagination = {
        hasPage: true,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        total: this.total
      }
    },
    async handleFetchForm(data, type) {
      if (type === 'submit') {
        const { depart_name, depart_content, depart_count } = data
        let prefix = {
          depart_count: depart_count
        }
        delete data.depart_count
        data.depart_prefix = JSON.stringify(prefix)

        if (this.dialog.formType === 'create') {
          await this.$store.dispatch('createDepsAsync', data)
          await this.upNextTick()
        } else {
          await this.$store.dispatch('updateDepsAsync', data)
          await this.upNextTick()
        }
      }
      let initailOptions = this.$utils.processInitailDialog()
      this.dialog = { ...initailOptions }
    },
    async handleDelete(type) {
      if (type) {
        await this.$store.dispatch('deleteDepsAsync', this.delDialog.formData)
        await this.upNextTick()
      } else { }
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
          let depart_count = -1
          try {
            depart_count = JSON.parse(formdata.depart_prefix).depart_count
          } catch (err) {
            depart_count = formdata.depart_count
          }
          formdata.depart_count = depart_count
          delete formdata.depart_prefix
          this.dialog = {
            visible: true,
            formWidth: 480,
            formType: 'update',
            formData: formdata,
            formTitle: '编辑部门'
          }
          break
        case 'delete':
          this.delDialog = {
            visible: true,
            deleteName: data.depart_name,
            formData: data
          }
          break
        default:
          console.log('no action')
      }
    }
  },
  async mounted() {
    this.$store.dispatch('setDepsPageNum', 1)
    this.$store.dispatch('setDepsPageSize', 9)
    await this.$store.dispatch('retrieveDepsListAsync', { pageNum: this.pageNum, pageSize: this.pageSize })
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

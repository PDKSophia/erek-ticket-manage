<template>
  <div class="erek-card-container">
    <div class="erek-depart-add">
      <Button type="dashed" long icon="ios-add" @click="handleToAddCity">新增</Button>
    </div>
    <vue-divider :bg-color="divider.bgColor" :height="divider.height"/>
    <div class="erek-card-list">
      <department-list
        @onHandleActions="handleActions"
        :data="deps.data"
        :pagination="deps.pagination"
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
  </div>
</template>

<script>
import DepartmentList from 'tkcomponents/FrameComponents/List/Department.vue'
import VueDivider from 'components/CommonComponents/Divider/Index.vue'
import DepartForm from 'tkcomponents/FormComponents/Department/Index.vue'
import { mapActions } from 'vuex'
export default {
  name: 'TicketDepartment',
  components: {
    DepartmentList,
    VueDivider,
    DepartForm
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
      }
    };
  },
  methods: {
    ...mapActions(['createDepartment', 'updateDepartment']),
    handleToAddCity() {
      this.dialog.visible = true
      this.dialog.formWidth = 480
      this.dialog.formTitle = this.dialog.formType === 'create' ? '新增部门' : '编辑部门'
    },
    async handleFetchForm(data, type) {
      let initailOptions = this.$utils.processInitailDialog()
      this.dialog = { ...initailOptions }
      if (type === 'submit') {
        const { depart_name, depart_content, depart_count } = data
        let prefix = {
          depart_count: depart_count
        }
        delete data.depart_count
        data.depart_prefix = JSON.stringify(prefix)

        if (this.dialog.formType === 'create') {
          const result = await this.createDepartment(data)
        } else {
          const result = await this.updateDepartment(data)
        }
      }
    },
    async handleActions(type, data) {
      switch (type) {
        case 'view':
          console.log(data)
          break
        case 'update':
          const { depart_count } = JSON.parse(data.depart_prefix)
          data.depart_count = depart_count
          delete data.depart_prefix
          this.dialog = {
            visible: true,
            formWidth: 480,
            formType: 'update',
            formData: data,
            formTitle: this.dialog.formType === 'create' ? '新增部门' : '编辑部门'
          }
          break
        case 'delete':
          console.log(data)
          break
        default:
          console.log('no action')
      }
    }
  },
  async mounted() {
    // 请求获取数据
    const deps = await this.$api.mock.retrieveDepartmentList({
      pageNum: 1,
      pageSize: 5
    })
    this.deps.data = [...deps.list]
    this.deps.pagination = {
      hasPage: true,
      pageNum: deps.current,
      pageSize: deps.size,
      total: deps.total
    };
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

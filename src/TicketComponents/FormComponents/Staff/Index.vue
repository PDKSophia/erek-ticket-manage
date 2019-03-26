<template>
  <div>
    <Modal
      v-model="showDialog"
      :width="width"
      :title="title"
      :mask-closable="false"
      :closable="false"
    >
      <Form
        class="staff_form-container"
        ref="staff_form"
        :model="staff_form"
        :rules="staffRuleValidate"
        :label-width="80"
      >
        <FormItem label="员工名称" class="form-item-container" prop="username">
          <Input type="text" v-model="staff_form.username" placeholder="员工名"/>
        </FormItem>
        <FormItem label="员工密码" class="form-item-container" prop="password">
          <Input type="password" v-model="staff_form.password" placeholder="密码"/>
        </FormItem>
        <FormItem label="员工邮箱" class="form-item-container" prop="email">
          <Input type="email" v-model="staff_form.email" placeholder="邮箱"/>
        </FormItem>
        <FormItem label="员工角色" prop="role">
          <Select v-model="staff_form.role">
            <Option value="admin">admin</Option>
            <Option value="user">user</Option>
          </Select>
        </FormItem>
        <FormItem label="所属部门" prop="departmentId">
          <Select v-model="staff_form.departmentId">
            <Option
              v-for="(deps, index) in depsList"
              :value="deps.id"
              :key="index"
            >{{ deps.depart_name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="当前级别" class="form-item-container" prop="grade">
          <Input type="text" v-model="staff_form.grade" placeholder="当前级别"/>
        </FormItem>
        <FormItem label="当前职位" class="form-item-container" prop="job">
          <Input type="text" v-model="staff_form.job" placeholder="当前职位"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="onHandleCallback">算了吧</Button>
        <Button type="primary" @click="onHandleClickSubmit('staff_form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { retrieveDepsList } from 'service/api'

export default {
  name: 'StaffForm',
  data() {
    return {
      showDialog: false,
      title: '',
      width: 500,
      depsList: [], // 部门列表
      staff_form: {
        username: '',
        password: '',
        email: '',
        role: '',
        departmentId: -1,
        grade: '',
        job: ''
      },
      staffRuleValidate: {
        username: [{ required: true, message: '请输入员工名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入员工密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入员工邮箱', trigger: 'blur' }],
        role: [{ required: true, message: '员工角色必须选择', tigger: 'change' }],
        departmentId: [{ required: true, message: '所属部门必须选择' }],
        grade: [{ required: true, message: '请输入当前级别', trigger: 'blur' }],
        job: [{ required: true, message: '请输入当前职位', trigger: 'blur' }],
      }
    }
  },
  methods: {
    clearData() {
      Object.keys(this.staff_form).forEach(key => {
        this.staff_form[key] = ''
      })
    },
    onHandleClickSubmit(formName) {
      if (this.$utils.checkEmail(this.staff_form.email)) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let emitOptions = { ...this.staff_form }
            this.$emit('onCallbackForm', emitOptions, 'submit')
            this.clearData()
          }
        })
      } else {
        this.$utils.toastTips('warning', '请输入正确邮箱', 1.5);
      }
    },
    onHandleCallback() {
      let emitOptions = {}
      this.$emit('onCallbackForm', emitOptions, 'cancle')
      this.clearData()
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formType: {
      type: String,
      default: 'create'
    },
    formTitle: {
      type: String,
      default: 'new '
    },
    formWidth: {
      type: Number,
      default: 520
    }
  },
  watch: {
    visible(newVal, oldVal) {
      this.$nextTick(() => {
        this.showDialog = newVal
      })
    },
    formTitle(newVal, oldVal) {
      this.$nextTick(() => {
        this.title = newVal
      })
    },
    formWidth(newVal, oldVal) {
      this.$nextTick(() => {
        this.width = newVal
      })
    },
    formData: {
      handler(newVal) {
        if (newVal === null) {
          this.staff_form = {
            username: '',
            password: '',
            email: '',
            role: '',
            departmentId: -1,
            grade: '',
            job: ''
          }
        } else {
          this.$nextTick(() => {
            this.staff_form = { ...this.staff_form, ...newVal }
          })
        }
      },
      deep: true
    }
  },
  async mounted() {
    await retrieveDepsList({
      pageNum: 1,
      pageSize: 100
    }).then(res => {
      this.depsList = [...res.list]
    })
  }
}
</script>

<style>
</style>

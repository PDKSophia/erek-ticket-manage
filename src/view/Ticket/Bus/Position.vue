<template>
  <div class="city-container">
    <Row :gutter="32">
      <i-col span="15">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="车站名称" prop="bus_name">
            <Input v-model="formValidate.bus_name" placeholder="车站名称..."/>
          </FormItem>
          <FormItem label="所属城市" prop="cityId">
            <Select v-model="formValidate.cityId">
              <Option value="beijing">北京</Option>
              <Option value="shanghai">上海</Option>
              <Option value="shenzhen">深圳</Option>
            </Select>
          </FormItem>
          <FormItem label="车站简介" prop="desc">
            <Input
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10 }"
              placeholder="简介..."
            />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">新建</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'BusPosition',
  data() {
    return {
      file: null,
      formValidate: {
        bus_name: '',
        desc: '',
        cityId: '',
      },
      initDataLoading: true,
      ruleValidate: {
        bus_name: [{ required: true, message: '车站名称不能为空', tigger: 'blur' }],
        cityId: [{ required: true, message: '必须勾选城市', tigger: 'change' }],
        desc: [
          { required: true, message: '请输入车站简介', trigger: 'blur' },
          {
            type: 'string',
            min: 10,
            message: '不能少于10个字符串',
            trigger: 'blur'
          }
        ],
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$utils.toastTips('success', '修改成功!', 1.5);
        } else {
          this.$utils.toastTips('error', 'Fail!', 1.5);
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted() {
  }
};
</script>

<style scoped lang="scss">
.city-container {
  width: 100%;
  background-color: #fff;
  padding: 4rem 2rem;
}
.city-cover {
  text-align: center;
  width: 100px;
  height: 100px;
  margin-left: 30%;

  > img.cover {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
  }
}
</style>

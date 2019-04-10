<template>
  <div class="city-container">
    <div class="time-container">
      <Row style="width: 50%" :gutter="32">
        <i-col span="24">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="班次名称" prop="name">
              <Input v-model="formValidate.name" placeholder="班次名称..."/>
            </FormItem>
            <FormItem label="班次价格" prop="price">
              <InputNumber style="width: 100%" v-model="formValidate.price" placeholder="班次价格..."/>
            </FormItem>
            <FormItem label="总票数" prop="count">
              <InputNumber style="width: 100%" v-model="formValidate.count"/>
            </FormItem>
            <FormItem label="起始城市" prop="fromCityId">
              <Select v-model="formValidate.fromCityId">
                <Option value="beijing">北京</Option>
                <Option value="shanghai">上海</Option>
                <Option value="shenzhen">深圳</Option>
              </Select>
            </FormItem>
            <FormItem label="目的城市" prop="toCityId">
              <Select v-model="formValidate.toCityId">
                <Option value="beijing">北京</Option>
                <Option value="shanghai">上海</Option>
                <Option value="shenzhen">深圳</Option>
              </Select>
            </FormItem>
            <FormItem label="起始站点" prop="fromPosId">
              <Select v-model="formValidate.fromPosId">
                <Option value="beijing">北京</Option>
                <Option value="shanghai">上海</Option>
                <Option value="shenzhen">深圳</Option>
              </Select>
            </FormItem>
            <FormItem label="目的站点" prop="toPosId">
              <Select v-model="formValidate.toPosId">
                <Option value="beijing">北京</Option>
                <Option value="shanghai">上海</Option>
                <Option value="shenzhen">深圳</Option>
              </Select>
            </FormItem>
            <FormItem label="发车时间" prop="startTime">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择发车时间"
                v-model="formValidate.startTime"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
            <FormItem label="到达时间" prop="arriveTime">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择发车时间"
                v-model="formValidate.arriveTime"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">新建</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaneTime',
  data() {
    return {
      file: null,
      formValidate: {
        name: '',
        price: 0,
        count: 0,
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
        price: [{ required: true, type: 'number', message: '价格不能为空', tigger: 'blur' }],
        count: [{ required: true, type: 'number', message: '数量不能为空', tigger: 'blur' }],
        fromCityId: [{ required: true, message: '起始城市不能为空', tigger: 'change' }],
        toCityId: [{ required: true, message: '终点城市不能为空', tigger: 'change' }],
        fromPosId: [{ required: true, message: '起始站点不能为空', tigger: 'change' }],
        toPosId: [{ required: true, message: '目的站点不能为空', tigger: 'change' }],
        startTime: [{ required: true, type: 'date', message: '开始时间不能为空', tigger: 'change' }],
        arriveTime: [{ required: true, type: 'date', message: '到达时间不能为空', tigger: 'change' }],
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$utils.toastTips('success', '修改成功!', 1.5);
        } else {
          this.$utils.toastTips('error', '请确认是否已完成表单的填写!', 1.5);
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
.time-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

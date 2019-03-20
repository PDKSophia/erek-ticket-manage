<template>
  <div class="city-container">
    <div class="flex-container">
      <Row style="width: 70%" :gutter="32">
        <i-col span="20">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="城市名称" prop="city_name">
              <Input v-model="formValidate.city_name" placeholder="城市名称..."/>
            </FormItem>
            <FormItem label="城市状态" prop="city_status">
              <RadioGroup v-model="formValidate.city_status">
                <Radio label="1">省会</Radio>
                <Radio label="2">其他</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="城市简介" prop="city_desc">
              <Input
                v-model="formValidate.city_desc"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10 }"
                placeholder="简介..."
              />
            </FormItem>
            <FormItem label="封面URL" prop="city_cover">
              <Input v-model="formValidate.city_cover" placeholder="城市名称..."/>
            </FormItem>
            <FormItem label="选择封面">
              <Upload type="drag" :before-upload="handleCoverUpload" action>
                <div style="padding: 20px 0">
                  <Icon type="ios-cloud-upload-outline" size="32" style="color: #3399ff"></Icon>
                  <p>选择城市封面</p>
                  <div v-if="this.file !== null">选中的 file 为: {{ this.file.name }}</div>
                </div>
              </Upload>
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
import { mapState, mapActions } from 'vuex';
export default {
  name: 'CityComponents',
  data() {
    return {
      file: null,
      formValidate: {
        city_name: '',
        city_desc: '',
        city_cover: '',
        city_status: '',
      },
      initDataLoading: true,
      ruleValidate: {
        city_name: [{ required: true, message: '名字不能为空', tigger: 'blur' }],
        city_status: [{ required: true, message: '性别不能为空', tigger: 'change' }],
        city_desc: [
          { required: true, message: '请输入个人简介', trigger: 'blur' },
          {
            type: 'string',
            min: 10,
            message: '不能少于10个字符串',
            trigger: 'blur'
          }
        ],
        city_cover: [{ required: true, message: '封面URL不能为空', tigger: 'blur' }]
      }
    };
  },
  methods: {
    ...mapActions(['setErekUser']),
    // 选中封面
    handleCoverUpload(file) {
      console.log(file)
      this.file = file
      // 这里就发送 api，回传一个 url，然后填充到url字段
    },
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
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

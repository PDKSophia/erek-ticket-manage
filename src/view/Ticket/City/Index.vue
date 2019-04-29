<template>
  <div class="city-container">
    <div class="flex-container">
      <Row style="width: 70%" :gutter="32">
        <i-col span="20">
          <Form ref="city_form" :model="city_form" :rules="ruleValidate" :label-width="80">
            <FormItem label="城市名称" prop="city_name">
              <Input v-model="city_form.city_name" placeholder="城市名称..."/>
            </FormItem>
            <FormItem label="城市状态" prop="city_status">
              <RadioGroup v-model="city_form.city_status">
                <Radio label="1">省会</Radio>
                <Radio label="2">其他</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="城市标签" prop="city_type">
              <Select v-model="city_form.city_type">
                <Option
                  v-for="(item, index) in typeList"
                  :value="item.key"
                  :key="index"
                >{{ item.text }}</Option>
              </Select>
            </FormItem>
            <FormItem label="城市简介" prop="city_desc">
              <Input
                v-model="city_form.city_desc"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10 }"
                placeholder="简介..."
              />
            </FormItem>
            <FormItem label="封面URL" prop="city_cover">
              <Input v-model="city_form.city_cover" placeholder="城市封面"/>
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
              <Button type="primary" @click="handleSubmit('city_form')">新建</Button>
              <Button @click="handleReset('city_form')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { cityType } from 'js/app/global-config'

export default {
  name: 'CityComponents',
  data() {
    return {
      file: null,
      typeList: [],
      city_form: {
        city_name: '',
        city_desc: '',
        city_cover: '',
        city_status: '',
        city_type: ''
      },
      ruleValidate: {
        city_name: [{ required: true, message: '城市名称不能为空', tigger: 'blur' }],
        city_status: [{ required: true, message: '城市状态必选', tigger: 'change' }],
        city_desc: [
          { required: true, message: '请输入城市简介', trigger: 'blur' },
          {
            type: 'string',
            min: 10,
            message: '不能少于10个字符串',
            trigger: 'blur'
          }
        ],
        city_cover: [{ required: true, message: '封面URL不能为空', tigger: 'blur' }],
        city_type: [{ required: true, message: '需选择城市标签' }]
      }
    };
  },
  methods: {
    // 选中封面
    async handleCoverUpload(file) {
      this.file = file
      this.city_form.city_cover = file.name
    },
    async handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          // 上传图片
          if (!this.city_form.cover) {
            const iUrl = await this.$api.api.uploadFiles(this.file)
            this.city_form.city_cover = iUrl
          }
          const options = {
            ...this.city_form,
            prefix: JSON.stringify({
              score: Math.floor(Math.random().toFixed(2) * 6) + 1,
              visited: Math.random().toFixed(2) * 99000 + 100
            })
          }
          await this.$store.dispatch('createCityAsync', options)
          setTimeout(() => {
            this.handleReset('city_form')
          }, 2000)
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
    this.typeList = [...cityType]
  },
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

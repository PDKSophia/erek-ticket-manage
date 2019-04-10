<template>
  <div class="city-container">
    <Row :gutter="32">
      <i-col span="15">
        <Form ref="bus_pos_form" :model="bus_pos_form" :rules="busPosValidate" :label-width="80">
          <FormItem label="车站名称" prop="bus_name">
            <Input v-model="bus_pos_form.bus_name" placeholder="车站名称..."/>
          </FormItem>
          <FormItem label="所属城市" prop="cityId">
            <Select v-model="bus_pos_form.cityId">
              <Option
                v-for="(city, index) in citys"
                :value="city.id"
                :key="index"
              >{{ city.city_name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="车站简介" prop="desc">
            <Input
              v-model="bus_pos_form.desc"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10 }"
              placeholder="简介..."
            />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('bus_pos_form')">新建</Button>
            <Button @click="handleReset('bus_pos_form')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { retrieveCityList } from 'service/api'

export default {
  name: 'BusPosition',
  computed: mapState({
    isFetch: state => state.app.isFetch,
    cityList: state => state.app.cityList,
  }),
  data() {
    return {
      citys: [],
      bus_pos_form: {
        bus_name: '',
        desc: '',
        cityId: '',
      },
      busPosValidate: {
        bus_name: [{ required: true, message: '车站名称不能为空', tigger: 'blur' }],
        cityId: [{ required: true, message: '必须勾选城市', }],
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
    async handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          let city = this.$utils.filterArray(this.cityList, 'id', this.bus_pos_form.cityId)
          let prefix = {
            desc: this.bus_pos_form.desc,
            cityName: city[0].city_name
          }
          let options = {
            bus_name: this.bus_pos_form.bus_name,
            cityId: this.bus_pos_form.cityId,
            prefix: JSON.stringify(prefix)
          }
          await this.$store.dispatch('createBusPosAsync', options)
          setTimeout(() => {
            this.handleReset('bus_pos_form')
          }, 100)
        } else {
          this.$utils.toastTips('error', '请确认是否已完成表单的填写!', 1.5);
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  async mounted() {
    if (this.isFetch) {
      this.citys = [...this.cityList]
    } else {
      retrieveCityList({
        pageNum: 1,
        pageSize: 100
      }).then(res => {
        this.citys = [...res.list]
      })
    }
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

<template>
  <div class="vue-erek-profile-container">
    <div class="vue-back" @click="handleGoBack">< 返回</div>
    <header>
      <div class="vue-erek-meta-header">
        <div class="vue-erek-meta-flex-row">
          <h2>订单详情</h2>
        </div>
        <div class="vue-erek-meta-flex-row">
          <div class="vue-erek-meta-item">
            <p>订单编号: YgUQmNyysYZ0mzExpSrc</p>
            <p>子订单: 无</p>
          </div>
          <div class="vue-erek-meta-item">
            <p>状态: 退款成功</p>
            <p>类型: 飞机票</p>
          </div>
          <div class="vue-erek-meta-item">
            <p>下单时间: 2019-05-05 14:07:51</p>
          </div>
        </div>
      </div>
    </header>
    <divider-line :height="divider.height" :bgColor="divider.bgColor"/>
    <!-- <div class="erek-progress-step-container">
      <h3 class="erek-progress-title">用户信息</h3>
      <div class="erek-progress-step">
        <div class="vue-erek-meta-flex-row">
          <div class="vue-erek-meta-item">
            <p>用户姓名: 彭道宽</p>
            <p>身份证号: 460157199706248547</p>
          </div>
          <div class="vue-erek-meta-item">
            <p>联系电话: 18976078869</p>
            <p>备注: 无</p>
          </div>
          <div class="vue-erek-meta-item">
            <p>常用快递: 123</p>
          </div>
        </div>
      </div>
    </div>-->
    <divider-line :height="divider.height" :bgColor="divider.bgColor"/>
    <!-- <div class="erek-tabs-container">
      <Tabs value="tabOne">
        <TabPane label="退货商品" name="tabOne">
          <erek-table
            :border="commodity.tableConfig.border"
            :stripe="commodity.tableConfig.stripe"
            :size="commodity.tableConfig.size"
            :data="commodity.tableConfig.data"
            :pagination="commodity.tableConfig.pagination"
          />
        </TabPane>
      </Tabs>
    </div>-->
  </div>
</template>

<script>
import DividerLine from 'components/CommonComponents/Divider/Index.vue';
import ErekTable from '../../../components/ProfileTableComponents/BaseTable.vue';
export default {
  name: 'VueErekBaseProfile',
  components: {
    DividerLine,
    ErekTable
  },
  data() {
    return {
      divider: {
        height: '20px',
        bgColor: '#f5f7f9'
      },
      order: {
        base: {},
        tableConfig: {
          border: false,
          stripe: false,
          size: 'large',
          data: [],
          pagination: {
            hasPage: false,
            pageNum: 0,
            pageSize: 0,
            total: 0
          }
        }
      }
    };
  },
  methods: {
    handleGoBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
    // 发送请求获取数据信息
    const code = this.$route.query.code
    this.$api.api.retrieveSearchOrder({
      code: code
    }).then(res => {
      console.log(res)
      let record = JSON.parse(res.record)
      let prefix = JSON.parse(res.prefix)
      this.base = { ...res }
      let data = []
      for (let i = 0; i < record.length; i++) {
        let obj = {
          id: i + 1,
          nickname: record[i].nickname,
          passengerId: record[i].passengerId,
          phone: record[i].phone,
          position: record[i].text,
          price: record[i].price
        }
        data.push(obj)
      }
      this.order.tableConfig.data = [...data]
    })
  }
};
</script>

<style lang="scss" scoped>
.vue-erek-profile-container {
  width: 100%;
  height: 100%;
  background-color: #fff;

  .vue-erek-meta-header {
    padding: 30px 30px;
  }
}
.vue-erek-meta-flex-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-variant: tabular-nums;
  color: rgba(0, 0, 0, 0.85);
  box-sizing: border-box;
  margin-bottom: 16px;
  justify-content: space-between;

  .vue-erek-meta-item {
    width: 33%;
    margin-right: 0.33%;
    line-height: 28px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);

    p.meta-desc {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.erek-progress-step-container {
  width: 100%;
  background-color: #fff;
  > .erek-progress-title {
    padding: 12px 30px;
    border-bottom: 1px solid #f1f1f1;
    color: rgba(0, 0, 0, 0.82);
    font-size: 1rem;
  }
  > .erek-progress-step {
    padding: 30px 30px;
  }
}

.erek-tabs-container {
  width: 100%;
  background-color: #fff;
  padding: 12px 30px 40px;
}
.vue-back {
  font-size: 18px;
  cursor: pointer;
  padding: 30px 30px 0;
  color: #bbb;
}
</style>

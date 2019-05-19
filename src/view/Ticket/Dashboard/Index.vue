<template>
  <div>
    <div class="vue-erek-home-up" :style="{ height: '340px' }">
      <hoc-echarts-citys
        :x-axis="hotCity.xAxis"
        :y-axis="hotCity.yAxis"
        :series="hotCity.lineSeries"
        :item-list="hotCity.itemList"
        :width="hotCity.lineWidth"
        :height="hotCity.lineHeight"
      />
      <hoc-echarts-citys
        :x-axis="travelCity.xAxis"
        :y-axis="travelCity.yAxis"
        :series="travelCity.lineSeries"
        :item-list="travelCity.itemList"
        :width="travelCity.lineWidth"
        :height="travelCity.lineHeight"
      />
      <hoc-echarts-citys
        :x-axis="styleCity.xAxis"
        :y-axis="styleCity.yAxis"
        :series="styleCity.lineSeries"
        :item-list="styleCity.itemList"
        :width="styleCity.lineWidth"
        :height="styleCity.lineHeight"
      />
      <!-- <hoc-echarts-line :lineData="lineData"/> -->
      <!-- <div class="vue-erek-right-box" :style="{ height: 'height' }">
        <p class="vue-erek-right-box-title">数据卡片</p>
        <hoc-echarts-card :data="tabData"/>
      </div>-->
    </div>
    <vue-divider :bgColor="divider.bgColor" :height="divider.height"></vue-divider>
    <div class="vue-erek-home-down" :style="{ height: '340px' }">
      <!-- <hoc-echarts-citys
        :x-axis="allCitys.xAxis"
        :y-axis="allCitys.yAxis"
        :series="allCitys.lineSeries"
        :item-list="allCitys.itemList"
        :width="allCitys.lineWidth"
        :height="allCitys.lineHeight"
      />-->
      <hoc-echarts-citys
        :x-axis="isSHCitys.xAxis"
        :y-axis="isSHCitys.yAxis"
        :series="isSHCitys.lineSeries"
        :item-list="isSHCitys.itemList"
        :width="isSHCitys.lineWidth"
        :height="isSHCitys.lineHeight"
      />
      <hoc-echarts-citys
        :x-axis="otherCitys.xAxis"
        :y-axis="otherCitys.yAxis"
        :series="otherCitys.lineSeries"
        :item-list="otherCitys.itemList"
        :width="otherCitys.lineWidth"
        :height="otherCitys.lineHeight"
      />
      <!-- <hoc-echarts-radar :radarData="radarData"/> -->
      <!-- <hoc-echarts-pie :pieData="pieData"></hoc-echarts-pie>
      <hoc-echarts-pie :pieData="pieData"></hoc-echarts-pie>
      <hoc-echarts-pie :pieData="pieData"></hoc-echarts-pie>-->
      <!-- <hoc-echarts-radar :radarData="radarData"/> -->
    </div>
    <vue-divider :bgColor="divider.bgColor" :height="divider.height"></vue-divider>
    <div class="vue-erek-home-down" :style="{ height: '380px' }">
      <hoc-echarts-pie :pieData="orderData"></hoc-echarts-pie>
      <!-- <hoc-echarts-pie :pieData="orderCityData"></hoc-echarts-pie> -->
      <!-- <hoc-echarts-citys
        :x-axis="allCitys.xAxis"
        :y-axis="allCitys.yAxis"
        :series="allCitys.lineSeries"
        :item-list="allCitys.itemList"
        :width="allCitys.lineWidth"
        :height="allCitys.lineHeight"
      />-->
      <!-- <hoc-echarts-radar :radarData="radarData"/> -->
      <!-- <hoc-echarts-pie :pieData="pieData"></hoc-echarts-pie>
      <hoc-echarts-pie :pieData="pieData"></hoc-echarts-pie>-->
      <!-- <hoc-echarts-radar :radarData="radarData"/> -->
    </div>
  </div>
</template>

<script>
import HocEchartsLine from 'components/HigherOrderComponent/HOC-EchartLine.vue';
import HocEchartsPie from 'components/HigherOrderComponent/HOC-EchartPie.vue';
import HocEchartsRadar from 'components/HigherOrderComponent/HOC-EchartRadar.vue';
import HocEchartsCard from 'components/HigherOrderComponent/HOC-EchartCard.vue';
import HocEchartsCitys from 'components/EchartsComponents/Line.vue';
import VueDivider from 'components/CommonComponents/Divider/Index.vue';
export default {
  name: 'TicketDashboardComponent',
  components: {
    HocEchartsLine,
    HocEchartsPie,
    HocEchartsRadar,
    HocEchartsCard,
    HocEchartsCitys,
    VueDivider
  },
  data() {
    return {
      lineData: {}, // 折线数据
      tabData: [], // 数据卡片
      orderData: [], // 饼图数据
      orderCityData: [],
      divider: {
        bgColor: '#f5f7f9',
        height: '30px'
      },
      radarData: {}, // 雷达图数据
      hotCity: {
        xAxis: {
          // x轴
          data: []
        },
        yAxis: {
          // y轴
          min: null,
          max: null
        },
        itemList: [],
        lineWidth: '100%',
        lineHeight: '250px',
        lineSeries: [] // 折线数据
      },
      travelCity: {
        xAxis: {
          // x轴
          data: []
        },
        yAxis: {
          // y轴
          min: null,
          max: null
        },
        itemList: [],
        lineWidth: '100%',
        lineHeight: '250px',
        lineSeries: [] // 折线数据
      },
      styleCity: {
        xAxis: {
          // x轴
          data: []
        },
        yAxis: {
          // y轴
          min: null,
          max: null
        },
        itemList: [],
        lineWidth: '100%',
        lineHeight: '250px',
        lineSeries: [] // 折线数据
      },
      allCitys: {
        xAxis: {
          // x轴
          data: []
        },
        yAxis: {
          // y轴
          min: null,
          max: null
        },
        itemList: [],
        lineWidth: '100%',
        lineHeight: '250px',
        lineSeries: [] // 折线数据
      },
      isSHCitys: {
        xAxis: {
          // x轴
          data: []
        },
        yAxis: {
          // y轴
          min: null,
          max: null
        },
        itemList: [],
        lineWidth: '100%',
        lineHeight: '250px',
        lineSeries: [] // 折线数据
      },
      otherCitys: {
        xAxis: {
          // x轴
          data: []
        },
        yAxis: {
          // y轴
          min: null,
          max: null
        },
        itemList: [],
        lineWidth: '100%',
        lineHeight: '250px',
        lineSeries: [] // 折线数据
      }
    };
  },
  mounted() {
    // 请求 `获取平台近7天的访问量与注册量`
    this.$api.mock.retrieveSystemAccess(7).then(res => {
      this.lineData = { ...res }
    })
    // 请求拿到 `卡片数据`
    this.$api.mock.retrieveSystemStatistics().then(res => {
      this.tabData = [...res]
    })
    // 请求拿到 `预算开销和实际开销`
    this.$api.mock.retrieveSystemExpense().then(res => {
      this.radarData = { ...res }
    })
    // 获取所有的热门城市
    this.$api.api.retrieveHotCity().then(res => {
      const list = res.list
      this.hotCity.yAxis.min = 0;
      this.hotCity.yAxis.max = 100000;

      let config = {
        text: '热门城市',
        badgeColor: '#3498d9'
      };
      this.hotCity.itemList.push(config);
      let datalist = []
      for (let i = 0; i < list.length; i++) {
        let prefix = JSON.parse(list[i].prefix)
        this.hotCity.xAxis.data.push(list[i].city_name);
        datalist.push(prefix.visited)
      }
      let obj = {
        data: datalist,
        type: 'bar',
        barWidth: 20,
        itemStyle: {
          normal: {
            color: '#3498d9' // 设置折线点颜色
          }
        },
        smooth: true // 折线 圆滑
      };
      this.hotCity.lineSeries.push(obj);
    });
    // 获取所有的推荐旅游城市
    this.$api.api.retrieveTravelCity().then(res => {
      const list = res.list
      this.travelCity.yAxis.min = 0;
      this.travelCity.yAxis.max = 100000;

      let config = {
        text: '当季旅游圣地',
        badgeColor: '#00c099'
      };
      this.travelCity.itemList.push(config);
      let datalist = []
      for (let i = 0; i < list.length; i++) {
        let prefix = JSON.parse(list[i].prefix)
        this.travelCity.xAxis.data.push(list[i].city_name);
        datalist.push(prefix.visited)
      }
      let obj = {
        data: datalist,
        type: 'bar',
        barWidth: 20,
        itemStyle: {
          normal: {
            color: '#00c099' // 设置折线点颜色
          }
        },
        smooth: true // 折线 圆滑
      };
      this.travelCity.lineSeries.push(obj);
    });
    // 获取所有的旅游主题城市
    this.$api.api.retrieveStyleCity().then(res => {
      const list = res.list
      this.styleCity.yAxis.min = 0;
      this.styleCity.yAxis.max = 100000;

      let config = {
        text: '旅游主题城市',
        badgeColor: '#7289c7'
      };
      this.styleCity.itemList.push(config);
      let datalist = []
      for (let i = 0; i < list.length; i++) {
        let prefix = JSON.parse(list[i].prefix)
        this.styleCity.xAxis.data.push(list[i].city_name);
        datalist.push(prefix.visited)
      }
      let obj = {
        data: datalist,
        type: 'bar',
        barWidth: 20,
        itemStyle: {
          normal: {
            color: '#7289c7' // 设置折线点颜色
          }
        },
        smooth: true // 折线 圆滑
      };
      this.styleCity.lineSeries.push(obj);
    });
    // 人数超过五万的城市
    this.$api.api.retrieveAllCityList().then(res => {
      const list = res.list
      this.allCitys.yAxis.min = 0;
      this.allCitys.yAxis.max = 100000;

      let allCityText = {
        text: '参观超过5W人次的城市',
        badgeColor: '#85d4f0'
      };
      this.allCitys.itemList.push(allCityText);
      let allCityData = []
      for (let i = 0; i < list.length; i++) {
        let prefix = JSON.parse(list[i].prefix)
        if (prefix.visited >= 50000) {
          this.allCitys.xAxis.data.push(list[i].city_name);
          allCityData.push(prefix.visited)
        }
      }
      let allCityObj = {
        data: allCityData,
        type: 'bar',
        barWidth: 20,
        itemStyle: {
          normal: {
            color: '#85d4f0' // 设置折线点颜色
          }
        },
        smooth: true // 折线 圆滑
      };
      this.allCitys.lineSeries.push(allCityObj);
      // 省会城市
      let isSHCityText = {
        text: '省会城市',
        badgeColor: '#ffd65b'
      };
      this.isSHCitys.itemList.push(isSHCityText);
      let shCityData = []
      for (let i = 0; i < list.length; i++) {
        let prefix = JSON.parse(list[i].prefix)
        if (list[i].city_status == 1) {
          this.isSHCitys.xAxis.data.push(list[i].city_name);
          shCityData.push(prefix.visited)
        }
      }
      let shCityObj = {
        data: shCityData,
        type: 'bar',
        barWidth: 20,
        itemStyle: {
          normal: {
            color: '#ffd65b' // 设置折线点颜色
          }
        },
        smooth: true // 折线 圆滑
      };
      this.isSHCitys.lineSeries.push(shCityObj);
      // 其他城市
      let otherCityText = {
        text: '其他城市',
        badgeColor: '#a0d660'
      };
      this.otherCitys.itemList.push(otherCityText);
      let otherCityData = []
      for (let i = 0; i < list.length; i++) {
        let prefix = JSON.parse(list[i].prefix)
        if (list[i].city_status == 2) {
          this.otherCitys.xAxis.data.push(list[i].city_name);
          otherCityData.push(prefix.visited)
        }
      }
      let otherCityObj = {
        data: otherCityData,
        type: 'bar',
        barWidth: 20,
        itemStyle: {
          normal: {
            color: '#a0d660' // 设置折线点颜色
          }
        },
        smooth: true // 折线 圆滑
      };
      this.otherCitys.lineSeries.push(otherCityObj);
    });
    // 获取所有订单
    this.$api.api.retrieveAllOrder().then(res => {
      console.log(res)
      let orderData = [
        { value: 0, name: '飞机订单' },
        { value: 0, name: '火车订单' },
        { value: 0, name: '大巴订单' }
      ]
      for (let i = 0; i < res.list.length; i++) {
        if (res.list[i].type === 'plane') {
          orderData[0].value += 1
        } else if (res.list[i].type === 'train') {
          orderData[1].value += 1
        } else if (res.list[i].type === 'bus') {
          orderData[2].value += 1
        } else {
          console.log('...')
        }
      }
      this.orderData = [...orderData]
      // 城市分析
      // let orderCityData = []
      // for (let i = 0; i < res.list.length; i++) {
      //   let prefix = JSON.parse(res.list[i].prefix)
      //   if (res.list[i].type === 'plane') {
      //     orderData[0].value += 1
      //   } else if (res.list[i].type === 'train') {
      //     orderData[1].value += 1
      //   } else if (res.list[i].type === 'bus') {
      //     orderData[2].value += 1
      //   } else {
      //     console.log('...')
      //   }
      // }
      // this.orderCityData = [...orderCityData]
    })
  }
};
</script>

<style scoped lang="scss">
.vue-erek-home-up {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex: 1;
  justify-content: space-between;

  > .vue-erek-right-box {
    width: 50%;
    padding: 24px;
    height: 100%;

    > .vue-erek-right-box-title {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 35px;
      margin-top: 10px;
    }
  }
}
.vue-erek-home-down {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
</style>

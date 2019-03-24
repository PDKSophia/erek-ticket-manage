<template>
  <div class="vue-erek-person-container">
    <div class="vue-user-item">
      <div class="vue-user-item-meta">
        <div class="vue-user-item-meta-avatar">
          <img
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            class="vue-user-item-meta-avatar-image"
            alt
          >
        </div>
        <div class="vue-user-item-meta-content">
          <h4 class="vue-user-item-meta-title">{{ erekUser.username }}</h4>
          <div class="vue-user-item-meta-summary">
            <span>{{ erekUser.depart_name }}</span>
            <Divider type="vertical"/>
            <span>级别: {{ erekUser.grade }}</span>
            <Divider type="vertical"/>
            <span>{{ erekUser.job }}</span>
          </div>
        </div>
      </div>
      <div class="vue-user-item-action">
        <ul>
          <a
            v-for="(item, key) in appLink"
            :key="key"
            :href="item.target"
            target="_blank"
            class="vue-erek-link"
          >
            {{ item.text }}
            <Divider v-if="key !== appLink.length - 1" type="vertical"/>
          </a>
        </ul>
      </div>
    </div>
    <vue-divider :bg-color="divider.bgColor" :height="divider.height"/>
    <div class="vue-erek-article">
      <div class="vue-erek-badge-left">
        <vue-user-badge :config="badgeConfig"/>
      </div>
      <div class="vue-erek-content-right">
        <echarts-line
          :x-axis="xAxis"
          :y-axis="yAxis"
          :series="lineSeries"
          :item-list="itemList"
          :width="lineWidth"
          :height="lineHeight"
        />
      </div>
    </div>
    <vue-divider :bg-color="divider.bgColor" :height="divider.height"/>
  </div>
</template>

<script>
import VueDivider from 'components/CommonComponents/Divider/Index.vue';
import VueUserBadge from 'components/CommonComponents/Badge/Index.vue';
import EchartsLine from 'components/EchartsComponents/Line.vue';
import { mapState } from 'vuex';
import { appLink } from 'js/app/global-config'

export default {
  name: 'TicketUser',
  components: {
    VueDivider,
    VueUserBadge,
    EchartsLine
  },
  computed: mapState({
    erekUser: state => state.user.erekUser
  }),
  data() {
    return {
      appLink: [],
      divider: {
        bgColor: '#f5f7f9',
        height: '20px'
      },
      badgeConfig: {}, // 徽章
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
    };
  },
  mounted() {
    this.appLink = [...appLink]
    // 发送请求获取所有个人中心的数据
    this.$api.mock.retrieveLogin7Day().then(res => {
      // 折线图 - 近期日访问量
      for (let i = 0; i < res.timeRange.length; i++) {
        this.xAxis.data.push(res.timeRange[i]);
      }
      this.yAxis.min = res.countRange[0];
      this.yAxis.max = res.countRange[1];

      for (let j = 0; j < res.data.length; j++) {
        let config = {
          text: res.data[j].text,
          badgeColor: '#00c099'
        };
        this.itemList.push(config);
        let obj = {
          data: res.data[j].data,
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            normal: {
              color: '#00c099' // 设置折线点颜色
            }
          },
          smooth: true // 折线 圆滑
        };
        this.lineSeries.push(obj);
      }
    });

    // Step1. 请求获取 “徽章”
    this.$api.mock.retrieveBadgeList().then(res => {
      this.badgeConfig = {
        namespace: '获得的徽章',
        valueColor: '#6f80da',
        data: { ...res }
      };
    });
  }
};
</script>

<style scoped lang="scss">
.vue-erek-person-container {
  width: 100%;
  color: rgba(0, 0, 0, 0.45);
  background-color: #fff;

  > .vue-user-item {
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: center;

    > .vue-user-item-meta {
      align-items: flex-start;
      display: flex;
      flex: 2 1;

      > .vue-user-item-meta-avatar {
        margin-right: 10px;

        > .vue-user-item-meta-avatar-image {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }

      > .vue-user-item-meta-content {
        flex: 1 0;
        padding-left: 12px;

        > .vue-user-item-meta-title {
          margin-bottom: 4px;
          font-size: 18px;
          line-height: 30px;
          margin-top: 15px;
          color: rgba(0, 0, 0, 0.65);
        }
        > .vue-user-item-meta-summary {
          font-size: 14px;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }

    > .vue-user-item-action {
      display: flex;
      flex: 1 0;
      justify-content: flex-end;
      align-items: center;
      font-size: 14px;

      > ul {
        list-style: none;
        display: inline-flex;
        text-align: center;
        justify-content: center;
        align-items: center;

        > .vue-erek-link {
          color: #6f80da;
        }
      }
    }
  }
}
.vue-erek-article {
  display: flex;
  width: 100%;

  > .vue-erek-badge-left {
    flex: 3 0;

    > .vue-erek-pyq-2 {
      padding: 0 16px;

      .pyq-3-list-item {
        padding-top: 16px;
        padding-bottom: 16px;
        align-items: center;
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        flex-wrap: wrap;

        .pyq-4-list-meta {
          display: flex;
          width: 100%;

          > .pyq-5-avatar-left {
            width: 8%;
            > .images-avatar {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              float: right;
              margin-right: 10px;
            }
          }

          > .pyq-6-avatar-right {
            width: 85%;
          }
        }
      }
    }
  }

  > .vue-erek-content-right {
    flex: 2 1;

    > .erek-team-1 {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      > .erek-team-2 {
        width: 50%;

        .team-image {
          width: 50px;
          height: 50%;
          border-radius: 50%;
          margin: 5px 0;
        }
      }
    }
  }

  > .divider-right {
    border-right: 20px solid #f5f7f9;
  }
}

.vue-erek-meta-item-cell {
  display: flex;
  width: 100%;
  padding: 16px 16px 32px;

  > .vue-erek-card-item-middle {
    flex: 1 0;
  }
}

.vue-erek-pyq-title {
  padding: 16px 0 16px 14px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #e8e8e8;
}

.text-sty-0 {
  margin-bottom: 3px;
}
.text-sty-1 {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
}
.text-sty-2 {
  color: #1890ff;
}
</style>

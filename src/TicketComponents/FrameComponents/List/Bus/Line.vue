<template>
  <div class="table-container">
    <Table :border="border" :stripe="stripe" :size="size" :data="data" :columns="columns"></Table>
    <Spin size="large" fix v-if="isFetching"></Spin>
    <div style="margin: 30px 0px;overflow: hidden" v-show="pagination.hasPage">
      <div style="float: right;">
        <Page
          :total="pagination.total"
          :current="pagination.pageNum"
          :pageSize="pagination.pageSize"
          showSizer
          transfer
          :page-size-opts="[20, 30, 50, 80, 100]"
          @on-change="onHandlePageNum"
          @on-page-size-change="onHandlePageSize"
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'BusPositionTable',
  computed: mapState({
    isFetching: state => state.global.isFetching
  }),
  props: {
    border: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'small'
    },
    data: {
      type: Array,
      defualt: function () {
        return []
      }
    },
    pagination: {
      type: Object,
      defualt: function () {
        return []
      }
    }
  },
  watch: {
    pagination: {
      handler(newVal) {
        console.log(newVal);
      }
    }
  },
  methods: {
    onHandlePageNum(current) {
      this.$emit('onHandlePageNum', current)
    },
    onHandlePageSize(size) {
      this.$emit('onHandlePageSize', size)
    }
  },
  data() {
    return {
      columns: [
        {
          title: '班次ID',
          key: 'id',
          width: 80,
          align: 'center'
        },
        {
          title: '班次名称',
          key: 'name',
          width: 200,
          align: 'center'
        },
        {
          title: '价格',
          key: 'price',
          width: 100,
          align: 'center'
        },
        {
          title: '总票数',
          key: 'count',
          width: 100,
          align: 'center'
        },
        {
          title: '已售出',
          key: 'sell',
          width: 100,
          align: 'center'
        },
        {
          title: '剩余票数',
          key: 'surplus',
          width: 100,
          align: 'center'
        },
        {
          title: '起始站点',
          key: 'fromName',
          align: 'center'
        },
        {
          title: '目的站点',
          key: 'toName',
          align: 'center'
        },
        {
          title: '起始时间',
          key: 'startTime',
          align: 'center'
        },
        {
          title: '到达时间',
          key: 'arriveTime',
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          key: 'action',
          width: 80,
          render: (h, params) => {
            return h('div', [
              // h(
              //   'Button',
              //   {
              //     props: {
              //       type: 'primary',
              //       size: 'small'
              //     },
              //     style: {
              //       marginRight: '5px'
              //     },
              //     on: {
              //       click: () => {
              //         var index = params.index;
              //         this.$emit('onHandleLineClick', index, 'update');
              //       }
              //     }
              //   },
              //   '编辑'
              // ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      var index = params.index;
                      this.$emit('onHandleLineClick', index, 'delete');
                    }
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ]
    };
  }
};
</script>

<style>
.table-container {
  position: relative;
}
</style>

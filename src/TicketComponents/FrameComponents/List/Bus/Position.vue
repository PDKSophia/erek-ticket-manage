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
          :page-size-opts="[5, 10, 15, 20]"
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
          title: '城市ID',
          key: 'id',
          width: 80,
          align: 'center'
        },
        {
          title: '车站名称',
          key: 'bus_name',
          width: 150,
          align: 'center'
        },
        {
          title: '所属城市',
          key: 'city_name',
          width: 150,
          align: 'center',
          // filters: [],
          // filterMethod(value, row) {
          //   return row.city_name.indexOf(value) > -1;
          // }
        },
        {
          title: '城市简介',
          key: 'desc',
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          key: 'action',
          width: 140,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      var index = params.index;
                      this.$emit('onHandlePosClick', index, 'update');
                    }
                  }
                },
                '编辑'
              ),
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
                      this.$emit('onHandlePosClick', index, 'delete');
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

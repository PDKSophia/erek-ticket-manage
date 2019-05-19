<template>
  <div>
    <Table :border="border" :stripe="stripe" :size="size" :data="data" :columns="columns"></Table>
    <div style="margin: 30px 0px;overflow: hidden" v-show="pagination.hasPage">
      <div style="float: right;">
        <Page
          :total="pagination.total"
          :current="pagination.pageNum"
          :pageSize="pagination.pageSize"
          showSizer
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueBaseTable',
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
        return [];
      }
    },
    pagination: {
      type: Object,
      defualt: function () {
        return [];
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
  data() {
    return {
      initPageOption: [10, 20, 30, 50],
      columns: [
        {
          title: 'id',
          key: 'id',
          align: 'center',
          width: 100
        },
        {
          title: '乘客名',
          key: 'nickname',
          align: 'center',
          width: 300
        },
        {
          title: '身份证',
          key: 'passengerId',
          align: 'center'
        },
        {
          title: '联系电话',
          key: 'phone',
          align: 'center',
          width: 100
        },
        {
          title: '坐席',
          key: 'position',
          align: 'center',
          width: 100
        },
        {
          title: '金额',
          key: 'price',
          align: 'center',
          width: 100
        }
      ]
    };
  }
};
</script>

<style></style>

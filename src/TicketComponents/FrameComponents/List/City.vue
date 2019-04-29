<template>
  <div class="vue-erek-standlist-container">
    <div class="vue-flex-item" v-for="(item, index) in data" :key="index">
      <div class="vue-erek-item-meta">
        <div class="vue-erek-item-meta-avatar">
          <img crossorigin class="vue-erek-item-meta-avatar-image" :src="item.city_cover" alt>
        </div>
        <div class="vue-erek-item-meta-content">
          <h4 class="vue-erek-item-meta-title">{{ item.city_name }}</h4>
          <div class="vue-erek-item-meta-summary">{{ item.city_desc }}</div>
        </div>
      </div>
      <div class="vue-erek-item-action">
        <ul>
          <li class="vue-erek-edit" @click="onHandleActions('update', item)">编辑</li>
          <li class="vue-erek-delete" @click="onHandleActions('delete', item)">删除</li>
        </ul>
      </div>
    </div>
    <Spin size="large" fix v-if="isFetching"></Spin>
    <div style="margin: 30px 0px; overflow: hidden" v-show="pagination.hasPage">
      <div style="float: right;">
        <Page
          :total="pagination.total"
          :current="pagination.pageNum"
          :pageSize="pagination.pageSize"
          showSizer
          @on-change="onHandlePageNum"
          :page-size-opts="[5, 10, 20, 30]"
          @on-page-size-change="onHandlePageSize"
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'StandFrameComponent',
  computed: mapState({
    isFetching: state => state.global.isFetching
  }),
  props: {
    data: {
      type: Array,
      default: function () {
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
  methods: {
    onHandleActions(type, data) {
      this.$emit('onHandleActions', type, data)
    },
    onHandlePageNum(current) {
      this.$emit('onHandlePageNum', current)
    },
    onHandlePageSize(size) {
      this.$emit('onHandlePageSize', size)
    }
  }
};
</script>

<style lang="scss" scoped>
.vue-erek-standlist-container {
  width: 100%;
  color: rgba(0, 0, 0, 0.45);
  position: relative;

  > .vue-flex-item {
    width: 100%;
    padding-top: 22px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;

    > .vue-erek-item-meta {
      align-items: flex-start;
      display: flex;
      width: 85%;

      > .vue-erek-item-meta-avatar {
        margin-right: 10px;

        > .vue-erek-item-meta-avatar-image {
          width: 48px;
          height: 48px;
          border-radius: 4px;
        }
      }

      > .vue-erek-item-meta-content {
        width: 80%;
        > .vue-erek-item-meta-title {
          margin-bottom: 4px;
          font-size: 14px;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.65);
        }
        > .vue-erek-item-meta-summary {
          font-size: 14px;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.45);
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    > .vue-erek-item-action {
      display: flex;
      width: 15%;
      justify-content: flex-end;
      align-items: center;
      font-size: 14px;

      > ul {
        list-style: none;
        display: inline-flex;

        > .vue-erek-edit {
          color: #2894ff;
          margin-right: 15px;
        }

        > .vue-erek-delete {
          color: #f5222d;
        }
      }
    }
  }
}
.vue-erek-edit:hover,
.vue-erek-delete:hover {
  cursor: pointer;
}
</style>
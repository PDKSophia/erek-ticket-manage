<template>
  <div class="vue-erek-person-setting-container">
    <Tabs size="small">
      <TabPane label="所有车站">
        <erek-table-list
          :border="tableConfig.border"
          :stripe="tableConfig.stripe"
          :size="tableConfig.size"
          :data="tableConfig.data"
          :pagination="tableConfig.pagination"
          @onHandleClickItem="handleEmitTableValue"
        />
      </TabPane>
      <TabPane label="所有班次">
        <erek-table-list
          :border="tableConfig.border"
          :stripe="tableConfig.stripe"
          :size="tableConfig.size"
          :data="tableConfig.data"
          :pagination="tableConfig.pagination"
          @onHandleClickItem="handleEmitTableValue"
        />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import ErekTableList from 'components/FrameComponents/List/Table.vue';

export default {
  name: 'BusList',
  components: {
    ErekTableList
  },
  data() {
    return {
      tableConfig: {
        border: false,
        stripe: false,
        size: 'large',
        data: [],
        pagination: {
          hasPage: true,
          pageNum: 0,
          pageSize: 0,
          total: 0
        }
      }
    };
  },
  methods: {
    handleEmitTableValue(value, type) {
      this.$utils.toastTips(
        'info',
        `你当前点击 : ${type}, 下标索引为 : ${value}`,
        1
      );
    }
  },
  mounted() {
    this.$api.list.fetchRequestTableApi().then(res => {
      this.tableConfig.data = res.list;
      this.tableConfig.pagination = {
        hasPage: true,
        pageNum: res.current,
        pageSize: res.size,
        total: res.total
      };
      this.retrieveTableList(res);
      setTimeout(() => {
        this.stopFetch();
      }, 1000);
    });
  }
};
</script>

<style scoped lang="scss">
.vue-erek-person-setting-container {
  padding: 16px 22px;
  background-color: #fff;
  height: 100%;
  width: 100%;
}
</style>

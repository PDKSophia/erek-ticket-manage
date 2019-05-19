<template>
  <div class="container">
    <div class="simple-search">
      <Input
        element-id="simpleInput"
        search
        v-model="simpleValue"
        enter-button="搜索订单号"
        placeholder="请输入订单号..."
        @on-search="handleSearch"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketCodeSearch',
  data() {
    return {
      simpleValue: ''
    }
  },
  methods: {
    handleSearch() {
      if (!this.simpleValue) {
        this.$utils.toastTips('warning', '请输入要搜索的内容', 1)
      } else {
        this.$router.push({
          path: '/erek-manage/erek-search/search-result',
          query: {
            code: this.simpleValue
          }
        })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.container {
  position: relative;
  height: 100%;
  background-color: #fff;

  > .simple-search {
    position: absolute;
    width: 600px;
    top: 50%;
    left: 50%;
    height: 3rem;
    transform: translate(-50%, -50%);
  }
}
#simpleInput {
  height: 3rem !important;
}
</style>

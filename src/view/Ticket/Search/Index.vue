<template>
  <div class="container">
    <div class="simple-search">
      <Input
        element-id="simpleInput"
        search
        v-model="simpleValue"
        enter-button="搜索一下"
        placeholder="请输入..."
        @on-search="handleSearch"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleSearch',
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
        this.$utils.toastTips('info', `你要搜索 ${this.simpleValue}`, 1)
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

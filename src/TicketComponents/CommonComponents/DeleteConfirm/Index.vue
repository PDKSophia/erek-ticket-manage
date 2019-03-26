<template>
  <Modal
    v-model="showDialog"
    width="340"
    :mask-closable="false"
    :closable="false"
    :styles="{top: '166px'}"
  >
    <p slot="header" style="color:#f60;text-align:center">
      <span>👏 Erek-Ticket-Manage 提醒您</span>
    </p>
    <div class="content">
      <p>hello , {{ erekUser.username }}</p>
      <p>您确定删除 「 {{ showContent }} 」吗？</p>
    </div>
    <div slot="footer">
      <Button @click="onHandleCallback(false)">取消</Button>
      <Button type="error" @click="onHandleCallback(true)">删除</Button>
    </div>
  </Modal>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      showDialog: false,
      showContent: '',
    }
  },
  computed: mapState({
    erekUser: state => state.user.erekUser
  }),
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    deleteName: {
      type: String,
      default: '你确定要删除吗？'
    },
  },
  watch: {
    visible(newVal, oldVal) {
      this.$nextTick(() => {
        this.showDialog = newVal
      })
    },
    deleteName(newVal, oldVal) {
      this.$nextTick(() => {
        this.showContent = newVal
      })
    },
  },
  methods: {
    onHandleCallback(type) {
      console.log(type)
      this.$emit('onHandleClickDelete', type)
    }
  }
}
</script>

<style scoped lang='scss'>
.content {
  text-align: center;
  line-height: 2rem;
  font-size: 0.88rem;
}
</style>

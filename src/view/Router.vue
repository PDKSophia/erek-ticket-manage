<template>
  <div id="erek-manage-container">
    <Layout id="erek-layout">
      <erek-header/>
      <erek-sider :Menu="Menu"/>
    </Layout>
  </div>
</template>

<script>
import ErekHeader from 'components/FrameComponents/Layouts/Header.vue';
import ErekSider from 'components/FrameComponents/Layouts/Sider.vue';
import AdminMenu from 'js/app/admin-menu-config';
import UserMenu from 'js/app/user-menu-config';
import BreadItem from 'js/app/bread-config';
import { getAuthorityToken, getAuthorityRole } from 'js/utils/vue-token';
import { mapActions } from 'vuex';
export default {
  name: 'ErekManageContainer',
  components: {
    ErekHeader,
    ErekSider
  },
  data() {
    return {
      Menu: getAuthorityRole() === 'admin' ? AdminMenu : UserMenu,
      BreadItem: '首页'
    };
  },
  watch: {
    $route: {
      // 路由监听
      handler: function (val) {
        this.setHistroyUrl(val.path);
        for (let key in BreadItem) {
          if (val.path == key) {
            this.recevieBreadItem(BreadItem[key]);
          }
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['setErekUser', 'setHistroyUrl', 'recevieBreadItem'])
  },
  mounted() {
    if (getAuthorityToken() == undefined || getAuthorityToken() == '') {
      this.$utils.toastTips('error', 'token 已过期，请重新登陆', 1.5);
      setTimeout(() => {
        this.$router.push({
          path: '/login'
        })
      }, 1000)
    } else if (getAuthorityRole() !== 'admin' && getAuthorityRole() !== 'user') {
      this.$utils.toastTips('error', '对不起，您无权访问, 请重新登陆', 1.5);
      setTimeout(() => {
        this.$router.push({
          path: '/login'
        })
      }, 1000)
    } else {
      // 获取用户信息
      this.$api.user.fetchCurrentUser().then(res => {
        this.setErekUser(res);
      });
    }
  }
};
</script>
<style scoped lang="scss">
#erek-manage-container,
#erek-layout {
  height: 100%;
  width: 100%;
}
</style>

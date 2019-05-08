<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <div class="user-menu">
      <div @click="search" class="iconfont-div">
        <svg-icon icon-class="search" class="iconfont"/>
      </div>
      <div @click="notice" class="iconfont-div">
        <svg-icon icon-class="lingdang" class="iconfont"/>
      </div>
      <div class="user-img">
        <img src="@/assets/user.jpg">
        <span class="user-name">momo.zxy</span>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    search(){
      alert('查询');
    },
    notice(){
      alert('通知');
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .user-menu{
    float:right;
    margin-right:35px;
    line-height: 50px;
    .iconfont-div{
      cursor: pointer;
      display:inline-block;
    }
    .iconfont{
      font-size: 20px;
      margin-right:20px;
    }
    .user-img{
      display: inline-block;
      img{
        position: relative;
        top:10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .user-name{
        margin-left: 5px;
      }
    }
  }
}
</style>


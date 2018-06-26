<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div class="logo_title">
                <!-- 头部logo -->
                <img src="../assets/heima_logo.png" alt="">
                <h2>电脑后台管理系统</h2>
            </div>
            <!-- 退出按钮 -->
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 下面的主体区域 -->
        <el-container>
            <!-- menu的左边侧边栏 -->
            <el-aside :width="isCollapse ? '65px' : '200px'">
                <!-- 折叠展开的bar -->
                <div class="menuBar" @click="isCollapse=!isCollapse">|||</div>
                <!-- menu的左边导航 -->
                <!-- router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#333744"
                    router
                    unique-opened
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    text-color="#fff"
                    active-text-color="#409EFF">
                        <!-- 这样会报错[Vue warn]: Invalid prop: type check failed for prop "index". Expected String, got Number.
                        解决：给索引加一个:index="item.id + ''就变成字符串了 -->
                        <!-- 循环创建一级菜单 -->
                        <el-submenu :index="item.id + ''" v-for="(item, i) in menus" :key="item.id" :class="isCollapse ? 'el_submenu_smallwith' : 'el_submenu_largewith'">
                            <template slot="title">
                                <!-- 左侧的小图标 -->
                            <i :class="['iconfont', iconlist[i]]"></i>
                            <span>{{item.authName}}</span>
                            </template>
                            <!-- 循环创建二级菜单 -->
                            <!-- 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
                            <el-menu-item :index="'/' + subitem.path" v-for="subitem in item.children" :key="subitem.id">
                                <i class="el-icon-menu"></i>
                                {{subitem.authName}}
                            </el-menu-item>
                        </el-submenu>
                </el-menu>
            </el-aside>
            <!-- menu的右侧主体 -->
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data() {
    return {
      // 左侧菜单列表 默认为空
      menus: [],
      iconlist: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao'],
      // 控制是否进行折叠，false展开(默认)，true折叠。
      isCollapse: false
    }
  },
  created() {
    this.getmenu()
  },
  methods: {
    logout() {
      // 当点击退出按钮时清除token
      window.sessionStorage.removeItem('token')
      // 强制跳转到登录页
      this.$router.push('/login')
    },
    // 获取左侧菜单
    async getmenu() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error('获取左侧的菜单失败')
      this.$message.success('获取左侧的菜单成功')
      this.menus = res.data
      // console.log(res.data)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  user-select: none;
  .logo_title {
    display: flex;
    align-items: center;
    color: #fff;
    h2 {
      font-weight: 200;
      margin-left: 15px;
    }
  }
  .el-button {
    margin-right: 10px;
  }
}
.el-aside {
  background-color: #333744;
  user-select: none;
}
.el-main {
  background-color: #eaedf1;
}
.iconfont{
    margin-right: 8px;
}
.menuBar{
    color: #fff;
    background-color: #4A5064;
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 0.2em;
    text-align: center;
    cursor: pointer;
    // 禁止选中文字
    user-select: none;
}
// 默认为false展开，当展开的时候的宽度是200，当点击的时候变为true,侧边栏折叠，宽度为65
.el_submenu_largewith{
  width: 200px;
}
.el_submenu_smallwith{
  width: 65px;
}
</style>

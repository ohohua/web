<script lang="ts" setup>
import adminHeader from '@/components/admin/adminHeader.vue'
import adminAside from '@/components/admin/adminAside.vue'
// import copyright from '@/components/copyright'
import adminTabs from '@/components/admin/adminTabs.vue'
import 'element-plus/theme-chalk/el-backtop.css'
import { useCollapseStore } from '@/stores/collapse'

const collapseStore = useCollapseStore()
</script>

<template>
  <el-container class="h-screen">
    <!-- 占满全屏 -->
    <!-- 头部 -->
    <el-header class="border-b border-solid border-b-gray-500/20">
      <adminHeader></adminHeader>
    </el-header>

    <el-container class="overflow-auto">
      <!-- 侧边栏 -->
      <el-aside
        class="overflow-hidden transition-all duration-200 ease"
        :width="collapseStore.isCollapse ? '64px' : '200px'"
      >
        <adminAside></adminAside>
      </el-aside>
      <!-- 主体内容和标签页 -->
      <el-container>
        <adminTabs></adminTabs>

        <el-main class="h-full overflow-auto main bg-zinc-100">
          <router-view v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <component :is="Component"></component>
            </Transition>
          </router-view>

          <!-- 引入回到顶部按钮 -->
          <el-backtop target="main" :visibility-height="300" :right="50" :bottom="50">
            <i class="iconfont icon-huidaodingbu" style="font-size: 24px"></i>
          </el-backtop>
        </el-main>
        <el-footer height="0">
          <!-- <copyright></copyright> -->
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
/* 用于让el-main内容区域出现滚动条，而不是整个页面 */
.main {
  padding: 10px;
  /* 隐藏滚动条 */
  scrollbar-width: none;
}

.fade-leave-to {
  opacity: 0;
  transform: translatex(30px);
}

.fade-enter-active {
  transform: translatex(-30px);
  opacity: 0;
}

.fade-enter-to {
  transform: translatex(0px);
  opacity: 1;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s ease-out;
}
</style>

<script setup lang="ts">
import fullScreen from '@/components/fullScreen'
import theme from '@/components/theme.js'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { UserInfo } from '@/types'
import { errorCode } from '@/utils/errcode'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
let userInfo = reactive<UserInfo>({
  id: 0,
  email: '',
  ip: '',
  name: '',
  role: '',
  sex: '',
  avatar: '',
  nick_name: '',
})

function returnIndex() {
  router.push({
    path: '/',
  })
}

// 处理错误逻辑
const handleError = (error: any) => {
  if (error.response && error.response.data && error.response.data.status) {
    if (error.response.data.status === 1) {
      showMessage(error.response.data.reason, 'error')
    } else {
      showMessage(errorCode[error.response.data.status] || '未知错误', 'error')
    }
  } else {
    showMessage('请求失败，请稍后再试.', 'error')
  }
}

const showMessage = (message: string, type: 'success' | 'warning' | 'info' | 'error') => {
  ElMessage({
    message,
    type,
    duration: 3000,
  })
}
// 获取用户信息
const receiveUserInfo = async () => {}

// 登出
const toLogout = async () => {}
// 用于面包屑
const breadcrumbRoutes = computed(() => {
  return route.matched.filter((item) => item.meta && item.meta.title)
})
onMounted(() => {
  receiveUserInfo()
})
</script>

<template>
  <div class="flex items-center justify-between h-16">
    <div class="flex items-center header-left">
      <img src="https://element-plus.org/images/element-plus-logo.svg" alt="Logo" class="h-10" />
      <!-- 头部面包屑 -->
      <el-breadcrumb class="ml-6">
        <el-breadcrumb-item
          v-for="item in breadcrumbRoutes"
          :key="item.name"
          :to="{ name: item?.name }"
          class="text-base"
        >
          {{ item?.meta?.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="flex items-center header-right">
      <el-tooltip content="返回前台首页">
        <i class="iconfont icon-Home text-3xl cursor-pointer mr-2.5" @click="returnIndex"></i>
      </el-tooltip>
      <!-- 全屏组件 -->
      <fullScreen class="mr-2.5"></fullScreen>
      <!-- 主题切换组件 -->
      <el-tooltip content="切换主题">
        <theme class="mr-3"></theme>
      </el-tooltip>
      <div class="avatar mr-2.5">
        <el-avatar :src="userInfo.avatar" />
      </div>
      <!-- 下拉菜单 -->
      <el-dropdown placement="bottom-end">
        <span class="flex items-center w-full outline-none cursor-pointer">
          {{ userInfo.name }}
          <el-icon size="12px" class="ml-1"><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout" @click="toLogout">
              <i class="text-lg iconfont icon-tubiaozhizuomoban-"></i> 登出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>

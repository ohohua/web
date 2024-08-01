<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { View, Hide, Warning } from '@element-plus/icons-vue'
import theme from '@/components/theme'
import type { PasswordLogin } from '@/types'

const authStore = useAuthStore()
const isPasswordVisible = ref(false) //密码输入框是否可见

const loginForm = reactive<PasswordLogin>({
  username: '',
  email: '',
  password: '',
})

const onSubmitWithName = async () => {}

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const canSubmit = computed(() => {
  const { username, password } = loginForm
  return Boolean(username && password)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen login-page">
    <div class="w-1/3 overflow-hidden bg-white shadow-lg login-container rounded-3xl">
      <div class="py-5 login-main px-7">
        <div class="p-4 form-container">
          <!-- 表单头部 -->
          <div class="flex items-center justify-between form-top">
            <span class="text-2xl font-bold text-blue-400 title">密码登录</span>
            <theme></theme>
          </div>
          <el-divider />
          <!-- 表单主体 -->
          <el-form>
            <div class="input-container">
              <div class="relative mb-6 input-group">
                <input
                  v-model="loginForm.username"
                  type="text"
                  class="w-full h-10 px-3 transition-all duration-300 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                  placeholder=""
                />
                <label
                  class="absolute text-gray-400 transition-all duration-300 transform -translate-y-1/2 placeholder top-1/2 left-2"
                  >用户名</label
                >
              </div>
              <div class="relative mb-6 input-group">
                <input
                  v-model="loginForm.password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  class="w-full h-10 px-3 transition-all duration-300 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                  placeholder=""
                  autocomplete="on"
                />
                <label
                  class="absolute text-gray-400 transition-all duration-300 transform -translate-y-1/2 placeholder top-1/2 left-2"
                  >密码</label
                >
                <div class="password-toggle absolute top-2.5 right-2 cursor-pointer">
                  <el-icon @click="togglePasswordVisibility">
                    <component :is="isPasswordVisible ? View : Hide" />
                  </el-icon>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between mb-6 text-sm remember-row">
              <el-checkbox v-model="authStore.rememberMe" class="relative rememberMe">
                一周内免登录
                <el-tooltip
                  class="top-2"
                  content="勾选并登录后，规定天数内无需重新登录即可进入系统"
                  placement="top"
                >
                  <el-icon class="absolute left-28">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </el-checkbox>
              <router-link
                to="/login/forgetPassword"
                class="text-gray-400 forgot-password hover:underline hover:text-blue-500"
                >忘记密码?
              </router-link>
            </div>
            <el-button
              type="primary"
              size="large"
              class="w-full py-2 text-lg text-white bg-blue-500 rounded login-button hover:bg-blue-600 disabled:bg-gray-300"
              :disabled="!canSubmit"
              @click="onSubmitWithName"
              >登录
            </el-button>
          </el-form>
        </div>
        <div class="mt-6 text-center bottom-section">
          <el-divider>第三方登录</el-divider>
          <div class="mt-4 other-login">
            <div class="flex justify-center gap-6 icon-container">
              <el-tooltip content="邮箱登录" placement="bottom">
                <router-link to="/login/email"
                  ><i class="text-2xl cursor-pointer iconfont icon-youxiang hover:text-blue-500"></i
                ></router-link>
              </el-tooltip>
              <el-tooltip content="QQ登录" placement="bottom">
                <router-link to="#"
                  ><i class="text-2xl cursor-pointer iconfont icon-qq hover:text-blue-500"></i>
                </router-link>
              </el-tooltip>
              <el-tooltip content="github登录" placement="bottom">
                <router-link to="#"
                  ><i class="text-2xl cursor-pointer iconfont icon-github hover:text-blue-500"></i>
                </router-link>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center mt-4 text-center signup">
      <span class="mr-1">还没有账号？</span>
      <el-link type="primary" href="/login/signup"
        ><span class="text-base text-sky-500">去注册</span></el-link
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  background: var(--login-bg-gradient);
}

.placeholder {
  font-size: 0.875rem; // Tailwind CSS中的 text-sm 相当于 14px
}

input:focus + .placeholder,
input:not(:placeholder-shown) + .placeholder {
  top: 0;
  left: 0.5rem; // Tailwind CSS中的 left-2 相当于 0.5rem
  color: #3b82f6; // Tailwind CSS中的 text-blue-500 的颜色值
  transform: translateY(-100%) !important;
}
</style>

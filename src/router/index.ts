import { createRouter, createWebHistory } from "vue-router";
import { close, start } from "@/utils/nprogress";
import { errorRoute, routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      redirect: "/login",
      children: [
        {
          path: "/login",
          name: "loginPwd",
          component: () => import("@/views/login/loginPwd.vue"),
          meta: { title: "密码登录" },
        },
      ],
    },
    // 错误路由
    ...errorRoute,
    // 后台业务
    {
      path: "/admin",
      name: "admin",
      redirect: "/admin/home", //重定向至后台首页
      component: () => import("@/views/admin/admin.vue"),
      children: [...routes],
    },
  ],
});

/* 全局前置守卫 */
router.beforeEach(async (to) => {
  start(); // 开启进度条

  const isLogin = !!localStorage.getItem("token");
  if (to.path !== "/login" && !isLogin) {
    return { name: "login" };
  }
  return true;
});

/* 全局后置守卫 */
router.afterEach((to) => {
  close(); //关闭进度条
  document.title = to.meta.title as string;
});

export default router;

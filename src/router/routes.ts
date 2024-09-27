const _import = (url: `${string}/${string}`) => import(`@/views/admin/${url}.vue`);

/**
 * 错误路由
 */
export const errorRoute = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => _import("@/views/exception/404.vue"),
    meta: { title: "404" },
  },
  {
    path: "/exception/403",
    name: "Forbidden",
    component: () => import("@/views/exception/403.vue"),
    meta: { title: "403" },
  },
  {
    path: "/exception/500",
    name: "ServerError",
    component: () => import("@/views/exception/500.vue"),
    meta: { title: "500" },
  },
];
/**
 * 业务路由
 */
export const routes = [
  {
    path: "/admin/home",
    name: "adminHome",
    component: () => import("@/views/admin/home/home.vue"),
    meta: { title: "首页" },
  },
  {
    path: "/admin/systemManage",
    name: "systemManage",
    meta: { title: "系统管理" },
    redirect: "/admin/systemManage/userManage",
    children: [
      {
        path: "/admin/systemManage/userManage",
        name: "userManage",
        component: () => import("@/views/admin/user/userManage.vue"),
        meta: { title: "用户管理" },
      },
      {
        path: "/admin/systemManage/articleManage",
        name: "articleManage",
        component: () => import("@/views/admin/article/articleManage.vue"),
        meta: { title: "文章管理" },
      },
    ],
  },
];

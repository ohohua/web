const _import = (url: `${string}/${string}`) => import(`@/views/admin/${url}.vue`)

/**
 * 错误路由
 */
export const errorRoute = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => _import('@/views/exception/404.vue'),
    meta: { title: '404' },
  },
  {
    path: '/exception/403',
    name: 'Forbidden',
    component: () => import('@/views/exception/403.vue'),
    meta: { title: '403' },
  },
  {
    path: '/exception/500',
    name: 'ServerError',
    component: () => import('@/views/exception/500.vue'),
    meta: { title: '500' },
  },
]
/**
 * 业务路由
 */
export const routes = [
  {
    path: '/admin/home',
    name: 'adminHome',
    component: () => import('@/views/admin/home/home.vue'),
    meta: { requireAuth: true, title: '首页' },
  },
  {
    path: '/admin/systemManage',
    name: 'systemManage',
    meta: { requireAuth: true, role: 'admin', title: '系统管理' },
    redirect: '/admin/systemManage/userManage',
    children: [
      {
        path: '/admin/systemManage/userManage',
        name: 'userManage',
        component: () => _import('user/userManage'),
        meta: { requireAuth: true, role: 'admin', title: '用户管理' },
      },
      {
        path: '/admin/systemManage/articleManage',
        name: 'articleManage',
        component: () => _import('article/articleManage'),
        meta: { requireAuth: true, role: 'admin', title: '文章管理' },
      },
    ],
  },
  {
    path: '/admin/userInfo',
    name: 'userInfo',
    component: () => _import('user/userInfo'),
    meta: { requireAuth: true, title: '用户信息' },
  },
  {
    path: '/admin/userCollection',
    name: 'userCollection',
    component: () => _import('user/userCollection'),
    meta: { requireAuth: true, role: 'admin', title: '用户收藏' },
  },
  {
    path: '/admin/userPost',
    name: 'userPost',
    component: () => _import('user/userPost'),
    meta: { requireAuth: true, role: 'admin', title: '用户发布' },
  },
  {
    path: '/admin/about',
    name: 'about',
    component: () => _import('site/siteInfo'),
    meta: { requireAuth: true, title: '关于' },
  },
]

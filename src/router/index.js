/**
 * Vue Router 配置
 */

import { createRouter, createWebHistory } from 'vue-router';

// 懒加载页面组件
const Home = () => import('../pages/Home.vue');
const About = () => import('../pages/About.vue');
const Codenames = () => import('../pages/Codenames/Codenames.vue');

// 路由配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: { title: '关于' }
  },
  {
    path: '/codenames',
    name: 'codenames',
    component: Codenames,
    meta: { title: '截码战' }
  },
  // 404 路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 保持滚动位置或回到顶部
    return savedPosition || { top: 0 };
  }
});

// 全局后置钩子：更新页面标题
router.afterEach((to) => {
  document.title = to.meta.title 
    ? `${to.meta.title} - 吟游者的个人博客` 
    : '吟游者的个人博客';
});

export default router;
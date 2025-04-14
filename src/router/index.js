import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      //I can also replace it with "component: () => import('../views/HomeView.vue')"
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { title: '关于我' },
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/PostListView.vue'),
      meta: { title: '文章列表' },
    },
    {
      path: '/article/:id',
      name: 'ArticleDetail',
      component: () => import('@/components/posts/ArticleDetial.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { title: '联系我' },
    },
    {
      path: '/works',
      name: 'works',
      component: () => import('@/views/WorksView.vue'),
      meta: { title: '作品集' },
      children: [
        {
          path: 'projects',
          name: 'projects',
          component: () => import('@/views/works/ProjectView.vue'),
        },
        {
          path: 'codeworks',
          name: 'codeworks',
          component: () => import('@/views/works/CodeWorkView.vue'),
        },
        {
          path: '/works',
          redirect: '/works/codeworks',
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const defaultTitle = "ZM'blog"
  document.title = to.meta.title || defaultTitle
  next()
})

export default router

# ZM_Blog

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# ZM’blog - Vue3

## main.js

```
import './assets/main.css' //全局样式文件，所有页面

import { createApp } from 'vue' //使用createApp()来创建一个新的Vue应用。
import { createPinia } from 'pinia' //createPinia()返回一个Pinia实例，Pinia是Vue官方推荐的状态管理库，用于在组件之间共享数据。

import App from './App.vue' //根组件，整个Vue应用的起点，包含了布局、路由入口<router-view>、头部底部公共结构等
import router from './router' //导入我的路由配置，定义了我对页面的导航路径。

const app = createApp(App) //用App.vue 创建了一个Vue应用实例，app是后续操作的基础。

if (import.meta.env.DEV) {  //Vite 提供的环境变量，在开发环境中值为 true，生产环境为 false
  console.log('开发模式启动 App')
} //提示开发环境，可选*

app.use(createPinia()) //Pinia插件注册到Vue应用中，开启状态管理功能。
app.use(router) //将路由系统挂在到Vue应用上

/*app.config.errorHandler
这是 Vue 提供的一个 全局错误捕捉钩子，作用是：
捕获所有组件内部未捕捉的异常
避免页面白屏或无法响应
便于统一上报错误日志*/
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误：', err, info)

  /*...可以添加一个将错误发送到日志的功能，暂未实现*/
}

app.mount('#app') //把Vue应用挂载到页面中id="app"的HTML元素上，例如我的挂载在index.html中的：
`<body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>`中
```

如果项目中会使用一些全局组件，比如图标按钮或者指令，也可以在入口处统一注册。

例如：

```
import MyIcon from './components/MyIcon.vue'
app.component('MyIcon', MyIcon)

app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
// 这些都建议封装到单独的 registerGlobal.js 里，让 main.js 保持干净。
```

也可以将初始化逻辑整理成一个模块结构，抽成一个setupApp.js，让我的main.js保持干净，只负责启动。

src/setupApp.js

```
// src/setupApp.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

export function setupApp() {
  const app = createApp(App)

  //  注册状态管理
  app.use(createPinia())

  //  注册路由
  app.use(router)

  //  全局错误处理
  app.config.errorHandler = (err, instance, info) => {
    console.error('全局错误:', err, info)
    // 可选：上报日志服务
  }

  //  环境判断逻辑
  if (import.meta.env.DEV) {
    console.log('开发模式启动 App')
  }

  return app
}
```

src/main.js

```
// src/main.js
import './assets/main.css'
import { setupApp } from './setupApp'

setupApp().mount('#app')
```

### Vue的基本原理

Vue 的响应式系统使得视图能够自动更新，当模型（数据）发生变化时，视图会根据数据的变化重新渲染。

Vue 提供了一种声明式的模板语法，用于将数据绑定到视图上。模板会根据数据的变化自动更新。

Vue 强调通过组件化来构建应用。每个组件拥有自己的模板、数据、方法和生命周期，可以方便地复用和维护。

Vue 组件具有一系列生命周期钩子，开发者可以在这些钩子中执行特定的操作（如初始化数据、请求数据、清理资源等）。常见的生命周期钩子有：

- `created`：组件实例化后立即调用，此时数据和事件已设置完毕，但 DOM 尚未创建。
- `mounted`：DOM 被挂载到页面后调用，适合做与 DOM 相关的操作。
- `updated`：组件数据更新后调用，视图重新渲染后执行。
- `destroyed`：组件销毁之前调用，用于清理资源。

Vue Router 是 Vue.js 的官方路由管理库，负责处理页面的导航和视图切换。它允许通过 URL 路径来映射不同的视图，并根据路由变化动态加载组件。

Vuex 是 Vue.js 的官方状态管理库，它帮助开发者在组件之间共享状态。Vuex 通过 **store** 来集中管理应用的状态，确保状态管理的可预测性。

Vue 使用虚拟 DOM 来优化性能。虚拟 DOM 是一个内存中的 DOM 树，Vue 会先在虚拟 DOM 上进行所有的修改操作，然后将与真实 DOM 的差异部分（即最小化的变更）更新到浏览器中的真实 DOM，从而提高性能。

Vue 提供计算属性来处理依赖于数据的复杂逻辑。计算属性是基于其依赖缓存的，只有在相关数据变化时才会重新计算。

- 与普通方法不同，计算属性具有缓存功能，避免了不必要的重复计算。

### MVVM、MVC、MVP的区别

| 特性                   | MVC                                  | MVP                                           | MVVM                                                     |
| ---------------------- | ------------------------------------ | --------------------------------------------- | -------------------------------------------------------- |
| **用户交互处理**       | 控制器处理用户输入并更新视图和模型   | Presenter 处理用户输入并直接更新视图和模型    | ViewModel 通过数据绑定处理用户交互与显示更新             |
| **View 与 Model 关系** | View 直接与 Controller 和 Model 通信 | View 只与 Presenter 通信，Presenter 更新 View | View 通过数据绑定与 ViewModel 通信，ViewModel 更新 Model |
| **适用场景**           | 传统的 Web 应用、桌面应用            | 需要更强测试支持的应用、GUI 应用              | 现代数据绑定框架、双向数据绑定支持的应用                 |
| **视图更新机制**       | 控制器更新视图                       | Presenter 更新视图                            | 数据绑定自动更新视图                                     |

- **MVC** 是传统架构，适用于简单的应用场景，但控制器和视图的耦合度较高。Django（‘MTV’）
- **MVP** 改进了 MVC，控制了视图和业务逻辑的交互，使得测试更加容易，特别是在需要单元测试的场景下更为有效。
- **MVVM** 适用于具有双向数据绑定的框架（如 Vue、Angular），它通过 ViewModel 使得视图和业务逻辑更加解耦，适合复杂的前端开发。

### 计算属性（`computed`）和侦听器（`watch`）

`computed` 是一种 **基于依赖进行缓存** 的响应式数据。当依赖的数据发生变化时，计算属性会重新计算；如果依赖没变，多次访问会使用 **缓存值**，不会重复执行函数。

Vue 会追踪计算属性依赖的响应式数据；

当依赖项发生改变时，计算属性才会重新求值；

否则返回上一次的计算结果（缓存）。

场景：

依赖已有数据进行计算并返回结果；

不需要异步操作；

性能要求高，希望 减少重复计算。

`watch` 是用于监听某个响应式数据的变化，并在其变化时执行回调函数。它**不会返回值**，而是用于执行副作用（如请求、操作 DOM、写日志等）。

侦听一个或多个响应式数据；

一旦变化就触发回调，传入新旧值；

不会缓存结果。

**需要执行异步操作**（如：请求接口）；

**响应数据变化做副作用处理**；

对象/数组/深层属性变化监听。

## 路由部分

src/router/index.js

```
import { createRouter, createWebHistory } from 'vue-router' // 使用 Vue Router 创建一个客户端路由器，使用 HTML5 模式（无 #）进行导航。
import HomeView from '../views/HomeView.vue' // 首页是同步引入（优先加载）
import ArticleDetail from '@/components/posts/ArticleDetial.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      //I can also replace it with "component: () => import('../views/HomeView.vue')" 即改为懒加载：使用懒加载形式（当访问到此页面时才加载组件）。好处是：减少初始打包体积（Vue 官方推荐做法）。
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/PostListView.vue'),
    },
    {
      path: '/article/:id',
      name: 'ArticleDetail',
      component: () => import('@/components/posts/ArticleDetail.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/works',
      name: 'works',
      component: () => import('@/views/WorksView.vue'),
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
          redirect: '/works/codeworks' // 默认重定向
        },
      ],
    },
  ],
})

export default router

```

补充：Vue Router中的meta字段，为路由附加额外的元信息。

| 用法           | 描述                           |
| -------------- | ------------------------------ |
| `title`        | 页面标题，常用于设置 `<title>` |
| `requiresAuth` | 是否需要登录                   |
| `keepAlive`    | 是否缓存组件                   |
| `roles`        | 允许访问的用户角色（用于权限） |

```
router.beforeEach((to, from, next) => {
  const defaultTitle = '我的博客'
  document.title = to.meta.title || defaultTitle
  next()
})
```

```
{
  path: '/',
  name: 'home',
  component: () => import('../views/HomeView.vue'),
  meta: { title: '首页' }
},
{
  path: '/posts',
  name: 'posts',
  component: () => import('../views/PostListView.vue'),
  meta: { title: '文章列表' }
},
{
  path: '/article/:id',
  name: 'ArticleDetail',
  component: () => import('@/components/posts/ArticleDetail.vue'),
  meta: { title: '文章详情' }
},
```

也可以在 `ArticleDetail.vue` 里动态设置标题

```
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

onMounted(() => {
  ...// 其他逻辑
  document.title = `文章详情 - ${articleTitle}` // 添加类似逻辑
})
```

### 路由的一些知识储备

#### 1.hash模式和history模式

hash：使用浏览器中的#符号后面的部分作为前端路由地址，兼容性好，不用服务器配置，部署简单所有浏览器都支持，不美观不符合SEO（搜索引擎优化）要求，一些第三方平台对#后参数可能处理不一致。搜索引擎通常不会抓取#后面的内容。

history：使用createWebHistory()，路由表现为普通的url，利用了浏览器的pushState/replace方法，实现无刷新跳转，路径干净美观，有利于SEO，需要后端支持，所有前端的路由需要重定向到index.html, 否则刷新页面会出现404（因为浏览器会访问/article/aa...举例路由地址）,而服务器找不到该资源。

**\*项目中没有在express后端中添加重定向**

```
//在所有接口路由之后放置
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, "dist", 'index.html'))
})

// 需要打包前端生成一个dist/文件夹
```

| 场景                           | 建议使用的模式           |
| ------------------------------ | ------------------------ |
| 本地开发 / 简单部署            | Hash 模式，最省事        |
| 有后端服务器支持（如 Express） | History 模式（体验更好） |
| 部署在 GitHub Pages / 静态托管 | Hash 模式                |
| 需要 SEO 优化（+ SSR）         | History 模式             |

| 场景                         | 方法                                           |
| ---------------------------- | ---------------------------------------------- |
| 获取当前 hash                | `window.location.hash` 或 `route.hash`         |
| 监听 hash 变化（原生）       | `window.addEventListener('hashchange', ...)`   |
| 监听 hash 变化（Vue 响应式） | `watch(() => route.hash, ...)`                 |
| 结合组件生命周期             | 在 `onMounted` / `onUnmounted` 注册/移除监听器 |

获取当前 hash：

```
js复制编辑import { useRoute } from 'vue-router'

const route = useRoute()
console.log('当前 hash:', route.hash) // => "#comments"
```

响应式监听 hash（watch）：

```
js复制编辑import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()

watch(
  () => route.hash,
  (newHash, oldHash) => {
    console.log('Hash changed from', oldHash, 'to', newHash)
  }
)
```

监听整条路由的变化

```
watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    console.log('路由变化了！')
    console.log('from', oldPath, 'to', newPath)
  }
)

```

或者监听整个 `route` 对象：

```
watch(route, (newRoute, oldRoute) => {
  console.log('完整路由变化:', newRoute, oldRoute)
}, { deep: true })
```

#### 2.什么是前端路由

传统网站是多页的，每次点击链接都会向服务器发请求，页面会整体刷新。

单页应用是：页面只加载一次，后续的跳转都不用刷新页面，通过前端代码动态切换组件的容，这就是前端路由所控制的。点击链接时前端不会跳转页面，而是替换一部分的组件内容。

通过routes定义路径与组件的映射关系，`<router-link>`替换传统的`<a>`标签，不刷新页面进行跳转。`<router-view>`当前路径匹配到的组件会渲染在这里。

优势：页面无刷新切换，用户体验更加顺滑；状态保留，不会因为刷新而丢失，搭配后端API，响应快可定制性强。

但是前端路由SEO需要SSR支持

#### 3.params vs query

| 对比点                     | `params`（路径参数）           | `query`（查询参数）             |
| -------------------------- | ------------------------------ | ------------------------------- |
| URL 形式                   | `/article/123`                 | `/article?id=123`               |
| 定义方式                   | 路由中声明 `:id`               | 路由不需要额外声明              |
| 使用场景                   | 标识资源（如文章详情、用户页） | 传递搜索条件、过滤器、分页等    |
| 是否必须定义在 `routes` 中 | ✅ 是的                        | ❌ 否                           |
| 获取方式                   | `route.params.id`              | `route.query.id`                |
| 是否更“语义化”             | ✅ 是                          | 一般                            |
| 是否支持多个参数           | ✅ 支持 `/user/:uid/post/:pid` | ✅ `/search?keyword=vue&page=2` |
| 改变时是否刷新组件         | ❌ 默认不会刷新                | ✅ 默认会刷新组件内容           |

| 使用情景       | 推荐方式                               |
| -------------- | -------------------------------------- |
| 文章详情页     | `params` → `/article/:id`              |
| 用户个人主页   | `params` → `/user/:uid`                |
| 搜索过滤、分页 | `query` → `/search?keyword=xxx&page=1` |
| 分类浏览       | `query` 或 `params`，看需求            |

#### 4.路由监听

| 想监听的变化  | 正确写法                                                                  |
| ------------- | ------------------------------------------------------------------------- |
| URL 中的 hash | `watch(() => route.hash, ...)`                                            |
| 页面路径变化  | `watch(() => route.path, ...)`                                            |
| 路由参数变化  | `watch(() => route.params, ...)`                                          |
| query 变化    | `watch(() => route.query, ...)`                                           |
| 任意路由变化  | `watch(() => route.fullPath, ...)` or `watch(route, ..., { deep: true })` |

#### 5.route和router

route是当前在哪个页面的信息

```
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.path)     // 当前路径，如 /home
console.log(route.params)   // 动态参数，如 { id: '123' }
console.log(route.query)    // 查询参数，如 ?page=2
console.log(route.hash)     // 哈希，如 #top
```

router是控制页面跳转的工具

```
import { useRouter } from 'vue-router'

const router = useRouter()

router.push('/about') // 编程式跳转
router.replace('/home') // 替换当前路由
router.back() // 后退
router.forward() // 前进
```

| 特性       | `route`                      | `router`                       |
| ---------- | ---------------------------- | ------------------------------ |
| 类型       | 对象（readonly）             | 实例（有方法）                 |
| 来自       | `useRoute()`                 | `useRouter()`                  |
| 作用       | 提供当前页面的信息           | 控制路由行为（跳转、替换等）   |
| 是否响应式 | 是                           | 否（不响应式）                 |
| 常见属性   | `path`, `query`, `params` 等 | `push`, `replace`, `go` 等方法 |

#### 6.路由钩子在生命周期中的体现

假设你从 `/home` 切换到 `/about` 页面，整个生命周期是这样的：

```
1. beforeRouteLeave (Home组件中的)
2. beforeEach (全局守卫)
3. beforeEnter (目标路由守卫)
4. beforeRouteEnter (About组件中的)
5. setup() / created()
6. onBeforeMount()
7. onMounted()
8. afterEach (全局守卫)
```

`beforeRouteEnter`

- ✅ 在组件 _还未创建前_ 执行
- ❌ 拿不到 `this`，因为组件还没被实例化
- ✅ 可以通过 `next(vm => {})` 拿到组件实例

```
beforeRouteEnter(to, from, next) {
  next(vm => {
    console.log('组件创建完成，this 可以用', vm)
  })
}
```

---

`beforeRouteUpdate`

- ✅ 当使用**相同组件复用不同参数**时触发（如 `/article/1` → `/article/2`）
- ✅ 可以访问 `this`
- ✅ 适合在 params 更新时，重新请求数据

```
beforeRouteUpdate(to, from, next) {
  this.fetchData(to.params.id)
  next()
}
```

---

`beforeRouteLeave`

- ✅ 当离开当前路由前触发
- ✅ 可以用来弹窗提醒用户是否确认离开

```
beforeRouteLeave(to, from, next) {
  if (this.unsavedChanges) {
    const answer = window.confirm('你有未保存的更改，确定离开？')
    if (answer) next()
    else next(false)
  } else {
    next()
  }
}
```

| 目的                         | 推荐钩子                          |
| ---------------------------- | --------------------------------- |
| 拦截导航，检查权限           | `router.beforeEach()`             |
| 获取当前页面数据（首次加载） | `beforeRouteEnter` 或 `onMounted` |
| 页面参数变化时更新内容       | `beforeRouteUpdate`               |
| 离开页面前做清理             | `beforeRouteLeave`                |

#### 7.vue-router的懒加载如何实现

懒加载（Lazy Loading）是一种优化技术，它允许在需要时才加载资源，而不是在页面加载时一次性加载所有资源。

使用 `vue-router` 实现路由懒加载是一种常见的优化手段，可以显著提升应用的首屏加载速度

使用 `import()` 语法实现懒加载是最推荐的方式，通过将组件定义为一个返回 `Promise` 的函数来实现懒加载。例如：

```javascript
const routes = [
  {
    path: '/home',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/about',
    component: () => import('./views/About.vue'),
  },
]
```

## views部分

### HomeView.vue

```
<script setup>
import ArticleCard from '../components/home/ArticleCard.vue'
// 引入了一个名为 ArticleCard 的组件，用于展示单个文章（封面、标题、简介等）
</script>

<template>
  <main class="main-container">
    <div class="article-list-container">
      <ArticleCard /> // 很简单，加载了一个ArticleCard（命名为ArticleList应该更为合理）组件
    </div>
  </main>
</template>

<style scoped>
.main-container {
  background-color: #f5f5f5; /* 背景颜色 */
  min-height: 100vh; /* 确保主内容至少占满屏幕高度 */
  padding: 20px; /* 内边距 */
}

.article-list-container {
  margin: 20px auto; /* 自动水平居中 */
  padding: 20px; /* 内边距 */
  background-color: white; /* 白色背景 */
  border-radius: 12px; /* 圆角 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  min-width: 80%;
}
</style>

```

### AboutView.vue

```
<script setup>
import AboutContent from '../components/about/index.vue'
</script>

<template>
  <div class="about">
    <AboutContent />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

```

### PostListView.vue

```
<template>
  <div class="container">
    <div class="button-group">
      <button @click="showArticleList" class="btn btn-secondary">查看文章</button>
      <button @click="showUploadArticle" class="btn btn-primary">发布文章</button>
    </div>

    <div class="component-container">
      <div v-if="currentComponent === 'UploadArticle'">
        <UploadArticle />
      </div>
      <div v-else-if="currentComponent === 'ArticleList'">
        <ArticleList />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UploadArticle from '@/components/posts/UploadArticle.vue'
import ArticleList from '@/components/posts/PostCard.vue'

const currentComponent = ref('ArticleList') // 默认显示文章列表
const passwordVerified = ref(false)  // 这个布尔值控制是否已经验证过发布密码，用来保护上传功能。（有点草率，后期会进行加工）

const showUploadArticle = () => {
  if (passwordVerified.value) {
    currentComponent.value = 'UploadArticle'
  } else {
    const input = prompt('请输入发布密码：')
    if (input === 'zhangmeng0601') {
      passwordVerified.value = true
      currentComponent.value = 'UploadArticle'
    } else if (input !== null) {
      alert('密码错误，无法进入发布页面')
    }
  }
}

const showArticleList = () => {
  currentComponent.value = 'ArticleList'
}
</script>

<style scoped>
.container {
  width: 90%; /* 最大宽度 */
  margin: 0 auto; /* 水平居中 */
  padding: 20px; /* 内边距 */
  background-color: #f9f9f9; /* 背景颜色 */
  border-radius: 12px; /* 圆角 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.button-group {
  display: flex;
  justify-content: center; /* 水平居中按钮 */
  gap: 20px; /* 按钮之间的间距 */
  margin-bottom: 20px; /* 下边距 */
}

.btn {
  gap: 20px;
  padding: 10px;
  margin: 10px;
  flex-wrap: wrap;
  background-color: #ffffff;
  box-shadow: 1px 1px 40px 12px rgba(0, 0, 0, 0.06);
  transition: color 0.3s ease;
  text-align: center;
  flex: 1 0 21%;
  font-size: 30px;
  border-radius: 10px;
  text-decoration: none;
}

.btn-primary {
  background-color: #007bff; /* 主按钮颜色 */
  color: white; /* 字体颜色 */
}

.btn-primary:hover {
  background-color: #0056b3; /* 主按钮悬停颜色 */
  transform: translateY(-2px); /* 悬停时稍微上移 */
}

.btn-secondary {
  background-color: #28a745; /* 次按钮颜色 */
  color: white; /* 字体颜色 */
}

.btn-secondary:hover {
  background-color: #218838; /* 次按钮悬停颜色 */
  transform: translateY(-2px); /* 悬停时稍微上移 */
}

.component-container {
  margin-top: 20px; /* 顶部间距 */
}
</style>

```

使用v-if 和 v-else-if 判断当前组件名，条件满足就渲染对应的组件。

密码是写死在前端的，容易被看到。（更安全的做法是把密码验证交给后端，避免暴露在前端）

使用动态组件 `<component :is="currentComponent" />` 替代多个 `v-if`

### CodeWorkView.vue

```
<template>
  <div class="code-work-view">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <h2 class="title">组件列表</h2>
      <ul class="component-list">
        <li
          v-for="comp in components"
          :key="comp.name"
          @click="selectComponent(comp)"
          :class="['component-item', { active: comp.name === currentComponent.name }]"
        >
          {{ comp.label }}
        </li>
      </ul>
    </aside>

    <!-- 右侧组件展示区域 -->
    <main class="preview-area">
      <h3 class="preview-title">预览：{{ currentComponent.label }}</h3>
      <div class="preview-box">
        <component :is="currentComponent.component" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import MyClock from '@/components/codeworks/MyClock.vue'



const components = [
  { name: 'MyClock', label: '时钟组件', component: MyClock },
]

const currentComponent = ref(components[0])

function selectComponent(comp) {
  currentComponent.value = comp
}
</script>

<style scoped>
.code-work-view {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
  color: #333;
}

.sidebar {
  width: 250px;
  background-color: #f3f3f3;
  border-right: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.component-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.component-item {
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: background-color 0.2s;
}

.component-item:hover {
  background-color: #e0eaff;
}

.component-item.active {
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
}

.preview-area {
  flex: 1;
  padding: 30px;
  background-color: #fff;
  overflow-y: auto;
  box-sizing: border-box;
}

.preview-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

.preview-box {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fafafa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}
</style>

```

考虑懒加载，减少页面加载时的性能开销。

使用router来实现组件的路由控制

响应式布局

```
/* 追加在原 CSS 最后 */
@media (max-width: 768px) {
  .code-work-view {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ccc;
  }

  .preview-area {
    width: 100%;
    padding: 20px;
  }

  .component-item {
    font-size: 16px;
    padding: 8px 12px;
  }

  .preview-title {
    font-size: 16px;
  }

  .preview-box {
    padding: 15px;
  }
}


```

### ProjectView.vue

```
<template>
  <div class="project-view">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <h2 class="title">我的项目</h2>
      <ul class="project-list">
        <li
          v-for="project in projects"
          :key="project.name"
          @click="selectProject(project)"
          :class="['project-item', { active: project.name === currentProject.name }]"
        >
          {{ project.name }}
        </li>
      </ul>
    </aside>

    <!-- 右侧项目详情展示 -->
    <main class="detail-area">
      <h3 class="detail-title">{{ currentProject.name }}</h3>
      <p>
        <strong>演示网址：</strong>
        <a :href="currentProject.demoUrl" target="_blank">{{ currentProject.demoUrl }}</a>
      </p>
      <p>
        <strong>GitHub：</strong>
        <a :href="currentProject.githubUrl" target="_blank">{{ currentProject.githubUrl }}</a>
      </p>
      <div class="project-image">
        <img :src="currentProject.image" alt="项目截图" loading="lazy" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import carImg from '@/assets/project_image/car.png'
import blogImg from '@/assets/project_image/blog.jpg'
import airlineImg from '@/assets/project_image/airline.jpg'

const projects = [
  {
    name: '个人博客系统',
    demoUrl: 'http://47.121.190.121:8080/',
    githubUrl: 'https://github.com/developbao/zm_blog_web',
    image: blogImg,
  },
  {
    name: '二手车交易平台',
    demoUrl: 'http://47.121.190.121:8099/',
    githubUrl:
      'https://github.com/developbao/Second-hand-Car-Transaction-and-Data-Analysis-Platform',
    image: carImg,
  },
  {
    name: '飞机购票系统',
    demoUrl: '#',
    githubUrl: 'https://github.com/developbao/Airline-Ticketing-System',
    image: airlineImg,
  },
]

const currentProject = ref(projects[0])

function selectProject(project) {
  currentProject.value = project
}
</script>

<style scoped>
.project-view {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
  color: #333;
}

.sidebar {
  width: 250px;
  background-color: #f3f3f3;
  border-right: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.project-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-item {
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: background-color 0.2s;
}

.project-item:hover {
  background-color: #e0eaff;
}

.project-item.active {
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
}

.detail-area {
  flex: 1;
  padding: 30px;
  background-color: #fff;
  overflow-y: auto;
  box-sizing: border-box;
}

.detail-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}

a {
  color: #3b82f6;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.project-image {
  margin-top: 20px;
}

.project-image img {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>

```

## components部分

#### ArticleCard.vue

src\components\home\ArticleCard.vue

```javascript
<template>
  <div class="article-list p-6 bg-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto">
    <div v-if="articles.length === 0" class="text-center text-gray-500">暂无文章</div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="article in articles"
        :key="article.id"
        class="article-card transition-transform transform hover:scale-105"
        @click="goToDetail(article._id)"
      >
        <img
          :src="`http://47.121.190.121:3000${article.img}`"
          alt="封面图"
          class="article-image rounded-md shadow-md"
        />
        <div class="info p-4">
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-summary">
            <strong>摘要：</strong>{{ article.summary || '（无摘要）' }}
          </p>
          <div class="tags-wrapper">
            <span v-for="(tag, index) in article.tags" :key="index" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const articles = ref([])

const router = useRouter()

const fetchTopArticles = async () => {
  const res = await fetch(`http://47.121.190.121:3000/articles/top?limit=8`)
  const data = await res.json()
  if (data.code === 200) {
    articles.value = data.list
  }
}

const goToDetail = (id) => {
  router.push(`/article/${id}`)
}

onMounted(fetchTopArticles)
</script>

<style scoped>
.article-list {
  background-color: #f9fafb; /* 背景颜色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

h2 {
  margin-bottom: 20px;
  text-align: center; /* 标题居中 */
  color: #2d3748; /* 标题颜色 */
}

/* 使用 CSS 网格布局 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); /* 自适应网格 */
  gap: 30px; /* 网格间距 */
}

.article-card {
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%; /* 关键 */
}

.article-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); /* 悬停时增强阴影 */
  transform: translateY(-4px); /* 悬停时稍微上移 */
}

.article-image {
  width: 100%; /* 图片宽度为100% */
  height: 230px; /* 自动高度 */
  border-radius: 12px 12px 0 0; /* 圆角 */
}

.info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-title {
  font-size: 1.5rem; /* 字体大小 */
  margin: 0 0 10px; /* 下边距 */
  color: #2d3748; /* 标题颜色 */
}

.article-summary {
  color: #555;
  margin: 6px 0;
  line-height: 1.4;
  max-height: 4.2em; /* 3行高度 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 限制显示3行 */
  -webkit-box-orient: vertical;
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* 标签之间的间距 */
  margin-top: 10px;
}

.tag {
  background-color: #e0f2ff; /* 浅蓝背景 */
  color: #2563eb; /* 深蓝字体 */
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px; /* 圆角气泡 */
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
  transition: background-color 0.2s ease;
  cursor: default;
}

.tag:hover {
  background-color: #bfdbfe; /* 鼠标悬停时背景稍微变深 */
}
</style>

```

##### Promise对象

Promise代表一个异步操作的最终状态极其结果值

什么是异步？任务或操作在**非阻塞**方式下执行，允许程序在等待某个操作完成时继续处理其他任务，从而提升效率和响应速度。

**应用场景**

- 网络请求：AJAX、Fetch API异步加载数据
- 文件操作：异步读写避免界面冻结
- **高并发系统**：如电商订单处理，异步提升吞吐量

|  **特性**  |      **同步**      |       **异步**        |
| :--------: | :----------------: | :-------------------: |
|  执行顺序  |      顺序阻塞      |      非阻塞并发       |
| 资源利用率 |   低（线程闲置）   |    高（线程复用）     |
| 代码复杂度 |      简单直观      | 需处理回调或Promise链 |
|  典型场景  | 简单任务、实时响应 | I/O密集型、高并发系统 |

Promise三种状态：

pending 待定：初始状态操作未完成。

fulfilled 已对现： 操作成功完成，通过resolve触发

rejected 已拒绝： 操作失败， 通过reject触发

状态不可逆，一旦从pending变为其他状态，状态将永久固定。

- **`.then()`**：处理成功状态，接收`onFulfilled`回调。

- **`.catch()`**：处理失败状态，是`.then(null, onRejected)`的语法糖。

- **`.finally()`**：无论成功失败都会执行，常用于清理操作

  ```
  promise
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => console.log("操作结束"));
  ```

```
链式调用：
new Promise(resolve => resolve(1))
  .then(result => result * 2) // 返回2
  .then(result => console.log(result)); // 输出4
```

##### 异步操作：async`和`await

`async` 是一个关键字，用于声明一个函数为异步函数。异步函数会自动返回一个 `Promise` 对象。即使函数内部没有显式返回 `Promise`，它也会被自动包装为一个 `Promise`。

`await` 是一个关键字，用于等待一个 `Promise` 的结果。它只能在 `async` 函数内部使用。`await` 会暂停函数的执行，直到 `Promise` 完成（`resolve` 或 `reject`），然后继续执行。

eg

```
const fetchTopArticles = async () => {  // 定义一个异步函数async，名字为fetchTopArticles，返回一个Promise，这个函数内部可以使用await关键字来等待异步操作的完成。
  const res = await fetch('http://47.121.190.121:3000/articles/top?limit=8')  //fetch用来发起网络请求，是一个浏览器内建的函数，这里是一个get请求，这个请求的url是我后台提供的articles/top接口，limit=8，最多可以返回8篇文章，await关键字会让函数暂停执行，知道fetch返回结果res，返回的是一个 Response 对象，里面包含状态码、头信息、正文内容等
  const data = await res.json()  // res.json是response对象的方法，用来把响应的内容解析为一个JSON对象
  if (data.code === 200) {  // 如果状态码是200，表示成功
    articles.value = data.list  //成功就把data.list赋值给articles.value
  }
}
```

##### v-指令

`v-if="articles.length === 0"`

当 `articles` 数组长度为 0 时，才会渲染这个 `<div>`。否则这个元素根本不会出现在页面中。

`v-for="article in articles"`

用来**循环渲染**文章列表，每一项是一个 `article` 对象。

`v-for="(tag, index) in article.tags"`

循环渲染 `tags` 数组，每一个 `tag` 是一项，`index` 是下标。

##### 一些可以优化的点

```
<img
  loading="lazy"
  :src="`http://47.121.190.121:3000${article.img}`"
  alt="封面图"
  class="article-image rounded-md shadow-md"
/>
```

封面图采用懒加载，让图片按需加载，减少首屏加载的压力

**提取卡片为子组件**
如果后面复用频繁，可以封装 `<ArticleCard :article="article" />`，保持主页面整洁。

**提取 fetch API 为公共方法** 可复用性更强，比如建一个 `api.js`

```
export const getTopArticles = async (limit = 8) => {
  const res = await fetch(`http://47.121.190.121:3000/articles/top?limit=${limit}`)
  return await res.json()
}
```

```
import { getTopArticles } from '@/utils/api'
onMounted(async () => {
  const data = await getTopArticles()
  if (data.code === 200) articles.value = data.list
})
```

##### v-show 和 v-if的区别

| 特性             | `v-if`                                 | `v-show`                              |
| ---------------- | -------------------------------------- | ------------------------------------- |
| **DOM 结构**     | 元素会被真正添加/移除到 DOM 中         | 元素始终存在，只是 `display:none`     |
| **初始渲染成本** | 不渲染就不创建 DOM，首次开销小         | 会渲染所有元素，初始开销高            |
| **切换开销**     | 每次都销毁 & 重建，频繁切换开销较大    | 仅切换 CSS，切换性能高                |
| **适用场景**     | 条件**不经常变化**的情况（如登录弹窗） | 条件**频繁变化**的情况（如 tab 切换） |

**`v-if` 是真“隐藏”**（根本没这元素）
**`v-show` 是“假装隐藏”**（只是 display:none）

##### v-html

将数据中的 HTML 字符串解析并插入到指定元素中，替代传统的文本插值（`{{ }}` 会自动转义 HTML 标签）

风险：XXS攻击 直接渲染用户输入的HTML可能导致恶意脚本执行

（将在博客文章展示的组件中详细讲述）

#### ArticleDetail.vue

```javascript
<template>
  <div class="my-article">
    <div class="article-detail" v-if="article">
      <h2 class="article-title">{{ article.title }}</h2>

      <img
        v-if="article.img"
        :src="`http://47.121.190.121:3000${article.img}`"
        class="article-image"
        alt="Article Image"
      />

      <div v-html="article.content" class="article-content"></div>

      <p class="article-meta">
        作者：<span class="meta-bold">{{ article.authorId }}</span> | 阅读量：<span
          class="meta-bold"
          >{{ article.readCount }}</span
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // 你可以换其他主题，比如 'monokai-sublime.css'

const route = useRoute()
const article = ref(null)

const fetchArticle = async () => {
  const res = await fetch(`http://47.121.190.121:3000/articles/${route.params.id}`)
  const data = await res.json()
  if (data.code === 200) {
    article.value = data.data
    document.title = `文章详情 - ${data.data.title}`

    // 等 DOM 渲染后再高亮
    await nextTick()
    hljs.highlightAll()

    // 记录浏览
    await fetch(`http://47.121.190.121:3000/articles/${article.value.id}/view`, {
      method: 'POST',
    })
  }
}
onMounted(fetchArticle)
</script>

<script>
export default {
  beforeRouteLeave(to, from, next) {
    console.log('you leave this page.')
    next()
  },
}
</script>

<style scoped>
.my-article {
  margin: 10px 20px;
}

.article-detail {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 93%;
  margin: 0 auto;
}

.article-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2d3748;
  text-align: center;
  margin-bottom: 1rem;
}

.article-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.article-content {
  color: #4a4a4a;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.article-meta {
  font-size: 0.875rem;
  color: #666;
  text-align: center;
  margin-top: 1rem;
}

.meta-bold {
  font-weight: 600;
}

/* 文章内容中的段落和链接美化 */
.article-content p {
  margin-bottom: 1rem;
}

.article-content a {
  color: #1e40af;
  text-decoration: none;
}

.article-content a:hover {
  text-decoration: underline;
}

.article-content pre {
  background-color: #f6f8fa;
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1em 0;
  white-space: pre-wrap; /* 关键样式，保留换行！ */
  word-break: break-word; /* 自动换行 */
}

.article-content code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.95rem;
}
</style>

```

这里的异步函数

```
const fetchArticle = async () => {
  const res = await fetch(`http://47.121.190.121:3000/articles/${route.params.id}`)
  const data = await res.json()
  if (data.code === 200) {
    article.value = data.data
    document.title = `文章详情 - ${data.data.title}`

    // 等 DOM 渲染后再高亮
    await nextTick()
    hljs.highlightAll()

    // 记录浏览
    await fetch(`http://47.121.190.121:3000/articles/${article.value.id}/view`, {
      method: 'POST',
    })
  }
}
```

#### UploadArticle.vue

```
<template>
  <div class="upload-article">
    <h2>上传文章</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="titleInput">标题：</label>
        <input type="text" id="titleInput" v-model="title" required />
      </div>

      <div class="form-group">
        <label>内容：</label>
        <div class="editor-container">
          <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
          <Editor
            style="height: 400px; overflow-y: auto"
            v-model="content"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="authorInput">作者：</label>
        <input type="text" id="authorInput" v-model="authorId" required />
      </div>

      <div class="form-group">
        <label for="summaryInput">摘要：</label>
        <input type="text" id="summaryInput" v-model="summary" />
      </div>

      <div class="form-group">
        <label for="tagsInput">标签（用逗号分隔）：</label>
        <input type="text" id="tagsInput" v-model="tags" />
      </div>

      <div class="form-group">
        <label for="categoryIdInput">分类 ID：</label>
        <input type="text" id="categoryIdInput" v-model="categoryId" />
      </div>

      <div class="form-group">
        <label for="fileInput">封面图：</label>
        <input type="file" id="fileInput" @change="handleFileChange" accept="image/*" required />
      </div>

      <button type="submit">上传文章</button>
    </form>

    <div v-if="result" :class="resultClass">{{ result }}</div>
  </div>
</template>

<script setup>
import { ref, shallowRef, onBeforeUnmount } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

// 表单字段 这些变量 都和表单绑定
const title = ref('')
const content = ref('') // WangEditor绑定的是 HTML 格式的内容
const authorId = ref('')
const summary = ref('')
const tags = ref('')
const categoryId = ref('')
const file = ref(null)
const result = ref('')
const resultClass = ref('')

// WangEditor配置
const editorRef = shallowRef()
const mode = 'simple'
const toolbarConfig = {}

const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: 'http://47.121.190.121:3000/upload',
      fieldName: 'file',
      maxFileSize: 5 * 1024 * 1024,
      customInsert(res, insertFn) {
        if (res.code === 200 && res.data?.fileUrl) {
          insertFn(res.data.fileUrl)
        } else {
          console.warn('图片上传失败:', res)
        }
      },
    },
  },
}

const handleCreated = (editor) => {
  editorRef.value = editor
}  // 读取上传的文件
onBeforeUnmount(() => {
  editorRef.value?.destroy()
})  // 组件卸载之前，销毁编辑器，防止内存泄漏

const handleFileChange = (event) => {
  file.value = event.target.files[0]
}

const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('title', title.value) // 添加各个字段
  formData.append('content', content.value)
  formData.append('authorId', authorId.value)
  formData.append('summary', summary.value)
  formData.append('tags', JSON.stringify(tags.value.split(',').map((t) => t.trim())))
  formData.append('categoryId', categoryId.value)
  formData.append('file', file.value)

  try {
    const res = await fetch('http://47.121.190.121:3000/articles', {
      method: 'POST',  // POST方法
      body: formData,
    })

    const resultData = await res.json()

    if (resultData.code === 200) {
      result.value = '文章上传成功！'
      resultClass.value = 'text-green-500'
    } else {
      result.value = `上传失败：${resultData.message}`
      resultClass.value = 'text-red-500'
    }
  } catch (error) {
    result.value = `请求错误：${error.message}`
    resultClass.value = 'text-red-500'
  }
}
</script>

<style scoped>
.upload-article {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f5f5f5; /* 页面背景颜色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影 */
  min-width: 800px; /* 最大宽度 */
  margin: 0 auto; /* 居中 */
}

h2 {
  margin-bottom: 20px;
  text-align: center; /* 标题居中 */
  font-size: 24px; /* 标题大小 */
  color: #333; /* 标题颜色 */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block; /* 标签显示为块级元素 */
  margin-bottom: 5px; /* 标签下方间距 */
  font-weight: bold; /* 加粗 */
}

input[type='text'],
input[type='file'],
textarea {
  width: 100%; /* 100%宽度 */
  padding: 10px; /* 内边距 */
  border: 1px solid #ccc; /* 边框 */
  border-radius: 5px; /* 圆角 */
  box-sizing: border-box; /* 包含内边距和边框 */
  transition: border-color 0.3s; /* 边框颜色过渡 */
}

input[type='text']:focus,
input[type='file']:focus {
  border-color: #007bff; /* 聚焦时边框颜色 */
  outline: none; /* 去除默认轮廓 */
}

button {
  width: 100%; /* 按钮宽度100% */
  padding: 10px; /* 按钮内边距 */
  background-color: #007bff; /* 按钮背景色 */
  color: white; /* 按钮文字颜色 */
  border: none; /* 去除边框 */
  border-radius: 5px; /* 圆角 */
  cursor: pointer; /* 鼠标悬停为手指 */
  transition: background-color 0.3s; /* 背景色过渡 */
}

button:hover {
  background-color: #0056b3; /* 鼠标悬停时按钮颜色 */
}

.text-green-500 {
  color: green;
}

.text-red-500 {
  color: red;
}

.editor-container {
  border: 1px solid #ccc; /* 编辑器容器边框 */
  border-radius: 5px; /* 圆角 */
  overflow: hidden; /* 超出部分隐藏 */
}
</style>

```

v-model="title":绑定输入值到title响应式变量

required：浏览器层面验证。

这里引入了一个wangEditor作为富文本编辑器

```
const editorRef = shallowRef()  // 浅层响应式引用，因为这个实例对象不需要深度追踪（有利于性能优化）
const mode = 'simple'  // 编辑器的模式，简单模式
const toolbarConfig = {}  // 默认工具栏配置

const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: 'http://47.121.190.121:3000/upload',
      fieldName: 'file',
      maxFileSize: 5 * 1024 * 1024,
      customInsert(res, insertFn) {
        if (res.code === 200 && res.data?.fileUrl) {
          insertFn(res.data.fileUrl)
        } else {
          console.warn('图片上传失败:', res)
        }
      },
    },
  },
}

```

about/index.vue

```
<template>
  <div class="about-container">
    <img class="avatar" src="https://avatars.githubusercontent.com/u/1?v=4" alt="头像" />

    <h1>你好，我是ZM 👋</h1>
    <p>
      欢迎来到我的博客！我是一名软件开发者，热爱技术、写作与分享。在这里，我记录学习过程、开发经验、以及生活中的一些灵感。
    </p>

    <h2>技能标签</h2>
    <ul class="skills">
      <li>Vue 3</li>
      <li>JavaScript</li>
      <li>前端</li>
      <li>Django</li>
      <li>MongoDB</li>
      <li>MySQL</li>
    </ul>

    <h2>联系方式</h2>
    <ul class="contact">
      <li>📧 Email: zhangmeng072@gmail.com</li>
      <li>
        📁 GitHub: <a href="https://github.com/developbao" target="_blank">github.com/developbao</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
// 暂时无需逻辑
</script>

<script>
export default {
  name: 'AboutContent',
}
</script>

<style scoped>
.about-container {
  width: 70%;
  height: 600px;
  margin: auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 1px 1px 40px 12px rgba(0, 0, 0, 0.06);
  line-height: 1.6;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 20px auto;
}

h1,
h2 {
  color: #333;
  margin-top: 20px;
}

p {
  margin-bottom: 20px;
  color: #555;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding-left: 0;
  margin: 10px 0 20px 0;
}

.skills li {
  background-color: #f0f0f0;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.contact li {
  margin-bottom: 8px;
  font-size: 14px;
}
.contact a {
  color: #007bff;
  text-decoration: none;
}
.contact a:hover {
  text-decoration: underline;
}
</style>

```

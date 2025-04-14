// src/setupApp.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

export function setupApp() {
  const app = createApp(App)

  // ✅ 注册状态管理
  app.use(createPinia())

  // ✅ 注册路由
  app.use(router)

  // ✅ 全局错误处理
  app.config.errorHandler = (err, instance, info) => {
    console.error('全局错误:', err, info)
    // 可选：上报日志服务
  }

  // ✅ 环境判断逻辑
  if (import.meta.env.DEV) {
    console.log('开发模式启动 App')
  }

  return app
}

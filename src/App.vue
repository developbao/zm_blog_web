<script setup>
import { ref, watch } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'

// 状态变量，用于控制浮窗的显示
const showWelcome = ref(true)
const route = useRoute()

// 定义欢迎函数，显示浮窗
function WelcomePage() {
  showWelcome.value = true
}

// 关闭浮窗
function closeWelcome() {
  showWelcome.value = false
}

// 监听路由的变化
watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    console.log('路由变化了！')
    console.log('from', oldPath, 'to', newPath)
  },
)
</script>

<template>
  <div class="navbar">
    <div class="logo">
      <a href="#" @click="WelcomePage">ZM的博客</a>
    </div>
    <div class="nav-links">
      <RouterLink :to="{ path: '/' }" active-class="active-touch">首页</RouterLink>
      <RouterLink :to="{ path: '/posts' }" active-class="active-touch">博客文章</RouterLink>
      <RouterLink :to="{ path: '/works' }" active-class="active-touch">作品集</RouterLink>
      <RouterLink :to="{ path: '/about' }" active-class="active-touch">关于我</RouterLink>
    </div>
  </div>

  <!-- 主内容区域 -->
  <div class="container">
    <RouterView />
  </div>

  <!-- 欢迎浮窗 -->
  <div v-if="showWelcome" class="modal-overlay">
    <div class="modal">
      <h2>欢迎来到我的个人博客</h2>
      <p>这里是关于我的博客，我会在这里分享我的生活、学习和兴趣爱好。希望你能喜欢我的内容！</p>
      <p>你可以通过导航栏浏览不同的页面，查看我的博客文章、了解我的故事，或者联系我。</p>
      <button @click="closeWelcome">确认</button>
    </div>
  </div>

  <footer class="footer">
    <div class="footer-content">
      <p>© 2025 ZM的博客 保留所有权利。</p>
      <div class="social-links">
        <a href="https://github.com/developbao" target="_blank">GitHub</a>
        <a href="mailto:zhangmeng072@gmail.com">联系我</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 确保在最上层 */
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 55%;
}

.modal h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.modal p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 10px;
}

.modal button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.modal button:hover {
  background-color: #0056b3;
}

body,
h1,
h2,
h3,
p,
ul {
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

/* 导航栏样式 */
.navbar {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar .logo a {
  color: white;
  text-decoration: none;
  font-size: 40px;
  font-weight: bold;
}
.navbar .nav-links a {
  color: rgb(206, 202, 202);
  text-decoration: none;
  margin: 0 15px;
  font-size: 30px;
}

.navbar .nav-links .active-touch {
  color: rgb(255, 255, 255);
  margin: 0 15px;
  font-size: 30px;
}

.navbar a:hover {
  text-decoration: underline;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }
  .navbar .nav-links a {
    margin: 10px 0;
  }
}
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer p {
  margin: 0;
}

.social-links {
  margin-top: 10px;
}

.social-links a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}

.social-links a:hover {
  text-decoration: underline;
}
</style>

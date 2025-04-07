<template>
  <div class="blog-card">
    <img
      src="https://cdn.pixabay.com/photo/2016/11/21/17/31/architecture-1846657_1280.jpg"
      class="cover"
    />
    <div class="content">
      <h2 class="title">深入Vue3：从入门到精通</h2>
      <p class="summary">
        Vue3作为最新的框架版本，拥有更强大的性能，更灵活的开发方式和更完善的生态系统，Vue (发音为
        /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和
        JavaScript
        构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。Vue.js是一个MVVM(Model
        - View - ViewModel)的SPA框架。 Model数据。 View视图。
        ViewModel连接View与Model的纽带。在head中引入Vue.js包。本地搭建 Vue
        单页应用，可使用npm安装方式，即本文主要内容。
      </p>
      <div class="footer">
        <span>2025/4/7</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="css" scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  max-width: 85%;
  margin: 20px auto;
}
.blog-card:hover {
  transform: translateY(-5px);
}

.cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.content {
  padding: 16px;
}

.title {
  font-size: 22px;
  margin-bottom: 10px;
}

.summary {
  font-size: 16px;
  color: #555;
  margin-bottom: 15px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  font-size: 14px;
  color: #999;
}

.read-more {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}
.read-more:hover {
  text-decoration: underline;
}
</style>

<template>
  <div class="container">
    <h1 class="title">博客管理</h1>

    <div class="button-group">
      <button @click="showUploadArticle" class="btn btn-primary">发布文章</button>
      <button @click="showArticleList" class="btn btn-secondary">查看文章列表</button>
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

const currentComponent = ref('UploadArticle') // 默认显示上传文章组件

const showUploadArticle = () => {
  currentComponent.value = 'UploadArticle' // 显示上传文章组件
}

const showArticleList = () => {
  currentComponent.value = 'ArticleList' // 显示文章列表组件
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

.title {
  font-size: 2rem; /* 标题字体大小 */
  color: #333; /* 字体颜色 */
  margin-bottom: 20px; /* 下边距 */
  text-align: center; /* 居中 */
}

.button-group {
  display: flex;
  justify-content: center; /* 水平居中按钮 */
  gap: 20px; /* 按钮之间的间距 */
  margin-bottom: 20px; /* 下边距 */
}

.btn {
  padding: 10px 20px; /* 按钮内边距 */
  border: none; /* 去掉边框 */
  border-radius: 6px; /* 圆角 */
  font-size: 1rem; /* 字体大小 */
  cursor: pointer; /* 鼠标指针 */
  transition:
    background-color 0.3s,
    transform 0.3s; /* 过渡效果 */
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

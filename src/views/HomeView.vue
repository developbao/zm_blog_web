<script setup>
import ArticleCard from '../components/home/ArticleCard.vue'
</script>

<template>
  <main class="main-container">
    <div class="article-list-container">
      <ArticleCard />
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

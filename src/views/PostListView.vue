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
const passwordVerified = ref(false)

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

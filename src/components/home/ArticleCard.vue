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
          :src="`http://localhost:3000${article.img}`"
          alt="封面图"
          class="article-image rounded-md shadow-md"
        />
        <div class="info p-4">
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-summary">
            <strong>摘要：</strong>{{ article.summary || '（无摘要）' }}
          </p>
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
  const res = await fetch(`http://localhost:3000/articles/top?limit=12`)
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
  border-radius: 12px; /* 圆角 */
  cursor: pointer;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease; /* 增加变换效果 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
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
  padding: 16px; /* 添加内边距 */
}

.article-title {
  font-size: 1.5rem; /* 字体大小 */
  margin: 0 0 10px; /* 下边距 */
  color: #2d3748; /* 标题颜色 */
}

.article-summary {
  color: #555; /* 概要颜色 */
  margin: 6px 0; /* 上下间距 */
}
</style>

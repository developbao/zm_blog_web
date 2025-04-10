<template>
  <div class="article-list p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-6 text-gray-800 text-center">博客文章列表</h2>

    <div v-if="articles.length === 0" class="text-center text-gray-500">暂无文章</div>

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
      <div class="info">
        <h3 class="article-title">{{ article.title }}</h3>
        <p class="article-summary"><strong>摘要：</strong>{{ article.summary || '（无摘要）' }}</p>
        <p class="article-author"><strong>作者：</strong>{{ article.authorId }}</p>
        <p class="article-date"><strong>创建时间：</strong>{{ formatDate(article.createTime) }}</p>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination flex justify-between items-center mt-6">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="pagination-button"
        :class="{ 'opacity-50 cursor-not-allowed': page === 1 }"
      >
        上一页
      </button>
      <span class="pagination-info mx-4">第 {{ page }} 页</span>
      <button
        @click="nextPage"
        :disabled="!hasMore"
        class="pagination-button"
        :class="{ 'opacity-50 cursor-not-allowed': !hasMore }"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const articles = ref([])
const page = ref(1)
const pageSize = 5
const hasMore = ref(true)

const router = useRouter()

const fetchArticles = async () => {
  const res = await fetch(
    `http://localhost:3000/articles/list?page=${page.value}&pageSize=${pageSize}`,
  )
  const data = await res.json()
  if (data.code === 200) {
    articles.value = data.list
    hasMore.value = data.list.length === pageSize
  }
}

const goToDetail = (id) => {
  router.push(`/article/${id}`)
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchArticles()
  }
}

const nextPage = () => {
  if (hasMore.value) {
    page.value++
    fetchArticles()
  }
}

const formatDate = (date) => new Date(date).toLocaleString()

onMounted(fetchArticles)
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

.article-card {
  background: white;
  display: flex;
  gap: 20px;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease; /* 增加变换效果 */
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.article-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 悬停时增强阴影 */
  transform: translateY(-2px); /* 悬停时稍微上移 */
}

.article-image {
  width: 160px; /* 固定宽度 */
  height: auto; /* 自动高度 */
  border-radius: 6px; /* 圆角 */
}

.info {
  flex: 1; /* 填满剩余空间 */
}

.article-title {
  font-size: 1.5rem; /* 字体大小 */
  margin: 0 0 10px; /* 下边距 */
  color: #2d3748; /* 标题颜色 */
}

.article-summary,
.article-author,
.article-date {
  margin: 6px 0; /* 上下间距 */
  color: #555; /* 文字颜色 */
}

.pagination {
  display: flex; /* 使用 flexbox */
  justify-content: center; /* 在左右两侧对齐 */
  align-items: center; /* 垂直居中 */
  margin-top: 20px; /* 上边距 */
}

.pagination-button {
  background-color: #007bff; /* 按钮颜色 */
  color: white; /* 字体颜色 */
  border: none; /* 去掉边框 */
  padding: 8px 12px; /* 内边距 */
  border-radius: 5px; /* 圆角 */
  cursor: pointer; /* 鼠标指针 */
  transition: background-color 0.3s; /* 过渡效果 */
}

.pagination-button:hover {
  background-color: #0056b3; /* 悬停颜色 */
}

.pagination-info {
  display: flex;
  align-items: center; /* 垂直居中 */
  color: #333; /* 文字颜色 */
}
</style>

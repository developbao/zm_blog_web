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
          loading="lazy"
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
  /* 通过设置了一个最高高度来限制summary的高度 */
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
  margin-top: auto;
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

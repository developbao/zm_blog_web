<template>
  <div class="my-article">
    <div class="article-detail p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto" v-if="article">
      <h2 class="article-title text-4xl font-bold text-gray-800 mb-4">{{ article.title }}</h2>

      <img
        v-if="article.img"
        :src="`http://localhost:3000${article.img}`"
        class="article-image rounded-md shadow-md"
        alt="Article Image"
      />
      <div
        v-html="article.content"
        class="article-content text-gray-700 leading-relaxed mb-4"
      ></div>
      <p class="article-meta text-sm text-gray-500 text-center">
        作者：<span class="font-semibold">{{ article.authorId }}</span> | 阅读量：<span
          class="font-semibold"
          >{{ article.readCount }}</span
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const article = ref(null)

const fetchArticle = async () => {
  const res = await fetch(`http://localhost:3000/articles/${route.params.id}`)
  const data = await res.json()
  if (data.code === 200) {
    console.log(data.data) // 打印数据以调试
    article.value = data.data
    await fetch(`http://localhost:3000/articles/${article.value.id}/view`, {
      method: 'POST',
    })
  }
}
console.log(article.content) // 在控制台查看实际渲染的内容

onMounted(fetchArticle)
</script>

<style scoped>
.my-article {
  margin-left: 20px; /* 上下间距 */
  margin-right: 20px;
  margin-top: 10px;
}

.article-detail {
  background-color: #ffffff; /* 背景颜色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 2rem; /* 添加内边距 */
}

.article-title {
  color: #4a5568; /* 标题颜色 */
  font-size: 2.5rem;
  text-align: center; /* 标题居中 */
  padding: 10px 0;

  margin: 5px;
}

.article-image {
  max-width: 100%; /* 最大宽度 */
  height: auto; /* 自动高度 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
  margin-bottom: 1rem; /* 图片下方间距 */
}

.article-content {
  line-height: 1.6; /* 行高 */
  margin-top: 1rem; /* 顶部间距 */
}

.article-meta {
  text-align: center; /* 元信息居中 */
}

/* 段落样式 */
p {
  margin-bottom: 1rem; /* 段落间距 */
}

/* 链接样式 */
a {
  color: #1d4ed8; /* 链接颜色 */
  text-decoration: none; /* 去掉下划线 */
}

a:hover {
  text-decoration: underline; /* 悬停时显示下划线 */
}
</style>

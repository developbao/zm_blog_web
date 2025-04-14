<template>
  <div class="my-article">
    <div class="article-detail" v-if="article">
      <h2 class="article-title">{{ article.title }}</h2>

      <img
        v-if="article.img"
        :src="`http://47.121.190.121:3000${article.img}`"
        class="article-image"
        alt="Article Image"
      />

      <div v-html="article.content" class="article-content"></div>

      <p class="article-meta">
        作者：<span class="meta-bold">{{ article.authorId }}</span> | 阅读量：<span
          class="meta-bold"
          >{{ article.readCount }}</span
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // 你可以换其他主题，比如 'monokai-sublime.css'

const route = useRoute()
const article = ref(null)

const fetchArticle = async () => {
  const res = await fetch(`http://47.121.190.121:3000/articles/${route.params.id}`)
  const data = await res.json()
  if (data.code === 200) {
    article.value = data.data
    document.title = `文章详情 - ${data.data.title}`

    // 等 DOM 渲染后再高亮
    await nextTick()
    hljs.highlightAll()

    // 记录浏览
    await fetch(`http://47.121.190.121:3000/articles/${article.value.id}/view`, {
      method: 'POST',
    })
  }
}
onMounted(fetchArticle)
</script>

<script>
export default {
  beforeRouteLeave(to, from, next) {
    console.log('you leave this page.')
    next()
  },
}
</script>

<style scoped>
.my-article {
  margin: 10px 20px;
}

.article-detail {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 80%;
  margin: 0 auto;
}

.article-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2d3748;
  text-align: center;
  margin-bottom: 1rem;
}

.article-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.article-content {
  color: #4a4a4a;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.article-meta {
  font-size: 0.875rem;
  color: #666;
  text-align: center;
  margin-top: 1rem;
}

.meta-bold {
  font-weight: 600;
}

/* 文章内容中的段落和链接美化 */
.article-content p {
  margin-bottom: 1rem;
}

.article-content a {
  color: #1e40af;
  text-decoration: none;
}

.article-content a:hover {
  text-decoration: underline;
}

.article-content pre {
  background-color: #f6f8fa;
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1em 0;
  white-space: pre-wrap; /* 关键样式，保留换行！ */
  word-break: break-word; /* 自动换行 */
}

.article-content code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.95rem;
}
</style>

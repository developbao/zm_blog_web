<template>
  <div class="post-card">
    <img
      src="https://cdn.pixabay.com/photo/2024/04/10/22/52/autumn-8688876_1280.jpg"
      alt="封面图"
      class="cover"
    />

    <div class="info">
      <h2 class="title">深入Vue3：从入门到精通</h2>

      <div class="meta">
        <span class="date">2025/4/7</span>
      </div>

      <p class="summary">
        Vue3作为最新的框架版本，拥有更强大的性能，更灵活的开发方式和更完善的生态系统···
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.post-card {
  display: flex;
  gap: 16px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin: 16px auto;
  padding: 16px;
  transition: box-shadow 0.2s;
  max-width: 85%;
}
.post-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cover {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.info {
  flex: 1;
}

.title {
  font-size: 18px;
  margin: 0 0 8px;
}

.meta {
  font-size: 13px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.tags {
  display: flex;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.tags li {
  background: #f1f1f1;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  color: #555;
}

.summary {
  font-size: 14px;
  color: #444;
  line-height: 1.5;
  margin-bottom: 10px;
}

.read-more {
  font-size: 13px;
  color: #007bff;
  text-decoration: none;
}
.read-more:hover {
  text-decoration: underline;
}
</style>

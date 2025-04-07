<template>
  <div class="about-container">
    <img class="avatar" src="https://avatars.githubusercontent.com/u/1?v=4" alt="头像" />

    <h1>你好，我是ZM 👋</h1>
    <p>
      欢迎来到我的博客！我是一名前端开发者，热爱技术、写作与分享。在这里，我记录学习过程、开发经验、以及生活中的一些灵感。
    </p>

    <h2>技能标签</h2>
    <ul class="skills">
      <li>Vue 3</li>
      <li>Node.js</li>
      <li>MongoDB</li>
      <li>JavaScript / TypeScript</li>
      <li>前端工程化</li>
    </ul>

    <h2>联系方式</h2>
    <ul class="contact">
      <li>📧 Email: zm@example.com</li>
      <li>
        📁 GitHub: <a href="https://github.com/yourname" target="_blank">github.com/yourname</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
// 暂时无需逻辑
</script>

<script>
export default {
  name: 'AboutContent',
}
</script>

<style scoped>
.about-container {
  width: 70%;
  height: 600px;
  margin: auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 1px 1px 40px 12px rgba(0, 0, 0, 0.06);
  line-height: 1.6;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 20px auto;
}

h1,
h2 {
  color: #333;
  margin-top: 20px;
}

p {
  margin-bottom: 20px;
  color: #555;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding-left: 0;
  margin: 10px 0 20px 0;
}

.skills li {
  background-color: #f0f0f0;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.contact li {
  margin-bottom: 8px;
  font-size: 14px;
}
.contact a {
  color: #007bff;
  text-decoration: none;
}
.contact a:hover {
  text-decoration: underline;
}
</style>

<template>
  <div class="contact-page">
    <h1>联系我</h1>
    <p>如果你有任何问题、建议或合作意向，欢迎通过下方表单联系我 👇</p>

    <form class="contact-form" @submit.prevent="handleSubmit">
      <label>
        姓名：
        <input type="text" v-model="form.name" required />
      </label>

      <label>
        邮箱：
        <input type="email" v-model="form.email" required />
      </label>

      <label>
        留言：
        <textarea v-model="form.message" rows="5" required></textarea>
      </label>

      <button type="submit">发送</button>
    </form>

    <div class="social-links">
      <p>📧 邮箱：<a href="mailto:yourmail@example.com">yourmail@example.com</a></p>
      <p>
        🌐 GitHub：<a href="https://github.com/yourname" target="_blank">github.com/yourname</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const handleSubmit = () => {
  console.log('提交的表单内容：', form)
  alert('感谢你的留言，我会尽快回复你！')

  // 清空表单
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<style scoped>
.contact-page {
  width: 70%;
  height: 800px;
  margin: 0 auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.contact-page h1 {
  margin-bottom: 10px;
}

.contact-page p {
  margin-bottom: 20px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-form label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #333;
}

.contact-form input,
.contact-form textarea {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 5px;
}

.contact-form button {
  width: 100px;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.contact-form button:hover {
  background-color: #0056b3;
}

.social-links {
  margin-top: 32px;
  font-size: 14px;
}

.social-links a {
  color: #007bff;
  text-decoration: none;
}
.social-links a:hover {
  text-decoration: underline;
}
</style>

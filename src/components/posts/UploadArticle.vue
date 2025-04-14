<template>
  <div class="upload-article">
    <h2>上传文章</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="titleInput">标题：</label>
        <input type="text" id="titleInput" v-model="title" required />
      </div>

      <div class="form-group">
        <label>内容：</label>
        <div class="editor-container">
          <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
          <Editor
            style="height: 400px; overflow-y: auto"
            v-model="content"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="authorInput">作者：</label>
        <input type="text" id="authorInput" v-model="authorId" required />
      </div>

      <div class="form-group">
        <label for="summaryInput">摘要：</label>
        <input type="text" id="summaryInput" v-model="summary" />
      </div>

      <div class="form-group">
        <label for="tagsInput">标签（用逗号分隔）：</label>
        <input type="text" id="tagsInput" v-model="tags" />
      </div>

      <div class="form-group">
        <label for="categoryIdInput">分类 ID：</label>
        <input type="text" id="categoryIdInput" v-model="categoryId" />
      </div>

      <div class="form-group">
        <label for="fileInput">封面图：</label>
        <input type="file" id="fileInput" @change="handleFileChange" accept="image/*" required />
      </div>

      <button type="submit">上传文章</button>
    </form>

    <div v-if="result" :class="resultClass">{{ result }}</div>
  </div>
</template>

<script setup>
import { ref, shallowRef, onBeforeUnmount } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

// 表单字段
const title = ref('')
const content = ref('') // WangEditor绑定的是 HTML 格式的内容
const authorId = ref('')
const summary = ref('')
const tags = ref('')
const categoryId = ref('')
const file = ref(null)
const result = ref('')
const resultClass = ref('')

// WangEditor配置
const editorRef = shallowRef()
const mode = 'simple'
const toolbarConfig = {}

const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: 'http://47.121.190.121:3000/upload',
      fieldName: 'file',
      maxFileSize: 5 * 1024 * 1024,
      customInsert(res, insertFn) {
        if (res.code === 200 && res.data?.fileUrl) {
          insertFn(res.data.fileUrl)
        } else {
          console.warn('图片上传失败:', res)
        }
      },
    },
  },
}

const handleCreated = (editor) => {
  editorRef.value = editor
}
onBeforeUnmount(() => {
  editorRef.value?.destroy()
})

const handleFileChange = (event) => {
  file.value = event.target.files[0]
}

const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('content', content.value)
  formData.append('authorId', authorId.value)
  formData.append('summary', summary.value)
  formData.append('tags', JSON.stringify(tags.value.split(',').map((t) => t.trim())))
  formData.append('categoryId', categoryId.value)
  formData.append('file', file.value)

  try {
    const res = await fetch('http://47.121.190.121:3000/articles', {
      method: 'POST',
      body: formData,
    })

    const resultData = await res.json()

    if (resultData.code === 200) {
      result.value = '文章上传成功！'
      resultClass.value = 'text-green-500'
    } else {
      result.value = `上传失败：${resultData.message}`
      resultClass.value = 'text-red-500'
    }
  } catch (error) {
    result.value = `请求错误：${error.message}`
    resultClass.value = 'text-red-500'
  }
}
</script>

<style scoped>
.upload-article {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f5f5f5; /* 页面背景颜色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影 */
  min-width: 800px; /* 最大宽度 */
  margin: 0 auto; /* 居中 */
}

h2 {
  margin-bottom: 20px;
  text-align: center; /* 标题居中 */
  font-size: 24px; /* 标题大小 */
  color: #333; /* 标题颜色 */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block; /* 标签显示为块级元素 */
  margin-bottom: 5px; /* 标签下方间距 */
  font-weight: bold; /* 加粗 */
}

input[type='text'],
input[type='file'],
textarea {
  width: 100%; /* 100%宽度 */
  padding: 10px; /* 内边距 */
  border: 1px solid #ccc; /* 边框 */
  border-radius: 5px; /* 圆角 */
  box-sizing: border-box; /* 包含内边距和边框 */
  transition: border-color 0.3s; /* 边框颜色过渡 */
}

input[type='text']:focus,
input[type='file']:focus {
  border-color: #007bff; /* 聚焦时边框颜色 */
  outline: none; /* 去除默认轮廓 */
}

button {
  width: 100%; /* 按钮宽度100% */
  padding: 10px; /* 按钮内边距 */
  background-color: #007bff; /* 按钮背景色 */
  color: white; /* 按钮文字颜色 */
  border: none; /* 去除边框 */
  border-radius: 5px; /* 圆角 */
  cursor: pointer; /* 鼠标悬停为手指 */
  transition: background-color 0.3s; /* 背景色过渡 */
}

button:hover {
  background-color: #0056b3; /* 鼠标悬停时按钮颜色 */
}

.text-green-500 {
  color: green;
}

.text-red-500 {
  color: red;
}

.editor-container {
  border: 1px solid #ccc; /* 编辑器容器边框 */
  border-radius: 5px; /* 圆角 */
  overflow: hidden; /* 超出部分隐藏 */
}
</style>

<template>
  <div class="project-view">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <h2 class="title">我的项目</h2>
      <ul class="project-list">
        <li
          v-for="project in projects"
          :key="project.name"
          @click="selectProject(project)"
          :class="['project-item', { active: project.name === currentProject.name }]"
        >
          {{ project.name }}
        </li>
      </ul>
    </aside>

    <!-- 右侧项目详情展示 -->
    <main class="detail-area">
      <h3 class="detail-title">{{ currentProject.name }}</h3>
      <p>
        <strong>演示网址：</strong>
        <a :href="currentProject.demoUrl" target="_blank">{{ currentProject.demoUrl }}</a>
      </p>
      <p>
        <strong>GitHub：</strong>
        <a :href="currentProject.githubUrl" target="_blank">{{ currentProject.githubUrl }}</a>
      </p>
      <div class="project-image">
        <img :src="currentProject.image" alt="项目截图" loading="lazy" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import carImg from '@/assets/project_image/car.png'
import blogImg from '@/assets/project_image/blog.jpg'
import airlineImg from '@/assets/project_image/airline.jpg'

const projects = [
  {
    name: '个人博客系统',
    demoUrl: 'http://47.121.190.121:8080/',
    githubUrl: 'https://github.com/developbao/zm_blog_web',
    image: blogImg,
  },
  {
    name: '二手车交易平台',
    demoUrl: 'http://47.121.190.121:8099/',
    githubUrl:
      'https://github.com/developbao/Second-hand-Car-Transaction-and-Data-Analysis-Platform',
    image: carImg,
  },
  {
    name: '飞机购票系统',
    demoUrl: '#',
    githubUrl: 'https://github.com/developbao/Airline-Ticketing-System',
    image: airlineImg,
  },
]

const currentProject = ref(projects[0])

function selectProject(project) {
  currentProject.value = project
}
</script>

<style scoped>
.project-view {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
  color: #333;
}

.sidebar {
  width: 250px;
  background-color: #f3f3f3;
  border-right: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.project-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-item {
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: background-color 0.2s;
}

.project-item:hover {
  background-color: #e0eaff;
}

.project-item.active {
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
}

.detail-area {
  flex: 1;
  padding: 30px;
  background-color: #fff;
  overflow-y: auto;
  box-sizing: border-box;
}

.detail-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}

a {
  color: #3b82f6;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.project-image {
  margin-top: 20px;
}

.project-image img {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>

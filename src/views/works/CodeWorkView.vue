<template>
  <div class="code-work-view">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <h2 class="title">组件列表</h2>
      <ul class="component-list">
        <li
          v-for="comp in components"
          :key="comp.name"
          @click="selectComponent(comp)"
          :class="['component-item', { active: comp.name === currentComponent.name }]"
        >
          {{ comp.label }}
        </li>
      </ul>
    </aside>

    <!-- 右侧组件展示区域 -->
    <main class="preview-area">
      <h3 class="preview-title">预览：{{ currentComponent.label }}</h3>
      <div class="preview-box">
        <component :is="currentComponent.component" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import MyClock from '@/components/codeworks/MyClock.vue'
import MyCard from '@/components/codeworks/MyCard.vue'
import MyTable from '@/components/codeworks/MyTable.vue'

const components = [
  { name: 'MyClock', label: '时钟组件', component: MyClock },
  { name: 'MyCard', label: '卡片组件', component: MyCard },
  { name: 'MyTable', label: '表格组件', component: MyTable },
]

const currentComponent = ref(components[0])

function selectComponent(comp) {
  currentComponent.value = comp
}
</script>

<style scoped>
.code-work-view {
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

.component-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.component-item {
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: background-color 0.2s;
}

.component-item:hover {
  background-color: #e0eaff;
}

.component-item.active {
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
}

.preview-area {
  flex: 1;
  padding: 30px;
  background-color: #fff;
  overflow-y: auto;
  box-sizing: border-box;
}

.preview-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

.preview-box {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fafafa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}
</style>

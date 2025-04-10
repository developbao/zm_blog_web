<template>
  <div :class="['clock-container', theme]">
    <div class="header">
      <div class="time">{{ currentTime }}</div>
      <button @click="toggleTheme" class="theme-btn">
        {{ theme === 'light' ? '🌙 暗色' : '☀️ 亮色' }}
      </button>
    </div>

    <div class="alarm-settings">
      <label>设置闹钟时间：</label>
      <input v-model="alarmTime" type="time" />
      <button @click="setAlarm">设定</button>
      <div v-if="alarmSet" class="alarm-hint">已设定：{{ alarmTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const currentTime = ref('')
const alarmTime = ref('')
const alarmSet = ref(false)
const theme = ref('light')
let timer = null

// 更新时间
function updateTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`

  // 检查是否到达闹钟时间（只比较时:分）
  const currentHM = `${hours}:${minutes}`
  if (alarmSet.value && currentHM === alarmTime.value) {
    triggerAlarm()
  }
}

// 设置闹钟
function setAlarm() {
  if (alarmTime.value) {
    alarmSet.value = true
    alert(`⏰ 闹钟设定成功：${alarmTime.value}`)
  }
}

// 触发闹钟
function triggerAlarm() {
  alarmSet.value = false
  alert('⏰ 时间到了！')
  const audio = new Audio(
    'https://assets.mixkit.co/sfx/download/mixkit-alarm-digital-clock-beep-989.wav',
  )
  audio.play()
}

// 切换主题
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.clock-container {
  font-family: 'Courier New', monospace;
  border-radius: 12px;
  padding: 20px 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 40px auto;
  text-align: center;
  transition:
    background 0.3s,
    color 0.3s;
}
.clock-container.light {
  background-color: #f9f9f9;
  color: #222;
}
.clock-container.dark {
  background-color: #1e1e1e;
  color: #00ffcc;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  font-size: 3rem;
  font-weight: bold;
}

.theme-btn {
  font-size: 1rem;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #ccc;
}

.alarm-settings {
  margin-top: 20px;
}

input[type='time'] {
  font-size: 1rem;
  padding: 4px 8px;
  margin: 0 10px;
}

.alarm-hint {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #28a745;
}
</style>

<template>
  <div class="container">
    <div class="header">
      <div class="date">{{ currentDate }}</div>
      <div class="time">{{ currentTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const currentTime = ref('')
const currentDate = ref('')
let timer = null

function updateTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  const daysOfWeek = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekDay = daysOfWeek[now.getDay()]

  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  currentDate.value = `${year}年${month + 1}月${day}日  ${weekDay}`
  currentTime.value = `${hours}:${minutes}:${seconds}`
}

onMounted(() => {
  updateTime()
  timer = setInterval(() => {
    updateTime()
  }, 1000)
})
</script>

<style lang="scss" scoped>
.container {
  max-width: 50%;
  margin: auto;
  text-align: center;
  box-shadow: 0 4px 12px black;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #222;
  transition:
    background 03s,
    color 0.3s;
}

.header {
  display: inline;
}

.date {
  font-family: 'Courier New', Courier, monospace;
  font-size: 2.5rem;
  font-weight: bold;
}
.time {
  font-family: 'Courier New', Courier, monospace;
  font-size: 2.5rem;
  font-weight: bold;
}
</style>

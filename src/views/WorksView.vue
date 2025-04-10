<template>
  <div class="nav">
    <RouterLink :to="{ path: '/works/projects' }" active-class="active">我的项目</RouterLink>
    <RouterLink :to="{ path: '/works/codeworks' }" active-class="active">我的作品</RouterLink>
  </div>
  <div class="content">
    <RouterView />
  </div>
</template>

<script setup></script>

<style scoped>
p {
  font-family: 'Courier New', Courier, monospace;
  font-size: 50px;
}

.nav {
  background-color: #fff;
  padding: 10px;
  margin-top: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 1);
  display: flex;
}

.nav a {
  gap: 20px;
  padding: 10px;
  margin: 10px;
  flex-wrap: wrap;
  background-color: #ffffff;
  box-shadow: 1px 1px 40px 12px rgba(0, 0, 0, 0.06);
  color: #000000;
  transition: color 0.3s ease;
  text-align: center;
  flex: 1 0 21%;
  font-size: 30px;
  border-radius: 10px;
  text-decoration: none;
}

.nav a:hover {
  background-color: #0d6cc5;
  color: #ffffff;
}

.nav .active {
  background-color: #0d6cc5;
  color: #ffffff;
}
</style>

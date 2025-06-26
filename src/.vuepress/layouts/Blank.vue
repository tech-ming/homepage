<script setup>
// 自定义布局组件，不包含导航栏和侧边栏
import { usePageFrontmatter } from "vuepress/client";

const frontmatter = usePageFrontmatter();
</script>

<template>
  <div class="custom-layout">
    <main class="page-content">
      <Content />
    </main>
  </div>
</template>

<style scoped>
.custom-layout {
  min-height: 100vh;
  width: 100%;
}

.page-content {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
</style> 
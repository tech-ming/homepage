<script setup>
// 自定义布局组件，基于主题的Layout组件
import { Layout } from "vuepress-theme-hope/client";
</script>

<template>
  <Layout>
    <!-- 覆盖侧边栏，使其为空 -->
    <template #sidebar>
      <!-- 不显示侧边栏 -->
    </template>
    
    <!-- 主要内容，占据全宽 -->
    <template #page>
      <main class="custom-page">
        <Content />
      </main>
    </template>
  </Layout>
</template>

<style scoped>
.custom-page {
  padding: 0;
  margin: 0;
  max-width: 100% !important;
  width: 100%;
}
</style> 
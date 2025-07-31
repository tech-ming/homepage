---
date: 2025-07-31
category:
  - vite
  - vue
tag:
  - ruoyi
  - vite-plugin
  - api-collection
---

# Vite Plugin Collect API - Vue组件API收集插件

## 📋 版本信息

- **Vue**: ^3.0.0+  
- **Vite**: ^5.0.0  
- **框架**: RuoYi TypeScript 版本

## 📝 功能介绍

专为 RuoYi 框架设计的 Vite 插件，用于自动收集 Vue 组件中的 API 使用情况并生成 API 集合文件，可配合后端实现相关接口配置操作。

## 🔗 仓库地址

[GitHub - vite-plugin-ruoyi-collect-api](https://github.com/tech-ming/vite-plugin-ruoyi-collect-api)

## 🚀 安装

以离线包形式安装

```bash
npm build 

npm pack
```

## ⚙️ 使用方式

### 插件配置

在 `vite.config.ts` 中配置插件：

```typescript
import { collectApiPlugin } from 'vite-plugin-ruoyi-collect-api';

vitePlugins.push(
  collectApiPlugin({
    componentDirs: [
      {
        path: "src/components",
        alias: "@/components"
      }
    ]
  })
);
```

## 🎨 前端展示（可选）

### 在 App.vue 中引入浮窗组件

```vue
<template>
  <ApiFloatWindow />
</template>
<script setup lang="ts">
import ApiFloatWindow from "@/components/ApiFloatWindow.vue";
// const isDev = import.meta.env.DEV
</script>
```

### ApiFloatWindow.vue 组件实现

```vue
<template>
  <div v-if="visible" class="api-float-window">
    <div class="api-float-header">
      <span>当前页面 API ({{ totalCount }})</span>
      <div class="header-buttons">
        <button @click="toggleContent" class="toggle-btn">
          {{ isCollapsed ? "+" : "−" }}
        </button>
        <button @click="close" class="close-btn">×</button>
      </div>
    </div>

    <div v-show="!isCollapsed" class="api-float-content">
      <div v-if="currentPagePath" class="current-page-info">
        <div class="page-path">{{ currentPagePath }}</div>
      </div>

      <div v-if="currentPageApis.length > 0" class="api-list">
        <div
          v-for="(api, index) in currentPageApis"
          :key="index"
          class="api-item"
          @click="copyToClipboard(api)"
          :class="getMethodClass(api.method)"
          :title="`${api.method} ${api.url}`"
        >
          <span class="method-badge">{{ api.method }}</span>
          <span class="api-url">{{ api.url }}</span>
        </div>
      </div>

      <div v-else class="empty-state">
        <div v-if="!currentPagePath">无法识别当前页面路径</div>
        <div v-else>当前页面暂无 API 数据</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getRouters } from "@/api/menu";
import modal from "@/plugins/modal";

interface ApiInfo {
  url: string;
  method: string;
}

interface ViewApis {
  [viewCategory: string]: {
    [pagePath: string]: ApiInfo[];
  };
}

interface RouteItem {
  path: string;
  component: string | any;
  hidden?: boolean;
  children?: RouteItem[];
  name?: string;
}

const route = useRoute();
const visible = ref(false);
const isCollapsed = ref(false);
const allApiData = ref<ViewApis>({});
const componentPathMap = ref<Record<string, string>>({});

// 根据路由路径获取对应的页面路径
const currentPagePath = computed(() => {
  const path = route.path;
  if (componentPathMap.value[path]) {
    const componentPath = componentPathMap.value[path]
      .replace(/\.(vue|tsx|jsx|ts|js)$/, "")
      .replace(/\/(index)$/, "");

    return componentPath;
  }
  return undefined;
});

// 获取当前页面的API列表
const currentPageApis = computed(() => {
  if (!currentPagePath.value || !allApiData.value) return [];

  for (const viewCategory of Object.keys(allApiData.value)) {
    const viewData = allApiData.value[viewCategory];
    if (viewData[currentPagePath.value]) {
      return viewData[currentPagePath.value];
    }
  }

  return [];
});

const totalCount = computed(() => currentPageApis.value.length);

const toggleContent = () => {
  isCollapsed.value = !isCollapsed.value;
};

const close = () => {
  visible.value = false;
};

const show = () => {
  visible.value = true;
};

const getMethodClass = (method: string) => {
  const methodLower = method.toLowerCase();
  return {
    "method-get": methodLower === "get",
    "method-post": methodLower === "post",
    "method-put": methodLower === "put",
    "method-delete": methodLower === "delete",
    "method-unknown": methodLower === "unknown",
  };
};

const copyToClipboard = async (api: ApiInfo) => {
  const text = `${api.method} ${api.url}`;
  try {
    await navigator.clipboard.writeText(text);
    modal.msgSuccess("已复制到剪贴板");
  } catch (err) {
    console.error("复制失败:", err);
  }
};

const collectComponentPaths = (routes: RouteItem[], parentPath = "") => {
  const result: Record<string, string> = {};

  routes.forEach((route) => {
    if (
      route.hidden ||
      route.component === "Layout" ||
      route.component === "ParentView"
    ) {
      if (route.children && route.children.length > 0) {
        const newParentPath = route.path.startsWith("/")
          ? route.path
          : `${parentPath}${parentPath.endsWith("/") ? "" : "/"}${route.path}`;

        const childResults = collectComponentPaths(
          route.children,
          newParentPath
        );
        Object.assign(result, childResults);
      }
      return;
    }

    const fullPath = route.path.startsWith("/")
      ? route.path
      : `${parentPath}${parentPath.endsWith("/") ? "" : "/"}${route.path}`;

    if (route.component !== "Layout") {
      result[fullPath] = route.component;
    }

    if (route.children && route.children.length > 0) {
      const childResults = collectComponentPaths(route.children, fullPath);
      Object.assign(result, childResults);
    }
  });

  return result;
};

const loadApiData = async () => {
  try {
    const response = await fetch("/api-collection.json");
    if (response.ok) {
      const data = await response.json();
      allApiData.value = data;
    }
  } catch (error) {
    console.error("加载API数据失败:", error);
  }
};
const init = async () => {
  try {
    const res = await getRouters();
    if (res.data) {
      componentPathMap.value = collectComponentPaths(
        res.data as unknown as RouteItem[]
      );
    }
  } catch (error) {
    console.error("获取路由数据失败:", error);
  }
};

onMounted(() => {
  loadApiData();
  init();
  // 默认显示浮窗
  show();
});

// 暴露方法给父组件
defineExpose({
  show,
  close,
  toggle: () => (visible.value = !visible.value),
});
</script>

<style scoped>
.api-float-window {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 450px;
  max-height: 600px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 12px;
}

.api-float-header {
  background: #f5f5f5;
  padding: 8px 12px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
}

.api-float-header span {
  font-weight: bold;
  color: #333;
}

.header-buttons {
  display: flex;
  gap: 4px;
}

.toggle-btn,
.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: bold;
}

.toggle-btn:hover,
.close-btn:hover {
  background: #e0e0e0;
}

.api-float-content {
  max-height: 500px;
  overflow-y: auto;
  padding: 12px;
}

.current-page-info {
  margin-bottom: 12px;
}

.page-path {
  background: #6c757d;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 11px;
  word-break: break-all;
}

.api-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.api-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 4px solid transparent;
}

.api-item:hover {
  background: #f8f9fa;
  transform: translateX(2px);
}

.method-badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 10px;
  min-width: 45px;
  text-align: center;
  margin-right: 8px;
}

.api-url {
  flex: 1;
  color: #333;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
}

.method-get .method-badge {
  background: #28a745;
  color: white;
}

.method-post .method-badge {
  background: #007bff;
  color: white;
}

.method-put .method-badge {
  background: #ffc107;
  color: #212529;
}

.method-delete .method-badge {
  background: #dc3545;
  color: white;
}

.method-unknown .method-badge {
  background: #6c757d;
  color: white;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 20px;
  font-style: italic;
}

/* 滚动条样式 */
.api-float-content::-webkit-scrollbar {
  width: 6px;
}

.api-float-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.api-float-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.api-float-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
```

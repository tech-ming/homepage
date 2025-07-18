---
date: 2025-07-18
category:
  - vue
tag:
  - vue-components
---

# Vue 自动计算高度组件

## 📋 版本信息

- **Vue**: ^3.0.0+

## 📝 功能介绍

- ✅ **自动响应式尺寸计算**：基于 ResizeObserver API 实时监听容器尺寸变化
- ✅ **智能高度计算**：自动排除头部元素高度，精确计算可用空间
- ✅ **插槽传参**：通过作用域插槽传递计算后的 width 和 height 值

### 基础用法

```vue
<AutoHeigth>
    <template #default="{ height,width }">
      <div
        :style="{ height: `${height}px`,width: `${width}px` }"
      ></div>
    </template>
  </AutoHeigth>
```

## 📋 Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| headerRef | `(HTMLElement \| null)[]` | `[]` | 头部元素引用数组，用于排除头部高度计算 |

## 📋 Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| resize | `{ width: number, height: number }` | 容器尺寸变化时触发 |

## 📋 Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| default | `{ width: number, height: number }` | 默认插槽，接收计算后的宽度和高度 |

## 🔧 组件源码

```vue
<template>
  <div ref="container" class="auto-resizer">
    <slot :width="width" :height="height" />
  </div>
</template>

<script lang="ts" setup>
import { debounce } from "lodash";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  headerRef: {
    type: Array as () => (HTMLElement | null)[],
    default: () => [],
  },
});
interface ResizeEvent {
  width: number;
  height: number;
}

const emit = defineEmits<{
  (e: "resize", size: ResizeEvent): void;
}>();

const container = ref<HTMLElement | null>(null);
const width = ref(0);
const height = ref(0);
let resizeObserver: ResizeObserver | null = null;

const emitResize = debounce((size: ResizeEvent) => {
  width.value = size.width;
  height.value = size.height;
  emit("resize", {
    width: Math.floor(size.width),
    height: Math.floor(size.height),
  });
}, 100);

const getHeadersHeight = () => {
  if (!props.headerRef || props.headerRef.length === 0) return 0;
  return props.headerRef.reduce((total, header) => {
    if (!header) return total;
    return total + header.getBoundingClientRect().height;
  }, 0);
};

const updateSize = () => {
  if (!container.value) return;

  const rect = container.value.getBoundingClientRect();
  const headersHeight = getHeadersHeight();
  const newWidth = rect.width;
  const newHeight = rect.height - headersHeight;

  if (width.value !== newWidth || height.value !== newHeight) {
    emitResize({ width: newWidth, height: newHeight });
  }
};

watch(
  () => props.headerRef,
  () => {
    updateSize();
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(updateSize);
    container.value && resizeObserver.observe(container.value);

    props.headerRef.forEach((header) => {
      header && resizeObserver?.observe(header);
    });
  } else {
    window.addEventListener("resize", updateSize);
  }
  nextTick(updateSize);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  window.removeEventListener("resize", updateSize);
});
</script>

<style scoped>
.auto-resizer {
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 0;
  /* 添加以下样式防止全屏异常 */
  contain: strict; /* 限制浏览器重排范围 */
  overflow: hidden; /* 防止内容溢出影响计算 */
}
</style>
```

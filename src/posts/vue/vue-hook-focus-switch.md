---
date: 2025-06-28
category:
  - vue
  - element-plus
tag:
  - vue-hook
---

# Vue 表单回车自动切换焦点工具函数

## 📋 版本信息

- **Vue**: ^3.0.0+

## 📝 功能介绍

该功能可以让用户在填写表单时，按下回车键自动跳转到下一个输入框，无需使用鼠标或 Tab 键。


## 📌 功能特点

- ✅ 自动跳转到下一个可聚焦元素
- ✅ 支持 input、select、textarea 等表单元素
- ✅ textarea 元素需按 Ctrl+Enter 触发跳转
- ✅ 可排除指定类名的元素
- ✅ 自动处理 Element Plus 下拉选择框


## 🚀 实现方式

### 基础用法

```vue
<el-form ref="formRef" @keyup.enter.capture="handleFormKeyEnter">
  <!-- 表单内容 -->
</el-form>

<script setup lang="ts">
import { ref } from 'vue'
import { switchFocusOnEnter } from './utils'

const formRef = ref()

const handleFormKeyEnter = (e: any) => {
  switchFocusOnEnter(e, formRef.value?.$el)
}
</script>
```

## 🔧 hook源码

```ts
/**
 * 聚焦下一个可聚焦元素
 * @description 聚焦到select触发click() textarea特殊处理(ctrl+enter)
 * @param e
 * @param container
 * @param excludedClasses 需要排除的类名集合
 */
export const switchFocusOnEnter = (
  e: KeyboardEvent,
  container?: HTMLElement | null,
  excludedClasses: string[] = [],
) => {
  const currentElement = e.target as HTMLElement;
  if (!container) return;

  // 如果当前元素是textarea且按下了Ctrl，则执行跳转
  if (currentElement.tagName.toLowerCase() === "textarea" && e.ctrlKey) {
    e.preventDefault(); // 防止默认的换行行为
  } else if (currentElement.tagName.toLowerCase() === "textarea") {
    return; // 如果是textarea且没有按Ctrl，则不处理
  }

  const focusableSelector = [
    'input:not([disabled]):not([type="hidden"]):not([type="button"]):not([type="submit"])',
    "textarea:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([disabled]):not([tabindex="-1"])',
  ].join(",");

  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector),
  )
    .filter((el) => {
      const style = window.getComputedStyle(el);
      const hasExcludedClass = excludedClasses.some((cls) =>
        el.classList.contains(cls),
      );
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        el.offsetParent !== null &&
        !hasExcludedClass
      ); // 排除包含指定类的元素
    })
    .sort((a, b) => {
      const aIndex = Number(a.tabIndex) || 0;
      const bIndex = Number(b.tabIndex) || 0;
      return aIndex === bIndex
        ? a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1
        : aIndex - bIndex;
    });

  const currentIndex = focusableElements.indexOf(currentElement);
  if (currentIndex === -1) return;

  const nextIndex = (currentIndex + 1) % focusableElements.length;
  const nextEl = focusableElements[nextIndex] as HTMLElement;
  nextEl.focus();
  
  //select特殊处理
  let _selectClassName=["el-select__input"]
  if (nextEl.tagName.toLowerCase() === "select"|| _selectClassName.some((cls) => nextEl.classList.contains(cls))) {
    nextEl.click();
  }
};
```

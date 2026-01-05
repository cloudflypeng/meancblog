---
title: 'Vue 3 Composition API 最佳实践'
description: '深入了解 Vue 3 Composition API 的使用技巧和最佳实践'
date: '2026-01-04'
author: 'MeanC'
tags: ['Vue', 'Composition API', 'JavaScript']
cover: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format'
---

# Vue 3 Composition API 最佳实践

Vue 3 引入的 Composition API 为我们提供了更灵活的代码组织方式。

## 什么是 Composition API？

Composition API 是 Vue 3 中新增的一组基于函数的 API，它允许我们：

- ✨ 更好地组织和复用代码
- 🎯 更好的 TypeScript 支持
- 📦 逻辑提取和复用更简单

## 基础示例

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

## Composables 模式

创建可复用的组合式函数：

```typescript
// composables/useCounter.ts
export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => count.value = initialValue;

  return {
    count: readonly(count),
    increment,
    decrement,
    reset,
  };
}
```

## 生命周期钩子

```typescript
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  console.log("Component mounted!");
});

onUnmounted(() => {
  console.log("Component unmounted!");
});
```

## 响应式工具

- `ref()`: 创建响应式引用
- `reactive()`: 创建响应式对象
- `computed()`: 计算属性
- `watch()`: 侦听器
- `watchEffect()`: 立即执行的侦听器

## 最佳实践

1. **使用 `<script setup>`**：更简洁的语法
2. **合理拆分 Composables**：保持单一职责
3. **善用 TypeScript**：类型安全
4. **避免过度抽象**：保持代码可读性

## 结论

Composition API 让 Vue
应用更加灵活和可维护。掌握这些最佳实践，能让你的代码质量上一个台阶！

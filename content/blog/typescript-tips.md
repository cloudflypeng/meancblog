---
title: 'TypeScript 开发技巧与陷阱'
description: 'TypeScript 开发中的实用技巧和常见陷阱解析'
date: '2026-01-03'
author: 'MeanC'
tags: ['TypeScript', 'JavaScript', '最佳实践']
cover: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format'
---

# TypeScript 开发技巧与陷阱

TypeScript 为 JavaScript 带来了静态类型检查，但同时也有一些需要注意的地方。

## 高级类型技巧

### 联合类型与类型守卫

```typescript
type Result =
  | { success: true; data: string }
  | { success: false; error: string };

function handleResult(result: Result) {
  if (result.success) {
    console.log(result.data); // ✅ TypeScript 知道这里有 data
  } else {
    console.log(result.error); // ✅ TypeScript 知道这里有 error
  }
}
```

### 泛型约束

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("hello"); // ✅
logLength([1, 2, 3]); // ✅
logLength(123); // ❌ 错误：number 没有 length 属性
```

### 工具类型

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// 使用 Omit 排除敏感字段
type PublicUser = Omit<User, "password">;

// 使用 Pick 选择特定字段
type UserPreview = Pick<User, "id" | "name">;

// 使用 Partial 使所有属性可选
type UpdateUserInput = Partial<User>;
```

## 常见陷阱

### 1. 类型断言滥用

```typescript
// ❌ 不好
const value = getSomeValue() as string;

// ✅ 好
const value = getSomeValue();
if (typeof value === "string") {
  // 使用 value
}
```

### 2. any 的过度使用

```typescript
// ❌ 避免
function process(data: any) {
  return data.map((item: any) => item.value);
}

// ✅ 更好
interface Item {
  value: string;
}

function process(data: Item[]) {
  return data.map((item) => item.value);
}
```

### 3. 忽略 null 和 undefined

```typescript
// ❌ 危险
function greet(name: string) {
  console.log(name.toUpperCase());
}

// ✅ 安全
function greet(name: string | null) {
  if (name) {
    console.log(name.toUpperCase());
  }
}
```

## 实用技巧

### 1. 使用 const 断言

```typescript
const colors = ["red", "green", "blue"] as const;
type Color = typeof colors[number]; // 'red' | 'green' | 'blue'
```

### 2. 索引签名

```typescript
interface Dictionary {
  [key: string]: string | number;
}

const config: Dictionary = {
  name: "App",
  port: 3000,
};
```

### 3. 条件类型

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

## 总结

TypeScript
是一个强大的工具，但需要正确使用。避免常见陷阱，善用高级特性，能让你的代码更加健壮和易维护。

记住：**类型安全不是目的，而是帮助我们写出更好代码的工具。**

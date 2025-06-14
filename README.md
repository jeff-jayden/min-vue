# min-vue

一个简易版的 Vue2 响应式原理实现，包含数据响应、依赖收集、模板编译等核心功能，适合学习 Vue2 源码原理。

## 目录结构

```
README.md
src/
  compiler.js      // 模板编译器，解析指令和插值表达式
  dep.js           // 依赖收集器，管理观察者
  index.html       // 示例页面
  observer.js      // 数据响应式核心，劫持 data 属性
  vue.js           // Vue 主入口，实现数据代理和初始化
  watcher.js       // 观察者，负责视图更新
```

## 运行方式

1. 进入 `src` 目录，直接用浏览器打开 `index.html` 即可看到效果。
2. 修改输入框内容，页面会自动响应更新。

## 核心文件说明

- `src/vue.js`：Vue 构造函数，实现数据代理、响应式和模板编译。
- `src/observer.js`：将 data 属性转为响应式，劫持 getter/setter。
- `src/dep.js`：依赖收集器，管理所有观察者。
- `src/watcher.js`：观察者对象，数据变化时更新视图。
- `src/compiler.js`：模板编译器，解析指令和插值表达式，绑定数据和视图。

## 示例

页面包含两个输入框，分别绑定 `msg` 和 `value`，支持 `v-model`、`v-text` 和插值表达式：

```html
<input v-model="msg" />
<span>{{ msg }}</span>
<p v-text="msg"></p>
```

## 适合人群

- 想深入理解 Vue2 响应式原理的开发者
- 前端进阶学习者

## 参考

- Vue2 源码
- [vuejs.org](https://vuejs.org/)

---

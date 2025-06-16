# 组件示例

这个页面展示了如何在 VitePress 中使用自定义组件。

## 基本用法

<CustomComponent>
这是一个自定义组件的内容。
</CustomComponent>

## 自定义标题

<CustomComponent title="自定义标题组件">
这是一个带有自定义标题的组件内容。

你可以在这里添加任何 Markdown 内容：

- 列表项 1
- 列表项 2
- 列表项 3

```js
// 甚至可以添加代码块
const message = '你好，VitePress！';
console.log(message);
```
</CustomComponent>

## 在实际项目中的应用

自定义组件可以用于：

- 创建一致的 UI 元素
- 封装复杂的功能
- 提高代码的可重用性
- 改善文档的视觉体验 
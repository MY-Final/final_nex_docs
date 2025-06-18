# PC

## 表单头部


[[toc]]

## 1. ✅ 扩展能力列表

关于属性说明中的只读、可静态配置和可动态配置，具体含义如下：

- **只读**：只能获取相应信息，不能修改配置。
- **可静态配置**：系统应用运行之前可以修改该配置，运行过程中不能修改该配置。
- **可动态配置**：系统应用运行过程中可以修改该配置。

| 类型 | apiKey | 说明 |
| --- | --- | --- |
| 属性 | enableFormMulticolumn | 是否允许用户自行切换列表。<br>可静态配置。 |
| 属性 | enableFullScreen | 是否允许用户使用全屏模式。<br>可静态配置。 |

### 1.1 ：配置表单头部

以下示例展示了如何在表单中配置表单头部的扩展功能：

```javascript
function view(ctx, props) {
    return {
        type: 'EntityForm',
        componentExtensions: {
            formHeaderWeb: {
                enableFormMulticolumn: false, // 是否显示列切换               
                enableFullScreen: false // 是否显示全屏切换
            },
            // 其他配置省略...
        }
    }
}
```
# PC

[[toc]]

## 1. 扩展能力列表

关于属性说明中的只读、可静态配置和可动态配置，具体含义如下：

- **只读**：只能获取相应信息，不能修改配置。
- **可静态配置**：系统应用运行之前可以修改该配置，运行过程中不能修改该配置。
- **可动态配置**：系统应用运行过程中可以修改该配置。

| 类型 | apiKey       | 说明                                                                                                                                                              |
| ---- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 属性 | buttonApiKey | 按钮的唯一标识，标准按钮使用固定的标识，自定义按钮填写按钮的 API 名称。<br>取消：formCancel<br>保存：formSave<br>保存并提交审批：formSaveAndApply<br>可静态配置。 |
| 属性 | source       | layout：扩展布局上相同 apiKey 的按钮，会将扩展行为追加到按钮。<br>nex：表示该按钮是通过 NEX 扩展增加，会覆盖原有事件。<br>可静态配置。                            |
| 属性 | index        | 按钮显示的名称，标准按钮设置名称后会覆盖其原名称。<br>可静态配置。                                                                                                |
| 属性 | visible      | 单个按钮是否显示，或根据初始条件决定是否显示。<br>可静态配置。                                                                                                    |
| 属性 | disabled     | 是否禁用按钮。<br>可静态配置。                                                                                                                                    |
| 属性 | level        | 设置按钮样式，可选值：<br>primary：主按钮样式<br>secondary：辅按钮样式<br>dark：灰置样式<br>可静态配置。                                                          |
| 事件 | onClick      | 单击表单底部按钮后触发事件。                                                                                                                                      |

## 2. 配置表单底部按钮

以下示例展示了如何在表单中配置底部按钮的扩展功能：

```javascript
formFooter: {
  formButton: [
    {
      scope: { buttonApiKey: "formCancel" },
      label: "取消按钮",
      visible: true,
      disabled: false,
      level: "primary",
      onClick: (e) => {
        ctx.ui.showToast("success", "取消按钮被点击", 3);
        props.closeForm();
      },
    },
    {
      scope: { buttonApiKey: "formSave" },
      label: "保存",
      visible: true,
      disabled: false,
      level: "secondary",
      onClick: (e) => {
        // 自定义保存逻辑
      },
    },
    {
      scope: { buttonApiKey: "customButton" },
      source: "nex",
      label: "自定义按钮",
      visible: true,
      disabled: false,
      level: "dark",
      onClick: (e) => {
        ctx.ui.showToast("success", "自定义按钮被点击", 3);
      },
    },
  ];
}
```

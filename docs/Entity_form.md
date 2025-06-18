# PC

[[toc]]

## 1. 扩展能力列表


| 类型 | apiKey | 说明 |
| ---- | ------ | ---- |
| 函数 | getFormData | 获取表单数据（包括主表单和子表单）。 |
| 函数 | validateForm | 调用原生表单的校验，包括必填字段的验证和数据类型的正确性检查。 |
| 函数 | submit | 调用原生表单的保存，并将数据提交至服务端。 |
| 函数 | submitForApproval | 调用原生表单的保存，并在保存后执行提交审批操作。 |
| 函数 | removeErrors | 删除主子表的错误信息。 |
| 事件 | afterRender | 表单组件首次渲染完成后触发事件。 |
| 事件 | beforeSave | 表单保存被触发后，在标准表单校验通过且即将提交数据前触发事件。 |
| 事件 | afterSave | 表单数据成功提交至服务器且弹框即将关闭时触发的事件（不能被阻断）。 |
| 事件 | afterSubmitForApproval | 保存并提交审批的弹框成功提交后且弹框关闭时触发事件。 |

## 2. 函数详细说明

### 2.1 getFormData

**功能**  
获取表单数据（包括主表单和子表单）。

**执行方式**  
同步执行。

**函数签名**  
```javascript
getFormData()
```

**输入参数**  
无

**输出参数**  

| 参数项 | 类型 | 说明 |
| --- | --- | --- |
| `masterData` | Object | 主表数据对象。 |
| `detailsData` | Object | 子表数据对象。 |
| ┗ `validateError` | Boolean | 是否有校验错误。 |
| ┗ `detailData` | Array | 子表数据数组，每项包含以下字段： |
| ┗━ `create` | Array | 新增的数据。 |
| ┗━ `delete` | Array | 删除的数据。 |
| ┗━ `update` | Array | 修改的数据。 |
| ┗━ `objectApiKey` | String | 子表实体 API Key。 |

**参数结构**  
```javascript
{
  masterData: {},
  detailsData: {
    validateError: false,
    detailData: [
      {
        create,
        delete,
        update,
        objectApiKey
      }
    ]
  }
}
```

**代码示例**  
单击表单按钮后，自动计算金额并提交表单。

```javascript
function view(ctx, props) {
    return {
        type: 'EntityForm',
        componentExtensions: {
            formFooter: {
                formButton: [
                    {
                        buttonApiKey: 'calculateAmount', // 声明自定义按钮的 apiKey
                        scope: { buttonApiKey: 'calculateAmount' }, // 声明扩展规则仅针对 buttonApiKey 匹配的按钮生效
                        source: 'nex', // 声明按钮为自定义按钮
                        index: 2, // 设置按钮在从右往左的第2下标位
                        label: '计算金额', // 设置按钮名称
                        level: 'secondary', // 设置按钮为次要样式
                        onClick: (e) => {
                            // 获取主表单组件实例
                            const formInstance = props.getComponent('entityFormMaster', null, true);
                            // 通过主表单实例获取主表单数据
                            let formData = formInstance.getFormData();
                            // 计算主表单金额
                            let amt = formData.price__c * formData.quantity__c;
                            // 设置主表单的金额字段值
                            formInstance.setFormData({ amount__c: amt });
                        }
                    }
                ],
            },
        }
    }
}
```

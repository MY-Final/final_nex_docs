# PC

## 1. 表单页面

![表单页面-props](/img/Form/表单页面props.png)


[[toc]]

## 1. ✅表单页面扩展函数

| 函数名           | 函数签名            | 功能描述     | 使用场景          |
| ------------- | --------------- | -------- | ------------- |
| `closeForm`   | `closeForm()`   | 关闭当前表单页  | 权限限制、不符合条件时关闭 |
| `refreshForm` | `refreshForm()` | 刷新当前表单数据 | 表单保存成功后刷新内容   |

### 1.1  `closeForm` ：部门限制后关闭表单

**描述**：打开表单后检查用户所属部门，如果不是渠道商，则提示并关闭表单。

```javascript
function view(ctx, props) {
    return {
        type: 'EntityForm',
        componentExtensions: {
            entityForm: {
                afterRender: function (e) {
                    if (ctx.user.departmentName != "渠道商") {
                        ctx.ui.showToast("success", '仅渠道商用户可以创建数据', 3);
                        props.closeForm();
                    }                  
                }
            }
        }
    }
}
```

### 1.2  `refreshForm` ：保存成功后刷新表单

**描述**：在数据保存成功后刷新当前表单页，确保数据显示为最新状态。

```javascript
function view(ctx, props) {
    return {
        type: 'EntityForm',
        componentExtensions: {
            entityForm: {
                afterSave: function (e) {
                    ctx.ui.showToast("success", '数据已更新', 3);
                    props.refreshForm();
                }
            }
        }
    }
}
```
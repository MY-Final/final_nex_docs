# PC

[[toc]]

## 1. 扩展能力列表


| 类型 | apiKey | 说明 |
| ---- | ------ | ---- |
| 函数 | `getFormData` | 获取表单数据（包括主表单和子表单）。 |
| 函数 | `validateForm` | 调用原生表单的校验，包括必填字段的验证和数据类型的正确性检查。 |
| 函数 | `submit` | 调用原生表单的保存，并将数据提交至服务端。 |
| 函数 | `submitForApproval` | 调用原生表单的保存，并在保存后执行提交审批操作。 |
| 函数 | `removeErrors` | 删除主子表的错误信息。 |
| 事件 | `afterRender` | 表单组件首次渲染完成后触发事件。 |
| 事件 | `beforeSave` | 表单保存被触发后，在标准表单校验通过且即将提交数据前触发事件。 |
| 事件 | `afterSave` | 表单数据成功提交至服务器且弹框即将关闭时触发的事件（不能被阻断）。 |
| 事件 | `afterSubmitForApproval` | 保存并提交审批的弹框成功提交后且弹框关闭时触发事件。 |

## 2. 函数详细说明

### 2.1 `getFormData`

**功能**  
获取表单数据（包括主表单和子表单）。

**执行方式**  
同步执行。

**函数签名**  
```javascript
getFormData()
```

**输入参数**  
`无`

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

### 2.2 `validateForm`

**功能**  
调用原生表单的校验，包括必填字段的验证和数据类型的正确性检查。

**执行方式**  
异步执行。

**函数签名**  
```javascript
validateForm()
```

**输入参数**  
`无`

**输出参数**  

| 参数项 | 类型 | 说明 |
| --- | --- | --- |
| Boolean | Boolean | true：校验通过<br>false：校验未通过 |

**代码示例**  
单击自定义按钮后发起表单校验，校验通过后执行表单保存操作。

```javascript
function view(ctx, props) {
    return {
        type: 'EntityForm',
        componentExtensions: {
            formFooter: {
                formButton: [
                    {
                        buttonApiKey: 'customSave', //声明自定义按钮的apiKey
                        scope: { buttonApiKey: 'customSave' },// 声明扩展规则仅针对buttonApiKey匹配的按钮生效
                        source: 'nex', //声明按钮为自定义按钮
                        index: 1, //设置按钮在从右往左的第2下标位
                        label: '保存', //设置按钮名称
                        level: 'primary', //设置按钮为主要样式
                        onClick: (e) => {
                            //获取主表单组件实例
                            const formInstance = props.getComponent('entityForm', null, true);
                              formInstance.validateForm().then(isValid => {
                                if(isValid) {
                                   formInstance.submit(); 
                                } else {
                                    ctx.ui.showToast("error", "请检查错误填写项", 3);
                                }
                            });
                        }
                    },
                     {
                         //隐藏标准保存按钮
                        scope: { buttonApiKey: 'formSave' },
                        visible: false
                    },
                ],
            },
        }
    }
}
```

### 2.3 `submit`

**功能**  
调用原生表单的保存，并将数据提交至服务端。

**执行方式**  
异步执行。

**函数签名**  
```javascript
submit(saveAndSubmit,sceneType,buttonApiKey)
```

**输入参数**  
`无`

**输出参数**  
`无`

**代码示例**  
单击自定义按钮后发起表单校验，校验通过后执行表单保存操作。

```javascript
function view(ctx, props) {
    return {
        type: 'EntityForm',
        componentExtensions: {
            formFooter: {
                formButton: [
                    {
                        buttonApiKey: 'customSave', //声明自定义按钮的apiKey
                        scope: { buttonApiKey: 'customSave' },// 声明扩展规则仅针对buttonApiKey匹配的按钮生效
                        source: 'nex', //声明按钮为自定义按钮
                        index: 1, //设置按钮在从右往左的第2下标位
                        label: '保存', //设置按钮名称
                        level: 'primary', //设置按钮为主要样式
                        onClick: (e) => {
                            //获取主表单组件实例
                            const formInstance = props.getComponent('entityForm', null, true);
                              formInstance.validateForm().then(isValid => {
                                if(isValid) {
                                   formInstance.submit(); 
                                } else {
                                    ctx.ui.showToast("error", "请检查错误填写项", 3);
                                }
                            });
                        }
                    },
                     {
                         //隐藏标准保存按钮
                        scope: { buttonApiKey: 'formSave' },
                        visible: false
                    },
                ],
            },
        }
    }
}
```

### 2.4 `submitForApproval`

**功能**  
调用原生表单的保存，并在保存后执行提交审批操作。

**执行方式**  
同步执行。

代码中包含 async 时异步执行。

**函数签名**  
```javascript
submitForApproval()
```

**输入参数**  
`无`

**输出参数**  
`无`

**代码示例**  
单击自定义按钮后发起表单校验，校验通过后执行表单保存并提交审批操作。

```javascript
function view(ctx, props) {
    return {
        type: 'EntityForm',
        componentExtensions: {
            formFooter: {
                formButton: [
                    {
                        buttonApiKey: 'customSave', // 声明自定义按钮的 apiKey
                        scope: { buttonApiKey: 'customSave' }, // 声明扩展规则仅针对 buttonApiKey 匹配的按钮生效
                        source: 'nex', // 声明按钮为自定义按钮
                        index: 1, // 设置按钮在从右往左的第2下标位
                        label: '保存', // 设置按钮名称
                        level: 'primary', // 设置按钮为主要样式
                        onClick: (e) => {
                            // 获取主表单组件实例
                            const formInstance = props.getComponent('entityForm', null, true);
                            formInstance.validateForm().then(isValid => {
                                if (isValid) {
                                    formInstance.submitForApproval();
                                } else {
                                    ctx.ui.showToast("error", "请检查错误填写项", 3);
                                }
                            });
                        }
                    },
                    {
                        // 隐藏标准保存按钮
                        scope: { buttonApiKey: 'formSave' },
                        visible: false
                    },
                ],
            },
        }
    }
}
```

### 2.5 `removeErrors`

**功能**  
删除主子表的错误信息。

**执行方式**  
同步执行。

**函数签名**  
```javascript
removeErrors()
```

**输入参数**  
`无`

**输出参数**  
`无`

**代码示例**  
指定字段值发生变更后会同步计算其他字段值，此时需要移除表单中字段的报错信息。

```javascript
function view(ctx, props) {
    return {
        type: 'EntityForm',
        componentExtensions: {
            entityForm: {
                entityFormMaster: {
                    formItem: [
                        {
                            scope: { itemApiKey: 'customItem18__c' },
                            label: 'NEX改名字段',
                            onChange: function (e) {
                                // 获取表单实例
                                const formInstance = props.getComponent('entityForm', null, true);
                                // 移除表单全部字段的错误提示
                                formInstance.removeErrors();
                            }
                        }
                    ]
                }
            }
        }
    }
}
```

# 3. 事件详细说明

### 3.1 `afterRender`

**功能**  
表单组件首次渲染完成后触发事件。

**执行方式**  
异步执行。

如果 `afterRender` 事件中包含异步调用，则不支持在异步调用执行完成后再执行系统预置标准事件。

`afterRender` 事件不能阻断后续系统预置标准事件的执行。

**事件参数**  

<table>
<thead>
  <tr>
    <th>参数名称</th>
    <th>类型</th>
    <th>参数结构</th>
    <th>参数项</th>
    <th>参数项类型</th>
    <th>说明</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="2">event</td>
    <td rowspan="2">Object</td>
    <td rowspan="2">{ <br> &nbsp;&nbsp;cmp: {}, <br> &nbsp;&nbsp;data: {} <br> }</td>
    <td>cmp</td>
    <td>-</td>
    <td>当前扩展组件实例</td>
  </tr>
  <tr>
    <td>data</td>
    <td>Object</td>
    <td>无</td>
  </tr>
</tbody>
</table>

**返回值**  
`无`

**代码示例**  
表单打开后，为字段设置默认值。

```javascript
function view(ctx, props) {
    return {
        type: 'EntityForm',
        componentExtensions: {
            entityForm: {
                afterRender: function (e) {
                    // 通过事件对象获取主表单组件实例
                    const formInstance = e.cmp.getComponent('entityFormMaster', null, true);
                    let currentDate = new Date();
                    // 获取年、月、日
                    let year = currentDate.getFullYear();
                    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                    let day = currentDate.getDate().toString().padStart(2, '0');
                    // 将日期拼接成文本
                    let dateText = year + '-' + month + '-' + day;
                    // 设置主表字段默认值
                    formInstance.setFormData({ name: "项目周报" + dateText });
                }
            }
        }
    }
}
```

### 3.2 `beforeSave`

**功能**  
表单保存被触发后，在标准表单校验通过且即将提交数据前触发事件。

**执行方式**  
同步执行。

触发时存在以下系统预置标准事件：

- 执行表单校验。
- 执行表单提交。
- 关闭表单。

`beforeSave` 事件与标准事件的执行逻辑如下：

- 在标准事件执行表单提交之前执行。
- 如果 `beforeSave` 事件中包含异步调用，则支持在异步调用执行完成后再执行标准事件。
- `beforeSave` 事件可以阻断后续标准事件的执行。当返回 false 时，将阻断后续标准事件的执行。

**事件参数**  

<table>
<thead>
  <tr>
    <th>参数名称</th>
    <th>类型</th>
    <th>参数结构</th>
    <th>参数项</th>
    <th>参数项类型</th>
    <th>说明</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="2">event</td>
    <td rowspan="2">Object</td>
    <td rowspan="2">{ <br> &nbsp;&nbsp;cmp: {}, <br> &nbsp;&nbsp;data: { formData: { record, details }, saveAndSubmit } <br> }</td>
    <td>cmp</td>
    <td>-</td>
    <td>当前扩展组件实例</td>
  </tr>
  <tr>
    <td>data</td>
    <td>Object</td>
    <td>formData：表单所有数据。<br>record：当前主表数据。<br>details：子表数据。<br>saveAndSubmit：是否是保存并提交</td>
  </tr>
</tbody>
</table>

**返回值**  
| 类型 | 说明 |
| --- | --- |
| Boolean | 返回 false 可阻断保存 |

**代码示例**  
在表单保存前执行自定义校验，如校验未通过，则阻断本次保存操作。

```javascript
function view(ctx, props) {
    return {
        type: 'EntityForm',
        componentExtensions: {
            entityForm: {
                beforeSave: function (e) {
                    // 通过事件对象获取主表单组件实例
                    const formInstance = e.cmp.getComponent('entityFormMaster', null, true);
                    // 通过主表单实例获取主表单数据
                    let formData = formInstance.getFormData();
                    // 设置主表字段默认值
                    if (formData.quantity__c > 100 || formData.quantity__c < 1) {
                        // 弹出填写错误提示
                        ctx.ui.showToast("error", '数量超出允许范围', 3);
                        // 为字段添加自定义错误信息
                        formInstance.addErrors({ customItem7__c: "请填写1-100之间的整数" });
                        // 阻断表单保存
                        return false;
                    }
                }
            }
        }
    }
}
```

### 3.3 `afterSave`

**功能**  
表单数据成功提交至服务器且弹框即将关闭时触发的事件（不能被阻断）。

**执行方式**  
同步执行。

触发时存在以下系统预置标准事件：

- 执行表单提交。
- 关闭表单。

`afterSave` 事件与标准事件的执行逻辑如下：

- 在标准事件关闭表单之后执行。
- 如果 `afterSave` 事件中包含异步调用，则不支持在异步调用执行完成后再执行标准事件。
- `afterSave` 事件不能阻断后续标准事件的执行。

**事件参数**  

<table>
<thead>
  <tr>
    <th>参数名称</th>
    <th>类型</th>
    <th>参数结构</th>
    <th>参数项</th>
    <th>参数项类型</th>
    <th>说明</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="2">event</td>
    <td rowspan="2">Object</td>
    <td rowspan="2">{ <br> &nbsp;&nbsp;cmp: {}, <br> &nbsp;&nbsp;data: { record } <br> }</td>
    <td>cmp</td>
    <td>-</td>
    <td>当前扩展组件实例</td>
  </tr>
  <tr>
    <td>data</td>
    <td>Object</td>
    <td>record：当前数据</td>
  </tr>
</tbody>
</table>

**返回值**  
`无`

**代码示例**  
表单保存成功后跳转至详情页。

```javascript
function view(ctx, props) {
    return {
        type: 'EntityForm',
        componentExtensions: {
            entityForm: {
                afterSave: function (e) {
                    // 获取保存后的数据 id
                    let newRecordId = e.data.record.id;
                    // 构造详情页地址
                    let detailUrl = '/bff/neoweb#/entityDetail/zhu__c/' + newRecordId + '?objectApiKey=zhu__c&recordId=' + newRecordId + '&objectId=100502201&busiTypeId=100506003';
                    // 跳转至详情页
                    ctx.ui.navigatePageTo({ url: detailUrl, isNewWindow: false });
                }
            }
        }
    }
}
```

### 3.4 `afterSubmitForApproval`

**功能**  
保存并提交审批的弹框成功提交后且弹框关闭时触发事件。

**执行方式**  
同步执行。

触发时存在以下系统预置标准事件：

- 提交审批流成功。
- 审批流弹框关闭。

`afterSubmitForApproval` 事件与标准事件的执行逻辑如下：

- 在标准事件审批流弹框关闭之后执行。
- 如果 `afterSubmitForApproval` 事件中包含异步调用，则不支持在异步调用执行完成后再执行标准事件。
- `afterSubmitForApproval` 事件不能阻断后续标准事件的执行。

**事件参数**  

<table>
<thead>
  <tr>
    <th>参数名称</th>
    <th>类型</th>
    <th>参数结构</th>
    <th>参数项</th>
    <th>参数项类型</th>
    <th>说明</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="2">event</td>
    <td rowspan="2">Object</td>
    <td rowspan="2">{ <br> &nbsp;&nbsp;cmp: {}, <br> &nbsp;&nbsp;data: { record } <br> }</td>
    <td>cmp</td>
    <td>-</td>
    <td>当前扩展组件实例</td>
  </tr>
  <tr>
    <td>data</td>
    <td>Object</td>
    <td>record：当前数据</td>
  </tr>
</tbody>
</table>

**返回值**  
`无`

**代码示例**  
保存并提交审批成功后跳转至详情页。

```javascript
function view(ctx, props) {
    return {
        type: 'EntityForm',
        componentExtensions: {
            entityForm: {
                afterSubmitForApproval: function (e) {
                    // 获取提交审批后的数据 id
                    let newRecordId = e.data.record.id;
                    // 构造详情页地址
                    let detailUrl = '/bff/neoweb#/entityDetail/zhu__c/' + newRecordId + '?objectApiKey=zhu__c&recordId=' + newRecordId + '&objectId=100502201&busiTypeId=100506003';
                    // 跳转至详情页
                    ctx.ui.navigatePageTo({ url: detailUrl, isNewWindow: false });
                }
            }
        }
    }
}
```

## 4. 常见问题与解决方案
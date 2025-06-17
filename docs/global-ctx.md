# 全局对象 ctx

## 文档符号说明

在本文档中，您将看到以下三种标记符号，它们分别代表：

- ✅ - 已完成测试且功能正常的模块
- ⚠️ - 需要注意的功能点或有使用限制的模块
- ❌ - 尚未实现或存在问题的功能

这些符号将帮助您快速识别各个功能模块的状态，便于在开发过程中合理使用相关API。

::: tip 核心概念
全局对象ctx是NEX 2.0中的核心对象，提供了丰富的系统、用户、界面交互和工具函数能力，帮助开发者快速实现业务功能。
:::

[[toc]]

## 概述

全局对象ctx（Context）是NEX 2.0开发框架中的核心对象，它提供了一系列扩展点，使开发者能够访问系统信息、用户数据、界面交互和服务端接口等功能。通过ctx对象，开发者可以快速实现业务逻辑，提高开发效率。

<div class="features">

- **系统信息** - 获取语言、时区、环境等系统级信息
- **用户数据** - 访问当前登录用户的身份与权限信息
- **界面交互** - 提供丰富的UI组件与交互能力
- **工具函数** - 常用的辅助功能与调试工具
- **接口调用** - 与后端服务的数据交互能力

</div>


## 系统（system）✅

::: info 系统分类
系统分类提供了与当前系统环境相关的信息和功能，包括语言、时区、运行环境等基础信息，帮助开发者适配不同的系统环境。
:::

### 属性

| 扩展点 | apiKey | 使用场景 | 读写性 |
|:------:|:------:|:--------:|:------:|
| 当前语言 | `language` | 获取当前用户使用的系统语言 | 只读 |
| 系统时区 | `timeZone` | 获取当前用户使用的时区 | 只读 |
| 运行环境 | `clientType` | 获取当前用户访问的客户端 | 只读 |

**运行环境可能的值**：
```js
// 获取当前客户端类型
const clientType = ctx.system.clientType;

// 可能的值:
// - Web：网页端
// - App：移动端
// - WeCom：企微端
// - DingTalk：钉钉端

// 使用示例
if (ctx.system.clientType === 'Web') {
  // 网页端特定逻辑
}
```

| 扩展点 | apiKey | 使用场景 | 读写性 |
|:------:|:------:|:--------:|:------:|
| 当前租户 ID | `tenantId` | 获取当前租户的 ID | 只读 |
| 当前企业名称 | `tenantName` | 获取当前租户的名称 | 只读 |
| 启用的货币类型 | `currencies` | 获取当前租户已经启用的货币类型 | 只读 |
| 当前业务系统 | `systemType` | 当前的业务系统类型 | 只读 |

**业务系统类型**：
```js
// 获取当前业务系统类型
const systemType = ctx.system.systemType;

// 可能的值: 
// - crm：客户关系管理系统
// - prm：合作伙伴关系管理系统

// 使用示例
if (ctx.system.systemType === 'crm') {
  // CRM系统特定逻辑
}
```

### 函数

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 登出系统 | `logout()` | 登出系统并回到登录页 |

**示例**：
```js
// 用户登出系统
ctx.system.logout();
```

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 获取当前时间 | `getCurrentDate(format)` | 获取当前系统的时间，可设置返回格式 |

**示例**：
```js
// 默认格式为年月日时分
const now = ctx.system.getCurrentDate();

// 自定义格式
const dateWithFormat = ctx.system.getCurrentDate('YYYY-MM-DD');
```

## 用户（user）✅

::: info 用户分类
用户分类提供了当前登录用户的相关信息，包括基本信息、权限信息和组织信息等，便于开发者根据用户身份进行个性化功能开发。
:::

### 属性

| 扩展点 | apiKey | 使用场景 | 读写性 |
|:------:|:------:|:--------:|:------:|
| 用户姓名 | `name` | 获取当前用户的姓名 | 只读 |
| 当前货币 | `currency` | 获取当前用户的货币类型 | 只读 |
| 用户 ID | `id` | 获取当前用户的 ID | 只读 |
| 主职能 ID | `primaryFunctionalId` | 获取当前用户主要职能的 ID | 只读 |
| 职能列表 | `functionals` | 当前用户被分配的全部职能 | 只读 |
| 用户部门 ID | `departmentId` | 获取当前用户的部门 ID | 只读 |
| 用户部门名称 | `departmentName` | 获取当前用户的部门名称 | 只读 |
| 用户邮箱 | `email` | 获取当前用户的邮箱 | 只读 |
| 用户手机号 | `phoneNumber` | 获取当前用户的手机号 | 只读 |

**用户信息使用示例**：
```js
// 获取用户基本信息
const userInfo = {
  name: ctx.user.name,
  email: ctx.user.email,
  phone: ctx.user.phoneNumber,
  department: ctx.user.departmentName
};

// 使用用户信息
const welcomeMessage = `${userInfo.name} - ${userInfo.department}`;
```

**用户属性访问示例**：
```js
// 获取用户相关信息（推荐方式）
const user = ctx.user;

// 使用用户属性
const userName = user.name;
const userId = user.id;
const userCurrency = user.currency;
const primaryFunctionalId = user.primaryFunctionalId;
const functionals = user.functionals; // 返回格式: [{id, name, isMain}]
const departmentId = user.departmentId;
const departmentName = user.departmentName;
const email = user.email;
const phoneNumber = user.phoneNumber;
```

## 界面（ui）✅

::: info 界面分类
界面分类提供了丰富的交互组件和页面导航功能，帮助开发者创建友好的用户界面，提升用户体验。
:::

### 函数

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 弹出提示信息 | `showToast(type, msg, time)` | 弹出提示信息，可以设置信息的提示样式 |

**参数说明**：
```js
/**
 * 弹出提示信息
 * @param {string} type - 信息类型，可选值为 success、warning、error
 * @param {string} msg - 信息内容，为文本串
 * @param {number} time - 停留时间，单位为秒，默认为 1 秒
 */
// 成功提示，显示2秒
ctx.ui.showToast('success', '操作成功', 2);

// 警告提示
ctx.ui.showToast('warning', '请注意，数据已变更');

// 错误提示
ctx.ui.showToast('error', '操作失败，请重试');
```

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 弹出确认框 | `confirm(options)` | 弹出确认弹框，可以在用户选择后执行相应的回调 |

**参数说明**：
```js
/**
 * 弹出确认框
 * @param {Object} options - 配置选项
 * @param {string} options.title - 标题
 * @param {string} options.msg - 弹窗内容区
 * @param {string} [options.width] - 弹窗的宽度，默认400px
 * @param {Function} options.onOk - 弹窗确认按钮的回调
 * @param {Function} options.onCancel - 弹窗取消按钮的回调
 */
ctx.ui.confirm({
  title: '确认操作',
  msg: '是否确认删除该记录？删除后将无法恢复。',
  width: '500px',
  onOk: () => {
    // 确认操作
    ctx.ui.showToast('success', '记录已删除');
  },
  onCancel: () => {
    // 取消操作
    ctx.ui.showToast('info', '已取消删除');
  }
});
```

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 弹出 iframe | `openIframe(options)` | 以弹出形式打开一个 iframe 框，可以指定 URL 地址，可进行拖动 |

**参数说明**：
```js
/**
 * 弹出iframe
 * @param {Object} options - 配置选项
 * @param {string} options.devPageKey - 打开内部开发页面的apiKey；外部页面则使用url
 * @param {string} options.url - 配置的自定义页面的URL
 * @param {string} options.title - 弹窗的标题
 * @param {string|number} [options.height] - 弹窗的高度，默认值为300px
 * @param {string|number} [options.width] - 弹窗的宽度，默认值为400px
 * @param {boolean} [options.showFooter] - 是否显示footer，默认值为false
 * @param {Function} [options.onOk] - 弹窗确认按钮的回调
 * @param {Function} [options.onCancel] - 弹窗取消按钮的回调
 * @param {boolean} [options.showCloseButton] - 是否显示右上角关闭按钮，默认值为true
 */
// 打开外部页面
ctx.ui.openIframe({
  url: 'https://example.com',
  title: '外部页面',
  width: 800,
  height: 600
});

// 打开内部开发页面
ctx.ui.openIframe({
  devPageKey: 'customer_detail',
  title: '客户详情',
  width: 900,
  height: 700,
  showFooter: true,
  onOk: () => {
    ctx.ui.showToast('success', '操作已确认');
  }
});
```

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 弹出 loading 框 | `showLoading()` | 在当前页面上弹出遮罩层与 loading 框 |
| 关闭 loading 框 | `hideLoading()` | 关闭当前页面上的遮罩层与 loading 框 |

**示例**：
```js
// 显示loading
ctx.ui.showLoading();

// 执行异步操作
fetchData().then(data => {
  // 处理数据
  processData(data);
}).catch(error => {
  // 处理错误
  ctx.ui.showToast('error', '数据加载失败');
}).finally(() => {
  // 隐藏loading
  ctx.ui.hideLoading();
});

// 或使用setTimeout模拟
setTimeout(() => {
  ctx.ui.hideLoading();
}, 2000);
```

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 打开 Picker 选择页 | `openPickerList(options)` | 打开实体 Picker（查找）页 |

**参数说明**：
```js
/**
 * 打开Picker选择页
 * @param {Object} options - 配置选项
 * @param {string} options.objectApiKey - 要打开的实体的ApiKey
 * @param {string} [options.selectionMode] - 单选还是多选，"single"或"multiple"
 * @param {Array} [options.conditions] - 筛选条件
 * @param {Object} [options.orderBy] - 排序方式
 * @param {string} [options.title] - picker的标题
 */
// 基本用法
ctx.ui.openPickerList({
  objectApiKey: 'customer',
  selectionMode: 'multiple',
  title: '选择客户'
});

// 带筛选条件的用法
ctx.ui.openPickerList({
  objectApiKey: 'customer',
  selectionMode: 'single',
  title: '选择VIP客户',
  conditions: [
    {
      apiKey: 'level',
      type: 'eq',
      value: 'VIP'
    }
  ],
  orderBy: {
    field: 'createTime',
    order: 'desc'
  }
});
```

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 打开特定页面 | `navigatePageTo(options)` | 打开一个特定的页面，可以在当前页跳转或者在新标签页打开 |

**参数说明**：
```js
/**
 * 打开特定页面
 * @param {Object} options - 配置选项
 * @param {string} options.url - 页面URL
 * @param {boolean} [options.isNewWindow] - 是否在新窗口打开，默认为true
 */
// 在新窗口打开
ctx.ui.navigatePageTo({
  url: '/customer/list',
  isNewWindow: true
});

// 在当前窗口打开
ctx.ui.navigatePageTo({
  url: '/dashboard',
  isNewWindow: false
});
```

## 工具函数（util）✅

::: info 工具函数分类
工具函数分类提供了常用的辅助功能，如日志打印、定时器和数据检查等，帮助开发者进行调试和数据处理。
:::

### 函数

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 打印 log 信息 | `log(any)` | 控制台打印 log 信息 |
| 打印 warn 信息 | `warn(any)` | 控制台打印 warn 信息 |
| 打印 info 信息 | `info(any)` | 控制台打印 info 信息 |
| 打印 error 信息 | `error(any)` | 控制台打印 error 信息 |

**示例**：
```js
// 日志级别示例
ctx.util.log('普通日志信息');
ctx.util.info('提示信息');
ctx.util.warn('警告信息');
ctx.util.error('错误信息');

// 打印对象
ctx.util.log('用户数据:', {
  id: ctx.user.id,
  name: ctx.user.name,
  department: ctx.user.departmentName
});
```

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 支持 setTimeout 定时器 | `setTimeout(function, time)` | 支持 setTimeout 定时器 |
| 支持 setInterval 定时器 | `setInterval(function, time)` | 支持 setInterval 定时器 |

**示例**：
```js
// 延时执行
const timeoutId = ctx.util.setTimeout(() => {
  ctx.util.log('延时执行任务');
  ctx.ui.showToast('success', '任务已完成');
}, 1000);

// 定时执行
const intervalId = ctx.util.setInterval(() => {
  ctx.util.log('定时执行任务');
  refreshData();
}, 5000);

// 清除定时器
ctx.util.setTimeout(() => {
  // 停止定时刷新
  clearInterval(intervalId);
  ctx.util.log('已停止定时刷新');
}, 30000);
```

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 是否为空 | `isEmpty(any)` | 判断目标是否为空，可传入基本类型、数组或对象 |

**示例**：
```js
// 空值判断
function processData(data) {
  if (ctx.util.isEmpty(data)) {
    ctx.ui.showToast('warning', '没有数据可处理');
    return;
  }
  
  // 处理数据...
}

// 各类型判断示例
ctx.util.isEmpty({}); // 返回 true
ctx.util.isEmpty([]); // 返回 true
ctx.util.isEmpty(''); // 返回 true
ctx.util.isEmpty(null); // 返回 true
ctx.util.isEmpty(undefined); // 返回 true
ctx.util.isEmpty('text'); // 返回 false
ctx.util.isEmpty([1, 2]); // 返回 false
ctx.util.isEmpty({name: 'test'}); // 返回 false
```

## 接口（api）⚠️

::: info 接口分类
接口分类提供了与后端服务交互的能力，包括表单操作和服务端请求等，使开发者能够轻松实现数据交互和业务流程。
:::

::: warning 注意事项
接口部分标记为⚠️是因为这些API在某些环境下可能受到限制，或者需要特定的权限才能调用。在使用前请确保已经获得了相应的访问权限，并在开发过程中进行充分测试。
:::

### 函数

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 弹出新建表单 | `openCreateForm(xObjectName, busiType, defaultValues)` | 打开一个新建数据的表单 |

**参数说明**：
```js
/**
 * 弹出新建表单
 * @param {string} xObjectName - 对象的API名称
 * @param {string} busiType - 业务类型的apiKey
 * @param {Object} defaultValues - 字段默认值（仅支持设置出现在布局上的字段）
 */
// 基本用法
ctx.api.openCreateForm('customer', 'default', {
  name: '新客户',
  type: 'potential'
});

// 带更多默认值
ctx.api.openCreateForm('opportunity', 'default', {
  name: '新销售机会',
  customer: 'customer_001',
  expectedAmount: 10000,
  stage: 'initial',
  source: 'website'
});
```

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 弹出编辑表单 | `openEditForm(xObjectName, busiType, recordId)` | 打开编辑特定数据的表单 |

**参数说明**：
```js
/**
 * 弹出编辑表单
 * @param {string} xObjectName - 对象的API名称
 * @param {string} busiType - 业务类型的apiKey
 * @param {string} recordId - 记录的ID
 */
// 打开客户编辑表单
ctx.api.openEditForm('customer', 'default', 'customer_001');

// 打开销售机会编辑表单
ctx.api.openEditForm('opportunity', 'default', 'opportunity_001');
```

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 弹出复制表单 | `openCloneForm(xObjectName, recordId)` | 复制一条数据 |

**参数说明**：
```js
/**
 * 弹出复制表单
 * @param {string} xObjectName - 对象的API名称
 * @param {string} recordId - 记录的ID
 */
// 复制客户记录
ctx.api.openCloneForm('customer', 'customer_001');

// 复制销售机会记录
ctx.api.openCloneForm('opportunity', 'opportunity_001');
```

| 扩展点 | 函数签名 | 使用场景 |
|:------:|:--------:|:--------:|
| 发送服务端请求 | `request(options)` | 调用服务端接口（只允许调用开放的接口或自定义接口） |

**参数说明**：
```js
/**
 * 发送服务端请求
 * @param {Object} options - 请求配置
 * @param {string} options.url - 请求地址
 * @param {Object} [options.headers] - 请求头
 * @param {string} [options.method] - 请求方法，默认GET
 * @param {Object} [options.data] - 请求数据
 * @returns {Promise} 返回Promise对象
 */
// GET请求示例
ctx.api.request({
  url: '/api/customers'
}).then(response => {
  ctx.util.log('获取客户列表成功', response);
  renderCustomerList(response.data);
}).catch(error => {
  ctx.util.error('获取客户列表失败', error);
  ctx.ui.showToast('error', '数据加载失败');
});

// POST请求示例
ctx.api.request({
  url: '/api/customers',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    name: '新客户',
    industry: '科技',
    level: 'A'
  }
}).then(response => {
  ctx.util.log('创建客户成功', response);
  ctx.ui.showToast('success', '客户创建成功');
}).catch(error => {
  ctx.util.error('创建客户失败', error);
  ctx.ui.showToast('error', '客户创建失败');
});
```

<style>
.ctx-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}
.update-badge {
  background-color: #646cff;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
}
.features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}
table {
  margin: 1.5rem 0;
}
table th, table td {
  text-align: center !important;
}

</style>



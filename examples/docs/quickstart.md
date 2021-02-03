## 快速上手

本节将介绍如何在项目中使用 ceilUI。

### 引入 ceilUI

你可以引入整个 ceilUI，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 ceilUI。

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import CielUI from 'ciel-ui';
import App from './App.vue';

Vue.use(CielUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```


#### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

接下来，如果你只希望引入部分组件，比如 testButton，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import { testButton } from 'ciel-ui';
import App from './App.vue';

Vue.component(testButton.name, testButton);
/* 或写为
 * Vue.use(testButton)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

完整组件列表和引入方式（完整组件列表以 [components.json](https://github.com/ElemeFE/ceilUI/blob/master/components.json) 为准）

```javascript
import Vue from 'vue';
import {
  testButton
} from 'ciel-ui';

Vue.use(testButton);

```

### 全局配置

完整引入 ceilUI：

```js
import Vue from 'vue';
import cielUI from 'ciel-ui';
Vue.use(cielUI);
```

按需引入 ceilUI：

```js
import Vue from 'vue';
import { testButton } from 'ciel-ui';

Vue.use(testButton);
```

### 设置主题色
在App.vue中mounted：

```js
document.body.style.setProperty('--maincolor', '${你需要的颜色}');
```


### 开始使用

至此，一个基于 Vue 和 ceilUI 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。


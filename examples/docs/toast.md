## Toast 提示
将介绍如何在项目中使用 toast。

### 引入
需要单独引入
```javascript
import {Toast} from 'ciel-ui';

// 挂载到vue上面
Vue.prototype.$toast = Toast;

```

### 基本用法
基础的提示用法。

Toast 组件提供四种提示状态 如： 成功提示、警告提示、错误提示、普通提示
```javascript
// showsucc，showwarn，showerror，showmsg接受的都是两个参数，第一个为信息展示，第二个为展示的时间数,时间数默认为 200
this.$toast.showsucc('成功信息',1000);
this.$toast.showwarn('警告信息',1000);
this.$toast.showerror('错误信息',1000);
this.$toast.showmsg('普通信息',1000);

```
您可以点击不同按钮体验不同效果
:::demo
```html
<template>
	<div>
		<ciel-button type="success" @click="clickSuccBtn">点我-成功</ciel-button>
		<ciel-button type="warning" @click="clickWarnBtn">点我-警告</ciel-button>
		<ciel-button type="danger" @click="clickErrorBtn">点我-错误</ciel-button>
		<ciel-button @click="clickMsgBtn">点我-普通</ciel-button>
	</div>
</template>
<script>
export default {
	methods:{
		clickSuccBtn() {
			this.$toast.showsucc('成功信息',1000);
		},
		clickWarnBtn() {
			this.$toast.showwarn('警告信息',1000);
		},
		clickErrorBtn() {
			this.$toast.showerror('错误信息',1000);
		},
		clickMsgBtn() {
			this.$toast.showmsg('普通信息');
		}
	}
};
</script>

```
:::

### 高级用法
多用于ajax异步请求交互，搭配loading使用

```javascript
// 生命一个msgView对象
let msgview = this.$toast.showloading('加载中');
// 异步请求结束后调用
// hide 方法 默认是 马上隐藏，您也可以在里面回调方法，意味着toast隐藏后便可以回调
msgview.msgsucc('成功信息').hide(); 
msgview.msgerror('错误信息').hide(); 
msgview.msgwarn('警告信息').hide(); 
msgview.msgsucc('加载成功').hide(() => {
	alert('试试');
});


```

您可以点击以下按钮来体验加载效果

:::demo
```html
<template>
	<div>
		<ciel-button type="primary" @click="clickLoading">点我加载</ciel-button>
	</div>
</template>
<script>
export default {
	methods:{
		clickLoading() {
			let msgview = this.$toast.showloading('加载中');
			setTimeout(() => {
				// msgview.msgsucc('加载成功').hide(() => {
				//alert('试试');
				//}); // 回调可这样子使用
				msgview.msgsucc('加载成功').hide();
			},1000)
		}
	}
};
</script>

```
:::





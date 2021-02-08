## Filterselect 过滤选择
通过鼠标或键盘输入来控制选中，清除时可清除对应的item，而不是一段文字

### 基础用法

:::demo
```html
<template>
	<div class="demo-input">
		<ciel-filterselect v-model="selectIds" :options="options"></ciel-filterselect>
	</div>
</template>

<script>
export default {
  data() {
    return {
      selectIds: [],
	  options: [{
	  	label: '张三',
	  	id: 1
	  },
	  {
	  	label: '李四',
	  	id: 2
	  },
	  {
	  	label: '张国荣',
	  	id: 3
	  },{
	  	label: '徐兔子',
	  	id: 4
	  },
	  {
	  	label: '汤汤',
	  	id: 5
	  },
	  {
	  	label: '王五',
	  	id: 6
	  },{
	  	label: '章六六',
	  	id: 7
	  }]
    }
  }
}
</script>
```
:::

### 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件

:::demo
```html
<template>
	<div class="demo-input">
		<ciel-filterselect :disabled="true" v-model="selectIds" :options="options"></ciel-filterselect>
	</div>
</template>

<script>
export default {
  data() {
    return {
      selectIds: [1,3],
	  options: [{
	  	label: '张三',
	  	id: 1
	  },
	  {
	  	label: '李四',
	  	id: 2
	  },
	  {
	  	label: '张国荣',
	  	id: 3
	  },{
	  	label: '徐兔子',
	  	id: 4
	  },
	  {
	  	label: '汤汤',
	  	id: 5
	  },
	  {
	  	label: '王五',
	  	id: 6
	  },{
	  	label: '章六六',
	  	id: 7
	  }]
    }
  }
}
</script>
```
:::

### 清除选中

使用`show-clear`属性即可得到一个可清空的选中的输入框

:::demo
```html
<template>
	<div class="demo-input">
		<ciel-filterselect v-model="selectIds" :options="options" show-clear></ciel-filterselect>
	</div>
</template>

<script>
export default {
  data() {
    return {
      selectIds: [1,3],
	  options: [{
	  	label: '张三',
	  	id: 1
	  },
	  {
	  	label: '李四',
	  	id: 2
	  },
	  {
	  	label: '张国荣',
	  	id: 3
	  },{
	  	label: '徐兔子',
	  	id: 4
	  },
	  {
	  	label: '汤汤',
	  	id: 5
	  },
	  {
	  	label: '王五',
	  	id: 6
	  },{
	  	label: '章六六',
	  	id: 7
	  }]
    }
  }
}
</script>
```
:::

### 拼音过滤

使用`pin-yin`属性即可得到一个支持拼音过滤的输入框

:::demo
```html
<template>
	<div class="demo-input">
		<ciel-filterselect v-model="selectIds" :options="options" pin-yin></ciel-filterselect>
	</div>
</template>

<script>
export default {
  data() {
    return {
      selectIds: [],
	  options: [{
	  	label: '张三',
	  	id: 1
	  },
	  {
	  	label: '李四',
	  	id: 2
	  },
	  {
	  	label: '张国荣',
	  	id: 3
	  },{
	  	label: '徐兔子',
	  	id: 4
	  },
	  {
	  	label: '汤汤',
	  	id: 5
	  },
	  {
	  	label: '王五',
	  	id: 6
	  },{
	  	label: '章六六',
	  	id: 7
	  }]
    }
  }
}
</script>
```
:::

### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value / v-model | 绑定值           | Array  | — | — |
| options | 过滤列表           | Array  | — | — |
| placeholder   | 输入框占位文本    | string          | — | — |
| show-clear     | 是否可清空        | boolean         | — | false |
| disabled      | 是否禁用          | boolean         | — | false   |
| pin-yin | 支持拼音过滤 | boolean | — | false |

### Input Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| select | 选择发生改变时候促发 | (value: Array) |

## TimePicker 时间选择器
用于选择时间

### 基础用法
:::demo
```html
<template>
	<div style="width: 186px">
		<ciel-time-picker v-model="time"></ciel-time-picker>
	</div>
</template>

<script>
export default {
  data() {
    return {
      time: ''
    }
  }
}
</script>
```
:::

### 选择区间
指定 type类型为`timerange` 就可以得到一个选择区间的时间选择器
:::demo
```html
<template>
	<div style="width: 186px">
		<ciel-time-picker type="timerange" v-model="time"></ciel-time-picker>
	</div>
</template>

<script>
export default {
  data() {
    return {
      time: []
    }
  }
}
</script>
```
:::

### 不可选时间
可以使用 `disabled-hours` `disabled-minutes` `disabled-seconds` 组合禁止用户选择某个时间。
:::demo
```html
<template>
	<div style="width: 186px">
		<ciel-time-picker 
		:disabled-hours="disabledHours" 
		type="timerange"
		v-model="time"></ciel-time-picker>
	</div>
</template>

<script>
export default {
  data() {
    return {
      time: [],
	  disabledHours: ['05','08']
    }
  }
}
</script>
```
:::


### 禁用状态
通过 `disabled` 属性指定是否禁用 calendar 组件
:::demo
```html
<template>
	<div style="width: 186px">
		<ciel-time-picker 
		:disabled="true"
		v-model="time"></ciel-time-picker>
	</div>
</template>

<script>
export default {
  data() {
    return {
      time: '',
    }
  }
}
</script>
```
:::

### 清除选择
通过 `show-clear` 属性指定是否禁用组件
:::demo
```html
<template>
	<div style="width: 186px">
		<ciel-time-picker v-model="time" show-clear></ciel-time-picker>
	</div>
</template>

<script>
export default {
  data() {
    return {
      time: '',
    }
  }
}
</script>
```
:::

### 选择时分
组件浮层中的列会随着 format 变化，当略去 format 中的秒时，浮层中对应的列也会消失。
:::demo
```html
<template>
	<div style="width: 186px">
		<ciel-time-picker v-model="time" format-value="HH时mm分" show-clear></ciel-time-picker>
	</div>
</template>

<script>
export default {
  data() {
    return {
      time: '',
    }
  }
}
</script>
```
:::

### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value / v-model | 绑定值           | Array 或 String  | — | — |
| type   | 选择类型    | string          | time/timerange | time |
| placeholder   | 输入框占位文本    | string          | — | — |
| show-clear     | 是否可清空        | boolean         | — | false |
| disabled      | 是否禁用          | boolean         | — | false   |
| format-value      | 返回时间格式          | string         | HH:mm:ss/HH:mm/HH时mm分 | 'HH:mm:ss'   |
| rangeSeparator      | 选择区间时，中间间隔文案          | string         | - | '～'   |
| disabled-hours      | 选择时间-小时限制          | Array         | 如['00','02'] | []   |
| disabled-minutes     | 选择时间-分钟限制          | Array         | 如['00','02']| []   |
| disabled-seconds     | 选择时间-秒限制          | Array         | 如['00','02']| []   |
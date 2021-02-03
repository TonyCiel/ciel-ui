## Calendar日期选择器
用于选择日期

### 基础用法
:::demo
```html
<template>
	<div class="demo-input">
		<ciel-calendar v-model="date"></ciel-calendar>
	</div>
</template>

<script>
export default {
  data() {
    return {
      date: ''
    }
  }
}
</script>
```
:::

### 类型选择
通过 `type` 属性指定类型，具有`date`基础日期选择,`dateRange`日期区间选择,`dateMultiple`日期多选，三种类型
:::demo
```html
<template>
	<div class="demo-input">
		<ciel-calendar v-model="date"></ciel-calendar>
	</div>
	<div class="demo-calendar">
		<ciel-calendar type="dateRange" v-model="date1"></ciel-calendar>
	</div>
	<div class="demo-calendar">
		<ciel-calendar type="dateMultiple" v-model="date2"></ciel-calendar>
	</div>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      date1: [],
      date2: []
    }
  }
}
</script>
```
:::

### 时间限制
通过 `limit-start` 属性指定可选开始时间限制，通过 `limit-end` 属性指定可选结束时间限制
:::demo
```html
<template>
	<div class="demo-input">
		<ciel-calendar limit-start="2021-02-20" limit-end="2021-02-28" v-model="date1"></ciel-calendar>
	</div>
</template>

<script>
export default {
  data() {
    return {
      date1: [],
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
	<div class="demo-input">
		<ciel-calendar :disabled="true" v-model="date"></ciel-calendar>
	</div>
</template>

<script>
export default {
  data() {
    return {
      date: '2021-11-21'
    }
  }
}
</script>
```
:::

### 清除状态
使用`show-clear`属性即可得到一个可清空的选中的calendar选择框
:::demo
```html
<template>
	<div class="demo-input">
		<ciel-calendar v-model="date" show-clear></ciel-calendar>
	</div>
</template>

<script>
export default {
  data() {
    return {
      date: '2021-11-21'
    }
  }
}
</script>
```
:::

###  日期格式

使用`format`指定绑定值的格式

:::warning
请注意大小写
:::

| 格式 | 含义 | 备注 | 举例 |
|------|------|------|------|------|
| `yyyy` | 年 | | 2017 |
| `M`  | 月 | 不补0 | 1 |
| `MM` | 月 | | 01 |
| `W`  | 周 | 仅周选择器的 `format` 可用；不补0 | 1 |
| `WW` | 周 | 仅周选择器的 `format` 可用 | 01 |
| `d`  | 日 | 不补0 | 2 |
| `dd` | 日 | | 02 |
| `H`  | 小时 | 24小时制；不补0 | 3 |
| `HH` | 小时 | 24小时制 | 03 |
| `h`  | 小时 | 12小时制，须和 `A` 或 `a` 使用；不补0 | 3 |
| `hh` | 小时 | 12小时制，须和 `A` 或 `a` 使用 | 03 |
| `m`  | 分钟 | 不补0 | 4 |
| `mm` | 分钟 | | 04 |
| `s`  | 秒 | 不补0 | 5 |
| `ss` | 秒 | | 05 |

### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value / v-model | 绑定值           | Array 或 String  | — | — |
| type   | 选择类型    | string          | date/dateRange/dateMultiple | 'date' |
| max | 日历显示个数           | Number  | — | date类型默认显示1个，其他类型默认显示2个 |
| placeholder   | 输入框占位文本    | string          | — | — |
| show-clear     | 是否可清空        | boolean         | — | false |
| disabled      | 是否禁用          | boolean         | — | false   |
| format      | 返回时间格式          | string         | 如上 | 'yyyy-MM-dd'   |
| rangeSeparator      | 选择区间时，中间间隔文案          | string         | - | '～'   |
| limitStart      | 选择时间-开始时间限制          | string         | 任何'yyyy-MM-dd'格式的时间 | -   |
| limitEnd     | 选择时间-结束时间限制          | string         | 任何'yyyy-MM-dd'格式的时间| -   |



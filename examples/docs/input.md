## Input 输入框
通过鼠标或键盘输入字符

:::demo
```html
<template>
	<div class="demo-input">
		<ciel-input v-model="input" placeholder="请输入内容"></ciel-input>
	</div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
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
		<ciel-input
		  placeholder="请输入内容"
		  v-model="input"
		  :disabled="true">
		</ciel-input>
	</div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```
:::

### 清除内容

使用`show-clear`属性即可得到一个可清空的输入框
:::demo
```html
<template>
	<div class="demo-input">
		<ciel-input
		  placeholder="请输入内容"
		  v-model="input"
		  show-clear>
		</ciel-input>
	</div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```
:::

### 密码框
使用`show-password`属性即可得到一个可切换显示隐藏的密码框
:::demo
```html
<template>
	<div class="demo-input">
		<ciel-input
		  placeholder="请输入内容"
		  v-model="input"
		  show-password>
		</ciel-input>
	</div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```
:::

### 带 icon 的输入框

带有图标标记输入类型,可以通过 `prefix-icon` 和 `suffix-icon` 属性在 input 组件首部和尾部增加显示图标
:::demo
```html
<template>
	<section class="demo-input-list">
	  <div class="demo-input">
	    <ciel-input placeholder="请输入日期" prefix-icon="ciel-icon-calendar" v-model="inputDate"></ciel-input>
	  </div>
	  <div class="demo-input">
	    <ciel-input placeholder="请输入搜索内容" suffix-icon="ciel-icon-search" v-model="inputSearch"></ciel-input>
	  </div>
	</section>
</template>

<script>
export default {
  data() {
    return {
      inputDate: '',
      inputSearch: ''
    }
  }
}
</script>
```
:::

### 标签型输入框
可前置或后置标签

:::demo
```html
<template>
    <ciel-input placeholder="请输入内容" v-model="input1">
	  <template slot="append">.com</template>
    </ciel-input>
    <ciel-input class="demo-ciel-input" placeholder="请输入内容" v-model="input2">
	  <template slot="prepend">Http://</template>
    </ciel-input>	
</template>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: ''
    }
  }
}
</script>
```
:::

### 输入长度限制
`maxlength` 和 `minlength` 是原生属性，用来限制输入框的字符长度
`show-word-limit` 来显示当前输入数量
:::demo
```html
<template>
	<div class="demo-input">
		<ciel-input maxlength="8" v-model="input" placeholder="请输入内容" show-word-limit></ciel-input>
	</div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```
:::

### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text |
| value / v-model | 绑定值           | string / number  | — | — |
| maxlength     | 原生属性，最大输入长度      | number          |  —  | — |
| minlength     | 原生属性，最小输入长度      | number          | — | — |
| show-word-limit | 是否显示输入字数统计 | boolean    |  —  | false |
| placeholder   | 输入框占位文本    | string          | — | — |
| show-clear     | 是否可清空        | boolean         | — | false |
| show-password | 是否显示切换密码图标| boolean         | — | false |
| disabled      | 是否禁用          | boolean         | — | false   |
| prefix-icon   | 输入框头部图标    | string          | — | — |
| suffix-icon   | 输入框尾部图标    | string          | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| allow-search | 可搜索 或 过滤回调 | boolean | — | false |

### Input Slots
| name | 说明 |
|------|--------|
| prepend | 输入框前置内容 |
| append | 输入框后置内容|

### Input Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (value: string \| number) |
| input | 在 Input 值改变时触发 | (value: string \| number) |
| clear | 在点击由 `show-clear` 属性生成的清空按钮时触发 | — |
| search |  `allow-search` 属性为true可生效 |(value: string \| number) |









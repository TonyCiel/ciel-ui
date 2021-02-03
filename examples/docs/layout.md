## Layout 布局
通过基础的 24 分栏，迅速简便地创建布局。

### 基础布局
使用单一分栏创建基础的栅格布局。

通过 row 和 col 组件，并通过 col 组件的 span 属性我们就可以自由地组合布局。

:::demo
```html
<template>
  <div>
  	<ciel-row>
  		<ciel-col :span="24"><section class="grid-content bg-purple-dark"></section></ciel-col>
  	</ciel-row>
	<ciel-row>
		<ciel-col :span="8"><section class="grid-content bg-purple-dark"></section></ciel-col>
		<ciel-col :span="8"><section class="grid-content bg-purple"></section></ciel-col>
		<ciel-col :span="8"><section class="grid-content bg-purple-dark"></section></ciel-col>
	</ciel-row>
	<ciel-row>
		<ciel-col :span="6"><section class="grid-content bg-purple-dark"></section></ciel-col>
		<ciel-col :span="6"><section class="grid-content bg-purple"></section></ciel-col>
		<ciel-col :span="6"><section class="grid-content bg-purple-dark"></section></ciel-col>
		<ciel-col :span="6"><section class="grid-content bg-purple"></section></ciel-col>
	</ciel-row>
  </div>
</template>
<style scoped>
.grid-content {
	min-height: 36px;
	width: 100%;
	border-radius: 3px;
}
.bg-purple-dark {
	background: #99a9bf;
}
.bg-purple {
	background: #d3dce6;
}
  
</style>
```
:::

###  分栏间隔
分栏之间存在间隔。

Row 组件 提供 gutter 属性来指定每一栏之间的间隔，默认间隔为 0。

:::demo
```html
<template>
  <div>
  	<ciel-row :gutter="20">
  		<ciel-col :span="8"><section class="grid-content bg-purple-dark"></section></ciel-col>
  		<ciel-col :span="12"><section class="grid-content bg-purple"></section></ciel-col>
  		<ciel-col :span="4"><section class="grid-content bg-purple-dark"></section></ciel-col>
  	</ciel-row>
	<ciel-row :gutter="20">
		<ciel-col :span="8"><section class="grid-content bg-purple-dark"></section></ciel-col>
		<ciel-col :span="8"><section class="grid-content bg-purple"></section></ciel-col>
		<ciel-col :span="8"><section class="grid-content bg-purple-dark"></section></ciel-col>
	</ciel-row>
  </div>
</template>
<style>
.grid-content {
	min-height: 36px;
	width: 100%;
	border-radius: 3px;
}
.bg-purple-dark {
	background: #99a9bf;
}
.bg-purple {
	background: #d3dce6;
}
  
</style>
```
:::

###  对齐方式
通过 flex 布局来对分栏进行灵活的对齐。

 将 type 属性赋值为 'flex'，可以启用 flex 布局，并可通过 justify 属性来指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式。
 可以通过 align 属性来指定 top/middle/bottom flex 布局下的垂直排列方式

:::demo
```html
<template>
  <div>
  	<ciel-row class="ciel-row--bg" type="flex" justify="center" align="center">
  		<ciel-col :span="8"><section class="grid-content bg-purple-dark"></section></ciel-col>
  		<ciel-col :span="8"><section class="grid-content bg-purple"></section></ciel-col>
  	</ciel-row>
	
	<ciel-row class="ciel-row--bg" type="flex" justify="start" align="center">
		<ciel-col :span="8"><section class="grid-content bg-purple-dark"></section></ciel-col>
		<ciel-col :span="8"><section class="grid-content bg-purple"></section></ciel-col>
	</ciel-row>
  </div>
</template>
<style>
.ciel-row--bg {
	background-color: #F7F7F7;
	min-height: 50px;
}
.grid-content {
	min-height: 36px;
	width: 100%;
	border-radius: 3px;
}
.bg-purple-dark {
	background: #99a9bf;
}
.bg-purple {
	background: #d3dce6;
}
  
</style>
```
:::

### Row Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| gutter | 栅格间隔 | number | — | 0 |
| type | 布局模式，可选 flex，现代浏览器下有效 | string | — | — |
| justify | flex 布局下的水平排列方式 | string | start/end/center/space-around/space-between | start |
| align | flex 布局下的垂直排列方式 | string | top/middle/bottom | top |


### Col Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| span | 栅格占据的列数 | number | — | 24 |

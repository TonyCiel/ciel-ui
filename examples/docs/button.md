## Button 按钮
常用的操作按钮。

### 基本用法
基础的按钮用法。

Button 组件提供六种主题，由'type'属性指定，默认值为'default'。
:::demo
```html
<template>
	<div>
		<ciel-row>
			<ciel-button>默认按钮</ciel-button>
			<ciel-button type="primary">普通按钮</ciel-button>
			<ciel-button type="success">成功按钮</ciel-button>
			<ciel-button type="info">信息按钮</ciel-button>
			<ciel-button type="warning">警告按钮</ciel-button>
			<ciel-button type="danger">危险按钮</ciel-button>
		</ciel-row>
		
		<ciel-row>
			<ciel-button round="24">默认按钮</ciel-button>
			<ciel-button round="24" type="primary">普通按钮</ciel-button>
			<ciel-button round="24" type="success">成功按钮</ciel-button>
			<ciel-button round="24" type="info">信息按钮</ciel-button>
			<ciel-button round="24" type="warning">警告按钮</ciel-button>
			<ciel-button round="24" type="danger">危险按钮</ciel-button>
		</ciel-row>
		
	</div>
</template>

```
:::

### 不同尺寸
Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。。

:::demo
```html
<template>
  <div>
  	<ciel-button size="medium">中等按钮</ciel-button>
  	<ciel-button size="small">小的按钮</ciel-button>
  	<ciel-button size="mini">迷你按钮</ciel-button>
  </div>
</template>
```
:::


### 加载中
点击按钮后进行数据加载操作，在按钮上显示加载状态。

要设置为 loading 状态，只要设置loading属性为true即可。
:::demo
```html
<template>
  <div>
  	<ciel-button type="primary" :loading="true">加载中</ciel-button>
  </div>
</template>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type     | 主题           | string | default/primary/success/info/warning/danger | default |
| loading     | 是否显示加载图标   | Boolean | true/false | false |
| disabled     | 是否可用   | Boolean | true/false | false |
| round     |  圆角幅度  | Number/String |  | 4 |
| size     |  大小  | String | mini/small/medium |  |
| icon     |  图标  | String | 参照icon图标库 |  |
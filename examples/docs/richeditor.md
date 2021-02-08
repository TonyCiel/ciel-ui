## RichEditor Mentions提及富文本编辑器

### 基础用法

直接引入并绑定一个值使用

:::demo
```html
<template>
	<div>
		<ceil-rich-editor v-model="content" ></ceil-rich-editor>
	</div>
</template>

<script>
export default {
  data() {
    return {
	  content: ''
	}
  }
}
</script>
```
:::

### 禁用状态

通过 `disabled` 属性指定是否禁用 RichEditor 组件

:::demo
```html
<template>
	<div>
		<ceil-rich-editor :disabled="true" v-model="content" ></ceil-rich-editor>
	</div>
</template>

<script>
export default {
  data() {
    return {
	  content: ''
	}
  }
}
</script>
```
:::

### Mentions提及功能

用于艾特某人使用，多用于评论，使用`enable-mentions`开启提及功能；
回调`remainchange`方法可获取得到艾特的人物

按`esc`键可退出提及弹框,支持拼音过滤,输入@即可生效

:::demo
```html
<template>
	<div>
		<ceil-rich-editor 
		:remindlist="remindList"
		@remainchange="usedlist = $event" 
		v-model="content" 
		enable-mentions></ceil-rich-editor>
	</div>
</template>

<script>
export default {
  data() {
    return {
	  content: '',
	  usedlist: [],
	  remindList: [{
		  name: '张三',
		  id: 1
	  },{
	  	  name: '李四',
	  	  id: 2
	  },{
		  name: '兔子',
		  id: 3
	  },{
		  name: '兔子1',
		  id: 4
	  },{
		  name: '兔子2',
		  id: 5
	  },{
		  name: '兔子3',
		  id: 6
	  },{
		  name: '兔子4',
		  id: 7
	  }]
	}
  }
}
</script>
```
:::

### 开启全屏

使用`enable-full-screen`得到一个可以全屏输入的富文本编辑器；

:::demo
```html
<template>
	<div>
		<ceil-rich-editor v-model="content" enable-full-screen></ceil-rich-editor>
	</div>
</template>

<script>
export default {
  data() {
    return {
	  content: ''
	}
  }
}
</script>
```
:::

### 支持图片上传

使用`enable-up-load-img`得到一个可以上传图片的富文本编辑器；

:::demo
```html
<template>
	<div>
		<ceil-rich-editor 
		v-model="content" 
		enable-up-load-img 
		@uploadimg="uploadImg"></ceil-rich-editor>
	</div>
</template>

<script>
export default {
  data() {
    return {
      content: ''
    }
  },
  methods: {
      uploadImg(e, ref) {
        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        var fromData = new FormData();
        fromData.append('bBanner',e);
        this.$ajax
          .post('/api/business/uploadimg', fromData, config)
          .then(res => {
            let data = res.data;
            if (data.isok) {
              ref.insertImgLink(data.url);
           }
        });
     }
  }
}
</script>
```
:::

### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value / v-model | 绑定值           | String  | — | — |
| height | 设定高度，仅初始值有效           | String  | — | 200px |
| enable-up-load-img   | 是否允许上传图片，需要监听uploadimg事件，仅初始值有效    | boolean          | -| false |
| enable-mentions     | 是否支持 提及功能        | boolean         | — | false |
| enable-full-screen      | 是否支持全屏输入功能          | boolean         | — | false   |
| disabled | 禁用状态 | boolean | — | false |

### Input Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| ready | 编辑器初始化完成 | 编辑器对象 |
| change | 内容改变 | value |
| remainchange | enable-mentions开启时回调 | Array数组 |
| uploadimg | 上传图片回调 | file对象与编辑器对象 |


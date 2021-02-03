## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `ciel-icon-iconName` 来使用即可。例如：

:::demo
```html
  <template>
    <div class="icon-list">
      <i class="ciel-icon-edit"></i>
      <i class="ciel-icon-share"></i>
      <i class="ciel-icon-delete"></i>
      <ciel-button icon="ciel-icon-search" type="primary">搜索</ciel-button>
    </div>
  </template>

```
:::

### 图标集合

<ul class="icon-list-wrap">
  <li v-for="item in $icon" :key="item.id">
    <span>
      <i :class="'ciel-icon-' + item.font_class"></i>
      <span class="icon-name">{{'ciel-icon-' + item.font_class}}</span>
    </span>
  </li>
</ul>

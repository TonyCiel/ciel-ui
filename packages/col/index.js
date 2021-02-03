import col from './src/main.vue'
 
// 为组件提供 install 安装方法，供按需引入
col.install = function (Vue) {
 Vue.component(col.name, col)
}
// 默认导出组件
export default col

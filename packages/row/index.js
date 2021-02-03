import row from './src/main.vue'
 
// 为组件提供 install 安装方法，供按需引入
row.install = function (Vue) {
 Vue.component(row.name, row)
}
// 默认导出组件
export default row

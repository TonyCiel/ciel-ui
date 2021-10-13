import select from './src/main.vue'
 
// 为组件提供 install 安装方法，供按需引入
select.install = function (Vue) {
 Vue.component(select.name, select)
}
// 默认导出组件
export default select

import filterselect from './src/main.vue'
 
// 为组件提供 install 安装方法，供按需引入
filterselect.install = function (Vue) {
 Vue.component(cielFilterselect.name, filterselect)
}
// 默认导出组件
export default filterselect
import option from '../select/src/option.vue'
 
// 为组件提供 install 安装方法，供按需引入
option.install = function (Vue) {
 Vue.component(option.name, option)
}
// 默认导出组件
export default option

import input from './src/main.vue'
 
// 为组件提供 install 安装方法，供按需引入
input.install = function (Vue) {
 Vue.component(input.name, input)
}
// 默认导出组件
export default input

import testButton from './src/main.vue'
 
// 为组件提供 install 安装方法，供按需引入
testButton.install = function (Vue) {
 Vue.component(testButton.name, testButton)
}
// 默认导出组件
export default testButton

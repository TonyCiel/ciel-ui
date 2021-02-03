import testText from './src/main.vue'
 
// 为组件提供 install 安装方法，供按需引入
testText.install = function (Vue) {
 Vue.component(testText.name, testText)
}
// 默认导出组件
export default testText

import Vue from 'vue'
import App from './App.vue'
import routes from './route.config.js';
import VueRouter from 'vue-router';
import demoBlock from './components/demo-block.vue'
import cielUi from '../src/index.js';
import './assets/demo-styles/index.css';
import icons from './assets/icon/iconfont.json'; 
import hljs from 'highlight.js';
import tool from './utils/tool.js';
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(cielUi);
Vue.component('demo-block', demoBlock);
Vue.prototype.$icon = icons.glyphs;
Vue.prototype.$tool = tool;
Vue.prototype.$ajax = axios;

let router = new VueRouter({
	scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
    // return 期望滚动到哪个的位置
  },
	routes
});
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();
});
router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  
});
new Vue({
  render: h => h(App),
	router
}).$mount('#app')

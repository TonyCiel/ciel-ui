// 路由
import Vue from 'vue'
import navConfig from './nav.config.json';

let routes = [];
if (navConfig.routeconfig) {
	navConfig.routeconfig.forEach(item => {
		if (item.children) {
			item.children.forEach(route => {
				if (route.type != "doc") {
					route.component = r => require.ensure([], () =>
						r(require(`./pages/${route.name}.vue`)))
					routes.push(route);
					return;
				}
				route.component = r => require.ensure([], () =>
					r(require(`./docs/${route.name}.md`)))
				routes.push(route);
			})
		}
	})
}
let shiftRoute = {
	name: "installation",
	path: "/",
	title: "安装",
	type: "doc",
}
shiftRoute.component = r => require.ensure([], () =>
					r(require(`./docs/installation.md`)))
routes.unshift(shiftRoute)

export default routes;

// navConfig.routeconfig.forEach()

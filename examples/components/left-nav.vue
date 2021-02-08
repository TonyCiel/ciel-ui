<template>
	<div class="nav wt-scroll">
		<nav class="nav-item" v-show="isDev ? true : !item.isTest" v-for="(item, index) in routeList" :key="index">
			<p class="nav-item-name">{{ item.name }}</p>
			<ul class="nav-item-children">
				<li @click="selectItem(route)" v-for="route in item.children" :class="{ 'nav-item-check': $route.name == route.name }" :key="route.title">
					{{ route.title }}
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import navConfig from '../nav.config.json';
export default {
	name: 'left-nav',
	data() {
		return {
			routeList: navConfig.routeconfig,
			isCheck: this.$route.name,
			isDev: process.env.NODE_ENV == 'development' ? true : false, // 是否是测试环境
		};
	},
	methods: {
		selectItem(route) {
			if(this.$route.name == route.name) {
				return;
			}
			this.$emit('change');
			this.$router.push(route.path);
		}
	},
	mounted() {
		console.log(this.routeList);
	}
};
</script>

<style scoped="scoped">
.nav {
	height: calc(100vh - 120px);
	width: 18vw;
	margin-left: 40px;
	border-right: 1px solid #ececec;
	margin: 30px;
}
.nav-item-name {
	color: #8dabc4;
    font-size: 12px;
	line-height: 40px;
	height: 40px;
	margin: 0;
	padding: 0;
	text-decoration: none;
	display: block;
	position: relative;
	transition: 0.15s ease-out;
	font-weight: 700;
}
.nav-item-children {
	list-style: none;
	padding-left: 6px;
	margin: 0;
}
.nav-item-children > li {
	display: block;
	height: 40px;
	color: #444;
	line-height: 40px;
	font-size: 14px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-weight: 400;
	cursor: pointer;
}
.nav-item-children > li:hover {
	color: #409eff;
}
.nav-item-check {
	color: #409eff !important;
}
</style>

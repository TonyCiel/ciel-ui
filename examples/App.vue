<template>
	<div id="app">
		<section class="app-main">
			<left-nav @change="scrollContent"></left-nav>
			<div class="app-content wt-scroll" id="mAppContent"><router-view></router-view></div>
		</section>
	</div>
</template>

<script>
import LeftNav from './components/left-nav.vue';
export default {
	name: 'App',
	components: {
		LeftNav
	},
	mounted() {
		document.body.style.setProperty('--maincolor', '#409eff');
	},
	methods: {
		scrollContent() {
			let el = document.getElementById('mAppContent');
			el.scrollTop = 0;
		},
	}
};
</script>

<style>
@import url('./assets/styles/common.css');
@import url('assets/styles/app.css');
#app {
	background-color: #f8faff;
	padding: 2vw;
	box-sizing: border-box;
	overflow-y: hidden;
}
body {
	margin: 0;
}
.app-content {
	margin-left: 3vw;
	padding-top: 3vw;
	height: calc(100vh - 120px);
	box-sizing: content-box;
	overflow-y: auto;
	flex: 1;
	padding-left: 10px;
}
.app-main {
	background-color: white;
	display: flex;
	box-shadow: 0px 4px 2vw 0px #dadada;
	/* box-shadow: 0px 4px 2vw 0px rgb(223 225 230  50%); */
	/* align-items: center;*/
}
</style>

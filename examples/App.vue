<template>
	<div id="app">
		<section class="app-main">
			<left-nav @change="scrollContent"></left-nav>
			<div @scroll="pageScroll" class="app-content wt-scroll" id="mAppContent"><router-view></router-view></div>
		</section>
		<div @click="scrollContent" v-show="isshowBack" class="app-backtop"><i class="ciel-icon-delta_up"></i></div>

	</div>
</template>

<script>
import LeftNav from './components/left-nav.vue';
export default {
	name: 'App',
	components: {
		LeftNav
	},
	data() {
		return {
			isshowBack: false
		}
	},
	mounted() {
		// 	用了以前写的商家接口
		this.$ajax.get('/api/business/login', {
			params: {
				name: 'manager',
				username: 'manager',
				password: '123456'
			}
		});
		document.body.style.setProperty('--maincolor', '#409eff');
	},
	methods: {
		scrollContent() {
			let el = document.getElementById('mAppContent');
			el.scrollTop = 0;
		},
		pageScroll(e) {
			let top = e.target.scrollTop;
			this.isshowBack = top > 400 ?  true : false;
		}
	}
};
</script>

<style>
@import url('./assets/styles/common.css');
@import url('assets/styles/app.css');
#app {
	background-color: #f8faff;
	padding: 1vw;
	box-sizing: border-box;
	overflow-y: hidden;
}
body {
	margin: 0;
}
.app-content {
	margin-left: 3vw;
	padding-top: 3vw;
	height: calc(100vh - 5vw);
	box-sizing: content-box;
	overflow-y: auto;
	flex: 1;
	padding-left: 10px;
}
.app-backtop {
	position: fixed;
    background-color: #fff;
    width: 50px;
    height: 50px;
	text-align: center;
    border-radius: 50%;
    color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0px 4px 2vw 0px #dadada;
    cursor: pointer;
	bottom: 5vw;
	right: 5vw;
    z-index: 5;
}
.app-backtop:hover {
	background-color: #f1f6fd;
}

.app-main {
	background-color: white;
	display: flex;
	box-shadow: 0px 4px 2vw 0px #dadada;
	/* box-shadow: 0px 4px 2vw 0px rgb(223 225 230  50%); */
	/* align-items: center;*/
}
</style>
<style scoped="scoped">
	.ciel-icon-delta_up {
		font-size: 26px;
		margin-right: 0px;
	}
</style>

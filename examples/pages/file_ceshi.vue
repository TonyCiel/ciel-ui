<template>
	<div>
		<!-- <ceil-rich-editor :remindlist="remindlist" v-model="content" enable-up-load-img @uploadimg="uploadImg"></ceil-rich-editor>
		<!-- <ciel-time-picker type="timerange" v-model="time" show-clear></ciel-time-picker> -->
		<button @click="ceshi">111</button> -->
	</div>
</template>

<script>
// 用来测试组件的文件
export default {
	name: 'file_ceshi',
	data() {
		return {

		};
	},
	methods: {
		ceshi() {
			console.log(this.content);
		},
	},
	mounted() {
		// setTimeout(() => {
		// 	this.list = ['2021-02-11','2021-02-15'];
		// },5000)
	}
};
</script>

<style scoped="scoped">
.ciel-row {
	background-color: #f7f7f7;
	min-height: 50px;
}
.bg-purple-dark {
	min-height: 36px;
	background: #99a9bf;
	width: 100%;
	border-radius: 3px;
}
</style>

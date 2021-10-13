<template>
	<div style="width: 300px;">
		<ciel-select v-model="selectId" filterable   placeholder="请选择">
			<ciel-option :disabled="item.disabled" v-for="(item) in options" :value="item.id" :label="item.label" :key="item.value"></ciel-option>
		</ciel-select>
		<button @click="ceshi">111</button>
	</div>
</template>

<script>
// 用来测试组件的文件
export default {
	name: 'file_ceshi',
	data() {
		return {
			selectId: '',
			options: [{
				label: '琳琳一',
				id: 0
			},{
				label: '张三',
				id: 1
			},
			{
				label: '李四',
				id: 2
			},
			{
				label: '张国荣',
				id: 3
			},{
				label: '徐兔子',
				id: 4
			},
			{
				label: '汤汤',
				id: 5
			},
			{
				label: '王五',
				id: 6
			},{
				label: '章六六',
				id: 7
			}]
		};
	},
	methods: {
		ceshi() {
			console.log(this.selectId);
		},
	},
	mounted() {
		// setTimeout(() => {
		// 	this.selectId = 3;
		// 	// this.list = ['2021-02-11','2021-02-15'];
		// },60)
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

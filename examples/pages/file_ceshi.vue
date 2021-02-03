<template>
	<div>
		<!-- <ciel-input suffix-icon="ciel-icon-calendar" v-model="inputvalue" show-clear></ciel-input> -->
		<!-- <ciel-input @change="blurhh" @blur="blurhh" showWordLimit maxlength="10" prefix-icon="ciel-icon-calendar" v-model="inputvalue">
			
		</ciel-input> -->
		<div style="width: 300px"><ciel-calendar :max="3" type="dateMultiple" v-model="list" show-clear></ciel-calendar></div>
		<ciel-button @click="clickBtn">获取value</ciel-button>
		<!-- <div style="width: 200px;">
			<ciel-filterselect show-clear  v-model="selectIds" :options="options"></ciel-filterselect>
		</div>
		<ciel-button @click="clickBtn">hhhh</ciel-button> -->
		<!-- <ciel-row>
			<ciel-col :span="24"><section class="grid-content bg-purple-dark"></section></ciel-col>
		</ciel-row>
		
		<ciel-row type="flex" justify="center" align="center">
			<ciel-col :span="8"><section class="grid-content bg-purple-dark"></section></ciel-col>
			<ciel-col :span="8"><section style="background-color: #e5e9f2;" class="grid-content bg-purple-dark"></section></ciel-col>
		</ciel-row>

		<ciel-row :gutter="20">
			<ciel-col :span="8"><section class="grid-content bg-purple-dark"></section></ciel-col>
			<ciel-col :span="12"><section style="background-color: #e5e9f2;" class="grid-content bg-purple-dark"></section></ciel-col>
			<ciel-col :span="4"><section class="grid-content bg-purple-dark"></section></ciel-col>
		</ciel-row>
		<ciel-row :gutter="20">
			<ciel-col :span="6"><section class="grid-content bg-purple-dark"></section></ciel-col>
			<ciel-col :span="6"><section style="background-color: #e5e9f2;" class="grid-content bg-purple-dark"></section></ciel-col>
			<ciel-col :span="6"><section class="grid-content bg-purple-dark"></section></ciel-col>
			<ciel-col :span="6"><section style="background-color: #e5e9f2;" class="grid-content bg-purple-dark"></section></ciel-col>
		</ciel-row>
		<ciel-button @click="clickBtn">hhhh</ciel-button> -->
	</div>
</template>

<script>
// 用来测试组件的文件
export default {
	name: 'file_ceshi',
	data() {
		return {
			list: [],
			selectIds: [2,3],
			inputvalue: '',
			options: [{
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
		}
	},
	methods:{
		blurhh() {
			this.clickBtn()
		},
		clickBtn() {
			console.log(this.list)
			// let msgView = this.$toast.showloading('加载中');
			// setTimeout(() => {
			// 	msgView.msgerror('加载成功').hide();
			// },4000)
			// this.$toast.showsucc('错误信息',100000)
		}
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
		background-color: #F7F7F7;
		min-height: 50px;
		
	}
.bg-purple-dark {
	min-height: 36px;
	background: #99a9bf;
	width: 100%;
	border-radius: 3px;
}
</style>

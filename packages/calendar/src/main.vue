<template>
	<div class="ciel-calendar" ref="selectwrap">
		<ciel-input
			prefix-icon="ciel-icon-calendar"
			:placeholder="placeholder"
			:disabled="disabled"
			class="ciel-calendar__input"
			:value="dateshow"
			ref="inputBox"
			@focus="isshow = true"
			:show-clear="showClear"
			@clear="clearInput"
			@keydown="inputkeydown"
		></ciel-input>

		<section
			class="ciel-calendar__content"
			:class="{
				'ciel-calendar__content--active': isshow
			}"
			ref="pluginArea"
		>
			<div v-show="isshow"><calendar :max="maxNum" :limitstart="limitStart" :limitend="limitEnd" :type="type" v-model="selectDates"></calendar></div>
		</section>
	</div>
</template>

<script>
import calendar from './calendar.vue';
import '../../../examples/utils/timeutils.js';
import inputPopover from '../../../examples/mixins/inputPopover.js';
export default {
	name: 'cielCalendar',
	mixins: [inputPopover],
	components: {
		calendar
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: [String, Array]
		},
		max: Number,
		// 类型，date为单选，dateRange区间选择，dateMultiple,多选日期
		type: {
			type: String,
			default: 'date'
		},
		// 转化格式
		format: {
			type: String,
			default: 'yyyy-MM-dd'
		},
		rangeSeparator: {
			type: String,
			default: '～'
		},
		limitStart: String,
		limitEnd: String
	},
	data() {
		return {
			selectDates: [],
			rangeTimeStr: ''
		};
	},
	watch: {
		value(val) {
			this.setValue();
		},
		dateshow() {
			if (this.type == 'date') {
				let date = this.selectDates.length ? this.selectDates[0] : null;
				this.$emit('change', date ? new Date(date).format('yyyy-MM-dd') : '');
				return;
			}
			if (this.type == 'dateMultiple' || this.type == 'dateRange') {
				let list = this.selectDates.map(item => {
					return new Date(item).format('yyyy-MM-dd');
				});
				this.$emit('change', list);
			}
		},
		isshow(val) {
			if (!val && this.type === 'dateRange' && this.selectDates.length) {
				this.rangeTimeStr = `${new Date(this.selectDates[0]).format(this.format)}  ${this.rangeSeparator}  ${new Date(this.selectDates[1]).format(this.format)}`;
			}
		}
	},
	computed: {
		maxNum() {
			return this.max ? this.max : this.type === 'date' ? 1 : 2;
		},
		dateshow() {
			let str = '';
			let list = this.selectDates;
			if (this.type === 'date' && this.selectDates.length) {
				return new Date(this.selectDates[0]).format(this.format);
			}
			if (this.type === 'dateRange') {
				return this.rangeTimeStr;
			}
			if (this.type === 'dateMultiple') {
				list.forEach(item => {
					str = new Date(item).format(this.format) + ';' + str;
				});
				console.log('str', str);
				return str;
			}
			return str;
		}
	},
	methods: {
		setValue() {
			let val = this.value;
			if (typeof val === 'string') {
				this.selectDates = val ? [val] : [];
			} else {
				this.selectDates = val;
			}
			if (!this.isshow && this.type === 'dateRange' && this.selectDates.length) {
				this.rangeTimeStr = `${new Date(this.selectDates[0]).format(this.format)}  ${this.rangeSeparator}  ${new Date(this.selectDates[1]).format(this.format)}`;
			}
		},
		clearInput() {
			this.rangeTimeStr = '';
			this.selectDates = [];
		},
		getInput() {
			return this.$refs.inputBox.getInput();
		},
		inputkeydown(e) {
			e.preventDefault();
		}
	},
	mounted() {
		this.setValue();
	},
	
};
</script>

<style scoped="scoped">
@import url('../../../examples/assets/styles/calendar.css');
</style>

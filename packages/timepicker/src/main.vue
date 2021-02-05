<template>
	<div class="ciel-time-picker" ref="selectwrap">
		<ciel-input
			prefix-icon="ciel-icon-history"
			:placeholder="placeholder"
			:disabled="disabled"
			class="ciel-time-picker__input"
			:value="valshow"
			ref="inputBox"
			@focus="isshow = true"
			:show-clear="showClear"
			@clear="clearInput"
			@keydown="inputkeydown"
		></ciel-input>
		<section
			class="ciel-time-picker__content"
			:class="{
				'ciel-time-picker__content--active': isshow,
				'ciel-time-picker__content__title--active': type === 'timerange'
			}"
			ref="pluginArea"
		>
			<div v-show="isshow" class="ciel-time-picker__content-timewarp">
				<timepicker
					:class="{
						'ciel-time-picker__content-timewarp--border': type === 'timerange'
					}"
					:isshow="isshow"
					v-model="timeStart"
					:disabledHours="disabledHours"
					:disabledMinutes="disabledMinutes"
					:disabledSeconds="disabledSeconds"
					:type="type"
					:formatValue="formatValue"
					@changeArr="startTimeArr = $event"
					ref="startTime"
					@changeHour="changeStartHour"
					@changeMinute="changeStartMinute"
					@changeSecond="changeStartSecond"
				></timepicker>
				<timepicker
					:isshow="isshow"
					v-model="timeEnd"
					:disabledHours="disabledEndHours"
					:disabledMinutes="disabledEndMinutes"
					:disabledSeconds="disabledEndSeconds"
					v-if="type === 'timerange'"
					@changeArr="endTimeArr = $event"
					:type="type"
					title="结束时间"
					ref="endTime"
					:formatValue="formatValue"
				></timepicker>
			</div>
		</section>
	</div>
</template>

<script>
import timepicker from './timepicker.vue';
import '../../../examples/utils/timeutils.js';
import inputPopover from '../../../examples/mixins/inputPopover.js';
export default {
	name: 'cielTimePicker',
	mixins: [inputPopover],
	components: { timepicker },
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: [String, Array],
		formatValue: {
			type: String,
			default: 'HH:mm:ss'
		},
		type: {
			type: String,
			default: () => {
				return 'time';
			}
		},
		rangeSeparator: {
			type: String,
			default: '～'
		},
		disabledHours: {
			type: Array,
			default: () => {
				return [];
			}
		},
		disabledMinutes: {
			type: Array,
			default: () => {
				return [];
			}
		},
		disabledSeconds: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {
			timeStart: '',
			timeEnd: '',
			timeRange: '',
			startTimeArr: [],
			endTimeArr: []
		};
	},
	watch: {
		isshow(val) {
			if (!val) {
				this.timeRange = this.timeStart && this.timeEnd ? `${this.timeStart} ${this.rangeSeparator} ${this.timeEnd}` : '';
			}
		},
		model(val) {
			this.$emit('change', val);
		}
	},
	computed: {
		valshow() {
			if (this.type === 'timerange') {
				return this.timeRange;
			}
			return this.timeStart ? this.timeStart : '';
		},
		model() {
			if (this.type === 'timerange') {
				return [this.timeStart, this.timeEnd];
			}
			return this.timeStart;
		},
		disabledEndHours() {
			let list = this.disabledHours;
			if (this.type === 'timerange') {
				let startHour = this.startTimeArr[0] ? Number(this.startTimeArr[0]) : 0;
				for (let i = 0; i < 24; i++) {
					let value = String(i);
					let hour = value.length == 1 ? `0${i}` : value;
					if (i < startHour) {
						list = [...list, hour];
					}
				}
			}
			return list;
		},
		disabledEndMinutes() {
			let list = this.disabledMinutes;
			if (this.type === 'timerange') {
				let startMinute = this.startTimeArr[1] ? Number(this.startTimeArr[1]) : 0;
				for (let i = 0; i < 60; i++) {
					let value = String(i);
					let minute = value.length == 1 ? `0${i}` : value;
					if (i < startMinute && this.startTimeArr[0] == this.endTimeArr[0]) {
						list = [...list, minute];
					}
				}
			}
			return list;
		},
		disabledEndSeconds() {
			let list = this.disabledSeconds;
			if (this.type === 'timerange') {
				let startSecond = this.startTimeArr[2] ? Number(this.startTimeArr[2]) : 0;
				for (let i = 0; i < 60; i++) {
					let value = String(i);
					let second = value.length == 1 ? `0${i}` : value;
					if (i < startSecond && this.startTimeArr[1] == this.endTimeArr[1]) {
						list = [...list, second];
					}
				}
			}
			return list;
		}
	},
	methods: {
		setValue() {
			let val = this.value;
			if (typeof val === 'string') {
				let date = new Date().format('yyyy-MM-dd');
				let startTime = val;
				let start = `${date} ${startTime}`;
				this.timeStart = val ? new Date(start).format(this.formatValue) : '';
			} else {
				let date = new Date().format('yyyy-MM-dd');
				let startTime = val[0] ? val[0] : '';
				let start = `${date} ${startTime}`;
				this.timeStart = startTime ? new Date(start).format(this.formatValue) : '';
				let endTime = val[1] ? val[1] : '';
				let end = `${date} ${endTime}`;
				this.timeEnd = endTime ? new Date(end).format(this.formatValue) : '';
				this.timeRange = this.timeStart && this.timeEnd ? `${this.timeStart} ${this.rangeSeparator} ${this.timeEnd}` : '';
			}
		},
		changeStartHour(hour) {
			if (this.type === 'timerange') {
				this.$refs.endTime.resetHour(hour); // 结束时间始终与开始时间保持一致
			}
		},
		changeStartMinute(minute) {
			// 如果小时是一样的 那么分钟也要保持一致
			if (this.type === 'timerange' && this.startTimeArr[0] == this.endTimeArr[0]) {
				this.$refs.endTime.resetMinute(minute);
			}
		},
		changeStartSecond(second) {
			// 如果小时是一样的分钟也是一样的 则秒钟要保持一致
			if (this.type === 'timerange' && this.startTimeArr[0] == this.endTimeArr[0] && this.startTimeArr[1] == this.endTimeArr[1]) {
				this.$refs.endTime.resetSecond(second);
			}
		},
		inputkeydown(e) {
			e.preventDefault();
		},
		clearInput() {
			this.timeEnd = '';
			this.timeStart = '';
			this.timeRange = '';
			this.$refs.startTime.clear();
			if (this.type === 'timerange') {
				this.$refs.endTime.clear();
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.setValue();
		});
	}
};
</script>

<style scoped="scoped">
@import url('../../../examples/assets/styles/timepicker.css');
</style>

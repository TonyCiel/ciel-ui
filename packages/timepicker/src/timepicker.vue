<template>
	<section>
		<header class="time-picker-title" v-if="type === 'timerange'">{{ title }}</header>
		<div class="time-picker-cells" :class="{ 'time-picker-cells--120': formatValue.indexOf('ss') == -1 }">
			<ul class="time-picker-cells__wrap" ref="hours">
				<li
					:class="{
						'time-picker-cells__wrap__cell--active': hour === item,
						'time-picker-cells__wrap__cell--disabled': isDeabledHour(item)
					}"
					@click="selectHour($event, item)"
					:ref="`hour${item}`"
					class="time-picker-cells__wrap__cell"
					v-for="item in hours"
					:key="`hour${item}`"
				>
					{{ item }}
				</li>
			</ul>
			<ul class="time-picker-cells__wrap" ref="minutes">
				<li
					:class="{
						'time-picker-cells__wrap__cell--active': minute === item,
						'time-picker-cells__wrap__cell--disabled': isDeabledMinute(item)
					}"
					@click="selectMinute($event, item)"
					:ref="`minute${item}`"
					class="time-picker-cells__wrap__cell"
					v-for="item in minutes"
					:key="`minute${item}`"
				>
					{{ item }}
				</li>
			</ul>
			<ul v-if="formatValue.indexOf('ss') != -1" class="time-picker-cells__wrap" ref="seconds">
				<li
					:class="{
						'time-picker-cells__wrap__cell--active': second === item,
						'time-picker-cells__wrap__cell--disabled': isDeabledSecond(item)
					}"
					@click="selectSecond($event, item)"
					:ref="`second${item}`"
					class="time-picker-cells__wrap__cell"
					v-for="item in seconds"
					:key="`second${item}`"
				>
					{{ item }}
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
export default {
	name: 'timepicker',
	data() {
		return {
			hour: '',
			minute: '',
			second: '',
			isFirstLoadPicker: true
		};
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: String,
		formatValue: {
			type: String,
			default: () => {
				return 'HH:mm:ss';
			}
		},
		type: {
			type: String,
			default: () => {
				return 'time';
			}
		},
		title: {
			type: String,
			default: () => {
				return '开始时间';
			}
		},
		isshow: Boolean,
		disabledHours: Array,
		disabledMinutes: Array,
		disabledSeconds: Array
	},
	watch: {
		formatTime(val) {
			this.$emit('change', val);
		},
		timeArr(val) {
			this.$emit('changeArr', val);
		},
		isshow(val) {
			if(val && this.isFirstLoadPicker) {
				this.setValue();
				this.isFirstLoadPicker = false;
			}
		}
		
	},
	computed: {
		timeArr() {
			return [this.hour,this.minute,this.second];
		},
		selectTime() {
			let hour = this.hour ? this.hour : '00';
			let minute = this.minute ? this.minute : '00';
			let second = this.second ? this.second : '00';
			let result = `${hour}:${minute}:${second}`;
			return result === '00:00:00' ? '' : result;
		},
		formatTime() {
			if (!this.selectTime) {
				return '';
			}
			let nowDate = new Date().format('yyyy-MM-dd');
			let datetime = `${nowDate} ${this.selectTime}`;
			return new Date(datetime).format(this.formatValue);
		},
		hours() {
			let hours = [];
			for (let i = 0; i < 24; i++) {
				let value = String(i).length == 1 ? `0${i}` : String(i);
				hours = [...hours, value];
			}
			return hours;
		},
		minutes() {
			let minutes = [];
			for (let i = 0; i < 60; i++) {
				let value = String(i).length == 1 ? `0${i}` : String(i);
				minutes = [...minutes, value];
			}
			return minutes;
		},
		seconds() {
			let seconds = [];
			for (let i = 0; i < 60; i++) {
				let value = String(i).length == 1 ? `0${i}` : String(i);
				seconds = [...seconds, value];
			}
			return seconds;
		}
	},
	methods: {
		isDeabledHour(hour) {
			return this.disabledHours.includes(hour);
		},
		isDeabledMinute(minute) {
			return this.disabledMinutes.includes(minute);
		},
		isDeabledSecond(second) {
			return this.disabledSeconds.includes(second);
		},
		scrollUl(elwarp, el, item) {
			if (!elwarp) return;
			if(!el || !el.length) return;
			let itemHeight = el[0].clientHeight;
			elwarp.scroll({
				top: Number(item) * itemHeight,
				left: 0,
				behavior: 'smooth'
			});
		},
		selectHour(e, item) {
			if (e && e.target.classList.contains('time-picker-cells__wrap__cell--disabled')) {
				return;
			}
			let elHour = this.$refs.hours;
			let el = this.$refs[`hour${item}`];
			this.hour = item;
			this.scrollUl(elHour, el, item);
			if (!this.minute) {
				let elMinute = this.$refs.minutes;
				this.scrollUl(elMinute, el, 0);
			}
			if(!this.isFirstLoadPicker) {this.$emit('changeHour',item)};
		},
		selectMinute(e, item) {
			if (e && e.target.classList.contains('time-picker-cells__wrap__cell--disabled')) {
				return;
			}
			let elMinute = this.$refs.minutes;
			let el = this.$refs[`minute${item}`];
			this.minute = item;
			this.scrollUl(elMinute, el, item);
			if (!this.second) {
				let elSecond = this.$refs.seconds;
				this.scrollUl(elSecond, el, 0);
			}
			if(!this.isFirstLoadPicker) {this.$emit('changeMinute',item);}
		},
		selectSecond(e, item) {
			if (e && e.target.classList.contains('time-picker-cells__wrap__cell--disabled')) {
				return;
			}
			let elSecond = this.$refs.seconds;
			let el = this.$refs[`second${item}`];
			this.second = item;
			this.scrollUl(elSecond, el, item);
			if(!this.isFirstLoadPicker) {this.$emit('changeSecond',item);}
			
		},
		setValue() {
			let value = this.value ? this.value.replace(/[^0-9]/ig,":") :'';
			if(!value) {
				return;
			}
			let time = Date.genDate(`2011-11-21 ${value}`);
			let hour = new Date(time).getHours();
			let minute = new Date(time).getMinutes();
			let secound = new Date(time).getSeconds();
			this.selectHour('',String(hour).length == 1 ? `0${hour}`: String(hour));
			this.selectMinute('',String(minute).length == 1 ? `0${minute}`: String(minute));
			this.selectSecond('',String(secound).length == 1 ? `0${secound}`: String(secound));
		},
		// 重置小时
		resetHour(hour) {
			this.selectHour('',hour);
		},
		resetMinute(munite) {
			this.selectMinute('',munite);
		},
		resetSecond(second) {
			this.selectSecond('',second);
		},
		clear() {
			this.hour = "";
			this.minute = "";
			this.second = "";
		}
	}
};
</script>

<style scoped="scoped">
.time-picker-cells {
	width: 180px;
}
.time-picker-cells--120 {
	width: 120px;
}
.time-picker-title {
	height: 32px;
	line-height: 32px;
	text-align: center;
	border-bottom: 1px solid #e8eaec;
	font-size: 14px;
}
.time-picker-cells__wrap {
	width: 60px;
    float: left;
    list-style: none;
    max-height: 144px;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    cursor: pointer;
    border-left: 1px solid #e8eaec;
    padding-bottom: 120px;
    position: relative;
    padding-left: 0;
    margin: 0;
}
.time-picker-cells__wrap:first-child {
	border-left: none;
}

.time-picker-cells__wrap::-webkit-scrollbar {
	width: 0;
}
.time-picker-cells__wrap:hover::-webkit-scrollbar {
	width: 9px;
}
.time-picker-cells__wrap::-webkit-scrollbar-thumb {
	background-color: rgba(255, 255, 255, 0);
}
.time-picker-cells__wrap:hover::-webkit-scrollbar-thumb {
	background-color: rgba(0, 0, 0, 0.1);
}
.time-picker-cells__wrap__cell {
	width: 100%;
	padding-left: 9px;
	color: #444;
	height: 24px;
	user-select: none;
	line-height: 24px;
	font-size: 14px;
	text-align: left;
	transition: background 0.2s ease-in-out;
	box-sizing: content-box;
}
.time-picker-cells__wrap__cell--active {
	color: var(--maincolor);
	background-color: #f1f1f1;
}
.time-picker-cells__wrap__cell:hover {
	background-color: #f1f1f1;
	cursor: pointer;
}
.time-picker-cells__wrap__cell--disabled {
	color: #DEDEDE;
	cursor: not-allowed;
}
</style>

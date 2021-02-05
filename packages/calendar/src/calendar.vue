<style scoped>
.calendar {
	border-radius: 4px;
	line-height: 30px;
	font-size: 13px;
	color: #606266;
}

.calendar-item {
	padding-right: 10px;
}
.calendar-item:last-child {
	padding-right: 0px;
}

.monthdates {
	width: 200px;
}

.dateitem {
	width: calc(100% / 7 - 2px);
	line-height: 25px;
	text-align: center;
	cursor: pointer;
	margin: 1px;
}

.dateitem.disabled,
.dateitem.notcanselect,
.dateitem.notrange{
	color: #aaa;
	cursor: text;
}

.dateitem.today {
	color: var(--maincolor);
}

.dateitem.selected,
.dateitem.singleselected,
.dateitem.ranged {
	background-color: var(--maincolor);
	color: white;
}

.navitem {
	margin-top: 2%;
}

.navitem > div {
	text-align: center;
	cursor: pointer;
	padding-right: 20px;
	padding-left: 20px;
}
.week > div {
	width: calc(100% / 7);
}

.plugin {
	position: relative;
}

.border {
	border: 1px solid #f1f1f1;
}

.flexlayout {
	display: flex;
}
.flexlayout_flow {
	flex-wrap: wrap;
}
.flexitem_auto {
	flex: 1;
}
.poniner-handle {
	cursor: pointer;
}
</style>

<template>
	<div ref="plugin" class="plugin">
		<!--日历框架-->
		<section class="al_center flexlayout" ref="calendarmask">
			<div class="calendar">
				<section class="flexlayout">
					<section v-for="(month, mindex) in monthes" :key="month.title" class="calendar-item">
						<div class="monthtitle flexlayout">
							<div class="border">
								<section class="title flexitem_auto pointer flexlayout" style="text-align: center;" @click.stop="changeShowAllMonth(month)">
									<div style="margin-left: 10px">
										<span class="ciel-icon-double-arrow-left- poniner-handle" @click.stop="changeShowYear(-1)" v-if="mindex == 0"></span>
										<span class="ciel-icon-arrow_left poniner-handle" @click.stop="changeShowMonth(-1)" v-if="mindex == 0"></span>
									</div>
									<div class="flexitem_auto">{{ month.title }}</div>
									<div style="margin-right: 10px">
										<span class="ciel-icon-arrow_right poniner-handle" @click.stop="changeShowMonth(1)" v-if="mindex == monthes.length - 1"></span>
										<span class="ciel-icon-double-arrow-right- poniner-handle" @click.stop="changeShowYear(1)" v-if="mindex == monthes.length - 1"></span>
									</div>
								</section>
								<section class="week flexlayout">
									<div v-for="item in weeks" :key="item" style="text-align: center;">{{ item }}</div>
								</section>
								<div class="flexlayout flexlayout_flow monthdates">
									<section
										@click.stop="touchDate($event, item)"
										:class="{
											selected: isDateSelected(item, month, index),
											singleselected: type === 'date' && sigleDate == new Date(item).format('yyyy-MM-dd'),
											disabled: isDatedisabled(month, index),
											today: isDateToday(item),
											notcanselect: isDateCanselect(item, index, month),
											notrange:isRangeTime(item, index)
										}"
										:key="item.format('yyyy-MM-dd')"
										class="dateitem"
										v-for="(item, index) in month.dates"
									>
										{{ item.getDate() }}
									</section>
								</div>
							</div>
						</div>
					</section>
				</section>
			</div>
		</section>
	</div>
</template>
<script>
const DEFFORMAT = 'yyyy-MM-dd';
export default {
	model: {
		prop: 'value',
		event: 'select'
	},
	name: 'calendar',
	props: {
		value: {
			type: Array,
			default: () => {
				return [];
			}
		},
		limitstart: { type: String, default: '' },
		limitend: { type: String, default: '' },
		diabled: Boolean, // 是否可点击
		max: Number,
		// 类型，date为单选，dateRange区间选择，dateMultiple,多选日期
		type: String
	},
	watch: {
		selectDateList(val) {
			this.$emit('select', val);
		},
		value(val) {
			this.selectDateList = val;
			this.setMonthSelect();
		}
	},
	computed: {
		// //计算月份数据
		monthes: function() {
			var monthes = [];
			var year = this.year;
			var month = this.month;
			var date = new Date();
			date.setFullYear(year);
			date.setMonth(month);
			date.setDate(1);
			for (var i = 0; i < this.max; i++) {
				monthes.push(this.genMonthData(date.getFullYear(), date.getMonth()));
				date.setMonth(date.getMonth() + 1);
			}
			return monthes;
		},
		year: function() {
			return this.showdate.getFullYear();
		},
		month: function() {
			return this.showdate.getMonth();
		},
		dateformatlist() {
			let list = this.selectDateList.map(item => {
				return new Date(item).format('yyyy-MM-dd');
			});
			return list;
		}
		// selectlist() {}
	},
	data: function() {
		var today = new Date();
		return {
			isFirstLoadCalendar: true,
			maxmonth: 3,
			showdate: today,
			today: today.format(DEFFORMAT),
			weeks: ['日', '一', '二', '三', '四', '五', '六'],
			begindate: null,
			enddate: null,
			isshow: false,
			selectDateList: [], // 选择的列表
			selectStorgeList: [],
			sigleDate: '' // 单选日期时选择的日期
			//   monthes: [],
		};
	},
	methods: {
		// 切换日期时候需要重新回显之前选中的日期
		setMonthSelect() {
			let monthes = this.monthes;
			var selects = this.selectDateList;
			selects.forEach(select => {
				monthes.forEach(month => {
					month.dates.forEach(date => {
						if (this.type === 'dateRange') {
							let startTime = new Date(this.selectDateList[0]).getTime();
							let endTime = new Date(this.selectDateList[1]).getTime();
							let nowtime = new Date(date).getTime();
							let isselect = nowtime >= startTime && nowtime <= endTime ||  new Date(nowtime).format('yyyy-MM-dd') == new Date(startTime).format('yyyy-MM-dd');
							if (this.selectDateList.length == 1) {
								isselect = new Date(nowtime).format('yyyy-MM-dd') == new Date(startTime).format('yyyy-MM-dd') ? true : false;
							}
							this.$set(date, 'isselect', isselect);
						} else if (new Date(select).format('yyyy-MM-dd') == date.format('yyyy-MM-dd')) {
							this.$set(date, 'isselect', true);
						}
					});
				});
			});
		},
		// 年跳跃
		changeShowYear: function(delta) {
			var date = new Date(this.showdate);
			date.setFullYear(date.getFullYear() + delta);
			this.showdate = date;
			this.setMonthSelect();
		},
		// 月跳跃
		changeShowMonth: function(delta) {
			var date = new Date(this.showdate);
			date.setMonth(date.getMonth() + delta);
			this.showdate = date;
			this.setMonthSelect();
		},
		isDateSelected: function(item, monthitem, index) {
			return item.isselect && monthitem.month - 1 == item.getMonth();
		},
		touchDate: function(e, date) {
			if (this.diabled) {
				return;
			}
			if (e.target.classList.contains('disabled') || e.target.classList.contains('notcanselect') || e.target.classList.contains('notrange')) {
				return;
			}
			if (this.type === 'date') {
				this.sigleDate = date;
				// this.$set(date, "isselect", true);
				this.selectDateList = [date];
				return;
			}
			if (this.type === 'dateMultiple') {
				this.$forceUpdate();
				this.$set(date, 'isselect', !date.isselect);
				if (date.isselect) {
					this.selectDateList.push(date);
				} else {
					// 因为要考虑到日期切换 所以这里不采用直接设置true和false 直接移除掉
					for (let i = 0; i < this.selectDateList.length; i++) {
						if (new Date(this.selectDateList[i]).format('yyyy-MM-dd') === date.format('yyyy-MM-dd')) {
							this.selectDateList.splice(i, 1);
						}
					}
				}
				let list = this.selectDateList.map(item => {
					return item.format('yyyy-MM-dd');
				});
				this.$emit('select', list);
				return;
			}
			if (this.type == 'dateRange') {
				if (this.selectDateList.length === 2) {
					this.selectDateList = [];
				}
				if (this.selectDateList.length) {
					this.selectDateList[1] = date;
				} else {
					this.selectDateList[0] = date;
				}
				this.setMonthSelect();
				this.$forceUpdate();
				this.$emit('select', this.selectDateList);
				// console.log('this.selectDateList', this.selectDateList);

				// this.selectDateList.push(date);
			}
		},
		isDateToday: function(dateobj) {
			return dateobj.format('yyyy-MM-dd') == this.today;
		},
		//是否在选中的时间区间内
		isRangeTime: function(item) {
			let date = new Date(item).getTime();
			let limitend = new Date(this.limitend).getTime();
			let limitstart = new Date(this.limitstart).getTime(); // 从今天开始算
			let timerange = this.disabled ? 0 : 24*60*60*1000;
			if(this.limitend && this.limitstart) {
				return !(date >= limitstart - timerange && date <= limitend);
			}
			if(this.limitstart) {
				return !(date >= limitstart - timerange);
			}
			if(this.limitend) {
				return !(date <= limitend);
			}
			
		},
		isDatedisabled: function(monthitem, index) {
			if (index == monthitem.beginIndex && index == 0) {
				return false;
			}
			return index <= monthitem.beginIndex || index >= monthitem.endIndex;
		},
		isDateCanselect(item, index, month) {
			if (month.month != new Date(item).getMonth() + 1) {
				return true;
			}
			return false;
			
		},
		genMonthData: function(year, month) {
			//第一天的日期
			var beginDate = this.value[0] ? new Date(this.value[0]).trim() :  new Date().trim();
			console.log('beginDate',beginDate)
			if (month == 1 && beginDate.getMonth() != 1) {
				// 二月特殊处理
				beginDate = new Date(beginDate.getTime() - 86400000 * 5).trim(); // 提前五天
			}
			beginDate.setFullYear(year);
			beginDate.setMonth(month);
			beginDate.setDate(1);
			//计算当前月份前的数据
			var day = beginDate.getDay();
			var dates = [];
			var i;
			if (day > 0) {
				for (i = day; i > 0; i--) {
					var predate = new Date(beginDate.getTime());
					predate.setDate(predate.getDate() - i);
					dates.push(predate);
				}
			}
			var preMonthDateCount = dates.length;
			var beginIndex = preMonthDateCount == 0 ? 0 : preMonthDateCount - 1;
			//计算当前月份和下月的数据
			var maxDate = 42 - dates.length;
			for (i = 0; i < maxDate; i++) {
				var curdate = new Date(beginDate.getTime());
				curdate.setDate(curdate.getDate() + i);
				dates.push(curdate);
			}
			//当月最大日期
			var curMaxDate = this.getMaxDate(beginDate);
			var endIndex = preMonthDateCount + curMaxDate;
			dates.forEach(date => {
				this.$set(date, 'isselect', false);
				if (this.dateformatlist.indexOf(date.format('yyyy-MM-dd')) > -1) {
					this.$set(date, 'isselect', true);
				}
			});
			return {
				title: beginDate.getFullYear() + '年' + (beginDate.getMonth() + 1) + '月',
				dates: dates,
				beginDate: beginDate,
				beginIndex: beginIndex,
				endIndex: endIndex,
				month: beginDate.getMonth() + 1
			};
		},
		getMaxDate: function(date) {
			var dateobj = new Date(date.getTime());
			dateobj.setMonth(dateobj.getMonth() + 1);
			dateobj.setDate(0);
			return dateobj.getDate();
		}
	}
};
</script>

const showformatDateName = ['今天', '明天', '后天'];
/**
 * 格式日期【Date的扩展函数】
 * 
 * 把Date 转化为指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 例如： (new
 * Date()).Format("yyyy-MM-dd hh:mm:ss.S"); // 2015-04-028 08:09:04.423 (new
 * Date()).Format("yyyy-M-d h:m:s.S");// 2015-04-028 8:9:4.18
 */
const WEEKARRAY = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
Date.prototype.format = function(fmt, fixzoneOffset) {
	var _this = this;
	if (typeof fixzoneOffset == "number") {
		var zone = this.getTimezoneOffset();
		if (zone != fixzoneOffset) {
			_this = new Date(this);
			_this.setMinutes(this.getMinutes() + zone - fixzoneOffset);
		}
	}
	var o = {
		"M+": _this.getMonth() + 1,
		"d+": _this.getDate(),
		"D+": _this.getDate(),
		"h+": _this.getHours(),
		"H+": _this.getHours(),
		"m+": _this.getMinutes(),
		"s+": _this.getSeconds(),
		"q+": Math.floor((_this.getMonth() + 3) / 3),
		"S+": _this.getMilliseconds()
	};
	if (/(y+)/.test(fmt) || /(Y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		let replacestr = k == 'S+' ? '000' : '00';
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : (replacestr + o[k]).substr(('' + o[k]).length));
		}
	}
	return fmt;
};
//格式化星期
Date.prototype.formatWeek = function() {
	return WEEKARRAY[this.getDay()];
};
Date.prototype.trim = function() {
	this.setHours(0);
	this.setMinutes(0);
	this.setSeconds(0);
	this.setMilliseconds(0);
	return this;
};
Date.prototype.getWeek = function() {
	let dt = this;
	let d1 = new Date(dt);
	let d2 = new Date(dt);
	d2.setMonth(0);
	d2.setDate(1);
	let rq = d1 - d2;
	let days = Math.ceil(rq / (24 * 60 * 60 * 1000));
	let num = Math.ceil(days / 7);
	return num;
};
Date.prototype.getShortWeekName = function() {
	var today = new Date().trim();
	let compareDate = new Date(this.getTime()).trim();
	var delta = parseInt((compareDate.getTime() - today.getTime()) / 3600 / 24 / 1000);
	if (delta >= 0 && delta < showformatDateName.length) {
		return showformatDateName[delta];
	} else {
		return WEEKARRAY[this.getDay()];
	}
};
Date.genDate = function(format) {
	if (format && typeof format == 'object' && format.constructor.name == 'Date') {
		return format;
	}
	if (format && typeof format == "string") {
		if (format.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}z$/gi)) {
			return new Date(format);
		} else {
			return new Date(format.replace(/-/g, '/'));
		}
	} else if (typeof format == "number") {
		return new Date(format);
	} else {
		return new Date();
	}
};

export default {
	/**
	 * @description  分钟数转时刻
	 * @param {Object} minutes 分钟数
	 */
	minutesToTime(minutes) {
		minutes = Number(minutes);
		if (('' + minutes).match(/^[\d]+$/g)) {
			let min = minutes % 1440;
			let hours = parseInt(min / 60);
			let mins = min % 60;
			return (hours > 9 ? hours : ('0' + hours)) + ':' + (mins > 9 ? mins : ('0' + mins));
		}
		return '';
	},
	/** 时间字串转分钟数
	 * @param {Object} format
	 */
	timeToMinutes(format = '') {
		if (format.length == 0) {
			return 0;
		}
		var ff = format.split(":");
		return parseInt(ff[0]) * 60 + parseInt(ff[1]);
	},
}

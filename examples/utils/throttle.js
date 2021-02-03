/**
 * 节流函数
 * 节流函数原理:规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效
 * 如 throttle("xxxx",function(){},1000)
 * **/
let THROTTLE_TIMERS = {};
const throttle = (timerKey, func, wait = 50) => {
	if (!timerKey || typeof timerKey != 'string') {
		throw '缺少timerKey';
	}
	if (typeof func != 'function') {
		console.log(func)
		throw '缺少方法';
	}
	if (!THROTTLE_TIMERS[timerKey]) {
		THROTTLE_TIMERS[timerKey] = 0;
	}
	return function(...args) {
		let now = new Date().getTime();
		if (now - THROTTLE_TIMERS[timerKey] > wait) {
			THROTTLE_TIMERS[timerKey] = now;
			func.apply(this, args)
		}
	}

}
export default throttle;

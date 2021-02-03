/**
 * 防抖 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 * 页面可储存多个防抖定时器
 * 如debounce("xxxx",function(){},1000)
 * **/
let DEBOUNCE_TIMERS = {};	// 缓存防抖定时器
const debounce = (timerKey, func, wait = 50) => {
	if (!timerKey || typeof timerKey != 'string') {
		throw '缺少timerKey';
	}
	if (typeof func !='function') {
		throw '缺少方法';
	}
	return function(...args) {
		if (DEBOUNCE_TIMERS[timerKey]) clearTimeout(DEBOUNCE_TIMERS[timerKey])
		DEBOUNCE_TIMERS[timerKey] = setTimeout(() => {
			func.apply(this, args)
		}, wait)
	}
}
export default debounce;

//保存不同key的定时器id
const DELAYS_KEYS = {};
export default function(key, handler, milliseconds) {
	if (!key || typeof key != 'string') {
		throw '缺少key';
	}
	if (typeof handler !='function') {
		return;
	}
	clearTimeout(DELAYS_KEYS[key]);
	DELAYS_KEYS[key] = setTimeout(() => handler(), milliseconds || 300)
}

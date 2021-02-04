var userAgent = navigator.userAgent.toLowerCase();
let lastfocusElem = null;
let pageyposition = 0;
/**
 * 队列数据
 */
var QueueData = {};
const browser =  {
    ios: !!userAgent.match(/like mac os x/),
    weixin: !!userAgent.match(/micromessenger/),
    mobile: !!userAgent.match(/mobile/),
    android: userAgent.match(/Android/i) || userAgent.match(/Linux/i)
};
/**
 * 队列数据
 */
var QueueData = {};
/**
 * 是否为函数类型
 */
function isFn(obj) {
	return typeof obj == 'function';
}
function containsElem(parent, elem) {
	return parent.contains ? parent.contains(elem) : !!(parent.compareDocumentPosition(elem) & 16);
}
/**
 * 队列对象
 */
function Queue(objid) {
	this.id = objid;
	this.queues = [];
	this.add = (hander) => {
		//当前的队列
		if (isFn(hander)) {
			this.queues.push(hander);
			return this.next();
		} else if (typeof hander === 'number' && hander >= 0 && hander < this.queues.length) {
			return this.queues[0];
		} else {
			return this.queues;
		}
	};
	/** 执行队列中下一个任务【一般供内部或者开发插件使用】*/
	this.next = () => {
		var isExecute = !!this.isExecute;
		//是否有任务在处理
		if (!isExecute && this.queues.length > 0) {
			this.isExecute = true;
			this.queues.shift().call(this);
		}
		return this;
	};
	/**
	 * 通知通知队列中的下一个任务执行【一般在队列的任务结束时调用】
	 */
	this.dequeue = () => {
		this.isExecute = false;
		return this.next();
	};
	/**清空队列*/
	this.remove = () => {
		this.queues.length == 0;
		return this;
	};
	this.delay = (duration, hander) => {
		this.add(() => {
			var _this = this;
			setTimeout(function() {
				if (isFn(hander)) {
					hander();
				} else {
					_this.dequeue();
				}
			}, duration || 0);
		});
		return this;
	};
}
function isObject(obj) {
	return ['[object Array]', '[object Object]'].indexOf(Object.prototype.toString.call(obj)) != -1;
}
export default {
	isFunction: isFn,
	isObject: isObject,
	containsElem: containsElem,
	browser: browser,
    fixkeyboardInWeixin: function() {
		//微信下处理ios系统，调用系统键盘失去焦点后，页面下不来的问题
		var body = document.body;
		if (browser.ios && body.scrollIntoViewIfNeeded) {
			body.addEventListener('focus', e => {
				var tag = e.target.tagName.toLowerCase();
				if (tag == 'input' || tag == 'textarea') {
					lastfocusElem = e.target;
					pageyposition = document.documentElement.scrollTop || document.body.scrollTop;
				}
			}, true);
			body.addEventListener(
				'blur',
				e => {
					var tag = e.target.tagName.toLowerCase();
					if (tag == 'input' || tag == 'textarea') {
						setTimeout(() => {
							if (lastfocusElem && lastfocusElem != document.body && lastfocusElem != document.activeElement) {
								window.scrollTo(0, pageyposition);
							}
						}, 200);
					}
				},
				true
			);
		}
    },
    //复制文本
	copyText: function(text) {
		text = this.trim(text);
		let doc = document;
		let inputview = doc.createElement('textarea');
		doc.body.appendChild(inputview);
		inputview.value = text;
		//解决ios 10弹出键盘的问题
		inputview.setAttribute('readonly', 'readonly');
		inputview.select();
		if (this.browser.ios) {
			//兼容ios
			let range = doc.createRange();
			range.selectNodeContents(inputview);
			let sel = window.getSelection()
			sel.removeAllRanges();
			sel.addRange(range);
		}
		//增大覆盖范围
		inputview.setSelectionRange(0, 99999);
		let result;
		try {
			result = doc.execCommand('copy');
		} catch (e) {
			result = false;
		}
		doc.body.removeChild(inputview);
		return result;
	},
	// 合并数据
	extend:function () {
		let target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false,
			options;
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}
		if (typeof target !== "object" && typeof target != 'function') {
			target = {};
		}
		if (length == i) {
			target = this;
			--i;
		}
		for (; i < length; i++)
			if ((options = arguments[i]) != null)
				for (let name in options) {
					let src = target[name],
						copy = options[name];
					if (target === copy) {
						continue;
					}
					if (deep && copy && typeof copy === "object" && !copy.nodeType) {
						target[name] = extend(deep, src || (copy.length != null ? [] : {}), copy);
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
		return target;
	},
	// 获取字符串实际长度
	getRealLength: function(str) {
		var l = str.length;
		var blen = 0;
		for (var i = 0; i < l; i++) {
			if ((str.charCodeAt(i) & 0xff00) != 0) {
				blen++;
			}
			blen++;
		}
		return blen;
	},
	// 创建dom元素
	creatElement: function(tagName, options) {
		var elem = document.createElement(tagName);
		if (options.parent) {
			options.parent.appendChild(elem);
		}
		if (options.attrs) {
			for (var name in options.attrs) {
				elem.setAttribute(name, options.attrs[name]);
			}
		}
		if (options.classes) {
			var clazz = this.trim(options.classes).replace('/^\\s+$/g', ' ').split(' ');
			for (var i = 0; i < clazz.length; i++) {
				if (clazz[i]) {
					elem.classList.add(clazz[i]);
				}
			}
		}
		if (options.styles) {
			for (var key in options.styles) {
				elem.style[key] = options.styles[key];
			}
		}
		if (options.innerText) {
			elem.innerText = options.innerText;
		}
		if (options.children) {
			options.children.forEach(item => {
				elem.appendChild(item);
			});
		}
		return elem;
	},
	addClass: function(elem, csses) {
		var clazz = this.trim(csses).replace('/^\\s+$/g', ' ').split(' ');
		for (var i = 0; i < clazz.length; i++) {
			if (clazz[i]) {
				elem.classList.add(clazz[i]);
			}
		}
	},
	getStyle(elem, attr, filterNumer) {
		let val = document.defaultView.getComputedStyle(elem, null)[attr];
		if (val && filterNumer) {
			let match = val.match(/\d*.\d*/);
			return match ? parseFloat(match[0]) : 0;
		}
		return val;
	},
	addStyles: function(elem, styles) {
		for (var name in styles) {
			elem.style[name] = styles[name];
		}
	},
	removeElement: function(elem) {
		if (elem && elem.parentNode) {
			elem.parentNode.removeChild(elem);
		}
	},

	removeClass: function(elem, csses) {
		var clazz = this.trim(csses).replace('/^\\s+$/g', ' ').split(' ');
		for (var i = 0; i < clazz.length; i++) {
			if (clazz[i]) {
				elem.classList.remove(clazz[i]);
			}
		}
	},
	removeQueue: function(queueObj) {
		delete QueueData[queueObj.id];
	},
	queue: function(objid) {
		var queue = QueueData[objid];
		if (!queue) {
			queue = new Queue(objid);
			QueueData[objid] = queue;
		}
		return queue;
	},
	// 去掉字符串中null字符
	trim: function(s) {
		if (null == s || undefined == s) {
			return '';
		}
		if (typeof s != 'string') {
			return s;
		}
		return s.replace(/(^\s*)|(\s*$)/g, '');
	}
}
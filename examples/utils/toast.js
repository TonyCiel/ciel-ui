// 提示相关组件 
import wool from '../utils/tool.js';
var EMPTY = ''; //消息控件
//所有调用中的消息实体对象
const ALLENTITYS = [];

//居中消息对象
function fnCenterView(view) {
	if (view.classList.contains("loading") && view.querySelector(".ciel_msgview_msg").textContent.length > 0) {
		view.classList.add("onmsg");
	} else {
		view.classList.remove("onmsg");
	}
	var objh = view.offsetHeight / 2;
	var objw = view.offsetWidth / 2;
	view.style.top = "-webkit-calc(45% - " + objh + "px)";
	view.style.top = "-webkit-calc(50% - " + objw + "px)";
	view.style.top = "calc(45% - " + objh + "px)";
	view.style.left = "calc(50% - " + objw + "px)";
}

function MessageView(plainObject) {
	var _this = this;
	ALLENTITYS.push(_this);
	var params = wool.extend({
		delay: 1e3, //消息的显示时间 //
		callback: null, //隐藏后的回调
		msg: EMPTY, //需要显示的内容 //
		iswait: false, //是否需要显示等待图标 //
		iscustomlength: false, //是否自定义长度
		duration: 300, //消息框显示的时间 
	}, plainObject);
	var delay = params.delay;
	this.options = params;
	if (params.iswait) {
		delay = 0;
	} else if (delay < 0) {
		var length = wool.getRealLength(params.msg) / 2;
		delay = length > 10 ? length * 79 : 800;
	} //遮罩
	var body = document.body;
	var shadow = (this.shadow = wool.creatElement('div', {
		parent: body,
		classes: 'ciel_msgview_modal'
	})); //控件
	var view = this.view =
		wool.creatElement('div', {
			parent: body,
			classes: 'ciel_msgview info'
		});
	var loadingview = wool.creatElement('div', {
		parent: view,
		classes: 'ciel_msgview_loading'
	});
	//外部获取消息内容控件
	this.msgView = wool.creatElement('div', {
		parent: view,
		classes: 'ciel_msgview_msg'
	}); // 设置遮罩样式，并添加到页面
	if (!params.iswait) {
		view.classList.add('nopointerEvents');
	} //生成队列对象
	var queueObj = wool.queue('queue:' + Date.now() + '_msgview' + Math.random());
	if (!params.iswait) {
		shadow.addEventListener('click', function() {
			if (!params.iswait && view.classList.contains('_ourlinc_msgbody_show')) {
				params.callback = null;
				queueObj.remove();
				_this.hide(1);
			}
		});
	} //是否已经关闭
	this.closed = false; //外部获取等待图片 //禁止滚动
	// [view, shadow].forEach(function(obj) {
	// 	obj.addEventListener('click', function(e) {
	// 		e.preventDefault();
	// 	});
	// });
	function msgIcon(icon, msg, opt) {
		if (_this.closed) {
			return _this;
		}
		var pt = wool.extend({
			iscustomlength: false
		}, opt);
		params.iscustomlength = pt.iscustomlength;
		if (wool.getRealLength(msg) > 36 &&
			!params.iscustomlength) {
			return _this.msg(msg);
		} else {
			return _this.msg(msg, true, false, 'iconable ' + icon);
		}
	}
	this.msgsucc = function(msg, opt) {
		return msgIcon('success',
			msg, opt);
	};
	this.msgwarn = function(msg, opt) {
		return msgIcon('warn', msg, opt);
	};
	this.msgerror = function(msg, opt) {
		return msgIcon('error', msg, opt);
	};
	//设置【获取】消息文本,flag:是否不执行动画
	this.msg = function(msg, flag, loading, icon) {
		if (this.closed) {
			return this;
		}
		msg = wool.trim(msg);
		if (!flag || icon) {
			icon = icon || EMPTY;
			queueObj.add(() => {
				view.classList.remove('_ourlinc_msgbody_show');
				queueObj.dequeue();
			}).delay(200, () => {
				_this.loading(!!loading, icon).msgView.innerHTML = msg;
				queueObj.dequeue();
			}).add(() => {
				view.style.left = '0';
				view.classList.add('_ourlinc_msgbody_show');
				queueObj.dequeue();
				fnCenterView(view);
			});
		} else {
			_this.loading(!!loading, icon).msgView.innerHTML = msg;
			fnCenterView(view);
		}
		return this;
	};

	function setIcon(icon) {
		return _this.loading(false, icon);
	} //开【关】等待视图
	this.loading = function(toggle, showicon) {
		if (toggle && !loadingview.children.length) {
			for (var i = 0; i < 12; i++) {
				wool.creatElement('div', {
					parent: loadingview,
					styles: {
						'-webkit-transform': 'rotate(' + i * 30 + 'deg) translate(0, -142% )',
						'-webkit-animation-delay': -1 + 0.0833 * i + 's'
					}
				});
			}
			view.classList.add('loading');
			view.classList.remove('info');
		} else {
			loadingview.innerHTML = "";
			wool.removeClass(view, 'iconable loading warn success error');
			wool.addClass(view, showicon || '' + 'info');
			fnCenterView(view);
		}
		return this;
	}; //延迟关闭的时间
	this.delay = function(delaytime) {
		delaytime = delaytime || 0;
		if (delaytime > 0) {
			queueObj.delay(delaytime);
		}
		return this;
	};
	this.forceHide = function(delaytime, callback) {
		queueObj.remove();
		this.hide(delaytime, callback);
	};
	/*** * 关闭消息框 * delaytime，【可选值】"auto"||>0的毫秒值，不指定时默认"auto" * callback
	隐藏后的回调 */
	this.hide = function(delaytime, callback) {
		if (closed) {
			return;
		}
		queueObj.add(function() {
			if (wool.isFunction(delaytime)) {
				callback = delaytime;
			}
			if (typeof delaytime != 'number') {
				var msglength = wool.trim(_this.msgView.textContent).length;
				delaytime = msglength > 6 ? msglength * 150 : 800;
			}
			queueObj.delay(delaytime, () => {
					wool.removeClass(view, '_ourlinc_msgbody_show');
					queueObj.dequeue();
				})
				.delay(200, () => {
					//移除消息实体
					ALLENTITYS.splice(ALLENTITYS.indexOf(_this), 1);
					if (wool.isFunction(params.callback)) {
						params.callback.call(params);
					}
					if (wool.isFunction(callback)) {
						callback.call(params);
					}
					wool.removeElement(view);
					wool.removeElement(shadow);
					wool.removeQueue(queueObj);
					_this.closed = true;
					queueObj.dequeue();
				});
			queueObj.dequeue();
		});
	}; //显示消息（delay:延迟关闭时间，默认不延迟）
	this.show = (delaytime) => {
		queueObj.delay(delaytime);
		if (!delaytime || delaytime == 0) {
			queueObj.delay(10);
		}
		queueObj.add(function() {
			view.classList.add('_ourlinc_msgbody_show');
			queueObj.dequeue();
			fnCenterView(view);
		}).add(10, function() {
			queueObj.dequeue();
			fnCenterView(view);
		});
		if (delay > 0) {
			queueObj.add(function() {
				_this.hide(delay);
				queueObj.dequeue();
			});
		}
		return this;
	}; //开始配置
	this.loading(params.iswait);
	_this.msgView.innerHTML = wool.trim(params.msg);
	fnCenterView(view);
	if (params.icontype && (wool.getRealLength(params.msg) <= 36 ||
			params.iscustomlength)) {
		setIcon('iconable ' + params.icontype);
	}
}
export default {
	showmsgs: function(opt, msg, delay, callback) {
		msg = new String(msg).toString();
		if (typeof delay != "number") {
			callback = delay;
			delay = -1;
		}
		var plainObject = {
			msg: msg,
			delay: delay,
			callback: callback
		};
		return new MessageView(wool.extend(plainObject, opt)).show();
	},
	/***
	 * 显示表示完成的信息提示，超过36个字符时不展示图标
	 */
	showsucc: function(msg, delay, callback) {
		this.showmsgs({
			icontype: "success"
		}, msg, delay, callback);
	},
	/***
	 * 显示表示警示的信息提示，超过36个字符时不展示图标
	 */
	showwarn: function(msg, delay, callback) {
		this.showmsgs({
			icontype: "warn"
		}, msg, delay, callback);
	},
	/***
	 * 显示表示错误的信息提示，超过36个字符时不展示图标
	 */
	showerror: function(msg, delay, callback) {
		this.showmsgs({
			icontype: "error"
		}, msg, delay, callback);
	},
	//销毁全部
	removeAllEntity: function() {
		if (!ALLENTITYS.length) {
			return;
		}
		ALLENTITYS.forEach(item => {
			item.forceHide(0);
		});
	},
	//销毁等待中的
	removeWaittingEntitys: function() {
		if (!ALLENTITYS.length) {
			return;
		}
		ALLENTITYS.forEach(item => {
			if (item.options.iswait) {
				item.forceHide(0);
			}
		});
	},
	/***
	 * 无图标的信息提示
	 */
	showmsg: function(msg, delay, callback) {
		this.showmsgs(null, msg, delay, callback);
	},
	showloading: function(msg, delay) {
		if (typeof delay != "number") {
			delay = 100;
		}
		return new MessageView({
			msg: msg,
			iswait: true
		}).delay(delay).show();
	},
}

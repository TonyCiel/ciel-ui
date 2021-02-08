<style lang="less">
.ciel-Atditor {
	&.disabled {
		background-color: #f5f7fa;
		color: #c0c4cc;
		cursor: not-allowed;
	}
	.w-e-toolbar {
		border: 1px solid #dcdfe6;
	}
	.wt-scroll {
		&::-webkit-scrollbar {
			width: 7px;
			height: 7px;
		}
	}
	.wool-editor-content {
		padding: 10px;
		word-break: break-all;
		&:focus {
			border: 1px solid var(--maincolor);
		}
		table,th,td {
			border:  1px solid #848484;
		}
		pre {
			background-color: #f1f1f1;
			padding: 10px;
			border-radius: 5px;
			margin: 10px 0;
		}
	}
}
</style>
<style>
html.__global_hide_body {
	overflow: hidden !important;
}
</style>
<template>
	<div class="ciel-Atditor" :class="{'disabled': disabled}" :style="frameStyle" ref="root" v-show="isready"></div>
</template>

<script>
// import SingletonJsLoader from '../plugins/SingletonJsLoader.js';
import WoolRichEditor from './richEditor.js';
import draghelper from '../../../examples/utils/draghelper.js';
import throttle from '../../../examples/utils/throttle.js';
export default {
	model: {
		prop: 'value',
		event: 'change'
	},
	name: 'VueUEditor',
	props: {
		//设定高度，仅初始值有效
		height: {
			type: String,
			default: '350px'
		},
		value: {
			type: String,
			default: ''
		},
		//是否允许上传图片，开启开关，需要监听uploadimg事件，仅初始值有效，
		enableuploadimg: {
			type: Boolean,
			default: false
		},
		//是否文档模式，仅初始值有效，
		iswikimode: {
			type: Boolean,
			default: false
		},
		//是否允许全屏展示，仅初始值有效
		enablefullscreen: {
			type: Boolean,
			default: false
		},
		//自定义全屏函数
		customfullscreenHandler: Function,
		zindex: {
			type: Number,
			default: 0
		},
		disabled: Boolean
	},
	watch: {
		value(val) {
			if (this.editorElem && this.editorElem.innerHTML !== val) {
				let _val = val;
				if (val && val.substring(0, 1) != '<') {
					_val = '<p>' + val + '</p>';
				}
				this.editorElem.innerHTML = _val;
			}
		}
	},
	data() {
		return {
			instance: null,
			editorElem: null,
			isready: false,
			isdestroyed: false,
			//dom观察器
			observer: null,
			isfullscreen: false,
			throttlekey: 'VueUEditor:' + Math.random()
		};
	},
	computed: {
		frameStyle() {
			if (this.isfullscreen && !this.customfullscreenHandler) {
				return {
					height: '100%',
					width: '100%',
					position: 'fixed',
					backgroundColor: 'white',
					left: 0,
					top: 0,
					zIndex: 30000
				};
			}
			return {
				height: this.height
			};
		}
	},
	mounted: async function() {
		let root = this.$refs.root;
		if (root) {
			this.isready = false;
			// await SingletonJsLoader.load(['https://pmpsys.cn/r/js/WoolRichEditor1.1.js?7'], 'WoolRichEditor');
			this.initEditor();
		}
	},
	destroyed: function() {
		if (this.observer) {
			this.observer.disconnect();
			this.observer = null;
		}
		if (!this.isdestroyed) {
			this.isdestroyed = true;
			// 组件销毁的时候，要实例
			if (this.instance !== null && this.instance._offAllEvent) {
				this.instance._offAllEvent();
			}
		}
	},
	methods: {
		initEditor: function() {
			if (this.isdestroyed) {
				return;
			}
			let RichEditor = window.WoolRichEditor;
			if (RichEditor && !this.instance) {
				this.$nextTick(() => {
					let vm = this;
					this.instance = new RichEditor(this.$refs.root);
					let instance = this.instance;
					// 绑定事件，当 ditor 初始化完成
					// instance.customConfig.onchange = () => {
					// 	let html = vm.editorElem.innerHTML;
					// 	console.log(1);
					// 	this.$emit('change', html, vm);
					// };
					instance.customConfig.customCodeStyle = this.customCodeStyle;
					instance.customConfig.filechange = e => {
						let files = e.target.files;
						for (var i = 0; i < files.length; i++) {
							var item = files[i];
							if (!item.type.match(/jpeg|jpg|png|gif|bmp/)) {
								return;
							}
							if (this.$listeners.uploadimg) {
								var event = window.event;
								var file = event.target.files[0];
								var reader = new FileReader();
								reader.onload = function(event) {
									vm.$emit('uploadimg', file, vm);
								};
								reader.readAsDataURL(item);
							}
							if (this.$listeners.upload) {
								vm.$emit('upload', {
									file: item,
									vm: vm
								});
							}
							if (i == 1) {
								break;
							}
						}
					};
					//菜单配置

					let menus = [
						'head', // 标题
						'bold', // 粗体
						'fontSize', // 字号
						'fontName', // 字体
						'italic', // 斜体
						'underline', // 下划线
						'strikeThrough', // 删除线
						'foreColor', // 文字颜色
						'backColor', // 背景颜色
						'link', // 插入链接
						'list', // 列表
						'justify', // 对齐方式
						// 'quote', // 引用
						'emoticon' // 表情
					];
					if (this.iswikimode) {
						menus.unshift('wikiTitle');
					}
					if (this.enableuploadimg) {
						menus.push('image'); //插入图片
					}

					menus.push(
						'table', // 表格
						// 'video', // 插入视频
						'code', // 插入代码
						'undo', // 撤销
						'redo' // 重复
					);
					if (this.enablefullscreen) {
						menus.push('fullScreen'); //插入图片
					}
					instance.customConfig.menus = menus;
					instance.customConfig.zIndex = this.zindex;
					instance.customConfig.pasteFilterStyle = false;
					instance.customConfig.txtstyles.height = this.height;
					instance.customConfig.onFullScreenChange = this.onFullScreenChange;
					instance.create(); // 创建富文本实例
					this.isready = true;
					let editorElem = instance.$textElem[0];
					if(this.disabled) {
						editorElem.setAttribute('contenteditable',false)
					}
					// console.log('editorElem',editorElem.setAttribute('contenteditable',false))
					this.editorElem = editorElem;
					const mutationObserver = window.MutationObserver || window.WebKitMutationObserver;
					this.mutationObserver;
					if (MutationObserver) {
						const MutationObserverConfig = {
							childList: true,
							subtree: true,
							characterData: true
						};
						const observer = new MutationObserver(() => {
							// console.log(2);
							this.delayUpdate();
						});
						observer.observe(editorElem, MutationObserverConfig);
						this.observer = observer;
					}
					this.initupoadImg(editorElem);
					editorElem.classList.add('wt-scroll');
					editorElem.classList.add('wool-editor-content');
					editorElem.addEventListener('blur', this.updateContent);
					editorElem.addEventListener('focus', this.storageRangeState);
					instance.txt.html(this.value);
					this.$emit('ready', {
						instance: instance,
						editorElem: editorElem
					});
				});
			}
		},
		delayUpdate() {
			throttle(this.throttlekey, this.updateContent);
		},
		initupoadImg(elem) {
			if (this.enableuploadimg) {
				draghelper.paste(elem, res => {
					this.$emit('uploadimg', res, this);
				});
				draghelper.drag(elem, res => {
					this.$emit('uploadimg', res, this);
				});
			}
		},
		onFullScreenChange(e) {
			if (this.customfullscreenHandler) {
				this.customfullscreenHandler(e);
			} else {
				this.isfullscreen = !this.isfullscreen;
			}
			document.querySelector('html').classList.toggle('__global_hide_body');
		},
		//更新内容
		updateContent() {
			this.$emit('change', this.getContent());
		},
		//获取内容
		getContent() {
			let editorElem = this.editorElem;
			if (editorElem) {
				return this.instance.txt.html();
			}
			return this.value;
		},
		//插入图片
		insertImgLink(url) {
			this.instance.uploadImg.insertLinkImg(url);
		}
	}
};
</script>

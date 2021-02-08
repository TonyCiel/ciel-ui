<template>
	<div class="ciel-editor" :style="frameStyle">
		<VueUEditor
		:disabled="disabled"
			@uploadimg="notifyUploadimg"
			:enableuploadimg="enableUpLoadImg"
			:height="showHeight"
			ref="vEditor"
			v-model="content"
			@ready="onReady"
			:customfullscreenHandler="customfullscreen"
			@change="updateContent"
			:enablefullscreen="enableFullScreen"
		></VueUEditor>
		<div class="ciel-editor__atbox" ref="remainBox" :style="{ left: left + 'px', top: top + 'px' }" v-show="isShowAterList">
			<input @keydown="inputKeydown($event)" placeholder="输入关键字筛选" class="ciel-editor__atbox__filter" type="text" ref="searchPersonInput" v-model.trim="keyword" />
			<ul class="ciel-editor__atbox__ater-list" ref="remindlistview">
				<li
					:ref="`atItem${index}`"
					:class="{ selected: selectIndex == index }"
					@click="useAtItem(item)"
					class="ciel-editor__atbox__ater-item"
					v-for="(item, index) in searchResult"
					:key="index"
				>
					{{ item.name }}
				</li>
			</ul>
			<div v-show="!searchResult.length" class="ciel-editor__atbox__ater-item__no-match-remindlist">无符合条件的项</div>
		</div>
	</div>
</template>

<script>
import VueUEditor from './richEditor.vue';
import { position } from './caret-pos.js';
import pinyin from '../../../examples/utils/pinyin.js';
export default {
	name: 'ceilRichEditor',
	components: {
		VueUEditor
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		//设定高度，仅初始值有效
		height: {
			type: String,
			default: '200px'
		},
		value: {
			type: String,
			default: ''
		},
		//是否允许上传图片，开启开关，需要监听uploadimg事件，仅初始值有效，
		enableUpLoadImg: {
			type: Boolean,
			default: false
		},
		//是否允许录入重复的@项(仅初始值有效)
		enableduplicate: {
			type: Boolean,
			default: true
		},
		//按键输入@展示的列表项
		remindlist: {
			type: Array,
			default() {
				return [];
			}
		},
		enableMentions: {
			type: Boolean,
			default: false
		},
		enableFullScreen: {
			type: Boolean,
			default: false
		},
		disabled: Boolean
	},
	data() {
		return {
			content: '',
			isfullscreen: false,
			editorElem: null,
			left: 0,
			top: 0,
			selectIndex: 0,
			isShowAterList: false,
			keyword: '',
			useAtdList: []
		};
	},
	computed: {
		showHeight() {
			return this.isfullscreen ? '100%' : this.height;
		},
		frameStyle() {
			if (this.isfullscreen) {
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
			return { height: this.height };
		},
		searchAbledList() {
			if (this.enableduplicate || !this.useAtdList.length) {
				return this.remindlist;
			}
			return this.remindlist.filter(item => {
				return !this.useAtdList.filter(obj => obj.name === item.name).length;
			});
		},
		searchResult() {
			if (!this.keyword) {
				return this.searchAbledList;
			}
			return this.searchAbledList.filter(item => {
				let match = item.name;
				if (match.search(this.keyword) !== -1) {
					return true;
				}
				match = pinyin.getCamelChars(item.name).toLocaleLowerCase();
				if (match.search(this.keyword) != -1) {
					return true;
				}
				match = pinyin.getFullChars(item.name).toLocaleLowerCase();
				if (match.search(this.keyword) != -1) {
					return true;
				}
				return false;
			});
		}
	},
	watch: {
		value(val) {
			this.content = val;
		},
		keyword() {
			this.selectIndex = 0;
		},
		isShowAterList() {
			this.selectIndex = 0;
			this.$refs.remindlistview.scrollTop = 0;
		},
		selectIndex(val) {
			if (val >= 0) {
				let item = this.$refs[`atItem${val}`];
				let height = item.length ? item[0].clientHeight : 0;
				let top = height * Number(val);
				this.$refs.remainBox.scroll({
					top: top,
					left: 0,
					behavior: 'smooth'
				});
			}
		}
	},
	mounted() {
		this.content = this.value;
	},
	methods: {
		onReady(e) {
			//富文本编辑器初始化
			this.editorElem = e.editorElem;
			// this.storageRangeState();
			this.updateRemindlist();
			//事件监听
			if (!this.enableMentions) {
				this.$emit('ready', e);
				return;
			}
			this.editorElem.addEventListener('keyup', this.keyup);
			this.editorElem.addEventListener('keydown', this.keydown);
			this.editorElem.addEventListener('focus', this.focus);
			this.$emit('ready', e);
		},
		//筛选框下按监听
		inputKeydown(e) {
			let maxlength = this.searchResult.length;
			if (e.key == 'ArrowUp' && maxlength) {
				if (maxlength > 0) {
					let index = this.selectIndex - 1;
					if (index < 0) {
						index = maxlength + index;
					}
					this.selectIndex = index;
				}
			} else if (e.key == 'ArrowDown' && maxlength) {
				let index = this.selectIndex + 1;
				if (index >= maxlength) {
					index = index - maxlength;
				}
				this.selectIndex = index;
			} else if (e.key == 'Enter') {
				if (this.searchResult.length) {
					e.preventDefault();
					let index = this.selectIndex < 0 ? 0 : this.selectIndex;
					this.useAtItem(this.searchResult[index]);
				}
			} else if (e.key == 'Escape') {
				e.preventDefault();
				let range = this.position.range;
				let rangeNode = range.endContainer;
				this.setRangeToNode(rangeNode, range.endOffset);
			}
		},
		focus(e) {
			this.isShowAterList = false;
		},
		//编辑器键盘按键弹起监听
		keyup(e) {
			this.storageRangeState();
			//输入内容处理
			let selection = this.position.selection;
			let node = selection.anchorNode;
			if (!this.remindlist.length) {
				//如果没有可选的remindlist则不允许录入
				return;
			}
			let keystr = node.textContent;
			if (keystr && e.key == '2') {
				keystr = keystr.substring(selection.anchorOffset - 1, selection.anchorOffset);
			}
			if (e.key == '@' || (e.key == '2' && keystr == '@')) {
				//监听at操作
				this.updateRemindlistPosition();
				this.isShowAterList = true;
				this.$nextTick(() => {
					this.$refs.searchPersonInput.focus();
				});
			}
		},
		//编辑器键盘按键按下起监听
		keydown(e) {
			this.storageRangeState();
			let selection = getSelection();
			let range = selection.getRangeAt(0);
			let keyCode = e.keyCode;
			// //48到57为普通数字键码值
			// //65到90为数字键盘数字键码值
			// //104到111为数字键盘数字键码值
			// //8为BackSpace
			// //9为Tab
			// //12为Clear
			// //22为Spacebar
			let specialkeycode = [12, 13, 22, 32, 36, 45, 46, 144, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222, 229];
			if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 104 && keyCode <= 111) || specialkeycode.indexOf(keyCode) != -1) {
				let node = range.endContainer.parentElement;
				//禁止修改
				if (node && node.tagName == 'span' && node.getAttribute('placeholder') == 'woolater') {
					this.setRangeToNode(node, 0, node.childNodes.length);
					document.execCommand('RemoveFormat', false);
					document.execCommand('Delete');
					e.preventDefault();
					return;
				}
			}
			if (e.key === 'Backspace' || e.key == 'Delete') {
				let node = range.endContainer.parentElement;
				//处理删除事件
				if (node.getAttribute('placeholder') == 'woolater') {
					e.preventDefault();
					this.setRangeToNode(node, 0, node.childNodes.length);
					document.execCommand('Delete');
				}
			}
		},
		customfullscreen() {
			this.isfullscreen = !this.isfullscreen;
		},
		//保存range状态
		storageRangeState() {
			// if (this.position) {
			// 	return;
			// }
			let selection = getSelection();
			if (selection.rangeCount) {
				this.position = {
					range: selection.getRangeAt(0),
					selection: selection
				};
			}
		},
		//选at项
		useAtItem(data) {
			this.a;
			this.keyword = '';
			this.selectIndex = -1;
			let range = this.position.range;
			let endContainer = range.endContainer;
			let endOffset = range.endOffset;
			//选中at
			this.setRangeToNode(endContainer, endOffset - 1, endOffset);
			//删除at
			document.execCommand('Delete');
			//插入新的内容
			let insertSpan = document.createElement('span');
			insertSpan.setAttribute('placeholder', 'woolater');
			insertSpan.setAttribute('title', data.name);
			insertSpan.setAttribute('atval', JSON.stringify(data));
			insertSpan.style.color = '#0966f1';
			insertSpan.style.fontStyle = 'italic';
			insertSpan.textContent = '@' + data.name;
			const spanid = 'woolat' + Date.now();
			insertSpan.id = spanid;
			const emptyHTML = '&nbsp;';
			let insertHTMl = '';
			if (endOffset == 1) {
				insertHTMl += emptyHTML;
			}
			insertHTMl += insertSpan.outerHTML + emptyHTML;
			document.execCommand('insertHTML', false, insertHTMl);
			const newnode = window[spanid];
			newnode.removeAttribute('id');
			const nextNode = newnode.nextSibling;
			let insertIndex = nextNode.textContent.length;
			//设置光标位置
			this.setRangeToNode(nextNode, 1, 1);
			this.isShowAterList = false;
		},
		//指定光标位置
		setRangeToNode(node, begin, end) {
			if (!end) {
				end = begin;
			}
			let range = this.position.range;
			let selection = this.position.selection;
			range.selectNodeContents(node);
			range.setStart(node, begin);
			range.setEnd(node, end);
			selection.removeAllRanges();
			selection.addRange(range);
		},
		updateContent(value) {
			this.$emit('change', value);
			this.updateRemindlist();
		},
		//更新提醒的人列表
		updateRemindlist() {
			let list = [];
			if (this.editorElem) {
				let needremoves = [];
				this.editorElem.querySelectorAll('span[placeholder="woolater"]').forEach(item => {
					let title = item.getAttribute('title');
					if ('@' + title != item.innerHTML) {
						needremoves.push(item);
						return;
					}
					let datastrt = item.getAttribute('atval');
					if (list.indexOf(datastrt) == -1) {
						list.push(datastrt);
					}
				});
				if (needremoves.length > 0) {
					needremoves.forEach(item => {
						item.outerHTML = item.textContent;
						['title', 'placeholder', 'style', 'datastrt'].forEach(attr => item.removeAttribute(attr));
					});
				}
				list = list.map(item => JSON.parse(item));
				this.useAtdList = list;
			}
			this.$emit('remainchange', list);
		},
		//获取at位置
		updateRemindlistPosition() {
			this.isShowAterList = true;
			this.$nextTick(() => {
				const ele = this.editorElem;
				const childEle = this.$refs.remainBox;
				const parentW = ele.offsetWidth;
				const childW = childEle.offsetWidth;
				const pos = position(ele);
				// 弹框偏移超出父元素的宽高
				this.left = pos.left + childW - parentW > 0 ? parentW - childW : pos.left;
				this.top = pos.top - (document.documentElement.scrollTop || document.body.scrollTop) + 54;
			});
		},
		notifyUploadimg(res, instant) {
			this.$emit('uploadimg', res, instant);
		}
	},
	//销毁
	destroyed() {
		if (this.editorElem) {
			['keyup', 'keydown', 'focus'].forEach(event => {
				this.editorElem.removeEventListener(event, this[event]);
			});
			this.position = null;
			this.editorElem = null;
		}
	}
};
</script>

<style scoped="scoped">
@import url('../../../examples/assets/styles/richeditor.css');
</style>

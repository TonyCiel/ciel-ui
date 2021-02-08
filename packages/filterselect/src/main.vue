<template>
	<div class="ciel-personselect" ref="selectwrap">
		<ciel-input
			:disabled="disabled"
			class="ciel-personselect__input"
			@blur="onBlur"
			@focus="handleInputFocus"
			v-model="keyword"
			@keydown.left="gotoIndex($event, -1)"
			@keydown.right="gotoIndex($event, 1)"
			@keydown.delete="deleteSelect"
			@keydown.up="upSelect"
			@keydown.down="downSelect"
			@keydown.enter="enterSelect"
			:placeholder="placeholder"
			ref="inputBox"
			@clear="handleClear"
			:showClear="showClear"
			@click="resetPosition"
		></ciel-input>

		<section
			class="ciel-personselect__content"
			:class="{
				'ciel-personselect__content--active': isshow
			}"
			ref="pluginArea"
		>
			<div v-show="isshow">
				<div class="ciel-personselect__content__msg" v-show="!filterItems.length">暂无数据</div>
				<div
					class="ciel-personselect__content__item"
					:class="{
						'ciel-personselect__content__item--active': selectIdx == index
					}"
					@click="select(item)"
					ref="item"
					v-for="(item, index) in filterItems"
					:key="item.id"
				>
					<div>{{ item.label }}</div>
					<i style="color: var(--maincolor);" v-if="selectList.includes(item.id)" class="ciel-icon-success_no_circle"></i>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import pinyin from '../../../examples/utils/pinyin.js';
import inputPopover from '../../../examples/mixins/inputPopover.js';
export default {
	name: 'cielFilterselect',
	mixins: [inputPopover],
	model: {
		prop: 'value',
		event: 'select'
	},
	props: {
		value: {
			type: Array,
			default: () => {
				return [];
			}
		},
		options: {
			type: Array,
			default: () => {
				return [];
			}
		},
		pinYin: Boolean,
	},
	data() {
		return {
			keyword: '',
			selectList: [],
			selectIdx: -1,
		};
	},
	watch: {
		selectList(val) {
			this.$emit('select', val);
			this.keyword = '';
			val.forEach(item => {
				let values = this.exchangeItems.filter(exchange => {
					return exchange.id == item;
				});
				let value = values.length ? values[0] : {};
				this.keyword = this.keyword + value.label + ';';
			});
		},
		selectIdx(val, oldval) {
			let itemH = this.$refs.item[0].clientHeight;
			let itemListH = this.$refs.pluginArea.clientHeight;
			if (val > oldval) {
				// 向下选择的
				if (itemH * val >= itemListH - 20) {
					this.$refs.pluginArea.scrollTop = this.$refs.pluginArea.scrollTop + itemH;
				}
			} else {
				// 向下选择的
				if (this.$refs.pluginArea.scrollTop > 0) {
					this.$refs.pluginArea.scrollTop = this.$refs.pluginArea.scrollTop - itemH;
				}
			}
		},
		keyword(val) {
			if (!val) {
				this.selectList = [];
			}
		}
	},
	computed: {
		exchangeItems() {
			let list = this.options.map(item => {
				return this.pinYin
					? {
							label: item.label,
							id: item.id,
							fullpy: pinyin.getFullChars(item.label),
							shortpy: pinyin.getCamelChars(item.label)
					  }
					: {
							label: item.label,
							id: item.id
					  };
			});
			return list;
		},
		seletedItems() {
			let val = this.keyword || '';
			let lastsplitindex = val.lastIndexOf(';');
			let itemsstr = val.substring(0, lastsplitindex);
			return itemsstr.length ? itemsstr.split(';') : [];
		},
		inputval() {
			let val = this.keyword || '';
			let lastsplitindex = val.lastIndexOf(';');
			return val.substring(lastsplitindex + 1, val.length);
		},
		filterItems() {
			let items = this.exchangeItems;
			let val = this.inputval;
			if (val) {
				return items.filter(item => {
					let key = item.label + item.fullpy + item.shortpy;
					return key.toLowerCase().indexOf(val) != -1;
				});
			} else {
				return items;
			}
		}
	},
	methods: {
		handleClear() {
			this.$emit('select',[]);
		},
		getInput() {
			return this.$refs.inputBox.getInput();
		},
		select(item) {
			var isHave = this.selectList.includes(item.id);
			// this.selectList.forEach(select => {
			// 	if (select.id == item.id) {
			// 		isHave = true;
			// 	}
			// });
			if (isHave) {
				var index = this.selectList.indexOf(item.id);
				this.selectList.splice(index, 1);
				return;
			}
			this.selectIdx = -1;
			this.selectList = [...this.selectList, item.id];
		},
		handleInputFocus() {
			this.isshow = true;
		},
		onBlur() {
			// setTimeout(() => {
			// 	this.isshow = false;
			// }, 300);
		},
		// 向上选择
		upSelect() {
			if (this.selectIdx > 0) {
				this.selectIdx = this.selectIdx - 1;
			}
			if (this.selectIdx > this.filterItems.length - 1) {
				this.selectIdx = -1;
			}
		},
		// 向下选择
		downSelect() {
			if (this.selectIdx < this.filterItems.length - 1) {
				this.selectIdx = this.selectIdx + 1;
			}
			if (this.selectIdx > this.filterItems.length - 1) {
				this.selectIdx = -1;
			}
		},
		// 回车选择
		enterSelect() {
			var item = {};
			if (this.selectIdx < 0) {
				item = this.filterItems[0];
			} else {
				item = this.filterItems[this.selectIdx];
			}
			if (this.seletedItems.includes(item.label)) {
				var index = this.selectList.indexOf(item.id);
				this.selectList.splice(index, 1);
				return;
			}
			this.selectList = [...this.selectList, item.id];
		},
		gotoIndex(e, delta) {
			let index = this.getInputPosition();
			let newItems = [...this.seletedItems];
			let inputelem = this.getInput();
			if (index == newItems.length) {
				let itemschar = newItems.join(';') + (newItems.length ? ';' : '');
				let curpoi = inputelem.selectionStart;
				if (delta > 0) {
					if (curpoi >= itemschar.length) {
						return;
					}
				} else {
					if (curpoi > itemschar.length) {
						return;
					}
				}
			}
			e.preventDefault();
			index = index + delta - 1;
			if (index <= 0) {
				index = 0;
			}
			newItems.splice(index + 1, newItems.length - index);
			let pos = newItems.join(';').length + 1;
			inputelem.setSelectionRange(pos, pos);
		},
		//获取贯标位置
		getInputPosition() {
			let end = this.getInput().selectionStart;
			let val = this.keyword.substr(0, end);
			return val.split(';').length - 1;
		},
		// 重置光标位置
		resetPosition() {
			var index = this.getInput().selectionStart;
			var str = this.keyword.substr(index, this.keyword.length - 1);
			var lastIdx = str.indexOf(';');
			let posiNum = Number(index + lastIdx + 1);
			this.getInput().setSelectionRange(posiNum, posiNum);
		},
		deleteSelect(e) {
			let inputview = this.getInput();
			let start = inputview.selectionStart;
			let end = inputview.selectionEnd;
			if (start != end) {
				return;
			}
			if (e.key == 'Delete') {
				e.preventDefault();
				return;
			}
			let seletedItems = this.selectList;
			if (!seletedItems.length) {
				return;
			}
			let index = this.getInputPosition();
			if (seletedItems.length < index) {
				if (this.inputval) {
					return;
				} else {
					index -= 1;
				}
			} else {
				if (seletedItems.length == index && this.inputval) {
					let end = this.getInput().selectionStart;
					if (this.keyword.substring(end - 1, end) != ';') {
						return;
					}
				}
				index -= 1;
			}
			e.preventDefault();
			index = index < 0 ? 0 : index;
			let newItems = [...this.seletedItems];
			newItems.splice(index, 1);
			this.selectList.splice(index, 1);
			if (newItems.length) {
				this.$nextTick(() => {
					//重新计算光标位置
					newItems.splice(index + 1, newItems.length - index);
					let pos = newItems.join(';').length + 1;
					inputview.setSelectionRange(pos, pos);
				});
			}
		},
	},
	
	mounted() {
		this.$nextTick(() => {
			this.selectList = this.value;
		});
	}
};
</script>

<style scoped="scoped">
@import url('../../../examples/assets/styles/personselect.css');
</style>

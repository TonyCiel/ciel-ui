<template>
	<li
		class="ciel-option__item"
		ref="option"
		:class="{ 'is-disabled': disabled, 
		'is-selected': select.selectVal == value && select.isHavevalue, 
		'is-show': visible,
		'is-hover': value == hoverItem.value }"
		@click.stop="selectOption"
		v-show="visible"
	>
		<slot>{{ label }}</slot>
	</li>
</template>

<script>
import Emitter from '../../../examples/mixins/emitter.js';
import pinyin from '../../../examples/utils/pinyin.js';
export default {
	name: 'cielOption',
	mixins: [Emitter],
	inject: ['select'],
	props: {
		value: {},
		label: [String, Number],
		disabled: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		hoverItem() {
			return this.select.hoverIndex != -1 ? this.select.cachedOptions[this.select.hoverIndex].$options.propsData : {};
		},
		visible() {
			if(this.select.isBlur) {
				return true;
			}
			if(this.select.filterable && this.select.isHavevalue && this.select.inputValue) {
				if(this.select.pinYin) {
					let key = this.label + pinyin.getFullChars(this.label) + pinyin.getCamelChars(this.label);
					console.log(this.label)
					return key.toLowerCase().indexOf(this.select.inputValue) > -1;
				}
				return this.label.indexOf(this.select.inputValue) > -1;
			}
			return true;
		}
	},
	methods: {
		selectOption() {
			if (this.disabled !== true) {
				this.dispatch('cielSelect', 'handleOptionClick', [this, true]);
			}
		}
	},
	created() {
		this.select.options.push(this);
		this.select.cachedOptions.push(this);
	},
	mounted() {
		this.select.domList.push(this.$refs.option);
		// console.log('heig',this.$refs.option.)
	}
};
</script>

<style scoped="scoped">
.ciel-option__item {
	font-size: 14px;
	padding: 0 20px;
	position: relative;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #606266;
	height: 34px;
	line-height: 34px;
	box-sizing: border-box;
	cursor: pointer;
}
.ciel-option__item:hover {
	background-color: #f5f7fa;
}
.ciel-option__item.is-hover {
	background-color: #f5f7fa;
}
.ciel-option__item.is-disabled {
	color: #c0c4cc;
	cursor: not-allowed;
}
.ciel-option__item.is-selected {
	color: var(--maincolor);
}
</style>

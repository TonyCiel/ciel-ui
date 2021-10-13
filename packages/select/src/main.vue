<template>
	<div class="ciel-select" ref="selectwrap">
		<ciel-input
			suffix-icon="ciel-icon-arrow_up"
			:placeholder="placeholderValue"
			:disabled="disabled"
			class="ciel-select__input"
			v-model="inputValue"
			ref="inputBox"
			@focus="isshow = true;inputValue='';isBlur = false"
			:show-clear="showClear"
			:readonly="readonly"
			@clear="clearInput"
			@keydown.up="upSelect"
			@keydown.down="downSelect"
			@keydown.enter="enterSelect"
			:focuseRotateIcon="true"
			@blur="handleBlur"
			@click.stop="isshow = true;inputValue=''"
			
		></ciel-input>
		<div
			class="ciel-select__content"
			:class="{
				'ciel-select__content--active': isshow
			}"
			ref="optionWrap"
		>
			<ul>
				<slot></slot>
			</ul>
		</div>
	</div>
</template>

<script>
import inputPopover from '../../../examples/mixins/inputPopover.js';
import Emitter from '../../../examples/mixins/emitter.js';
export default {
	name: 'cielSelect',
	componentName: 'cielSelect',
	mixins: [inputPopover, Emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {},
		filterable: Boolean,
		pinYin: Boolean,
	},
	provide() {
		return {
			select: this
		};
	},
	watch: {
		value(val) {
			this.findSelectedOption();
		},
		inputValue(val){
			console.log('val',val)

		},
		valueStr(val) {
			this.inputValue = val;
		}
	},
	computed: {
		readonly() {
			return !this.filterable;
		},
		placeholderValue() {
			if(this.readonly) {
				return this.placeholder;
			}
			if(this.value === '' || this.value === null || this.value === undefined) {
				return this.placeholder;
			}
			if((typeof this.value === 'number' || typeof this.value === 'string') && this.value == 0) {
				return this.valueStr;
			}
			if(this.value) {
				return this.valueStr;
			}
			return this.placeholder;
		},
		isHavevalue() {
			if(this.value === '' || this.value === null || this.value === undefined) {
				return false
			}
			if((typeof this.value === 'number' || typeof this.value === 'string') && this.value == 0) {
				return true;
			}
			if(this.value) {
				return true;
			}
			return false;
		}
	},
	data() {
		return {
			valueStr: '',
			inputValue: '',
			options: [],
			cachedOptions: [],
			optionsPropsList: [],
			selectVal: '',
			hoverIndex: -1,
			isBlur: true,
			domList: [],
		};
	},
	methods: {
		handleBlur() {
			this.isBlur = true;
			this.findSelectedOption()
		},
		upSelect() {
			if(this.hoverIndex == 0) return;
			console.log('domList',this.domList)
			this.hoverIndex --;
			this.scroolOptionWrap();
		},
		downSelect() {
			if(this.hoverIndex == this.optionsPropsList.length - 1) {
				this.hoverIndex = -1;
				return
			};
			this.hoverIndex ++;
			this.scroolOptionWrap();
		},
		scroolOptionWrap() {
			this.$refs.optionWrap.scroll({
				top: this.domList[this.hoverIndex].offsetTop,
				left: 0,
				behavior: 'smooth'
			});
		},
		enterSelect() {
			if(this.hoverIndex == -1) return;
			let option = this.optionsPropsList[this.hoverIndex];
			this.$emit('change', option.value);
			this.valueStr = option.label;
			this.isshow = false;
			let input = this.$refs.inputBox.getInput();
			input.blur();
		},
		handleOptionSelect(option, byClick) {
			this.valueStr = option.label;
			this.$emit('change', option.value);
			this.isshow = false;
		},
		findSelectedOption() {
			let values = this.optionsPropsList.filter((item,index) => {
				if(item.value == this.value && this.isHavevalue) {
					this.hoverIndex = index;
				}
				return item.value == this.value && this.isHavevalue;
			});
			this.selectVal = values.length ? values[0].value : '';
			this.valueStr = values.length ? values[0].label : '';
			this.inputValue = values.length ? values[0].label : '';
		},
		clearInput() {
			this.$emit('change', '');
			this.valueStr = "";
		},
	},
	created() {
		this.$nextTick(() => {
			this.optionsPropsList = this.cachedOptions.map(item => {
				return item.$options.propsData;
			});
			this.findSelectedOption();
		})
		this.$on('handleOptionClick', this.handleOptionSelect);
	},
	mounted() {
		this.$nextTick(() => {
			console.log('domList',this.domList)
		})
	}
};
</script>

<style scoped="scoped">
@import url('../../../examples/assets/styles/select.css');
</style>

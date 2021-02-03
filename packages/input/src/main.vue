<template>
	<div
		class="ciel-input"
		:class="{
			'ciel-input-group': $slots.prepend || $slots.append,
			'ciel-input-group--count': isWordLimitVisible
		}"
		@mouseenter="hovering = true"
		@mouseleave="hovering = false"
	>
		<div class="ciel-input-group__prepend" ref="prepend" v-if="$slots.prepend"><slot name="prepend"></slot></div>
		<span ref="prefixIcon" class="ciel-input__prefix-icon" v-if="prefixIcon"><i class="ciel-input__icon" :class="prefixIcon"></i></span>
		<input
			@click="$emit('click', $event)"
			@keydown="$emit('keydown', $event)"
			:disabled="inputDisabled"
			@blur="handleBlur"
			@focus="handleFocus"
			:readonly="readonly"
			v-bind="$attrs"
			ref="input"
			:value="currentValue"
			@input="handleInput"
			class="ciel-input__inner"
			:type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
			:placeholder="placeholder"
			:class="{
				'ciel-input__inner--group__prepend': $slots.prepend,
				'ciel-input__inner--group__append': $slots.append,
				'ciel-input__inner--clear': isShowClear,
				'ciel-input__inner--prefix': prefixIcon,
				'ciel-input__inner--suffix': suffixIcon,
			}"
		/>
		<div ref="append" class="ciel-input-group__append" v-if="$slots.append"><slot name="append"></slot></div>
		<span ref="clearIcon" class="ciel-input__clear" @click.stop="clearInput" v-show="isShowClear">
			<i class="ciel-input__icon ciel-icon-cancel"></i>
		</span>
		<span ref="suffixIcon" class="ciel-input__suffix-icon" v-if="suffixIcon && !isShowClear"><i class="ciel-input__icon" :class="suffixIcon"></i></span>
		<span ref="eyeIcon" class="ciel-input__suffix-icon" :class="{ 'ciel-input__eye': isShowClear }" v-if="showPassword" @click.stop="passwordVisible = !passwordVisible">
			<i class="ciel-input__icon ciel-icon-yanjing" style="font-size: 18px;"></i>
		</span>
		<div v-if="isWordLimitVisible" class="ciel-input__count">{{value.length + '/' + upperLength}}</div>
	</div>
</template>

<script>
import debounce from '../../../examples/utils/debounce.js';
export default {
	name: 'cielInput',
	props: {
		value: [String, Number],
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String,
			default: '请输入内容'
		},
		disabled: Boolean,
		readonly: Boolean,
		showClear: Boolean,
		suffixIcon: String,
		prefixIcon: String,
		showPassword: Boolean,
		showWordLimit: Boolean,
		allowSearch: Boolean
		
	},
	data() {
		return {
			hovering: false,
			focused: false,
			passwordVisible: false
		};
	},
	computed: {
		currentValue() {
			return this.value === null || this.value === undefined ? '' : String(this.value);
		},
		isShowClear() {
			return this.currentValue && this.showClear && !this.inputDisabled && !this.readonly && (this.hovering || this.focused);
		},
		inputDisabled() {
			return this.disabled;
		},
		isWordLimitVisible() {
			return this.showWordLimit &&
          this.$attrs.maxlength &&
          (this.type === 'text') &&
          !this.inputDisabled &&
          !this.readonly &&
          !this.showPassword;
		},
		upperLength() {
			return this.$attrs.maxlength;
		}
	},
	methods: {
		handleInput(event) {
			let value = event.target.value;
			this.$emit('change', value);
			this.$emit('input', value);
			if(this.allowSearch) {
				debounce('INPUT_FILTER',this.handleSearch(value), 500)(); // 节流
			}
		},
		handleSearch(value) {
			this.$emit('search', value);
		},
		handleFocus(event) {
			this.focused = true;
			this.$emit('focus', event);
		},
		handleBlur(event) {
			this.focused = false;
			this.$emit('blur', event);
		},
		setCurrentValue(value) {
			const input = this.getInput();
			if (!input) return;
			if (input.value === this.currentValue) return;
			input.value = this.currentValue;
		},
		clearInput() {
			this.$emit('change', '');
			this.$emit('input', '');
			this.$emit('clear');
			this.setCurrentValue();
		},
		focueInput() {
			let input = this.getInput();
			this.$nextTick(() => input.focus());
		},
		getInput() {
			return this.$refs.input;
		},
		updateIconPosition() {
			if(this.$slots.append) {
				let appendWidth = this.$refs.append.clientWidth + 30;
				if(this.$refs.suffixIcon) {
					this.$refs.suffixIcon.style.transform = this.$refs.suffixIcon ? 'translateX('+(0-appendWidth)+'px)': '';
				}
				if(this.$refs.clearIcon) {
					this.$refs.clearIcon.style.transform = this.showClear ?  'translateX('+(0-appendWidth)+'px)' : '';
				}
				if(this.$refs.eyeIcon) {
					this.$refs.eyeIcon.style.transform = this.showPassword ?  'translateX('+(0-appendWidth-30)+'px)' : '';
				}
			}
			if(this.$slots.prepend) {
				let prependWidth = this.$refs.prepend.clientWidth ;
				if(this.$refs.prefixIcon) {
					this.$refs.prefixIcon.style.transform = this.$refs.prefixIcon ? 'translateX('+(prependWidth)+'px)' : '';
				}
			}
			
		}
	},
	mounted() {
		this.setCurrentValue();
		this.$nextTick(() => {
			this.updateIconPosition();
		})
	}
};
</script>

<style scoped="scoped">
@import url('../../../examples/assets/styles/input.css');
</style>

// input框和下拉框样式，使用混合
export default {
	props: {
		placeholder: {
			type: String,
			default: '请输入内容'
		},
		disabled: Boolean,
		showClear: Boolean,
	},
	data() {
		return {
			isshow: false
		}
	},
	methods: {
		eventToggle(e) {
			if (this.disabled && !this.isshow) {
				return;
			}
			if (!this.isshow) {
				return;
			}
			var el = this.$refs.selectwrap;
			var target = e.target;
			if (el == target || this.$tool.containsElem(el, target)) {
				return;
			}
			this.isshow = false;
		}
	},
	mounted() {
		document.addEventListener('click', this.eventToggle);
	},
	beforeDestroy() {
		document.removeEventListener('click', this.eventToggle);
	}
}
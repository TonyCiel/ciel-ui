<template>
	<button :style="{ 'border-radius': round + 'px' }" 
	class="ciel-button" 
	:disabled="buttonDisabled || loading" 
	:class="[
		type ? 'ciel-button--' + type : '',
		size ? 'ciel-button--' + size: ''
	]" 
	@click="handleClick">
		<i v-if="icon" :class="icon"></i>
		<i class="ciel-icon-loading" v-if="loading"></i>
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'cielButton',
	props: {
		icon: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'default'
		},
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		round: {
			type: [Number, String],
			default: 4
		},
		size: {
			type: String,
			default: ''
		}
	},
	computed: {
		buttonDisabled() {
			return this.disabled;
		}
	},
	methods: {
		handleClick(evt) {
		  this.$emit('click', evt);
		}
	}
};
</script>

<style>
@import url('../../../examples/assets/styles/button.css');
</style>

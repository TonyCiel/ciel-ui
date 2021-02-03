<template>
	<div :class="rolClassName" :style="style">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'cielCol',
	props: {
		span: Number
	},
	computed: {
		rolClassName() {
			let span = Math.ceil(this.span);
			return span ? `ciel-col-` + span : '';
		},
		style() {
			let ret = {};
			let span = Math.ceil(this.span);
			ret.width = `${100 / 24 * span}%`
			if (this.gutter) {
			  ret.paddingLeft = this.gutter / 2 + 'px';
			  ret.paddingRight = ret.paddingLeft;
			}
			return ret;
		},
		gutter() {
		  let parent = this.$parent;
		  return parent.$options.propsData.gutter ? parent.$options.propsData.gutter : 0;
		}
	},

};
</script>

<style scoped="scoped">
@import url('../../../examples/assets/styles/col.css');
</style>

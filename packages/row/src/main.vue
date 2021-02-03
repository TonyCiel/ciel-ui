<template>
	<div class="ciel-row" :style="style"><slot></slot></div>
</template>

<script>
export default {
	name: 'cielRow',
	props: {
		gutter: Number,
		justify: String,
		align: String,
		type: String
	},
	computed: {
		style() {
			const ret = {};
			if (this.gutter) {
				ret.marginLeft = `-${this.gutter / 2}px`;
				ret.marginRight = ret.marginLeft;
			}
			if (this.type === 'flex') {
				if (this.justify) {
					ret.justifyContent = this.justify;
				}
				if (this.align) {
					ret.alignItems = this.align;
				}
			}
			return ret;
		}
	}
};
</script>

<style scoped="scoped">
@import url('../../../examples/assets/styles/row.css');
</style>

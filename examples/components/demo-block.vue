<template>
	<div class="docs-demo-wrapper">
		<div class="source"><slot name="source"></slot></div>
		<div :style="{ height: isExpand ? 'auto' : '0' }" class="demo-container">
			<div span="14">
				<div class="docs-demo docs-demo--expand">
					<div class="highlight-wrapper"><slot name="highlight"></slot></div>
				</div>
			</div>
		</div>
		<span class="docs-trans docs-demo__triangle" @click="toggle">{{ isExpand ? '隐藏代码' : '显示代码' }}</span>
	</div>
</template>

<script>
export default {
	name: 'demo-block',
	data() {
		return {
			isExpand: false,
			style: ''
		};
	},
	methods: {
		toggle() {
			this.isExpand = !this.isExpand;
		}
	}
};
</script>

<style lang="less" type="text/less">
.docs-demo-wrapper {
	width: 95%;
	.source {
		padding: 32px;
		border: 1px solid #e5e5e5;
		border-radius: 4px 4px 0 0;
		background-color: #fff;
	}
	
}
.demo-block {
	overflow: auto;
	
}
.demo-container {
	transition: max-height 0.3s;
	overflow: hidden;
	
}
.docs-demo {
	width: 100%;
	height: auto;
	box-sizing: border-box;
	font-size: 14px;
	background-color: #f7f7f7;
	border-top: none;

	pre code {
		font-family: Consolas, Menlo, Courier, monospace;
		line-height: 22px;
		border: none;
	}
}
.docs-trans {
	width: 100%;
	text-align: center;
	display: inline-block;
	color: #c5d9e8;
	font-size: 12px;
	padding: 10px 0;
	border: 1px solid #e5e5e5;
	background-color: #fafbfc;
	margin-top: 10px
}
.docs-demo__code,
.highlight-wrapper,
.docs-demo__meta {
	padding: 0 20px;
	overflow-y: auto;
}
.docs-demo__code {
	border-bottom: 1px solid #eee;
}
.docs-demo.docs-demo--expand .docs-demo__meta {
	border-bottom: 1px dashed #e9e9e9;
}
.docs-demo.docs-demo--expand .docs-demo__triangle {
	transform: rotate(180deg);
}
.highlight-wrapper {
	display: none;
	padding: 24px;
	p,
	pre {
		margin: 0;
	}
	.hljs {
		padding: 0;
	}
}
.docs-demo.docs-demo--expand .highlight-wrapper {
	display: block;
}
.docs-demo__code__mobi {
	height: 620px;
	margin: 20px 0;
}
.docs-demo__code__mobi__header {
	border-radius: 4px 4px 0 0;
	background: -webkit-linear-gradient(rgba(55, 55, 55, 0.98), #545456);
	background: linear-gradient(rgba(55, 55, 55, 0.98), #545456);
	text-align: center;
	padding: 8px;
	img {
		width: 100%;
	}
	.url-box {
		height: 28px;
		line-height: 28px;
		color: #fff;
		padding: 0 3px;
		background-color: #a2a2a2;
		margin: 10px auto 0;
		border-radius: 4px;
		white-space: nowrap;
		overflow-x: auto;
	}
}
.docs-demo__code__mobi__content {
	iframe {
		width: 100%;
		border: 0;
		height: 548px;
	}
}
</style>

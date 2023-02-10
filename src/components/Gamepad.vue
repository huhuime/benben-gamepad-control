<template>
	<div>
		<v-alert border="start" variant="tonal" text="按下手柄任意键连接手柄" type="info"
			v-if="!gamepad"></v-alert>
		<svg width="100%" height="100%" viewBox="0 0 600 230" version="1.1" id="gamepadSvg"
			xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" class="text-info" v-else>
			<g id="gamepad" inkscape:label="gamepad">
				<rect id="gamepad-planle" width="580" height="210" x="10" y="10" ry="105" />
				<ellipse id="left" cx="115" cy="115" rx="80" ry="80" />
				<ellipse id="left-joystick" :cx="115 + gamepad.axes[0] * 55" :cy="115 + gamepad.axes[1] * 55" rx="50"
					ry="50" inkscape:label="left-joystick" />
				<ellipse id="right" cx="485" cy="115" rx="80" ry="78.052017" inkscape:label="right" />
				<ellipse id="right-joystick" :cx="485 + gamepad.axes[2] * 55" :cy="115 + gamepad.axes[3] * 55"
					rx="48.468613" ry="48.192989" inkscape:label="right-joystick" />
				<g :class="gamepad.axes[0] >= 0.2 || gamepad.axes[0] <= -0.2 ? 'text-success' : ''">
					<path d="M 60,115 L 170,115" class="path" id="lx-path" />
					<path d="M 60,115 L 170,115" class="path-p" id="lx" :style="strokeP(gamepad.axes[0])" />
					<text x="210" y="74">LX</text>
					<text x="210" y="104" class="subtitle">{{ gamepad.axes[0].toFixed(2) }}</text>
				</g>
				<g :class="gamepad.axes[1] >= 0.2 || gamepad.axes[1] <= -0.2 ? 'text-success' : ''">
					<path d="M 115,60 V 170" class="path" id="ly-path" />
					<path d="M 115,60 V 170" class="path-p" id="ly" :style="strokeP(gamepad.axes[1])" />
					<text x="210" y="150">LY</text>
					<text x="210" y="180" class="subtitle">{{ gamepad.axes[1].toFixed(2) }}</text>
				</g>
				<g :class="gamepad.axes[2] >= 0.2 || gamepad.axes[2] <= -0.2 ? 'text-success' : ''">
					<path d="M 430,115 L 540,115" class="path" id="rx-path" />
					<path d="M 430,115 L 540,115" class="path-p" id="rx" :style="strokeP(gamepad.axes[2])" />
					<text x="390" y="150" class="right">RY</text>
					<text x="390" y="180" class="right subtitle">{{ gamepad.axes[3].toFixed(2) }}</text>
				</g>
				<g :class="gamepad.axes[3] >= 0.2 || gamepad.axes[3] <= -0.2 ? 'text-success' : ''">
					<path d="M 485,60 V 170" class="path" id="ry-path" />
					<path d="M 485,60 V 170" class="path-p" id="ry" :style="strokeP(gamepad.axes[3])" />
					<text x="390" y="74" class="right">RX</text>
					<text x="390" y="104" class="right subtitle">{{ gamepad.axes[2].toFixed(2) }}</text>
				</g>
			</g>
		</svg>
	</div>
</template>

<script setup lang="ts" name="Gamepad">
const props = defineProps<{ gamepad: Gamepad }>()
const strokeP = (v: number) => {
	const w = v * 55, d = Math.abs(w), o = v < 0 ? w : 0;
	return {
		strokeDasharray: d + ',' + (110 - d),
		strokeDashoffset: 55 - o
	}
}

</script>
<style scoped lang='scss'>
#gamepadSvg {

	rect,
	ellipse,
	path,
	text {
		fill: none;
		stroke: currentColor;
		stroke-width: 3;
		stroke-linejoin: round;
		stroke-dasharray: none;
	}

	.path {
		opacity: 0.35;
		stroke-width: 15;
		stroke-linecap: round;
	}

	.path-p {
		stroke-width: 9;
		stroke-linecap: round;
		stroke-dasharray: 0, 110;
		stroke-dashoffset: 55;
	}

	text {
		font-size: 24px;

		&.right {
			text-anchor: end
		}

		&.subtitle {
			opacity: 0.55;
			stroke-width: 2;
		}
	}
}
</style>
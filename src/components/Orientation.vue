<template>
	<div class="orientation-plane">
		<svg width="100%" height="100%" viewBox="0 0 600 600" version="1.1" id="orientation"
			xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" class="text-info">
			<!-- <ellipse cx="300" cy="300" rx="290" ry="290" /> -->
			<ellipse cx="300" cy="300" rx="132" ry="132" />
			<path :d="getP()" class="kd" />
			<!-- <path d="M 300,10 V 168 M 10,300 H 168 M 300,432 V 590 M 432,300 H 590" /> -->
			<path d="M 300,10 V 168" :transform="`translate(300, 300) rotate(${newValue}) translate(-300, -300)`"
				class="text-success" />
			<text x="300" y="270" text-anchor="middle">躺平在笨笨上方向</text>
		</svg>
		<v-btn :icon="mdiTransferUp" :color="offset == 0 ? 'success' : 'info'" class="btn btn-up"
			@click="updateOffset(0)"></v-btn>
		<v-btn :icon="mdiTransferLeft" :color="offset == 90 ? 'success' : 'info'" class="btn btn-left"
			@click="updateOffset(90)"></v-btn>
		<v-btn :icon="mdiTransferDown" :color="offset == 180 ? 'success' : 'info'" class="btn btn-down"
			@click="updateOffset(180)"></v-btn>
		<v-btn :icon="mdiTransferRight" :color="offset == 270 ? 'success' : 'info'" class="btn btn-right"
			@click="updateOffset(270)"></v-btn>
		<v-btn color="secondary" rounded="pill" class="btn btn-redo" @click="redoAlpha">重置方向</v-btn>
	</div>
</template>

<script setup lang="ts" name="Orientation">
import { mdiTransferDown, mdiTransferLeft, mdiTransferRight, mdiTransferUp } from '@mdi/js'
const props = defineProps<{ modelValue: number, isOrientation: boolean }>()
const emit = defineEmits(["update:modelValue"])
const offset = ref(0);
const newValue = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value)
})
watch(() => props.isOrientation, v => {
	if (v) window.addEventListener('deviceorientation', fieldCentric)
	else {
		window.removeEventListener('deviceorientation', fieldCentric)
		newValue.value = 0
	}
})
function updateOffset(v: number) {
	newValue.value += offset.value - v;
	offset.value = v;
}
function redoAlpha() {
	window.removeEventListener('deviceorientation', fieldCentric)
	window.addEventListener('deviceorientation', fieldCentric)
}
function fieldCentric(e: DeviceOrientationEvent) {
	let t = (e.alpha || 0) - offset.value
	newValue.value = t
}
function getP() {
	let s = '';
	for (let i = 0; i < 360; i += 5) {
		if (i % 90 == 0) s += kd(i, 300, 300, 290, 100)
		else if (i % 30 == 0) s += kd(i, 300, 300, 290, 60)
		else s += kd(i, 300, 300, 290, 30)
	}
	return s;
}
function kd(deg: number, x0: number, y0: number, r: number, l: number) {
	deg *= 2 * Math.PI / 360
	const xa = x0 + r * Math.sin(deg), ya = y0 - r * Math.cos(deg)
	return `M ${xa},${ya} L ${xa - l * Math.sin(deg)},${ya + l * Math.cos(deg)}`
}
</script>
<style scoped lang='scss'>
.orientation-plane {
	position: relative;
}

.btn {
	position: absolute;

	&.btn-up {
		top: calc(50% - 24px - 22%);
		left: calc(50% - 24px);
	}

	&.btn-left {
		top: calc(50% - 24px);
		left: calc(50% - 24px - 22%);
	}

	&.btn-down {
		bottom: calc(50% - 24px - 22%);
		left: calc(50% - 24px);
	}

	&.btn-right {
		top: calc(50% - 24px);
		right: calc(50% - 24px - 22%);
	}

	&.btn-redo {
		bottom: calc(50% - 18px - 8%);
		left: calc(50% - 47.125px);
	}
}

#orientation {

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

	path {
		stroke-linecap: round;

		&.kd {
			opacity: 0.35;
			stroke-width: 15;
		}

		&.text-success {
			stroke-width: 9;
		}
	}

	ellipse {
		opacity: 0.35;
		stroke-width: 15;
	}


	text {
		fill: currentColor;
		stroke-width: 1.5;
		font-size: 30px;
	}
}
</style>
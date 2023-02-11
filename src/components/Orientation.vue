<template>
	<div class="orientation-plane">
		<svg width="100%" height="100%" viewBox="0 0 600 600" version="1.1" id="orientation"
			xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" class="text-info">
			<!-- <ellipse cx="300" cy="300" rx="290" ry="290" /> -->
			<ellipse cx="300" cy="300" rx="132" ry="132" />
			<path d="M 300.000,10.000 L 300.000,110.000M 325.275,11.104 L 322.660,40.989M 350.358,14.406 L 345.149,43.950M 375.058,19.882 L 367.293,48.859M 399.186,27.489 L 388.925,55.680M 422.559,37.171 L 409.881,64.360M 445.000,48.853 L 415.000,100.814M 466.337,62.446 L 449.130,87.020M 486.408,77.847 L 467.125,100.828M 505.061,94.939 L 483.848,116.152M 522.153,113.592 L 499.172,132.875M 537.554,133.663 L 512.980,150.870M 551.147,155.000 L 499.186,185.000M 562.829,177.441 L 535.640,190.119M 572.511,200.814 L 544.320,211.075M 580.118,224.942 L 551.141,232.707M 585.594,249.642 L 556.050,254.851M 588.896,274.725 L 559.011,277.340M 590.000,300.000 L 490.000,300.000M 588.896,325.275 L 559.011,322.660M 585.594,350.358 L 556.050,345.149M 580.118,375.058 L 551.141,367.293M 572.511,399.186 L 544.320,388.925M 562.829,422.559 L 535.640,409.881M 551.147,445.000 L 499.186,415.000M 537.554,466.337 L 512.980,449.130M 522.153,486.408 L 499.172,467.125M 505.061,505.061 L 483.848,483.848M 486.408,522.153 L 467.125,499.172M 466.337,537.554 L 449.130,512.980M 445.000,551.147 L 415.000,499.186M 422.559,562.829 L 409.881,535.640M 399.186,572.511 L 388.925,544.320M 375.058,580.118 L 367.293,551.141M 350.358,585.594 L 345.149,556.050M 325.275,588.896 L 322.660,559.011M 300.000,590.000 L 300.000,490.000M 274.725,588.896 L 277.340,559.011M 249.642,585.594 L 254.851,556.050M 224.942,580.118 L 232.707,551.141M 200.814,572.511 L 211.075,544.320M 177.441,562.829 L 190.119,535.640M 155.000,551.147 L 185.000,499.186M 133.663,537.554 L 150.870,512.980M 113.592,522.153 L 132.875,499.172M 94.939,505.061 L 116.152,483.848M 77.847,486.408 L 100.828,467.125M 62.446,466.337 L 87.020,449.130M 48.853,445.000 L 100.814,415.000M 37.171,422.559 L 64.360,409.881M 27.489,399.186 L 55.680,388.925M 19.882,375.058 L 48.859,367.293M 14.406,350.358 L 43.950,345.149M 11.104,325.275 L 40.989,322.660M 10.000,300.000 L 110.000,300.000M 11.104,274.725 L 40.989,277.340M 14.406,249.642 L 43.950,254.851M 19.882,224.942 L 48.859,232.707M 27.489,200.814 L 55.680,211.075M 37.171,177.441 L 64.360,190.119M 48.853,155.000 L 100.814,185.000M 62.446,133.663 L 87.020,150.870M 77.847,113.592 L 100.828,132.875M 94.939,94.939 L 116.152,116.152M 113.592,77.847 L 132.875,100.828M 133.663,62.446 L 150.870,87.020M 155.000,48.853 L 185.000,100.814M 177.441,37.171 L 190.119,64.360M 200.814,27.489 L 211.075,55.680M 224.942,19.882 L 232.707,48.859M 249.642,14.406 L 254.851,43.950M 274.725,11.104 L 277.340,40.989" class="kd" />
			<path d="M 300,10 V 168" :transform="`translate(300, 300) rotate(${newValue+90}) translate(-300, -300)`"
				class="text-success" />
			<text x="300" y="270" text-anchor="middle">设置方向与笨笨头向</text>
			<text x="300" y="310" text-anchor="middle">及手柄朝向一致</text>
		</svg>
		<v-btn :icon="mdiTransferUp" :color="offset == 90 ? 'success' : 'info'" class="btn btn-up"
			@click="updateOffset(90)"></v-btn>
		<v-btn :icon="mdiTransferLeft" :color="offset == 180 ? 'success' : 'info'" class="btn btn-left"
			@click="updateOffset(180)"></v-btn>
		<v-btn :icon="mdiTransferDown" :color="offset == 270 ? 'success' : 'info'" class="btn btn-down"
			@click="updateOffset(270)"></v-btn>
		<v-btn :icon="mdiTransferRight" :color="offset == 0 ? 'success' : 'info'" class="btn btn-right"
			@click="updateOffset(0)"></v-btn>
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
	newValue.value = (e.alpha || 0) - offset.value
}

//生成刻度
// function getP() {
// 	let s = '';
// 	for (let i = 0; i < 360; i += 5) {
// 		if (i % 90 == 0) s += kd(i, 300, 300, 290, 100)
// 		else if (i % 30 == 0) s += kd(i, 300, 300, 290, 60)
// 		else s += kd(i, 300, 300, 290, 30)
// 	}
// 	return s;
// }
// function kd(deg: number, x0: number, y0: number, r: number, l: number) {
// 	deg *= 2 * Math.PI / 360
// 	const n=3
// 	const xa = x0 + r * Math.sin(deg), ya = y0 - r * Math.cos(deg)
// 	return `M ${xa.toFixed(n)},${ya.toFixed(n)} L ${(xa - l * Math.sin(deg)).toFixed(n)},${(ya + l * Math.cos(deg)).toFixed(n)}`
// }
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
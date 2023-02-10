<template>
	<div>
		<v-alert border="start" variant="tonal" text="等待连接笨笨" type="info" v-if="!isConnected">
			<v-btn variant="tonal" density="compact"
				@click="bleLoading = true; requestDevice().finally(() => bleLoading = false);" :loading="bleLoading">连接</v-btn>
		</v-alert>
		<v-alert border="start" variant="tonal" text="此浏览器不支持连接蓝牙设备" type="error" v-else-if="!isSupported"></v-alert>
		<svg width="100%" height="100%" viewBox="0 0 600 230" version="1.1" id="mecanumSvg"
			xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" class="text-info">
			<g id="w-a" :class="power.a != 0 ? 'text-success' : ''">
				<rect width="50" height="100" x="10" y="10" ry="10" />
				<path d="M 60,20 L 10,40 L 60,40,L 10,60 L 60,60 L 10,80 L 60,80 L 10,100" class="wheel" />
				<path d="M 77.5,17.5 v 85" class="path" />
				<path d="M 77.5,17.5 v 85" class="path-h" :style="strokeH(power.a)" />
				<text x="93.5" y="34">A</text>
				<text x="93.5" y="64" class="subtitle">{{(power.a * 127).toFixed(0)}}</text>
			</g>
			<g id="w-d" :class="power.d != 0 ? 'text-success' : ''">
				<rect width="50" height="100" x="10" y="120" ry="10" />
				<path d="M 10,130 L 60,150 L 10,150,L 60,170 L 10,170 L 60,190 L 10,190 L 60,210" class="wheel" />
				<path d="M 77.5,127.5 v 85" class="path" />
				<path d="M 77.5,127.5 v 85" class="path-h" :style="strokeH(power.d)" />
				<text x="93.5" y="144">D</text>
				<text x="93.5" y="174" class="subtitle">{{(power.d * 127).toFixed(0)}}</text>
			</g>
			<g id="w-b" :class="power.b != 0 ? 'text-success' : ''">
				<rect width="50" height="100" x="540" y="10" ry="10" />
				<path d="M 540,20 L 590,40 L 540,40,L 590,60 L 540,60 L 590,80 L 540,80 L 590,100" class="wheel" />
				<path d="M 522.5,17.5 v 85" class="path" />
				<path d="M 522.5,17.5 v 85" class="path-h" :style="strokeH(power.b)" />
				<text x="506.5" y="34" class="right">B</text>
				<text x="506.5" y="64" class="subtitle right">{{(power.b * 127).toFixed(0)}}</text>
			</g>
			<g id="w-c" :class="power.c != 0 ? 'text-success' : ''">
				<rect width="50" height="100" x="540" y="120" ry="10" />
				<path d="M 590,130 L 540,150 L 590,150,L 540,170 L 590,170 L 540,190 L 590,190 L 540,210"
					class="wheel" />
				<path d="M 522.5,127.5 v 85" class="path" />
				<path d="M 522.5,127.5 v 85" class="path-h" :style="strokeH(power.c)" />
				<text x="506.5" y="144" class="right">C</text>
				<text x="506.5" y="174" class="subtitle right">{{(power.c * 127).toFixed(0) }}</text>
			</g>
			<text x="300" y="115" class="subtitle middle" style="font-size: 19px; stroke-width: 1;">{{ bleStr }}</text>
		</svg>
		<v-chip prepend-icon="mdi-bluetooth" color="success" v-if="isConnected">已连接笨笨({{ device?.name }})</v-chip>
		<v-chip prepend-icon="mdi-timer-outline" color="info" v-if="bleTimeOut > 0">{{ bleTimeOut }}ms</v-chip>
	</div>
</template>

<script setup lang="ts" name="Mecanum">
import { pausableWatch, useBluetooth, useIntervalFn, useTimeoutFn } from '@vueuse/core'
const props = defineProps<{ power: { a: number, b: number, c: number, d: number }/*, bleStr: string*/ }>()
const strokeH = (v: number) => {
	const w = v * 42.5, d = Math.abs(w), o = v < 0 ? w : 0;
	return {
		strokeDasharray: d + ',' + (85 - d),
		strokeDashoffset: 42.5 - o
	}
}
const bleStr = ref('')
const bleTimeOut = ref(0)
const bleLoading = ref(false)
//ccd03a02 8080808080808080808080800c33
//↑ccd03a02 fefefe0280808080808080800833
//→ccd03a02 02fe020280808080808080801033
//↓ccd03a02 020202fe80808080808080801033
//←ccd03a02 fe02fefe80808080808080800833
//右ccd03a02ff01010180808080808080800e33
//左ccd03a0201ffffff80808080808080800a33

let wheelDataInit = new Uint8Array([0xcc, 0xd0, 0x3a, 2, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x33])
function getWheelData({ a, b, c, d }: { a: number; b: number; c: number; d: number; }) {
	wheelDataInit.set([128 - a * 127, 128 - b * 127, 128 - c * 127, 128 + d * 127], 4)
	let n = wheelDataInit[1], l = wheelDataInit.length - 2;
	for (let i = 2; i < l; i++) {
		n += wheelDataInit[i];
	}
	wheelDataInit[l] = n;
	console.log(wheelDataInit[l].toString(16))
	return wheelDataInit;
}
const toHexString = (bytes: Uint8Array) =>
	bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
const {
	isSupported,
	isConnected,
	device,
	requestDevice,
	server,
} = useBluetooth({
	// filters: [{
	// 	services: ["0000ae3a-0000-1000-8000-00805f9b34fb","0000af30-0000-1000-8000-00805f9b34fb"]
	// }], 
	acceptAllDevices: true,
	optionalServices: ["0000ae3a-0000-1000-8000-00805f9b34fb"]
})
// const { stop } = 
pausableWatch(isConnected, (newIsConnected) => {
	console.log(newIsConnected, server.value)
	if (!newIsConnected || !server.value)
		return
	runController();
	//stop()
})
let isStop = false;
const { isPending, start, stop } = useTimeoutFn(async () => {
	if (!isConnected.value) {
		stop();
		bleStr.value = '';
		bleTimeOut.value = 0;
		return;
	}
	//停止后不再发出
	if (props.power.a + props.power.b + props.power.c + props.power.d == 0) {
		if (isStop) {
			start();
			return;
		}
		isStop = true;
	} else {
		isStop = false;
	}
	const t = Date.now();
	const data = getWheelData(props.power);
	await ControllerCharacteristic?.writeValue(data)
	bleStr.value = toHexString(data);
	bleTimeOut.value = Date.now() - t;
	start();
}, 10)
let ControllerCharacteristic: BluetoothRemoteGATTCharacteristic | undefined
const runController = async () => {
	const ControllerService = await server.value?.getPrimaryService("0000ae3a-0000-1000-8000-00805f9b34fb")
	ControllerCharacteristic = await ControllerService?.getCharacteristic('0000ae3b-0000-1000-8000-00805f9b34fb')
	if (ControllerCharacteristic) start()//resume()
}
</script>
<style scoped lang='scss'>
#mecanumSvg {

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

	.path-h {
		stroke-width: 9;
		stroke-linecap: round;
		stroke-dasharray: 0, 85;
		stroke-dashoffset: 42.5;
	}

	.wheel {
		stroke-dasharray: 53.851646423339844, 50;
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

		&.middle {
			dominant-baseline: middle;
			text-anchor: middle;
		}
	}
}
</style>
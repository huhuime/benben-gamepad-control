<script setup lang="ts">
import Gamepad from './components/Gamepad.vue';
import Mecanum from './components/Mecanum.vue';

import { useGamepad } from '@vueuse/core'
const { isSupported, gamepads } = useGamepad()
const gamepad: any = computed(() => gamepads.value.find(g => g.mapping === 'standard'))
const power = computed(() => controllerWheel(gamepad.value))
function controllerWheel(gp: Gamepad) {
	if (!isSupported || !gp) return { a: 0, b: 0, c: 0, d: 0 };
	let x = gp.axes[0], y = gp.axes[1], rx = gp.axes[2]
	x = Math.abs(x) >= 0.2 ? -x * 1.1 : 0;
	y = Math.abs(y) >= 0.2 ? y : 0
	rx = Math.abs(rx) >= 0.2 ? -rx : 0
	const denominator = Math.max(Math.abs(y) + Math.abs(x) + Math.abs(rx), 1),
		b = (y + x + rx) / denominator,
		c = (y - x + rx) / denominator,
		a = (y - x - rx) / denominator,
		d = (y + x - rx) / denominator;
	return { a, b, c, d }
}
// let wheelDataInit = new Uint8Array([0xcc, 0xd0, 0x3a, 2, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x33])
// const wheelData = computed(() => getWheelData(power.value));
// function getWheelData({ a, b, c, d }: { a: number; b: number; c: number; d: number; }) {
// 	wheelDataInit.set([128 - a*127, 128 - b*127, 128 - c*127, 128 + d*127], 4)
// 	let n = wheelDataInit[1], l = wheelDataInit.length - 2;
// 	for (let i = 2; i < l; i++) {
// 		n += wheelDataInit[i];
// 	}
// 	wheelDataInit[l] = n;
// 	return wheelDataInit;
// }
// const toHexString = (bytes:Uint8Array) =>
//   bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
// const bleStr=computed(()=>toHexString(wheelData.value))
</script>

<template>
	<v-app>
		<v-main>
			<v-container>
				<v-row no-gutters>
					<v-col class="v-col-xs-12" xs="12">
						<v-sheet>
							<Gamepad :gamepad="gamepad" />
						</v-sheet>
					</v-col>
					<v-col class="v-col-xs-12" xs="12">
						<v-sheet>
							<Mecanum :power="power" />
						</v-sheet>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<style scoped lang="scss">
@media (max-width: 600px) {
	.v-col-xs-12 {
		flex: 0 0 100%;
		max-width: 100%;
	}
}
</style>

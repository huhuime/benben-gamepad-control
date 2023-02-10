<script setup lang="ts">
import Gamepad from './components/Gamepad.vue';
import Mecanum from './components/Mecanum.vue';

import { useGamepad } from '@vueuse/core'
const { isSupported, gamepads } = useGamepad()
const gamepad: any = computed(() => gamepads.value.find(g => g.mapping === 'standard'))
const power = computed(() => controllerWheel(gamepad.value))
function addPower(n: number) {
	n = n > 0 ? (n * 0.5 + 0.5) : (n * 0.5 - 0.5)
	return n > 1 ? 1 : (n < -1 ? -1 : n)
}
function controllerWheel(gp: Gamepad) {
	if (!isSupported || !gp) return { a: 0, b: 0, c: 0, d: 0 };
	let x = gp.axes[0], y = gp.axes[1], rx = gp.axes[2]
	x = Math.abs(x) >= 0.2 ? -x * 1.1 : 0;
	y = Math.abs(y) >= 0.2 ? y : 0
	rx = Math.abs(rx) >= 0.2 ? -rx : 0
	const denominator = Math.max(Math.abs(y) + Math.abs(x) + Math.abs(rx), 1),
		b = addPower((y + x + rx) / denominator),
		c = addPower((y - x + rx) / denominator),
		a = addPower((y - x - rx) / denominator),
		d = addPower((y + x - rx) / denominator);
	return { a, b, c, d }
}
</script>

<template>
	<v-app>
		<v-main>
			<v-container>
				<v-row no-gutters class="row">
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
.row{
	gap: 5px;
}
@media (max-width: 600px) {
	.v-col-xs-12 {
		flex: 0 0 100%;
		max-width: 100%;
	}
}
</style>

<script setup lang="ts">
import BenBen from './components/BenBen.vue';
// import Gamepad from './components/Gamepad.vue';
// import Mecanum from './components/Mecanum.vue';
// import Orientation from './components/Orientation.vue';

import { useGamepad, useDeviceOrientation } from '@vueuse/core'
const { isSupported, gamepads } = useGamepad()
const gamepad: any = computed(() => gamepads.value.find(g => g.mapping === 'standard')), isOrientation = ref(false), isTest = ref(false), alpha = ref(0)

</script>

<template>
	<v-app>
		<v-main>
			<BenBen :gamepad="gamepad" />
			<!-- <v-row justify="center" class="row" v-if="false">
				<v-col class="v-col-xs-12" xs="12" sm="6" md="4">
					<v-sheet>
						<Gamepad :gamepad="gamepad" />
					</v-sheet>
				</v-col>
				<v-col class="v-col-xs-12" xs="12" sm="6" md="4">
					<v-sheet>
						<Mecanum :gamepad="gamepad" :is-orientation="isOrientation" :is-test="isTest" :alpha="alpha" />
					</v-sheet>
				</v-col>
				<transition name="slide-y-transition">
					<v-col class="v-col-xs-12" xs="12" sm="6" md="4" v-show="isOrientation">
						<v-sheet>
							<Orientation v-model="alpha" :is-orientation="isOrientation" />
						</v-sheet>
					</v-col>
				</transition>
				<v-col class="v-col-xs-12" xs="12" sm="6" md="4">
					<v-row no-gutters>
						<v-switch v-model="isOrientation" color="info" hide-details inset
							label="移动设备躺平在笨笨上确定方向"></v-switch>
						<v-switch v-model="isTest" color="info" hide-details inset label="测试模式"></v-switch>
					</v-row>
				</v-col>
			</v-row> -->
		</v-main>
	</v-app>
</template>

<style scoped lang="scss">
.row {
	max-width: 1600px;
	margin: 0 auto;
}

// .v-col-xs-12 {
// 	.v-sheet {
// 		padding: 2px;
// 	}
// }

@media (max-width: 600px) {
	.v-col-xs-12 {
		flex: 0 0 100%;
		max-width: 100%;
	}
}

@media (min-width: 1264px) {
	.v-col-xs-12 {
		flex: 1 0 0;
		max-width: 100%;
	}
}
</style>

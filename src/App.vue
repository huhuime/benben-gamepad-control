<script setup lang="ts">
import Gamepad from './components/Gamepad.vue';
import Mecanum from './components/Mecanum.vue';

import { useGamepad } from '@vueuse/core'
const { isSupported, gamepads } = useGamepad()
const gamepad: any = computed(() => gamepads.value.find(g => g.mapping === 'standard'))

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
							<Mecanum :gamepad="gamepad" />
						</v-sheet>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<style scoped lang="scss">
.row {
	gap: 5px;
}

@media (max-width: 600px) {
	.v-col-xs-12 {
		flex: 0 0 100%;
		max-width: 100%;
	}
}
</style>

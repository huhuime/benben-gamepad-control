<template>
	<div class="sensor">
		<v-btn color="teal" :variant="isConnected ? 'tonal' : 'text'" rounded @click="connectSensor">
			{{ isConnected ? device?.name : '添加传感器' }}
			<v-btn color="teal" :variant="isConnected ? 'elevated' : 'tonal'" :icon="mdiRotateOrbit" :loading="isLoading" />
		</v-btn>
	</div>
</template>

<script setup lang="ts" name="Sensor">
import { mdiRotateOrbit } from '@mdi/js'
import { useBluetooth, pausableWatch, resolveUnref } from '@vueuse/core'
const emit = defineEmits(['z'])
const config = {
	companyIdentifier: 0xccdd,//厂商ID
	optionalServices: '0000ae30-0000-1000-8000-00805f9b34fb',//获取数据
	write: '0000ae01-0000-1000-8000-00805f9b34fb',//写入设置
	notify: '0000ae02-0000-1000-8000-00805f9b34fb',//接收数据
	connected: 0x29,//保持连接
	sensorData: {
		prefix: 0x11,//传感数据头,
		eulerAnglesZslice: [7 + 4, 7 + 4 + 2],//欧拉角Z数据起始位置
		eulerAngles: 0.0054931640625,//转换为度数
		clockwise: -1,//顺时针旋转增加值：1，逆时针旋转增加值：-1
	},
	configData: {
		prefix: 0x10, //参数数据头
		send: {//回传设置
			slice: [0, 11],//截取内容回传
			prefix: 0x12,//数据头
			data: [[9, 0x40]]//需设置的值，[下标，值]
		},
	},
	close: 0x2b//断开连接
}, isLoading = ref(false), connectSensor = () => {
	if (isConnected.value || isLoading.value) return;
	isLoading.value = true;
	requestDevice().then(e => { if (!device.value) isLoading.value = false }).catch(() => isLoading.value = false);
};
const {
	isSupported: isBluetoothSupported,
	isConnected,
	device,
	requestDevice,
	server,
} = useBluetooth({
	filters: [{
		manufacturerData: [{ companyIdentifier: config.companyIdentifier }]
	}],
	optionalServices: [config.optionalServices]
})
let w: BluetoothRemoteGATTCharacteristic | undefined, n;
pausableWatch(isConnected, (newIsConnected) => {
	console.log(newIsConnected, server.value)
	if (!newIsConnected || !server.value) return;
	run();
})
interface BluetoothRemoteGATTCharacteristicEvent extends Event {
	target: BluetoothRemoteGATTCharacteristic
}
async function run() {
	try {
		const ops = await server.value?.getPrimaryService(config.optionalServices)
		w = await ops?.getCharacteristic(config.write);
		//window.xw = w;
		w?.writeValueWithoutResponse(new Uint8Array([config.connected]))
		n = await ops?.getCharacteristic(config.notify)
		n?.addEventListener("characteristicvaluechanged", (event) => {
			if (!event.target) return;
			const characteristic = (event.target as BluetoothRemoteGATTCharacteristic), v = characteristic.value;
			if (!v) return;
			const type = v.getInt8(0)
			if (type == config.sensorData.prefix) {
				if (v.byteLength < config.sensorData.eulerAnglesZslice[1]) {
					//w?.writeValueWithoutResponse(new Uint8Array([0x10]))
					console.log('errData', v)
					return;
				} else {
					const z = new Int16Array(v.buffer.slice(config.sensorData.eulerAnglesZslice[0], config.sensorData.eulerAnglesZslice[1]))[0] * config.sensorData.eulerAngles;
					emit('z', z)
					//console.log('11Data', t0[0].toString(2), new Uint32Array(v.buffer.slice(3, 7))[0], z, toHexString(new Uint8Array(v.buffer)))
					return;
				}
			}
			//110200e0823300f1ff2c000508
			const data = new Uint8Array(v.buffer)
			console.log(toHexString(data))
			switch (type) {
				case config.configData.prefix:
					const t = data.slice(...config.configData.send.slice)
					//t[9] = 0x40;
					//t[10] = 0;
					for (let item of config.configData.send.data) {
						t[item[0]] = item[1]
					}
					t[0] = config.configData.send.prefix;
					w?.writeValueWithoutResponse(t)
			}
			//console.log(v.buffer)

			//characteristic?.readValue().then(e=>console.log);

		})
		await n?.startNotifications().then(() => w?.writeValueWithoutResponse(new Uint8Array([config.configData.prefix])));
	} catch (e: any) {
		console.error(e)
		alert(e.toString())
	} finally {
		isLoading.value = false;
	}
}
const toHexString = (bytes: Uint8Array) =>
	bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
</script>
<style scoped lang='scss'>
.sensor {
	position: fixed;
	z-index: 999;
	right: 0;
	bottom: 8px;

	&>button {
		display: block;
		margin-bottom: 8px;
		padding-right: 0;
		height: auto;
		backdrop-filter: blur(5px);
	}
}
</style>
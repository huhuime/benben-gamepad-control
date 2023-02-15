<template>
	<div>
		<v-toolbar class="toolbar" density="compact" v-if="!isShowNav">
			<v-row no-gutters justify="center" class="v-btn-group v-btn-group--density-default v-btn-toggle">
				<v-btn color="teal" :variant="isOrientation ? 'flat' : 'text'"
					@click="isOrientation = !isOrientation; setRectify(); isOrientationBanner = isOrientation">
					<template v-slot:prepend>
						<v-icon class="prepend" :icon="isOrientation ? mdiCompass : mdiCompassOffOutline"></v-icon>
					</template>
					{{ isOrientation?'感知中': '开启移动设备感知方向' }}
				</v-btn>
				<v-btn v-if="isOrientation" variant="tonal" color="teal" @click="setRectify">
					<template v-slot:prepend>
						<v-icon class="prepend" :icon="mdiGamepadCircleDown"></v-icon>
					</template>
					重置方向传感器或按
					<v-icon :icon="mdiAlphaACircleOutline" size="small"></v-icon>
				</v-btn>
				<v-btn color="cyan" :variant="isTest ? 'flat' : 'text'" @click="isTest = !isTest; setTest(isTest)">
					<template v-slot:prepend>
						<v-icon class="prepend" :icon="isTest ? mdiBug : mdiBugOutline"></v-icon>
					</template>
					测试模式
				</v-btn>
			</v-row>
		</v-toolbar>
		<div class="nav" v-if="isShowNav">
			<div class="text-teal">
				<v-btn color="teal" :variant="isOrientation ? 'elevated' : 'tonal'"
					:icon="isOrientation ? mdiCompass : mdiCompassOffOutline"
					@click="isOrientation = !isOrientation; setRectify(); isOrientationBanner = isOrientation">
				</v-btn>
				{{ isOrientation?'感知中': '开启移动设备感知方向' }}
			</div>
			<div v-if="isOrientation" class="text-teal">
				<v-btn variant="tonal" color="teal" @click="setRectify" :icon="mdiGamepadCircleDown">
				</v-btn>
				重置方向传感器或按<v-icon :icon="mdiAlphaACircleOutline" size="small"></v-icon>
			</div>
			<div class="text-cyan">
				<v-btn color="cyan" :variant="isTest ? 'elevated' : 'tonal'" :icon="isTest ? mdiBug : mdiBugOutline"
					@click="isTest = !isTest; setTest(isTest)">
				</v-btn>
				测试模式
			</div>
		</div>
		<v-banner v-if="isOrientationBanner && !yetIsOrientationBanner" color="teal" :icon="mdiController" sticky
			:style="{ zIndex: 999, top: (isShowNav ? 0 : 48) + 'px' }">
			<v-banner-text>
				使用移动设备躺平在笨笨需按如图<b class="text-teal">此颜色<v-icon :icon="mdiCellphone"
						size="small"></v-icon></b>放置移动设备,手柄与笨笨头朝向一致后重置方向传感器,之后手柄朝向方向不改变（因未获取手柄传感器）左摇杆可指哪走哪不用在意笨笨头朝哪，如需改变则进行如上操作重置方向传感器。
			</v-banner-text>
			<v-banner-actions>
				<v-btn variant="outlined" @click="setRectify">重置方向传感器</v-btn>
				<v-btn variant="plain" @click="yetIsOrientationBanner = true">不在提醒</v-btn>
				<v-btn @click="isOrientationBanner = false">稍后</v-btn>
			</v-banner-actions>
		</v-banner>
		<v-row no-gutters align="center" justify="center" class="benben">
			<svg width="100%" height="100%" viewBox="0 0 264.58333 264.58333" version="1.1" id="benben"
				class="text-info" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
				<g class="platform"
					:transform="`translate(132.29167, 132.29167) rotate(${offset - angle}) translate(-132.29167, -132.29167)`">
					<g id="benben" transform="translate(0.40443142,28.494763)" style="display:inline">
						<g class="wheel" :class="(isConnected || isTest) ? '' : 'text-grey'">
							<g id="wheel-d" transform="translate(0,132.69382)" :class="power.d != 0 && 'text-success'">
								<path
									d="M 41.123801,51.839613 50.968427,38.882746 M 30.690059,52.394768 50.882206,25.819157 M 4.0005037,34.941633 12.891451,23.239937 M 20.774986,52.386595 42.894692,23.274054 M 10.792761,52.386603 32.912467,23.274062 M 4.2314053,47.758211 22.817478,23.296411 M 3.9687499,25.929166 v 23.8125 l 5.2916666,2.645833 H 46.037499 l 5.291667,-2.645833 v -23.8125 L 46.037499,23.283333 H 9.2604165 Z"
									class="wheel-back" />
								<path d="M 5.5563664,74.952039 H 49.242266" class="power-back" />
								<path d="M 49.242316,74.952083 H 5.5564164" class="power" :style="strokeH(power.d)" />
							</g>
							<g id="wheel-c" :class="power.c != 0 && 'text-success'">
								<path
									d="M 41.070924,23.764464 51.125986,36.998292 M 30.690059,23.280042 50.882206,49.855653 M 4.2585936,41.073133 12.612152,52.067552 M 20.774986,23.288215 42.894692,52.400756 M 10.792761,23.288207 32.912467,52.400748 M 4.2847199,27.988316 22.521534,51.990444 M 3.9687499,25.929166 v 23.8125 l 5.2916666,2.645833 H 46.037499 l 5.291667,-2.645833 v -23.8125 L 46.037499,23.283333 H 9.2604165 Z"
									class="wheel-back" />
								<path d="M 5.5563664,-0.052055 H 49.242266" class="power-back" />
								<path d="M 49.242316,-0.052011 H 5.5564164" class="power" :style="strokeH(power.c)" />
							</g>
							<g id="wheel-b" transform="translate(208.63162)" :class="power.b != 0 && 'text-success'">
								<path
									d="M 40.66009,52.446168 51.087466,38.722323 M 30.690059,52.394768 50.882206,25.819157 M 4.2235543,34.657925 12.6684,23.523645 m 8.106586,28.86295 22.119706,-29.112541 M 10.792761,52.386603 32.912467,23.274062 M 4.2267105,47.762906 22.58948,23.595003 M 3.9687499,25.929166 v 23.8125 l 5.2916666,2.645833 H 46.037499 l 5.291667,-2.645833 v -23.8125 L 46.037499,23.283333 H 9.2604165 Z"
									class="wheel-back" />
								<path d="M 5.5563751,-0.052055 H 49.242275" class="power-back" />
								<path d="M 49.242325,-0.052011 H 5.5564251" class="power" :style="strokeH(power.b)" />
							</g>
							<g id="wheel-a" transform="translate(208.63162,132.69383)"
								:class="power.a != 0 && 'text-success'">
								<path
									d="M 40.794108,52.044626 51.074528,38.492502 M 30.586583,52.291389 50.778733,25.715779 M 4.1229199,34.64268 12.562076,23.332128 m 8.109437,28.951081 22.1197,-29.11254 m -32.10193,29.11255 22.11971,-29.11254 m -28.9437204,2.65511 v 23.8125 l 5.29167,2.64583 H 45.934023 l 5.29167,-2.64583 v -23.8125 l -5.29167,-2.64584 H 9.1569426 Z m -0.03451,22.21822 18.8771204,-24.84486"
									class="wheel-back" />
								<path d="M 5.5563751,74.952029 H 49.242265" class="power-back" />
								<path d="M 49.242315,74.952079 H 5.5564251" class="power" :style="strokeH(power.a)" />
							</g>
						</g>
						<path id="box"
							d="M 109.26013,196.41719 C 108.2029,196.34579 108.13194,196.15914 108.00494,194.86782 V 194.0441 H 99.375528 V 189.14103 H 78.449201 V 199.41787 L 75.62503,202.24204 H 34.203851 V 205.06621 H 29.026204 V 202.39894 H 10.512193 V 188.43498 H 40.322888 V 149.83797 H 45.814334 V 137.1292 H 40.636687 V 71.231876 H 45.971232 V 58.993798 H 39.50196 L 39.668376,20.857458 10.595145,20.663306 V 6.5456916 H 28.457117 V 4.6596448 H 33.616011 V 6.6566356 H 74.720732 L 77.522066,9.4579695 V 18.749523 H 98.961981 V 14.089879 H 107.00541 V 13.035911 C 107.30878,11.54866 107.58863,11.341443 109.00517,11.139794 123.97918,11.126984 138.9463,11.113904 155.2902,11.061334 155.82823,11.314989 156.40901,11.397601 156.66305,12.78722 V 14.277755 H 164.62565 V 18.743348 H 186.23835 L 186.2384,9.6100272 189.04296,6.8054682 H 230.876 V 4.824626 H 235.38683 V 6.8643052 H 253.3517 V 20.082996 H 218.44859 V 22.743505 H 215.78593 V 24.851439 L 215.78596,29.400235 241.9687,29.40014 V 35.834888 H 244.40947 V 39.939814 H 242.74531 V 41.271139 H 247.18307 V 53.807804 H 242.63436 V 56.470457 H 236.19962 V 62.79426 H 248.51439 V 71.004112 H 254.94914 V 77.43886 H 250.95516 V 95.189888 H 249.18006 V 130.24817 H 254.06159 V 137.9033 H 249.18006 V 145.66937 H 236.64339 V 151.43846 H 242.52342 V 155.09961 H 246.96118 V 167.19249 H 242.30153 L 242.29653,168.95964 244.5436,168.94354 244.5713,172.51776 H 242.52382 V 177.3993 178.73062 L 218.8927,178.73054 218.89276,183.94499 H 215.4535 V 185.72009 H 218.44899 V 187.93897 H 253.8401 V 201.75149 L 235.6453,201.77919 V 204.13675 H 230.65282 V 201.807 H 189.15979 L 186.27525,198.92246 186.27513,189.17523 H 164.83534 L 164.89084,193.98542 156.78116,194.04092 V 195.27966 C 156.58111,196.42108 155.91009,196.30144 154.82973,196.41718 Z"
							class="text-grey" />
						<path class="box-in text-grey"
							d="m 99.371942,189.17518 65.525128,5e-5 M 98.992982,18.743472 164.65947,18.743348 m 53.80706,1.329752 h -32.22818 v -1.308183 m 32.27984,169.151623 h -32.24306 v 1.27191 M 78.475477,189.16002 H 40.321989 v -0.74306 M 77.547361,18.743472 H 39.65295 v 2.166007 M 236.63958,145.68385 h -6.36903 m 5.94443,-82.933796 h -6.1264 M 218.78822,166.24645 H 112.03943 m 106.70589,-5.46864 H 111.08831 m 107.65701,-6.15489 H 152.7357 m 89.78764,17.94731 h -130.7318 m -10.01063,-35.53272 v 12.00955 m 56.26188,-11.87041 v 11.88884 m -5.24687,0 h 24.86953 M 158.26868,59.018347 V 71.542589 M 101.69209,59.444225 v 12.040489 m 10.00846,-36.000121 h 130.26171 m -89.19667,18.500468 h 65.69194 m 0.091,-6.702639 H 111.70055 M 218.65466,41.322836 H 111.70055 M 177.52684,59.10413 152.7786,59.061238 M 218.8927,178.73054 H 111.77457 v -6.47932 h -2.31613 v -3.60287 h 2.57348 v -2.40191 h -0.94361 v -14.06832 h 18.1001 v 3.00238 h 23.59019 v -6.09055 H 95.647464 V 137.0804 h 72.400416 v 5.49008 h 9.69342 l -0.0759,6.34787 h 13.45791 M 215.78596,29.400235 H 111.68879 v 6.638274 h -2.33757 v 3.807453 l 2.33761,0.0049 v 15.82195 h 18.01428 v -2.659256 h 23.07549 v 6.433685 H 95.218553 v 12.095332 h 72.486197 v -6.262121 h 9.7792 v -6.262121 h 40.91824 v -7.119946 h 1.80144 v -4.632256 h -1.62987 v -6.004772 h 5.83321 v 7.29151 h -0.68626 v 5.318513 h 1.37252 v 2.316129 h 4.97538 V 71.11366 h -2.9166 v 65.70937 h 3.08817 v 14.49724 h -4.97539 v 3.4313 h -1.4583 v 4.8896 h 0.94361 v 6.60526 h -6.00478 v -5.49008 h 1.54409 v -3.68865 h -1.54409 v -8.40668 h -11.66641 v -2.4877 h -15.95555 v 2.74505 " />
						<g class="phone text-teal" v-if="isOrientation">
							<g id="portrait" v-if="offset == 90 || offset == 270"
								transform="matrix(0.5,0,0,0.5,55.153247,37.651075)">
								<rect class="phone-back" width="50.440094" height="124.55617" x="78.576714"
									y="-223.54903" ry="3.7744291" transform="matrix(0,2,-2,0,-110.30649,-75.302152)" />
								<rect style="fill:currentColor;stroke:none;" width="20.368849" height="38.360516"
									x="231.85388" y="113.1114" ry="3.54285" class="text-success" />
								<circle style="fill:#ffffff;stroke:none;" cx="245.05838" cy="123.7243" r="3.3361554" />
								<path style="fill:none;stroke:#ffffff;stroke-width:1.32292"
									d="m 235.7339,146.18004 4.85254,-9.34112 m -4.85253,-18.43573 4.8526,9.34124" />

								<circle style="fill:#ffffff;stroke:none;" cx="245.05838" cy="140.859016"
									r="3.3361554" />
								<!-- <circle style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:0.512943;"
								id="path14357" cx="212.23537" cy="132.29166" r="45.156609" /> -->
								<path :d="getP2(212.23537, 132.29166, 45.156609)" class="scale text-info" />
							</g>
							<g id="landscape" v-else transform="matrix(0.5,0,0,0.5,92.211445,37.651075)">
								<rect class="phone-back" width="50.440166" height="124.55634" x="173.10904"
									y="41.518723" ry="3.7744346" transform="matrix(2,0,0,2,-184.42289,-75.302152)" />
								<rect style="fill:currentColor;stroke:none;" width="20.368849" height="38.360516"
									x="231.85362" y="113.1114" ry="3.54285" class="text-success" />
								<circle style="fill:#ffffff;stroke:none;" cx="245.05812" cy="123.7243" r="3.3361554" />
								<path style="fill:none;stroke:#ffffff;stroke-width:1.32292"
									d="m 235.73364,146.18004 4.85254,-9.34112 m -4.85253,-18.43573 4.8526,9.34124" />
								<circle style="fill:#ffffff;stroke:none;" cx="245.05838" cy="140.859016"
									r="3.3361554" />
								<!-- <circle style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:0.512943;"
								id="circle14369" cx="212.23537" cy="132.29166" r="45.156609" /> -->
								<path :d="getP2(212.23537, 132.29166, 45.156609)" class="scale text-info" />
							</g>
						</g>
					</g>
					<!-- <circle cx="132.29167" cy="132.29167" r="129.27679" /> -->
					<path :d="getP()" class="scale" />
					<g class="pointer" :transform="pointer">
						<g id="gamepad" transform="translate(-19.843701,-1.4099238)"
							:class="gamepad ? 'text-info' : 'text-blue-grey'">

							<g :class="isStop || gamepad == null ? 'text-blue-grey' : 'text-success'">
								<g id="L">
									<circle cx="152.13542" cy="99.21875" r="19.7024" />
									<circle id="l" :cx="152.13542 - (gamepad?.axes[1] || 0) * 10"
										:cy="99.21875 + (gamepad?.axes[0] || 0) * 10" r="13.923029" />

								</g>
								<g id="R" transform="matrix(1,0,0,-1,4.8634301e-5,267.40322)">
									<circle cx="152.13542" cy="99.21875" r="19.7024" />
									<circle id="r" :cx="152.13542 - (gamepad?.axes[3] || 0) * 10"
										:cy="99.21875 - (gamepad?.axes[2] || 0) * 10" r="13.923029" />
								</g>
							</g>
							<path
								d="M 179.74336,99.218749 C 178.43492,78.18691 161.26362,70.504031 152.13541,71.610801 l -53.99178,3.45747 c -3.419443,0.290337 -17.625124,6.580026 -15.770917,12.581633 1.985103,6.425286 19.875657,12.738316 28.812247,16.862746 3.46861,2.08512 6.86085,3.25548 8.37072,6.18706 l 0.36407,9.28057 c -2e-5,9.14755 -3e-5,18.29511 -5e-5,27.44266 l -0.36407,9.28057 c -1.50987,2.93158 -4.90211,4.10194 -8.37072,6.18706 -8.93659,4.12443 -26.827143,10.43746 -28.812246,16.86275 -1.854207,6.0016 12.351474,12.29129 15.770917,12.58163 l 53.991779,3.45747 c 9.12821,1.10677 26.29951,-6.57611 27.60795,-27.60795 2e-5,-22.98857 3e-5,-45.97715 5e-5,-68.965721 z"
								id="gamepad-back" transform="matrix(1,0,0,-1,4.8616665e-5,267.40322)" />
						</g>
						<path d="M160,132.29167 h 80" class="text-light-green" />
					</g>
				</g>

				<g id="head">
					<g id="left" :class="rumAngle[0] == offset && 'text-success'" @click="offset = rumAngle[0]">
						<rect style="fill:currentColor;stroke:none" width="20.368849" height="38.360516" x="238.25932"
							y="113.1114" ry="3.54285" />
						<circle style="fill:#ffffff;stroke:none;" cx="251.46382" cy="123.7243" r="3.3361554" />
						<path style="fill:none;stroke:#ffffff;stroke-width:1.32291665"
							d="m 242.13934,146.18004 4.85254,-9.34112 m -4.85253,-18.43573 4.8526,9.34124" />
						<circle style="fill:#ffffff;stroke:none;" cx="251.46382" cy="140.859016" r="3.3361554" />
					</g>


					<g id="right" transform="matrix(-1,0,0,1,266.17083,0)"
						:class="rumAngle[2] == offset && 'text-success'" @click="offset = rumAngle[2]">
						<rect style="fill:currentColor;stroke:none" width="20.368849" height="38.360516" x="238.25932"
							y="113.1114" ry="3.54285" />
						<circle style="fill:#ffffff;stroke:none;" cx="251.46382" cy="123.7243" r="3.3361554" />
						<path style="fill:none;stroke:#ffffff;stroke-width:1.32291665"
							d="m 242.13934,146.18004 4.85254,-9.34112 m -4.85253,-18.43573 4.8526,9.34124" />
						<circle style="fill:#ffffff;stroke:none;" cx="251.46382" cy="140.859016" r="3.3361554" />
					</g>
					<g id="top" transform="rotate(-90,133.08542,133.08541)"
						:class="rumAngle[3] == offset && 'text-success'" @click="offset = rumAngle[3]">
						<rect style="fill:currentColor;stroke:none" width="20.368849" height="38.360516" x="238.25932"
							y="113.1114" ry="3.54285" />
						<circle style="fill:#ffffff;stroke:none;" cx="251.46382" cy="123.7243" r="3.3361554" />
						<path style="fill:none;stroke:#ffffff;stroke-width:1.32291665"
							d="m 242.13934,146.18004 4.85254,-9.34112 m -4.85253,-18.43573 4.8526,9.34124" />
						<circle style="fill:#ffffff;stroke:none;" cx="251.46382" cy="140.859016" r="3.3361554" />
					</g>
					<g id="bottom" transform="matrix(0,1,1,0,1e-5,-5.0408936e-6)"
						:class="rumAngle[1] == offset && 'text-success'" @click="offset = rumAngle[1]">
						<rect style="fill:currentColor;stroke:none" width="20.368849" height="38.360516" x="238.25932"
							y="113.1114" ry="3.54285" />
						<circle style="fill:#ffffff;stroke:none;" cx="251.46382" cy="123.7243" r="3.3361554" />
						<path style="fill:none;stroke:#ffffff;stroke-width:1.32291665"
							d="m 242.13934,146.18004 4.85254,-9.34112 m -4.85253,-18.43573 4.8526,9.34124" />
						<circle style="fill:#ffffff;stroke:none;" cx="251.46382" cy="140.859016" r="3.3361554" />
					</g>
				</g>
				<text v-if="isOrientation" x="132.29167" y="50" text-anchor="middle">{{((alpha || 0) -
				rectify).toFixed(1)}}°</text>
				<text v-if="isConnected || isTest" x="132.29167" y="224.58334" text-anchor="middle"
					style="font-size: 10px;">{{ bleStr }}</text>

				<text v-if="isConnected" x="132.29167" y="236.58334" text-anchor="middle" style="font-size: 10px;">{{
					bleTimeOut
				}}ms</text>
			</svg>
			<div class="tips">
				<v-alert border="start" variant="tonal" text="此浏览器不支持连接手柄" type="error"
					v-if="!isGamepadSupported"></v-alert>
				<v-alert border="start" variant="tonal" text="按下手柄任意键连接手柄" type="info" v-else-if="!gamepad"></v-alert>
				<v-alert border="start" variant="tonal" text="此浏览器不支持连接蓝牙设备" type="error"
					v-if="!isBluetoothSupported"></v-alert>
				<v-alert border="start" variant="tonal" text="等待连接笨笨" type="info"
					v-else-if="(!isConnected || bleLoading) && !isTest">
					<v-btn variant="tonal" density="compact"
						@click="bleLoading = true; requestDevice().then(e => { if (!device) bleLoading = false }).catch(() => bleLoading = false);"
						:loading="bleLoading">连接</v-btn>
				</v-alert>
			</div>
		</v-row>
	</div>
</template>

<script setup lang="ts" name="BenBen">
import { useScreenOrientation, useDeviceOrientation, useBluetooth, pausableWatch, useTimeoutFn, useIntervalFn, useLocalStorage, useWindowSize } from '@vueuse/core'
import { mdiController, mdiGamepadCircleDown, mdiAlphaACircleOutline, mdiCellphone, mdiCompassOffOutline, mdiBugOutline, mdiCompass, mdiBug } from '@mdi/js'
const isGamepadSupported = typeof (navigator.getGamepads) === 'function'
const { angle } = useScreenOrientation()
const { width, height } = useWindowSize()
const isShowNav = computed(() => {
	if (height.value >= (700 + 48 * 2)) return false;
	if (height.value >= (width.value + 48 * 2)) return false;
	return true;
})
const { alpha } = useDeviceOrientation()
const {
	isSupported: isBluetoothSupported,
	isConnected,
	device,
	requestDevice,
	server,
} = useBluetooth({
	filters: [{
		services: ["0000af30-0000-1000-8000-00805f9b34fb"]
	}],
	// acceptAllDevices: true,
	optionalServices: ["0000ae3a-0000-1000-8000-00805f9b34fb"]
})
const yetIsOrientationBanner = useLocalStorage('yetIsOrientationBanner', false);
const bleStr = ref(''), bleTimeOut = ref(0), bleLoading = ref(false), isStop = ref(false), isTest = ref(false);
const props = defineProps<{ gamepad: Gamepad }>()
const pointer = computed(() => getPointer(isOrientation.value, alpha.value, rectify.value))
// screen.orientation.addEventListener('change', e => {
// 	// getRunAngle(screen.orientation.angle)
// 	a.value = screen.orientation.angle
// })
const offset = ref(0), isOrientation = ref(false), isOrientationBanner = ref(false), rectify = ref(0)
const rumAngle = computed(() => {
	return getRunAngle(angle.value)
})
// const rumAngle = ref([0, 90, 180, 270])
const strokeH = (v: number) => {
	const w = v * 21.84295082092285, d = Math.abs(w), o = v < 0 ? w : 0;
	return {
		strokeDasharray: d + ',' + (43.6859016418457 - d),
		strokeDashoffset: 21.84295082092285 - o
	}
}
watch(() => props.gamepad?.buttons[0].pressed, v => {
	if (v) setRectify();
})
function setRectify() {
	if (isOrientation) rectify.value = alpha.value || 0;
	else rectify.value = 0
}
function getPointer(isOrientation: boolean, alpha: number | null, rectify: number) {
	if (isOrientation && alpha != null) return `translate(132.29167, 132.29167) rotate(${alpha - rectify}) translate(-132.29167, -132.29167)`
	return ''
}
function getRunAngle(angle: number) {
	switch (angle) {
		case 90: return [90, 180, 270, 0]
		case 180: return [0, 90, 180, 270]
		case -90:
		case 270: return [270, 0, 90, 180]
		case 0:
		default:
			return [0, 90, 180, 270]

	}
}


//生成刻度
function getP2(x0: number, y0: number, r: number) {
	let s = '';
	for (let i = 0; i < 360; i += 5) {
		if (i % 90 == 0) s += kd(i, x0, y0, r, r / 290 * 100)
		else if (i % 30 == 0) s += kd(i, x0, y0, r, r / 290 * 60)
		else s += kd(i, x0, y0, r, r / 290 * 30)
	}
	return s;
}
function getP() {
	let s = '';
	for (let i = 0; i < 360; i += 5) {
		if (i % 90 == 0) s += kd(i, 132.29167, 132.29167, 129.27679, 129.27679 / 290 * 100)
		else if (i % 30 == 0) s += kd(i, 132.29167, 132.29167, 129.27679, 129.27679 / 290 * 60)
		else s += kd(i, 132.29167, 132.29167, 129.27679, 129.27679 / 290 * 30)
	}
	return s;
}
function kd(deg: number, x0: number, y0: number, r: number, l: number) {
	deg *= 2 * Math.PI / 360
	const n = 3
	const xa = x0 + r * Math.sin(deg), ya = y0 - r * Math.cos(deg)
	return `M ${xa.toFixed(n)},${ya.toFixed(n)} L ${(xa - l * Math.sin(deg)).toFixed(n)},${(ya + l * Math.cos(deg)).toFixed(n)}`
}

const power = ref({ a: 0, b: 0, c: 0, d: 0 })
function addPower(n: number) {
	if (n == 0) return 0;
	n = n > 0 ? (n * 0.5 + 0.5) : (n * 0.5 - 0.5)
	return n > 1 ? 1 : (n < -1 ? -1 : n)
}
function setTest(v: boolean) {
	if (v) resume();
	else pause();
}
const { pause, resume } = useIntervalFn(() => {
	if (!props.gamepad) return;
	power.value = controllerWheel();
	bleStr.value = toHexString(getWheelData(power.value))
}, 500, { immediate: false })
function controllerWheel() {
	if (!isGamepadSupported || !props.gamepad) return { a: 0, b: 0, c: 0, d: 0 };
	let x = props.gamepad.axes[0], y = props.gamepad.axes[1], rx = props.gamepad.axes[2]
	x = Math.abs(x) >= 0.2 ? -x * 1.1 : 0;
	y = Math.abs(y) >= 0.2 ? y : 0
	rx = Math.abs(rx) >= 0.2 ? -rx : 0
	let rotX = x, rotY = y;
	if (isOrientation.value) {
		let botHeading = (alpha.value || 0) - rectify.value;
		botHeading *= 2 * Math.PI / 360
		rotX = x * Math.cos(-botHeading) - y * Math.sin(-botHeading);
		rotY = x * Math.sin(-botHeading) + y * Math.cos(-botHeading);
	}
	const denominator = Math.max(Math.abs(y) + Math.abs(x) + Math.abs(rx), 1),
		b = addPower((rotY + rotX + rx) / denominator),
		c = addPower((rotY - rotX + rx) / denominator),
		a = addPower((rotY - rotX - rx) / denominator),
		d = addPower((rotY + rotX - rx) / denominator);
	return { a, b, c, d }
}
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
const { isPending, start, stop } = useTimeoutFn(async () => {
	if (!isConnected.value) {
		stop();
		bleStr.value = '';
		bleTimeOut.value = 0;
		return;
	}
	try {
		const t = Date.now();
		const p = controllerWheel();
		//停止后不再发出
		if (p.a == 0 && p.b == 0 && p.c == 0 && p.d == 0) {
			if (isStop.value) {
				start();
				return;
			}
			isStop.value = true;
		} else {
			isStop.value = false;
		}
		const data = getWheelData(p);
		await ControllerCharacteristic?.writeValue(data)
		bleStr.value = toHexString(data);
		bleTimeOut.value = Date.now() - t;
		power.value = p;
		start();
	} catch (e) {
		console.error(e);
		stop();
		bleStr.value = '';
		bleTimeOut.value = 0;
		return;
	}
}, 10)
pausableWatch(isConnected, (newIsConnected) => {
	console.log(newIsConnected, server.value)
	if (!newIsConnected || !server.value)
		return
	runController();
	//stop()
})
let ControllerCharacteristic: BluetoothRemoteGATTCharacteristic | undefined
const runController = async () => {
	try {
		const ControllerService = await server.value?.getPrimaryService("0000ae3a-0000-1000-8000-00805f9b34fb")
		ControllerCharacteristic = await ControllerService?.getCharacteristic('0000ae3b-0000-1000-8000-00805f9b34fb')
		if (ControllerCharacteristic) {
			start()//resume()
			console.log(device.value)
			if (device.value) device.value.ongattserverdisconnected = () => {
				device.value = undefined;
				server.value = undefined;
			}
		}
	} catch (e) {
		console.error(e)
	} finally {
		bleLoading.value = false;
	}
}
</script>
<style scoped lang='scss'>
.toolbar {
	position: fixed;
	top: 0;
	z-index: 9999;
	width: 100%;

	.v-btn--variant-elevated {
		background-color: transparent;
	}

	.v-btn.v-btn--density-default {
		height: auto;
	}

	.v-btn--size-default {
		padding: 0 8px 0 10px;
	}

	.prepend {
		margin-right: -6px;
		margin-bottom: -2px;
	}
}

.nav {
	position: fixed;
	transform: top .5s;
	bottom: 0;
	left: 8px;
	z-index: 9999;

	&>div {
		margin-bottom: 8px;
	}
}

.tips {
	width: calc(min(100vh, 700px, 100vw) * 0.8);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	&>div {
		background-color: #fff8;
		backdrop-filter: blur(5px);
		margin-bottom: 10px;

		&:last-child {
			margin-bottom: 0px;
		}
	}
}

.benben {
	position: relative;
	height: 100vh;

	&>svg {
		width: min(100vh, 700px, 100vw);
	}
}

#benben {

	rect,
	ellipse,
	path,
	circle {
		fill: none;
		stroke: currentColor;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 1px;
	}

	text {
		fill: currentColor;
	}

	.platform {
		transition: transform 1s;
	}

	#box {
		opacity: 0.45;
		fill: currentColor;
		fill-opacity: 0.35;
	}

	.box-in {
		opacity: 0.3;

	}

	#head {
		cursor: pointer;

		g:hover {
			color: #0D47A1; //blue-grey-darken-4
		}
	}

	.phone-back,
	#gamepad-back,
	.wheel-back {
		fill: currentColor;
		fill-opacity: 0.3;
	}

	.power-back {
		opacity: 0.35;
		stroke-width: 4;
		stroke-linecap: round;
	}

	.power {
		stroke-width: 2;
		stroke-linecap: round;
		stroke-dasharray: 0, 43.6859016418457;
		stroke-dashoffset: 21.84295082092285;
	}

	.scale {
		opacity: 0.2;
		stroke-width: 3;
	}

	.text-light-green {
		stroke-width: 3;
	}
}
</style>
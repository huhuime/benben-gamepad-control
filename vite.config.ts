import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(),
	vuetify({ autoImport: true }),
	AutoImport({
		imports: [
			'vue',
		]
	}),basicSsl()
	],
	base: './',
	build: {
		outDir: './public'
	},
	publicDir:'res'
})

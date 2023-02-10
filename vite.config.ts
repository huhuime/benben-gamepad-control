import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import dist from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(),
	vuetify({ autoImport: true }),
	AutoImport({
		imports: [
			'vue',
		]
	})
	],
	base: './',
	build: {
		outDir: './doc'
	}
})

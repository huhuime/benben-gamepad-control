import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

const plugins = [vue(),
vuetify({ autoImport: true }),
AutoImport({
	imports: [
		'vue',
	]
})
]
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	if (mode == 'https') plugins.push(basicSsl())
	return {
		plugins, base: './',
		build: {
			outDir: './public'
		},
		publicDir: 'res'
	}
})

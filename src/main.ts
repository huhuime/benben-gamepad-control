import { createApp } from 'vue'
import { createVuetify } from 'Vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import App from './App.vue'

const vuetify = createVuetify({
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
		}
	},
})
const app = createApp(App)
app.use(vuetify).mount('#app')

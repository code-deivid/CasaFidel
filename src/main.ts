import { createApp } from 'vue'
import '@fontsource/gloock/latin-400.css'
import '@fontsource-variable/antonio'
import '@fontsource-variable/dm-sans'
import './styles/main.scss'
import App from './App.vue'
import { applyDocumentLocale, i18n } from './i18n'

// Si el visitante eligió otro idioma en una visita anterior, el documento
// se pone en ese idioma antes de pintar la página.
applyDocumentLocale()

createApp(App).use(i18n).mount('#app')
